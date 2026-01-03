# 📝 Submission API Documentation

## 🌍 Base URL

```
http://localhost:8000
```

---

## 📚 Table of Contents

1. [Add Submission](#1-add-submission)
2. [Get All User Submissions](#2-get-all-user-submissions)
3. [Get All Problem Submissions](#3-get-all-problem-submissions)
4. [Get Submission by ID](#4-get-submission-by-id)

---

## 1. Add Submission

**URL**: `/api/submission/add`
**Method**: `POST`
**Headers**: `Content-Type: application/json`

### Request Body

```json
{
  "problemId": "string",
  "code": "string",
  "language": "string",
  "status": "string (optional)",
  "runtime": "number (optional)",
  "memory": "number (optional)"
}
```

### Success Response

- **Status**: `201 Created`

```json
{
  "success": true,
  "message": "Submission successful",
  "data": "submission_id"
}
```

### Error Responses

- **400 Bad Request** (Missing required fields)
- **401 Unauthorized** (User not logged in)
- **500 Internal Server Error**

---

## 2. Get All User Submissions

**URL**: `/api/submission/all`
**Method**: `GET`
**Query Parameters**: `page` (optional, default: 1)

### Success Response

- **Status**: `200 OK`

```json
{
  "success": true,
  "message": "Got all user submissions",
  "data": {
    "submissions": [
      {
        /* submission objects */
      }
    ],
    "page": 1,
    "totalPages": 5,
    "totalSubmissions": 100
  }
}
```

### Error Responses

- **401 Unauthorized**
- **500 Internal Server Error**

---

## 3. Get All Problem Submissions

**URL**: `/api/submission/problem/:problemId/all`
**Method**: `GET`

### Success Response

- **Status**: `200 OK`

```json
{
  "success": true,
  "message": "Got all problem submission",
  "data": [
    {
      "_id": "submission_id",
      "userId": {
        "fullname": "John Doe",
        "username": "johndoe",
        "email": "johndoe@example.com"
      },
      "problemId": {
        "title": "Sample Problem",
        "difficulty": "Easy"
      },
      "code": "...",
      "language": "javascript",
      "status": "Accepted",
      "runtime": 50,
      "memory": 128,
      "createdAt": "2025-08-21T12:23:07.000Z"
    }
  ]
}
```

### Error Responses

- **401 Unauthorized**
- **500 Internal Server Error**

---

## 4. Get Submission by ID

**URL**: `/api/submission/:id`
**Method**: `GET`

### Success Response

- **Status**: `200 OK`

```json
{
  "success": true,
  "message": "Got The submission",
  "data": {
    "_id": "submission_id",
    "userId": {
      "fullname": "John Doe",
      "username": "johndoe",
      "email": "johndoe@example.com"
    },
    "problemId": {
      "title": "Sample Problem",
      "difficulty": "Easy"
    },
    "code": "...",
    "language": "javascript",
    "status": "Accepted",
    "runtime": 50,
    "memory": 128,
    "createdAt": "2025-08-21T12:23:07.000Z"
  }
}
```

### Error Responses

- **404 Not Found** (Submission not found)
- **500 Internal Server Error**
