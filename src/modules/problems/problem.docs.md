# 📝 Problems API Documentation

## 🌍 Base URL

```
http://localhost:8000
```

---

## 📚 Table of Contents

1. [Get All Problems](#1-get-all-problems)
2. [Add a New Problem](#2-add-a-new-problem)
3. [Get Problem by ID](#3-get-problem-by-id)

---

## 1. Get All Problems

**URL**: `/api/problems`
**Method**: `GET`

### Query Parameters

| Parameter | Type              | Description                             |
| --------- | ----------------- | --------------------------------------- |
| page      | number (optional) | Page number for pagination (default: 1) |

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Problems fetched successfully",
  "data": [
    {
      "_id": "123",
      "title": "Sample Problem",
      "description": "Problem description",
      "testCases": [ ... ]
    }
  ],
  "currentPage": 1,
  "totalPages": 5
}
```

### Error Response

- **Status**: `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## 2. Add a New Problem

**URL**: `/api/problems`
**Method**: `POST`
**Headers**: `Content-Type: application/json`

### Request Body

```json
{
  "title": "New Problem",
  "description": "Problem description",
  "testCases": [{ "input": "1", "output": "2" }]
}
```

### Success Response

- **Status**: `201 Created`

```json
{
  "message": "Problem created successfully",
  "id": "123"
}
```

### Error Responses

- **400 Bad Request** (Missing required fields)

```json
{
  "message": "All fields are required"
}
```

- **500 Internal Server Error**

```json
{
  "message": "Internal server error"
}
```

---

## 3. Get Problem by ID

**URL**: `/api/problems/:id`
**Method**: `GET`

### URL Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | Problem ID  |

### Success Response

- **Status**: `200 OK`

```json
{
  "message": "Problem fetched successfully",
  "data": {
    "_id": "123",
    "title": "Sample Problem",
    "description": "Problem description",
    "testCases": [ ... ]
  }
}
```

### Error Responses

- **404 Not Found**

```json
{
  "message": "Problem not found"
}
```

- **500 Internal Server Error**

```json
{
  "message": "Internal server error"
}
```
