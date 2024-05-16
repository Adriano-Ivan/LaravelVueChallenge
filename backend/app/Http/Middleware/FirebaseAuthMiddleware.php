<?php

namespace App\Http\Middleware;

use Closure;
use Kreait\Firebase\Contract\Auth as FirebaseAuth;
use Illuminate\Http\Request;
use Kreait\Firebase\Auth\Token\Exception\InvalidToken;

class FirebaseAuthMiddleware
{
    private $auth;

    public function __construct(FirebaseAuth $auth)
    {
        $this->auth = $auth;
    }

    public function handle(Request $request, Closure $next)
    {
        $authorization = $request->header('Authorization');

        if (!$authorization) {
            // Retorne uma resposta com um código de status apropriado
            return response()->json(['error' => 'Authorization Header not found'], 401);
        }

        $idTokenString = substr($authorization, 7);

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idTokenString, true);
        } catch (InvalidToken $e) {
            // O token é inválido
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (\InvalidArgumentException $e) {
            // O token é nulo, vazio ou mal formatado
            return response()->json(['error' => 'Malformed token'], 400);
        }

        // Anexe o token verificado ao Request
        $request->attributes->set('firebase_id_token', $verifiedIdToken);

        return $next($request);
    }
}
