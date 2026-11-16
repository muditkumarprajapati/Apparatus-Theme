<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Pterodactyl\Models\User;
use Pterodactyl\Http\Controllers\Controller;

class RegisterController extends Controller
{
    /**
     * Render the registration view (core authentication blade).
     */
    public function index()
    {
        return view('templates/auth.core');
    }

    /**
     * Handle user self-registration.
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

        if (User::where('username', $username)->exists()) {
            return response()->json([
                'errors' => [['detail' => 'That username is already taken. Please choose another.']]
            ], 422);
        }

        if (User::where('email', $email)->exists()) {
            return response()->json([
                'errors' => [['detail' => 'An account with that email already exists.']]
            ], 422);
        }

        try {
            $user = new User();
            $user->username = $username;
            $user->email = $email;
            $user->name_first = $username;
            $user->name_last = 'Client';
            $user->password = Hash::make($password);
            $user->language = 'en';
            $user->root_admin = false;
            $user->uuid = Str::uuid()->toString();
            $user->save();

            // Automatically establish session for the newly registered user
            Auth::login($user, true);

            return response()->json([
                'success' => true,
                'data' => [
                    'complete' => true,
                    'intended' => '/',
                    'user' => [
                        'id' => $user->id,
                        'username' => $user->username,
                        'email' => $user->email,
                    ]
                ],
                'message' => 'Account created successfully! Welcome to ArixByte Cloud.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => [['detail' => 'Could not register account: ' . $e->getMessage()]]
            ], 500);
        }
    }
}
