<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use Pterodactyl\Models\User;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Events\Auth\FailedPasswordReset;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    /**
     * Send a reset link to the given user. Supports both username and email.
     */
    public function sendResetLinkEmail(Request $request): JsonResponse
    {
        $input = trim($request->input('email', ''));

        // If input does not look like an email, try resolving it as a username
        if (!empty($input) && !filter_var($input, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('username', $input)->first();
            if ($user) {
                $request->merge(['email' => $user->email]);
            } else {
                return $this->sendResetLinkFailedResponse($request, Password::INVALID_USER);
            }
        }

        // Validate that an email is present
        $this->validateEmail($request);

        // Check if user exists with this email
        $resolvedEmail = $request->input('email');
        if (!User::where('email', $resolvedEmail)->exists()) {
            return $this->sendResetLinkFailedResponse($request, Password::INVALID_USER);
        }

        // Send reset link using broker
        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return $response === Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }

    /**
     * Get the response for a failed password reset link.
     */
    protected function sendResetLinkFailedResponse(Request $request, $response): JsonResponse
    {
        event(new FailedPasswordReset($request->ip(), $request->input('email')));

        $message = 'We cannot find an account with that email or username.';
        if ($response === Password::INVALID_USER) {
            $message = 'We cannot find an account with that email or username.';
        }

        return response()->json([
            'errors' => [
                [
                    'code' => 'NotFoundHttpException',
                    'status' => '404',
                    'detail' => $message,
                ]
            ],
            'status' => $message
        ], 404);
    }

    /**
     * Get the response for a successful password reset link.
     */
    protected function sendResetLinkResponse(Request $request, $response): JsonResponse
    {
        return response()->json([
            'status' => trans($response),
        ]);
    }
}
