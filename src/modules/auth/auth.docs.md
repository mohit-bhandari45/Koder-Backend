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
7. [Resend OTP](#7-resend-otp)
8. [Forgot Password](#8-forgot-password)
9. [Verify Reset OTP](#9-verify-reset-otp)
10. [Reset Password](#10-reset-password)
11. [Logout](#11-logout)
12. [Cookie Details](#12--cookie-details)
13. [Security Notes](#13--security-notes)

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

- **Status**: `201 Created`
- **Cookies**: `accessToken`, `refreshToken`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": "user_id"
}
```

### Error Responses

- **400 Bad Request** (User already exists)
- **500 Internal Server Error**

---

## 2. Login

**URL**: `/auth/login`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "yourStrongPassword123"
}
```

### Success Response

- **Status**: `200 OK`
- **Cookies**: `accessToken`, `refreshToken`

```json
{
  "success": true,
  "message": "Login successful",
  "data": "user_id"
}
```

---

## 3. Refresh Access Token

**URL**: `/auth/refresh`
**Method**: `POST`
**Cookies Required**: `refreshToken`

### Success Response

```json
{
  "message": "Access token refreshed"
}
```

### Error Responses

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

### Step 1: Start Auth Flow

**URL**: `/auth/google`
**Method**: `GET`

### Step 2: Callback

**URL**: `/auth/google/callback`
**Method**: `GET`

#### Success:

- Sets `accessToken`, `refreshToken` cookies
- Redirects to:
  - `/u/:username` if user has username
  - `/auth/username` otherwise

#### Failure:

```json
{
  "msg": "Google authentication failed"
}
```

---

## 5. GitHub OAuth

### Step 1: Start Auth Flow

**URL**: `/auth/github`
**Method**: `GET`

### Step 2: Callback

**URL**: `/auth/github/callback`
**Method**: `GET`

#### Success:

- Sets `accessToken`, `refreshToken` cookies
- Redirects to:
  - `/u/:username` if user has username
  - `/auth/username` otherwise

#### Failure:

```json
{
  "msg": "Github authentication failed"
}
```

---

## 6. Verify Email via OTP

**URL**: `/auth/verify-email`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "code": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

```json
{
  "success": false,
  "message": "OTP expired"
}
```

---

## 7. Resend OTP

**URL**: `/auth/resend-otp`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "type": "verify"
}
```

### Success Response

```json
{
  "success": true,
  "message": "OTP resent successfully"
}
```

---

## 8. Forgot Password

**URL**: `/auth/forgot-password`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com"
}
```

### Success Response

```json
{
  "success": true,
  "message": "OTP sent to your email for password reset"
}
```

---

## 9. Verify Reset OTP

**URL**: `/auth/verify-reset-otp`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "code": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "OTP verified. You may now reset your password."
}
```

---

## 10. Reset Password

**URL**: `/auth/reset-password`
**Method**: `POST`

### Request Body

```json
{
  "email": "johndoe@example.com",
  "newPassword": "newSecurePassword123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

---

## 11. Logout

**URL**: `/auth/logout`
**Method**: `POST`

### Success Response

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 12. 🍪 Cookie Details

| Cookie       | Description            | Expiry     | HttpOnly | Secure (prod) | SameSite |
| ------------ | ---------------------- | ---------- | -------- | ------------- | -------- |
| accessToken  | Short-lived access JWT | 15 minutes | ✅       | ✅            | `lax`    |
| refreshToken | Long-lived refresh JWT | 7 days     | ✅       | ✅            | `lax`    |

---

## 13. 🔒 Security Notes

- All cookies are set with `HttpOnly`, `Secure` (in production), and `SameSite=lax`.
- All endpoints validate inputs and return structured error messages.
- Passwords are hashed using bcrypt before storage.
- OTPs are valid for 10 minutes and are deleted after use or expiry.
- Email verification and reset password flows both require OTP confirmation.
- Always use HTTPS in production.
