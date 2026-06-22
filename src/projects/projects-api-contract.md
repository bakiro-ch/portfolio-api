# 📡 API Contract v1.1 — Projects

## General Rules

* Base URL: `/api/v1`
* Routes: `projects`, `admin/projects`
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

**Note:** `imagePublicId` is stored internally for Cloudinary operations but is NOT exposed in the API response.

---

## Validation Rules

* title: required, string, 3–100 chars
* slug: generated automatically from title, unique, lowercase, kebab-case
* description: optional, max 2000 chars
* status: required, `draft | published`
* isFeatured: optional, boolean, default false
* imageUrl: optional, valid URL (managed via image endpoints only)
* demoLink: required, valid URL
* githubLink: optional, valid URL
* technologies: optional, array of strings, max 20 items
* technology item: 2–50 chars
* setupGuide: optional, markdown string, max 10000 chars

---

## Errors Template

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

---

## Success Template

### Single Resource

```json
{
  "success": true,
  "data": {}
}
```

### Collection Resource

```json
{
  "success": true,
  "data": [],
  "meta": {}
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
  "demoLink": "https://example.com/demo",
  "githubLink": "https://github.com/user/repo",
  "technologies": ["NestJS", "PostgreSQL"],
  "setupGuide": "# Setup\n\nnpm install\nnpm run start:dev"
}
```

### Important Notes

* `imageUrl` will always be `null` after creation
* Image must be uploaded separately using `POST /admin/projects/:id/image`

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
    "imageUrl": null,
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
      "status": "published",
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

### Errors

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

# 3. Get All Projects (for Admin)

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

# 5. Get One Project (for Admin)

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

---

# 6. Update Project

## PATCH /admin/projects/:id

### Important Notes

* Cannot update `imageUrl` directly (use `PATCH /admin/projects/:id/image` instead)
* Updating title will regenerate slug automatically

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

### Important Notes

* This will also delete the associated image from Cloudinary (if exists)
* This operation is irreversible

### Headers

```http
Authorization: Bearer <token>
```

### Success Response

`204 No Content`

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

---

# 8. Upload Image

## POST /admin/projects/:id/image

### Important Notes

* Project must exist before uploading image
* If project already has an image, returns 409 Conflict (use PATCH to update instead)
* Allowed formats: jpg, jpeg, png, webp
* Max size: 5MB

### Headers

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Request Body

**Field name:** `image`  
**Type:** File

### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "imageUrl": "https://cdn.example.com/projects/project-image.png"
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
    "File must be an image",
    "File size must not exceed 5MB"
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
  "message": "Project already has an image. Use PATCH to update."
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

# 9. Delete Image

## DELETE /admin/projects/:id/image

### Important Notes

* If project has no image, returns 204 No Content (idempotent)
* This does NOT delete the project, only the image
* Image is deleted from Cloudinary and imageUrl is set to null

### Headers

```http
Authorization: Bearer <token>
```

### Success Response

`204 No Content`

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

---

# 10. Update Image

## PUT /admin/projects/:id/image

### Important Notes

* If project has no image, this will upload a new image (same behavior as POST)
* If project has an image, this will delete the old image from Cloudinary and upload the new one
* Allowed formats: jpg, jpeg, png, webp
* Max size: 5MB

### Headers

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Request Body

**Field name:** `image`  
**Type:** File

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/image.png"
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
    "File must be an image",
    "File size must not exceed 5MB"
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

## 📝 Summary of Endpoints

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/admin/projects` | Admin | Create a new project |
| 2 | GET | `/projects` | Public | Get all published projects |
| 3 | GET | `/admin/projects` | Admin | Get all projects (with filters) |
| 4 | GET | `/projects/:slug` | Public | Get one project by slug |
| 5 | GET | `/admin/projects/:id` | Admin | Get one project by ID |
| 6 | PATCH | `/admin/projects/:id` | Admin | Update project data |
| 7 | DELETE | `/admin/projects/:id` | Admin | Delete project (and its image) |
| 8 | POST | `/admin/projects/:id/image` | Admin | Upload project image |
| 9 | DELETE | `/admin/projects/:id/image` | Admin | Delete project image |
| 10 | PUT | `/admin/projects/:id/image` | Admin | Update project image |
