# 🔐 Authentication API Documentation

## 🌍 Base URL

```
http://localhost:8000
```

---

## 📚 Table of Contents

1. [Signup](#1-signup)
2. [Login](#2-login)
3. [Refresh Access Token](#3-refresh-access-token)
4. [Google OAuth](#4-google-oauth)
5. [GitHub OAuth](#5-github-oauth)
6. [Verify Email via OTP](#6-verify-email-via-otp)
7. [Cookie Details](#7-cookie-details)
8. [Security Notes](#8-security-notes)

---

## 1. Signup

**URL**: `/auth/signup`
**Method**: `POST`
**Headers**: `Content-Type: application/json`

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourStrongPassword123"
}
```

### Success Response

* **Status**: `201 Created`
* **Cookies**: `accessToken`, `refreshToken`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": "user_id"
}
```

### Error Responses

* **400 Bad Request** (User already exists)
* **500 Internal Server Error**

```json
{
  "success": false,
  "message": "User already exists!"
}
```

---

## 2. Login

**URL**: `/auth/login`
**Method**: `POST`
**Headers**: `Content-Type: application/json`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "yourStrongPassword123"
}
```

### Success Response

* **Status**: `200 OK`
* **Cookies**: `accessToken`, `refreshToken`

```json
{
  "success": true,
  "message": "Login successful",
  "data": "user_id"
}
```

### Error Response

* **400 Bad Request**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 3. Refresh Access Token

**URL**: `/auth/refresh`
**Method**: `POST`
**Cookies Required**: `refreshToken`

### Success Response

* **Status**: `200 OK`

```json
{
  "message": "Access token refreshed"
}
```

### Error Responses

* **401 Unauthorized**

```json
{
  "message": "No refresh token provided"
}
```

```json
{
  "message": "Invalid refresh token"
}
```

---

## 4. Google OAuth

### 🔹 Step 1: Start Auth Flow

**URL**: `/auth/google`
**Method**: `GET`
**Redirects to**: Google Consent Screen

### 🔹 Step 2: Callback

**URL**: `/auth/google/callback`
**Method**: `GET`

#### Success

* Sets `accessToken`, `refreshToken` cookies
* Redirects:

  * If user has username: `http://localhost:3000/u/:username`
  * Else: `http://localhost:3000/auth/username`

#### Failure

**URL**: `/google/failure`

```json
{
  "msg": "Google authentication failed"
}
```

---

## 5. GitHub OAuth

### 🔹 Step 1: Start Auth Flow

**URL**: `/auth/github`
**Method**: `GET`
**Redirects to**: GitHub Login

### 🔹 Step 2: Callback

**URL**: `/auth/github/callback`
**Method**: `GET`

#### Success

* Sets `accessToken`, `refreshToken` cookies
* Redirects:

  * If user has username: `http://localhost:3000/u/:username`
  * Else: `http://localhost:3000/auth/username`

#### Failure

**URL**: `/github/failure`

```json
{
  "msg": "Github authentication failed"
}
```

---

## 6. Verify Email via OTP

**URL**: `/auth/verify`
**Method**: `POST`
**Headers**: `Content-Type: application/json`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "code": "123456"
}
```

### Success Response

* **Status**: `200 OK`

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Error Response

* **Status**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

## 7. 🍪 Cookie Details

| Cookie       | Description            | Expiry     | HttpOnly | Secure (prod) | SameSite |
| ------------ | ---------------------- | ---------- | -------- | ------------- | -------- |
| accessToken  | Short-lived access JWT | 15 minutes | ✅        | ✅             | `lax`    |
| refreshToken | Long-lived refresh JWT | 7 days     | ✅        | ✅             | `lax`    |

---

## 8. 🔒 Security Notes

* All cookies are set with `HttpOnly`, `Secure` (in production), and `SameSite=lax`.
* Always use HTTPS in production.
* User input is validated in service/controller layer.
