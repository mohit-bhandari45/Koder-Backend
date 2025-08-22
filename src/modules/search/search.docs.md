# 📝 Search API Documentation

## 🌍 Base URL

```
http://localhost:8000
```

---

## 📚 Table of Contents

1. [Search Problems](#1-search-problems)

---

## 1. Search Problems

**URL**: `/api/search`
**Method**: `GET`

### Query Parameters

| Parameter | Type              | Description                              |
| --------- | ----------------- | ---------------------------------------- |
| q         | string (required) | Search query                             |
| page      | number (optional) | Page number for pagination (default: 1)  |
| limit     | number (optional) | Number of results per page (default: 30) |

### Success Response

* **Status**: `200 OK`

```json
{
  "message": "Got All Problems",
  "data": {
    "query": "binary search",
    "currentPage": 1,
    "totalPages": 3,
    "totalResults": 75,
    "results": [
      {
        "_id": "123",
        "title": "Binary Search",
        "difficulty": "Medium"
      }
    ]
  }
}
```

### Error Responses

* **400 Bad Request** (Missing query parameter)

```json
{
  "message": "Query parameter 'q' is required"
}
```

* **500 Internal Server Error**

```json
{
  "message": "Internal Server Error"
}
```
