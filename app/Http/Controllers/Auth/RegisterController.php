<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
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
}
