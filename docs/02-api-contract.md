# 📡 API Contract v1.0 — Projects

## General Rules

* Base URL: `/api/v1`
* Format: JSON
* Auth for admin routes: `Authorization: Bearer <token>`
* Validation errors: `400`
* Not found: `404`
* Unauthorized: `401`
* Forbidden: `403`
* Conflict: `409`
* Server error: `500`

---

## Slug Rules

* slug is generated automatically from title.
* slug must be unique.
* when title changes, slug is regenerated automatically.
* if generated slug already exists, the system appends a unique suffix.

---

# Project Resource Shape

```json
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  "description": "string | null",
  "status": "draft | published",
  "isFeatured": false,
  "imageUrl": "string | null",
  "demoLink": "string",
  "githubLink": "string | null",
  "technologies": ["NestJS", "PostgreSQL"],
  "setupGuide": "string | null",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## Validation Rules

* title: required, string, 3–100 chars
* slug: generated automatically from title, unique, lowercase, kebab-case
* description: optional, max 2000 chars
* status: required, `draft | published`
* isFeatured: optional, boolean, default false
* imageUrl: optional, valid URL
* demoLink: required, valid URL
* githubLink: optional, valid URL
* technologies: optional, array of strings, max 20 items
* technology item: 2–50 chars
* setupGuide: optional, markdown string, max 10000 chars

## Errors Template

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    "title must be at least 3 characters"
  ]  //Only when body exist
}
```

## Success Template

```json
{
    "success": true,
    "data": [] //OR "data": [{},{}], if GET All
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 84,
      "totalPages": 9
    } //Only when GET all
}
```

---

# 1. Create Project

## POST /admin/projects

### Headers

```http
Content-Type: application/json
Authorization: Bearer <token>
```

### Request Body

```json
{
  "title": "My Portfolio Project",
  "description": "A clean portfolio project.",
  "status": "draft",
  "isFeatured": false,
  "imageUrl": "https://example.com/image.png",
  "demoLink": "https://example.com/demo",
  "githubLink": "https://github.com/user/repo",
  "technologies": ["NestJS", "PostgreSQL"],
  "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev"
}
```

### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My Portfolio Project",
    "slug": "my-portfolio-project",
    "description": "A clean portfolio project.",
    "status": "draft",
    "isFeatured": false,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["NestJS", "PostgreSQL"],
    "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

### Errors

