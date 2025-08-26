# Koder-Backend

A scalable backend for problem-solving platform, supporting user authentication (OAuth, JWT) and problem management.

[![Github Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/mohit-bhandari45/Koder-Backend)

Hosted URL:- https://koder-backend-ry19.onrender.com

## Features and Functionality

*   **User Authentication:**
    *   Supports local authentication using email and password.
    *   OAuth 2.0 integration with Google and GitHub.
    *   JWT (JSON Web Tokens) for secure access token management.
    *   Refresh token mechanism for seamless access token renewal.
    *   Email verification and password reset functionality with OTP.
*   **Problem Management:**
    *   API endpoints to add, retrieve, and manage coding problems.
    *   Support for defining test cases with input/output validation.
    *   Problem search functionality.
*   **Submission Handling:**
    *   Records and tracks user submissions for each problem.
    *   Submission status (Pending, Accepted, Rejected).
*   **Email Service:**
    *   Welcome emails for new users.
    *   OTP (One-Time Password) emails for email verification and password reset.
*   **Kafka Integration** (commented out in `src/index.ts`):
    *   Event-driven architecture for handling asynchronous tasks (e.g., sending emails).
    *   Kafka producers and consumers for email events.
*   **BullMQ Integration:**
    *   Job queue for handling asynchronous tasks (e.g., sending emails).
    *   Robust and scalable email processing using BullMQ.

## Technology Stack

*   **Node.js:** Runtime environment.
*   **Express.js:** Web framework.
*   **MongoDB:** Database.
*   **Mongoose:** ODM (Object Document Mapper) for MongoDB.
*   **Redis:** For managing BullMQ queues.
*   **Passport.js:** Authentication middleware.
*   **jsonwebtoken:** JWT implementation.
*   **bcrypt:** Password hashing.
*   **nodemailer:** Email sending.
*   **cors:** Middleware to enable CORS.
*   **cookie-parser:** Middleware to parse cookies.
*   **morgan:** HTTP request logger.
*   **BullMQ:** Queue system based on Redis.
*   **KafkaJS:** (Potentially) Message streaming platform for event handling.(Optional)
*   **dotenv:** Environment variable management.

## Prerequisites

*   Node.js (>=18)
*   npm or yarn
*   MongoDB (running locally or accessible remotely)
*   Redis (running locally or accessible remotely)
*   Kafka (running locally or accessible remotely - if Kafka integration is enabled)
*   Environment variables configured (see `.env.example` for required variables).

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohit-bhandari45/Koder-Backend.git
    cd Koder-Backend
    ```

2.  Install dependencies:

    ```bash
    npm install  # or yarn install
    ```

3.  Create a `.env` file in the root directory based on the `.env.example` file, and configure the environment variables accordingly.

    ```
    cp .env.example .env
    # Edit .env with your configurations
    ```

    Example `.env` contents:

    ```
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/koder
    ACCESS_TOKEN_SECRET=access_secret
    REFRESH_TOKEN_SECRET=refresh_secret
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    GOOGLE_DEV_CALLBACK_URL=http://localhost:8000/auth/google/callback
    GOOGLE_PROD_CALLBACK_URL=YOUR_GOOGLE_PROD_CALLBACK_URL
    GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
    GITHUB_DEV_CALLBACK_URL=http://localhost:8000/auth/github/callback
    GITHUB_PROD_CALLBACK_URL=YOUR_GITHUB_PROD_CALLBACK_URL
    EMAIL_USER=YOUR_EMAIL_USER
    EMAIL_PASS=YOUR_EMAIL_PASS
    NODE_ENV=development # or production
    ```

4.  Start Redis:

    Ensure Redis is running. Example:
    ```bash
    redis-server
    ```

5.  Run the application:

    ```bash
    npm run dev # for development mode
    # or
    npm start   # for production mode
    ```

    The server will start at `http://localhost:8000` (or the port specified in your `.env` file).

## Usage Guide

1.  **API Endpoints:**

    The backend exposes various API endpoints for user authentication, problem management, and code execution.  Here are some key routes:

    *   **Authentication:**
        *   `POST /auth/signup`: User registration.
        *   `POST /auth/login`: User login.
        *   `POST /auth/verify-email`: Email verification using OTP.
        *   `POST /auth/refresh`: Refresh access token.
        *   `POST /auth/logout`: User logout.
        *   `POST /auth/forgot-password`: Initiate password reset.
        *   `POST /auth/verify-reset-otp`: Verify reset password OTP.
        *   `POST /auth/reset-password`: Reset password.
        *   `GET /auth/google`: Initiate Google OAuth authentication.
        *   `GET /auth/github`: Initiate Github OAuth authentication.
    *   **Problems:**
        *   `GET /api/problem`: Get all problems (requires authentication).
        *   `POST /api/problem/add`: Add a new problem (requires authentication).
        *   `GET /api/problem/:id`: Get a specific problem by ID (requires authentication).
    *   **Submissions:**
        *   `POST /api/submission/add`: Add a new submission (requires authentication).
        *   `GET /api/submission/all`: Get all user submissions (requires authentication).
        *   `GET /api/submission/problem/:problemId/all`: Get all submissions for a problem (requires authentication).
        *   `GET /api/submission/:id`: Get a submission by ID (requires authentication).
    *   **Code Execution:**
        *   `POST /`: Health check endpoint
        *   `POST /run`: Execute code (public route).
    *   **User Profile:**
        *   `POST /api/user/username`: Add a username to user (requires authentication).
        *   `PATCH /api/user/username`: Update username (requires authentication).
        *   `GET /api/user/me`: Get current user profile (requires authentication).
        *   `PATCH /api/user/me`: Update current user profile (requires authentication).
        *   `DELETE /api/user/me`: Delete current user account (requires authentication).
        *    `POST /api/user/add-password`: Add password for OAuth users. (requires authentication).
        *    `POST /api/user/change-password`: Change password (requires authentication).
     *   **Search**
         *   `GET /api/search`: Search problems by query (requires authentication).

2.  **Authentication:**

    *   For local authentication, use the `/auth/signup` and `/auth/login` endpoints.
    *   For Google and GitHub OAuth, redirect users to `/auth/google` and `/auth/github` respectively.  Configure callback URLs in your Google/GitHub OAuth app settings, and in the `.env` file.
    *   The frontend will receive `accessToken` and `refreshToken` upon successful login or registration. The `accessToken` must be included in the `Authorization` header as a Bearer token (e.g., `Authorization: Bearer <accessToken>`) for accessing protected routes. Alternatively, the `accessToken` cookie will be checked.

## API Documentation

Detailed API documentation (Swagger/OpenAPI) is planned for future release.  In the meantime, the following section provides some details.

### Authentication API

| Endpoint                | Method | Description                                                                              | Request Body                                                                                     | Response Body                                                                                                                                                                       |
| :---------------------- | :----- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/auth/signup`          | POST   | Registers a new user.                                                                  | `{ fullName: string, email: string, password: string }`                                         | `{ message: string, data: { user: User, accessToken: string, refreshToken: string } }`                                                                                             |
| `/auth/login`           | POST   | Logs in an existing user.                                                               | `{ email: string, password: string }`                                                            | `{ message: string, data: { user: User, accessToken: string, refreshToken: string } }`                                                                                             |
| `/auth/verify-email`     | POST   | Verifies a user's email using an OTP.                                                   | `{ email: string, code: string }`                                                               | `{ message: string }`                                                                                                                                                               |
| `/auth/refresh`         | POST   | Refreshes the access token using a refresh token.                                        | `{ refreshToken: string }`                                                                      | `{ message: string, data: string (new access token) }`                                                                                                                                  |
| `/auth/logout`          | POST   | Logs out the user.                                                                     | None                                                                                             | `{ message: string }`                                                                                                                                                               |
| `/auth/forgot-password` | POST   | Initiates password reset by sending an OTP to the user's email.                          | `{ email: string }`                                                                             | `{ message: string }`                                                                                                                                                               |
| `/auth/verify-reset-otp`| POST   | Verifies the reset password OTP.                                                         | `{ email: string, code: string }`                                                               | `{ message: string }`                                                                                                                                                               |
| `/auth/reset-password`  | POST   | Resets the user's password.                                                              | `{ email: string, newPassword: string }`                                                         | `{ message: string }`                                                                                                                                                               |
| `/auth/resend-otp`  | POST   | Resends the OTP                                                              | `{ email: string, type: string (verify, reset-password, default=verify) }`                                                         | `{ message: string }`                                                                                                                                                               |
| `/auth/google`          | GET    | Redirects to Google's OAuth authentication page.                                       | None                                                                                             | Redirect                                                                                                                                                                          |
| `/auth/google/callback` | GET    | Callback URL for Google OAuth. Handles user creation/login and redirects to the frontend. | None (handled by Passport.js)                                                                   | Redirect to frontend with `accessToken` and `refreshToken` as query parameters.                                                                                                   |
| `/auth/github`          | GET    | Redirects to GitHub's OAuth authentication page.                                       | None                                                                                             | Redirect                                                                                                                                                                          |
| `/auth/github/callback` | GET    | Callback URL for GitHub OAuth. Handles user creation/login and redirects to the frontend. | None (handled by Passport.js)                                                                   | Redirect to frontend with `accessToken` and `refreshToken` as query parameters.                                                                                                   |

### Problems API

| Endpoint          | Method | Description                                     | Request Body | Response Body                                                                                                                                                    |
| :---------------- | :----- | :---------------------------------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/problem`     | GET    | Retrieves all problems (paginated).           | None         | `{ message: string, data: { data: Problem[], currentPage: number, totalPages: number } }`                                                                        |
| `/api/problem/add` | POST   | Adds a new problem.                           | `Problem`    | `{ message: string, data: string (problem id) }`                                                                                                               |
| `/api/problem/:id` | GET    | Retrieves a problem by ID.                    | None         | `{ message: string, data: Problem }`                                                                                                                                 |

### Submissions API

| Endpoint                        | Method | Description                                                              | Request Body                                                                                                                 | Response Body                                                                                                                                                                |
| :------------------------------ | :----- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/submission/add`           | POST   | Adds a new submission.                                                     | `{ problemId: string, code: string, language: string, status?: string, runtime?: number, memory?: number }`                  | `{ message: string, data: string (submission id) }`                                                                                                                               |
| `/api/submission/all`           | GET    | Retrieves all user submissions (paginated).                                | None                                                                                                                       | `{ message: string, data: { submissions: Submission[], page: number, totalPages: number, totalSubmissions: number } }`                                                                  |
| `/api/submission/problem/:id/all` | GET    | Retrieves all submissions for a specific problem.                          | None                                                                                                                       | `{ message: string, data: Submission[] }`                                                                                                                                     |
| `/api/submission/:id`            | GET    | Retrieves a specific submission by ID.                                   | None                                                                                                                       | `{ message: string, data: Submission }`                                                                                                                                     |

### User API

| Endpoint         | Method | Description                                                              | Request Body                       | Response Body                                                                                                                                                     |
| :--------------- | :----- | :------------------------------------------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/user/me` | GET    | Retrieves the user's own profile.                                        | None                               | `{ message: string, data: User }`                                                                                                                             |
| `/api/user/me` | PATCH  | Updates the user's own profile (fullName, profilePicture).              | `{ fullName?: string, profilePicture?: string }` | `{ message: string, data: User }`                                                                                                                             |
| `/api/user/username`  | POST | Adds a username to the user account for OAuth users.                     | `{ username: string }`               | `{ message: string, data: User }`                                                                                                                             |
| `/api/user/username`  | PATCH | Updates the user's username.                     | `{ username: string }`               | `{ message: string, data: User }`                                                                                                                             |
| `/api/user/me`  | DELETE | Deletes the user's own account permanently.                                            | `None`               | `{ message: string }`                                                                                                                             |
| `/api/user/change-password`  | POST | Change user password     | `{ currentPassword: string, newPassword: string }`               | `{ message: string }`                                                                                                                             |
| `/api/user/add-password`  | POST | Add password for OAuth users     | `{ newPassword: string }`               | `{ message: string }`                                                                                                                             |

### Code Execution API

| Endpoint | Method | Description               | Request Body                   | Response Body              |
| :------- | :----- | :------------------------ | :----------------------------- | :------------------------- |
| `/run`   | POST   | Executes code.           | `{ code: string, language: string }` | `{ output: string }`       |

### Search API

| Endpoint | Method | Description               | Request Query Params | Response Body              |
| :------- | :----- | :------------------------ | :----------------------------- | :------------------------- |
| `/api/search`   | GET   | Executes code.           | `q`: search query,  `page` (optional): page number, `limit` (optional) results per page | `{message: string, data: {query: string, currentPage: number, totalPages: number, totalResults: number, results: Problem[]}}`      |

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Push your branch to your forked repository.
6.  Create a pull request to the `main` branch of the original repository.

## License Information

This project has no specified license. All rights are reserved unless otherwise stated.

## Contact/Support Information

*   Repository URL: [https://github.com/mohit-bhandari45/Koder-Backend](https://github.com/mohit-bhandari45/Koder-Backend)
*   For support, please open an issue on the GitHub repository.
