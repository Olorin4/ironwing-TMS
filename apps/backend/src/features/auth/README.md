# Feature: Authentication

This feature is responsible for user registration and authentication using a unified JWT-based strategy.

## Authentication Strategy

The system uses JSON Web Tokens (JWTs) for all clients. The delivery mechanism is adapted based on the client type:

-   **Desktop Client (Electron):** The JWT is delivered in a secure, `HttpOnly` cookie. The client must send a `X-Client-Type: desktop` header during login.
-   **Mobile Client:** The JWT is delivered in the JSON response body.

## API Endpoints

-   `POST /api/auth/register`: Creates a new user account.
-   `POST /api/auth/login`: Authenticates a user and returns a JWT. The behavior changes based on the `X-Client-Type` header.
-   `POST /api/auth/logout`: Clears the authentication cookie for the desktop client. Mobile clients should handle logout by deleting the stored token.
-   `GET /api/auth/profile`: A protected route to retrieve the currently authenticated user's profile.