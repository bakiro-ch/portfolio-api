# API Contract v1.0 - Auth

## General Rules

* Base URL: `/api/v1/auth`
* Routes: `login`
* Format: JSON
* Auth for admin routes: `Authorization: Bearer <token>`
* Content-Type: `application/json`

### Standard Error Codes
* Validation errors: `400 Bad Request`
* Authentication errors: `401 Unauthorized`
* Server errors: `500 Internal Server Error`


---

# Login Resource Shape

```json
{
    "email": "string",
    "password": "string"
}
```

## Validation Rules

* email: required, string, 5-100 chars, unique
* password: required, string, 8-100 chars, not null
* role: default USER, enum(USER, ADMIN)

---

# 1. Login 

## Post /auth/login

### Headers
```http
Content-Type: application/json
```

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

### Success Response (200 OK)

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "bcaaa4e2-759f-4a3d-9f5e-123456789abc",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

### Errors

### 400 Bad Request

```json
{
    "success": false,
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "errors": [
        "email must be at least 5 characters",
        "password must be at least 8 characters"
    ]
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Invalid email or password"
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Something went wrong. Please try again later."
}
```

