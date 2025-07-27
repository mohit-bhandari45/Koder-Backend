# Koder Backend

A scalable backend for a code execution and problem-solving platform, supporting user authentication (OAuth, JWT), code execution in multiple languages, and problem management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Docker](#docker)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Code Execution](#code-execution)
- [Authentication](#authentication)
- [Seeding Data](#seeding-data)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (Google, GitHub OAuth, JWT)
- Secure session management with refresh/access tokens
- Problem CRUD (create, read, update, delete)
- Code execution for JavaScript, Python, C, C++, Java
- Submission tracking and user profiles
- RESTful API design
- Dockerized for easy deployment

---

## Tech Stack

- **Node.js** (TypeScript)
- **Express.js**
- **MongoDB** (Mongoose)
- **Passport.js** (OAuth strategies)
- **JWT** for authentication
- **Docker** for containerization

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

```sh
git clone https://github.com/your-org/koder-backend.git
cd koder-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/koder
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback
```

### Running Locally

```sh
npm run dev
```

The server will start on [http://localhost:8000](http://localhost:8000).

### Docker

Build and run the app in Docker:

```sh
docker build -t koder-backend .
docker run -p 8000:8000 --env-file .env koder-backend
```

---

## Project Structure

```
.
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── seed.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── passpost.ts
│   ├── controllers/
│   ├── middlware/
│   ├── models/
│   ├── problems/
│   ├── routes/
│   ├── types/
│   └── utils/
├── package.json
├── tsconfig.json
├── Dockerfile
├── .gitignore
└── README.md
```

---

## API Overview

### Auth

- `POST /auth/refresh` — Refresh access token
- `GET /auth/google` — Google OAuth login
- `GET /auth/github` — GitHub OAuth login

### Public

- `POST /run` — Execute code (see [Code Execution](#code-execution))

### User (Protected)

- `GET /api/user/me` — Get own profile
- `POST /api/user/username` — Set username
- `PATCH /api/user/username` — Update username

### Problem (Protected)

- `GET /api/problem/` — List problems (paginated)
- `POST /api/problem/add` — Add a new problem
- `GET /api/problem/:id` — Get problem by ID

### Submission (Protected)

- `POST /api/submission/add` — Submit a solution
- `GET /api/submission/submissions` — List all submissions
- `GET /api/submission/submissions/:id` — Get submission by ID

---

## Code Execution

- Endpoint: `POST /run`
- Body:
  ```json
  {
    "code": "print('Hello, World!')",
    "language": "python"
  }
  ```
- Supported languages: `javascript`, `python`, `cpp`, `c`, `java`
- Returns:
  ```json
  {
    "output": "Hello, World!\n"
  }
  ```

---

## Authentication

- Uses JWT for protected routes (`Authorization: Bearer <token>` or `accessToken` cookie)
- OAuth via Google and GitHub
- Refresh tokens via `/auth/refresh`

---

## Seeding Data

To seed the database with sample users and problems:

```sh
npm run seed
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Docker](https://www.docker.com/)