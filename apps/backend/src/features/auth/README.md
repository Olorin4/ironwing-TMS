# Feature: Authentication

This feature is responsible for user registration, login, and session management.

## Authentication Strategies

It provides two primary authentication methods to support different client types:

1.  **JWT (JSON Web Token):** Intended for stateless clients like the mobile application.
2.  **Sessions:** Intended for stateful clients like the Electron desktop application.

## API Endpoints

-   `POST /api/auth/register`: Creates a new user account.
-   `POST /api/auth/login/jwt`: Authenticates a user and returns a JWT.
-   `POST /api/auth/login/session`: Authenticates a user and creates a server-side session.
-   `POST /api/auth/logout`: Destroys the current user session.
-   `GET /api/auth/profile`: A protected route to retrieve the currently authenticated user's profile (requires JWT).
-   `GET /api/auth/profile/session`: A protected route to retrieve the currently authenticated user's profile (requires a valid session).