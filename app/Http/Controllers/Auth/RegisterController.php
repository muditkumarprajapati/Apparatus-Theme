<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Pterodactyl\Models\User;
use Pterodactyl\Http\Controllers\Controller;

class RegisterController extends Controller
{
    /**
     * Render the registration view.
     */
    public function index()
    {
        return view('templates/auth.core');
    }

    /**
     * Handle user self-registration and real database persistence.
     */
    public function register(Request $request): JsonResponse
    {
        $username = trim($request->input('username', ''));
        $email = trim(strtolower($request->input('email', '')));
        $password = $request->input('password', '');
        $passwordConfirmation = $request->input('password_confirmation', '');

        // Validation rules
        if (empty($username) || strlen($username) < 3) {
            return response()->json([
                'errors' => [['detail' => 'Username must be at least 3 characters long.']]
            ], 422);
        }

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'errors' => [['detail' => 'Please provide a valid email address.']]
            ], 422);
        }

        if (empty($password) || strlen($password) < 8) {
            return response()->json([
                'errors' => [['detail' => 'Password must be at least 8 characters long.']]
            ], 422);
        }

        if ($password !== $passwordConfirmation) {
            return response()->json([
                'errors' => [['detail' => 'The password confirmation does not match.']]
            ], 422);
        }

        // Check if user already exists in database
        try {
            $userExists = DB::table('users')
                ->where('username', $username)
                ->orWhere('email', $email)
                ->first();

            if ($userExists) {
                if (strtolower($userExists->username) === strtolower($username)) {
                    return response()->json([
                        'errors' => [['detail' => 'That username is already taken. Please choose another.']]
                    ], 422);
                }
                if (strtolower($userExists->email) === strtolower($email)) {
                    return response()->json([
                        'errors' => [['detail' => 'An account with that email already exists.']]
                    ], 422);
                }
            }
        } catch (\Throwable $e) {
            Log::warning('User existence query note: ' . $e->getMessage());
        }

        // DIRECT DATABASE INSERTION:
        // Bypasses email notifications/broken SMTP rollbacks in UserCreationService
        $userId = null;
        $userUuid = Str::uuid()->toString();

        try {
            $now = now();
            $insertData = [
                'uuid' => $userUuid,
                'username' => $username,
                'email' => $email,
                'name_first' => $username,
                'name_last' => 'Client',
                'password' => Hash::make($password),
                'language' => 'en',
                'root_admin' => 0,
                'use_totp' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if (Schema::hasColumn('users', 'gravatar')) {
                $insertData['gravatar'] = 1;
            }
            if (Schema::hasColumn('users', 'external_id')) {
                $insertData['external_id'] = null;
            }

            $userId = DB::table('users')->insertGetId($insertData);
            Log::info("Self-registration successful in database for user {$username} (ID: {$userId})");
        } catch (\Throwable $dbEx) {
            Log::error('Direct DB insert failed: ' . $dbEx->getMessage());

            // Strategy 2: Eloquent Model fallback
            try {
                $user = new User();
                $user->username = $username;
                $user->email = $email;
                $user->name_first = $username;
                $user->name_last = 'Client';
                $user->password = Hash::make($password);
                $user->language = 'en';
                $user->root_admin = false;
                $user->uuid = $userUuid;
                $user->save();
                $userId = $user->id;
            } catch (\Throwable $elEx) {
                Log::error('Eloquent fallback failed: ' . $elEx->getMessage());
            }

            // Strategy 3: Pterodactyl UserCreationService fallback
            if (!$userId) {
                try {
                    if (class_exists(\Pterodactyl\Services\Users\UserCreationService::class)) {
                        $svc = app(\Pterodactyl\Services\Users\UserCreationService::class);
                        $createdUser = $svc->handle([
                            'email' => $email,
                            'username' => $username,
                            'name_first' => $username,
                            'name_last' => 'Client',
                            'password' => $password,
                            'root_admin' => false,
                            'language' => 'en',
                        ]);
                        if ($createdUser && isset($createdUser->id)) {
                            $userId = $createdUser->id;
                        }
                    }
                } catch (\Throwable $svcEx) {
                    Log::error('UserCreationService fallback failed: ' . $svcEx->getMessage());
                }
            }
        }

        if (!$userId) {
            return response()->json([
                'errors' => [['detail' => 'Unable to persist account in database. Please contact panel support.']]
            ], 500);
        }

        // Automatically authenticate user session so they don't even need to re-login
        if ($userId) {
            try {
                if (auth()->guard()) {
                    auth()->guard()->loginUsingId($userId, true);
                    if ($request->hasSession()) {
                        $request->session()->regenerate();
                    }
                }
            } catch (\Throwable $le) {
                Log::warning('Session auto-login note: ' . $le->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'complete' => true,
                'intended' => '/',
                'user' => [
                    'id' => $userId ?: 1,
                    'username' => $username,
                    'email' => $email,
                ]
            ],
            'message' => 'Account created successfully! Welcome to ArixByte Cloud.'
        ]);
    }

    /**
     * Dispatch an HTML test email using the panel's configured SMTP settings.
     */
    public function sendTestMail(Request $request): JsonResponse
    {
        $user = auth()->user();
        $email = $request->input('email');
        if (empty($email) && $user) {
            $email = $user->email;
        }
        if (empty($email)) {
            $email = DB::table('users')->where('root_admin', 1)->value('email');
        }
        if (empty($email)) {
            $email = 'admin@arixbyte.com';
        }

        $subject = $request->input('subject') ?: 'ArixByte Cloud SMTP Test';
        $body = $request->input('body') ?: '<p>This is a test email dispatched from your ArixByte Cloud panel to verify that your SMTP mail settings are functional.</p>';

        try {
            Mail::html($body, function ($msg) use ($email, $subject) {
                $msg->to($email)->subject($subject);
            });

            return response()->json([
                'success' => true,
                'recipient' => $email,
                'message' => "Test email successfully sent to {$email} via SMTP!"
            ]);
        } catch (\Throwable $e) {
            Log::error('SMTP Test Mail error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'SMTP Delivery Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send real account verification code email using panel SMTP.
     */
    public function sendVerificationCode(Request $request): JsonResponse
    {
        $user = auth()->user();
        $email = $request->input('email');
        $username = $request->input('username');
        $code = $request->input('code');

        if (empty($email) && $user) {
            $email = $user->email;
            $username = $user->username;
        }

        if (empty($email) || empty($code)) {
            return response()->json([
                'success' => false,
                'message' => 'Email and verification code are required.'
            ], 422);
        }

        if (empty($username)) {
            $username = 'Valued Member';
        }

        $subject = 'Action Required: Verify your ArixByte account and activate referral code';
        
        $html = '<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; background-color: #0b0713; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <div style="max-width: 580px; margin: 0 auto; background: #120c1d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
    <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px;">
      <h1 style="color: #ec4899; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">ArixByte Cloud</h1>
      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; font-weight: 700;">Infrastructure &amp; Security</span>
    </div>
    <h2 style="font-size: 20px; font-weight: 700; color: #ffffff; text-align: center; margin-top: 0;">Verify Your Account Identity</h2>
    <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; text-align: center;">
      Hello <strong>' . htmlspecialchars($username) . '</strong>,<br>
      Thank you for joining ArixByte Cloud! To complete your verification, activate full platform privileges, and unlock your unique referral reward code, please use the one-time security code below:
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <div style="display: inline-block; background: rgba(236, 72, 153, 0.12); border: 2px dashed #ec4899; border-radius: 12px; padding: 16px 36px;">
        <span style="font-family: monospace; font-size: 32px; font-weight: 900; letter-spacing: 0.35em; color: #ffffff;">' . htmlspecialchars($code) . '</span>
      </div>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 8px;">Valid for 15 minutes &bull; Do not share this security code with anyone</div>
    </div>
    <div style="text-align: center; margin-bottom: 28px;">
      <a href="https://control.arixbyte.com/account?verify_code=' . urlencode($code) . '" style="display: inline-block; background: #ec4899; color: #ffffff; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
        Click Here to Get Your Account Verified
      </a>
    </div>
    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; text-align: center;">
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">Connect With ArixByte Official</div>
      <a href="https://arixbyte.com" style="color: #38bdf8; text-decoration: none; margin: 0 8px; font-size: 13px;">arixbyte.com</a> &bull;
      <a href="https://discord.arixbyte.com" style="color: #818cf8; text-decoration: none; margin: 0 8px; font-size: 13px;">Discord</a> &bull;
      <a href="https://instagram.arixbyte.com" style="color: #f472b6; text-decoration: none; margin: 0 8px; font-size: 13px;">Instagram</a> &bull;
      <a href="https://wa.me/918218444633" style="color: #34d399; text-decoration: none; margin: 0 8px; font-size: 13px;">WhatsApp</a>
    </div>
  </div>
</body>
</html>';

        try {
            Mail::html($html, function ($msg) use ($email, $subject) {
                $msg->to($email)->subject($subject);
            });

            return response()->json([
                'success' => true,
                'recipient' => $email,
                'message' => "Verification code sent to {$email} via SMTP!"
            ]);
        } catch (\Throwable $e) {
            Log::error('SMTP Verification Code send error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'SMTP Delivery Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
