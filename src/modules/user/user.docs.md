# 👤 User API Documentation

## 🌍 Base URL

```
http://localhost:8000
```

---

## 📚 Table of Contents

1. [Add Username](#1-add-username)
2. [Update Username](#2-update-username)
3. [Get Own Profile](#3-get-own-profile)
4. [Update Own Profile](#4-update-own-profile)
5. [Delete Own Account](#5-delete-own-account)
6. [Change Password](#6-change-password)
7. [Add Password (OAuth)](#7-add-password-oauth)
8. [Cookie Details](#8-cookie-details)
9. [Security Notes](#9-security-notes)

---

## 1. Add Username

**URL**: `/api/user/username`
**Method**: `POST`
**Headers**: `Content-Type: application/json`
**Auth Required**: ✅ Yes (Access Token)

### Request Body

```json
{
  "username": "uniqueUser123"
}
```

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Username set successfully",
  "data": {
    "_id": "...",
    "username": "uniqueUser123"
    // other user fields
  }
}
```

### Error Responses

- **400 Bad Request** — Username not provided
- **409 Conflict** — Username already set or taken
- **500 Internal Server Error**

---

## 2. Update Username

**URL**: `/api/user/username`
**Method**: `PATCH`
**Headers**: `Content-Type: application/json`
**Auth Required**: ✅ Yes (Access Token)

### Request Body

```json
{
  "username": "updatedUsername456"
}
```

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Username updated successfully"
}
```

### Error Responses

- **400 Bad Request** — Username not provided
- **409 Conflict** — Username already taken
- **500 Internal Server Error**

---

## 3. Get Own Profile

**URL**: `/api/user/me`
**Method**: `GET`
**Auth Required**: ✅ Yes (Access Token)

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Account Got Successfully",
  "data": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com"
    // other user fields
  }
}
```

### Error Responses

- **401 Unauthorized** — Invalid or missing token
- **404 Not Found** — User not found
- **500 Internal Server Error**

---

## 4. Update Own Profile

**URL**: `/api/user/me`
**Method**: `PATCH`
**Headers**: `Content-Type: application/json`
**Auth Required**: ✅ Yes (Access Token)

### Request Body

```json
{
  "fullName": "Updated Name",
  "profilepicture": "https://example.com/profile.jpg"
}
```

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Account Updated Successfully",
  "data": {
    "_id": "...",
    "fullName": "Updated Name",
    "profilepicture": "https://example.com/profile.jpg"
  }
}
```

### Error Responses

- **400 Bad Request** — No fields provided
- **401 Unauthorized** — Invalid or missing token
- **404 Not Found** — User not found
- **500 Internal Server Error**

---

## 5. Delete Own Account

**URL**: `/api/user/me`
**Method**: `DELETE`
**Auth Required**: ✅ Yes (Access Token)

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Account permanently deleted"
}
```

### Error Responses

- **401 Unauthorized** — Invalid or missing token
- **404 Not Found** — User not found
- **500 Internal Server Error**

---

## 6. Change Password

**URL**: `/api/user/change-password`
**Method**: `POST`
**Headers**: `Content-Type: application/json`
**Auth Required**: ✅ Yes (Access Token)

### Request Body

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Password changed successfully"
}
```

### Error Responses

- **400 Bad Request** — Missing fields
- **401 Unauthorized** — Invalid token or incorrect current password
- **404 Not Found** — User not found
- **500 Internal Server Error**

---

## 7. Add Password (OAuth)

**URL**: `/api/user/add-password`
**Method**: `POST`
**Headers**: `Content-Type: application/json`
**Auth Required**: ✅ Yes (Access Token)

### Request Body

```json
{
  "newPassword": "securePassword123"
}
```

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Password added successfully"
}
```

### Error Responses

- **400 Bad Request** — Invalid or weak password
- **401 Unauthorized** — Invalid or missing token
- **404 Not Found** — User not found
- **409 Conflict** — Password already set
- **500 Internal Server Error**

---

## 8. Cookie Details

- **accessToken**: HTTP-only, Secure, SameSite=Strict, Expires in 15 minutes
- **refreshToken**: HTTP-only, Secure, SameSite=Strict, Expires in 7 days

---

## 9. Security Notes

- All sensitive routes require authentication via `accessToken`
- Passwords are hashed using `bcrypt`
- CSRF, rate limiting, and input validation are recommended for production

---