#### 400 Bad Request

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    "title must be at least 3 characters"
  ]
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Unauthorized"
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "statusCode": 403,
  "error": "Forbidden",
  "message": "Forbidden"
}
```

#### 409 Conflict

```json
{
  "success": false,
  "statusCode": 409,
  "error": "Conflict",
  "message": "Project slug already exists"
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

---

# 2. Get All Projects

## GET /projects

### Auth

Public

### Query Params

| Parameter    | Description                 |
| ------------ | --------------------------- |
| page         | default 1                   |
| limit        | default 10, max 50          |
| sortBy       | createdAt, updatedAt, title |
| order        | asc, desc                   |
| search       | string                      |
| technologies | comma separated list        |

* Logic: Returns projects matching ANY of the provided technologies (OR logic).

* Search is consider the title only

* Status Have to be always : 'published' here in public case

### Example

```http
GET /api/projects?page=1&limit=10&sortBy=createdAt&order=desc&search=portfolio&technologies=nestjs,postgres
```

### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
    "id": "uuid",
    "title": "My Portfolio Project",
    "slug": "my-portfolio-project",
    "description": "A clean portfolio project.",
    "status": "draft",
    "isFeatured": false,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["NestJS", "PostgreSQL"],
    "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  },
  {
    "id": "uuid2",
    "title": "Your Portfolio Project",
    "slug": "your-portfolio-project",
    "description": "A clean portfolio project.",
    "status": "published",
    "isFeatured": true,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["ReactJS", "TailwindCss"],
    "setupGuide": "# Setup\n\nnpm install\nnpm run dev",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 84,
    "totalPages": 9
  }
}
```


### Success Response (200 OK) - Empty Result

```json
{
    "success": true,
    "data": [],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 0,
        "totalPages": 0
    }
}
```


### Error 500

```json
{
  "success": false,
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Something went wrong. Please try again later."
}
```

---

# 3. Get All Project (for Admin)

## GET /admin/projects

### Auth

Admin

### Headers

```http
Authorization: Bearer <token>
```

### Query Params

| Parameter    | Description                 |
| ------------ | --------------------------- |
| page         | default 1                   |
| limit        | default 10, max 50          |
| sortBy       | createdAt, updatedAt, title |
| order        | asc, desc                   |
| search       | string                      |
| status       | draft, published            |
| technologies | comma separated list        |

### Success Response (200 OK)

```json
{
    "success": true,
    "data": [
        {
            "id": "uuid",
            "title": "My Portfolio Project",
            "slug": "my-portfolio-project",
            "description": "A clean portfolio project.",
            "status": "draft",
            "isFeatured": false,
            "imageUrl": "https://example.com/image.png",
            "demoLink": "https://example.com/demo",
            "githubLink": "https://github.com/user/repo",
            "technologies": ["NestJS", "PostgreSQL"],
            "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev",
            "createdAt": "2026-05-31T12:00:00.000Z",
            "updatedAt": "2026-05-31T12:00:00.000Z"
        },
        {
            "id": "uuid2",
            "title": "Your Portfolio Project",
            "slug": "your-portfolio-project",
            "description": "A clean portfolio project.",
            "status": "published",
            "isFeatured": true,
            "imageUrl": "https://example.com/image.png",
            "demoLink": "https://example.com/demo",
            "githubLink": "https://github.com/user/repo",
            "technologies": ["ReactJS", "TailwindCss"],
            "setupGuide": "# Setup\n\nnpm install\nnpm run dev",
            "createdAt": "2026-05-31T12:00:00.000Z",
            "updatedAt": "2026-05-31T12:00:00.000Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 84,
        "totalPages": 9
    }

}
```

### Success Response (200 OK) - Empty Result

```json
{
    "success": true,
    "data": [],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 0,
        "totalPages": 0
    }
}
```

### Error 401

```json
{
    "success": false,
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Unauthorized"
}
```

### Error 403

```json
{
    "success": false,
    "statusCode": 403,
    "error": "Forbidden",
    "message": "Forbidden"
}
```

### Error 500

```json
{
  "success": false,
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Something went wrong. Please try again later."
}
```


# 4. Get One Project

## GET /projects/:slug

### Auth

Public

### Path Params

* slug (required)


### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My Portfolio Project",
    "slug": "my-portfolio-project",
    "description": "A clean portfolio project.",
    "status": "published",
    "isFeatured": true,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["NestJS", "PostgreSQL"],
    "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

### Errors

#### 404 Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Project not found"
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

---

# 5. Get One Project (for admin)

## GET /admin/projects/:id

### Auth

Admin

### Headers

```http
Authorization: Bearer <token>
```

### Path Params

* id (required)


### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My Portfolio Project",
    "slug": "my-portfolio-project",
    "description": "A clean portfolio project.",
    "status": "published",
    "isFeatured": true,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["NestJS", "PostgreSQL"],
    "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

### Errors

#### 404 Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Project not found"
}
```


### Error 401

```json
{
    "success": false,
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Unauthorized"
}
```

### Error 403

```json
{
    "success": false,
    "statusCode": 403,
    "error": "Forbidden",
    "message": "Forbidden"
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

---

# 6. Update Project

## PATCH /admin/projects/:id

Note:
Updating title may change the project's slug.

### Headers

```http
Content-Type: application/json
Authorization: Bearer <token>
```

### Request Body

All fields optional.

```json
{
  "title": "Updated Project",
  "description": "Updated description",
  "status": "published",
  "isFeatured": true,
  "imageUrl": "https://example.com/image.png",
  "demoLink": "https://example.com/demo",
  "githubLink": "https://github.com/user/repo",
  "technologies": ["NestJS", "Prisma"],
  "setupGuide": "Updated markdown guide"
}
```

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Updated Project",
    "slug": "updated-project",
    "description": "Updated description",
    "status": "published",
    "isFeatured": true,
    "imageUrl": "https://example.com/image.png",
    "demoLink": "https://example.com/demo",
    "githubLink": "https://github.com/user/repo",
    "technologies": ["NestJS", "Prisma"],
    "setupGuide": "Updated markdown guide",
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:10:00.000Z"
  }
}
```

### Errors

#### 400 Bad Request

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed"
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Unauthorized"
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "statusCode": 403,
  "error": "Forbidden",
  "message": "Forbidden"
}
```

#### 404 Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Project not found"
}
```

#### 409 Conflict

```json
{
  "success": false,
  "statusCode": 409,
  "error": "Conflict",
  "message": "Project slug already exists"
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

---

# 7. Delete Project

## DELETE /admin/projects/:id

### Headers

```http
Authorization: Bearer <token>
```

### Success Response

```http
204 No Content
```

### Errors

#### 401 Unauthorized

```json
{
  "success": false,
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Unauthorized"
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "statusCode": 403,
  "error": "Forbidden",
  "message": "Forbidden"
}
```

#### 404 Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Project not found"
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

