# 📰 Article Management API

A RESTful API built with **Django** and **Django REST Framework** for managing articles with full CRUD operations, pagination, and robust validation.

---

## 🚀 How to Run Your Project

### Prerequisites

- Python **3.12+**
- **uv** (modern Python package manager)

### Installation & Setup

1. **Clone and navigate to the project:**

   cd ernest-backend

2. **Create and activate virtual environment:**

   uv sync
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate.ps1

3. **Run migrations:**

   python manage.py migrate

4. **Load sample data (optional):**

   python manage.py load_articles data/data.json

5. **Start development server:**

   python manage.py runserver

👉 API will be available at **[http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)**

---

## 🧪 Testing

## Run all tests

python manage.py test

## Run specific test module

python manage.py test core.tests.test_api

---

## 📡 API Endpoints and Usage

**Base URL:** `http://localhost:8000/api/v1/`

### 📋 Endpoint Overview

| Method | Endpoint                    | Description                     | Notes                              |
| ------ | --------------------------- | ------------------------------- | ---------------------------------- |
| GET    | `/articles/`                | List paginated articles         | Supports filters, search, ordering |
| POST   | `/articles/`                | Create a new article            | Requires JSON body                 |
| GET    | `/articles/{id}/`           | Retrieve a single article       | `{id}` = Article ID                |
| PUT    | `/articles/{id}/`           | Update an article (replace)     | Requires full JSON body            |
| PATCH  | `/articles/{id}/`           | Update an article (partial)     | Only send fields to update         |
| DELETE | `/articles/{id}/`           | Delete (soft delete) an article | Marks `is_active=False`            |
| GET    | `/articles/?author=...`     | Filter by author                | Query parameter                    |
| GET    | `/articles/?date=...`       | Filter by date                  | Query parameter                    |
| GET    | `/articles/?search=...`     | Search articles                 | Full-text search                   |
| GET    | `/articles/?ordering=views` | Order results                   | Use `-views` for descending        |

---

### 1. List/Create Articles

* `GET /articles/` → Retrieve paginated list of articles

- `POST /articles/` → Create a new article

**Example Create Request:**

```bash
curl -X POST http://localhost:8000/api/v1/articles/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Article",
    "author": "John Doe",
    "date": "25 May 2024",
    "description": "Article description",
    "image": "https://example.com/image.jpg",
    "views": 100,
    "likes": 50,
    "comments": 25
  }'
```

---

### 2. Retrieve/Update/Delete Article

- `GET /articles/{id}/` → Retrieve specific article
- `PUT/PATCH /articles/{id}/` → Update article
- `DELETE /articles/{id}/` → Delete article (soft delete)

---

### 3. Filtering and Search

- Filter by author: `/articles/?author=John+Doe`
- Filter by date: `/articles/?date=25+May+2024`
- Search: `/articles/?search=sustainability`
- Order by: `/articles/?ordering=views` (or `-views` for descending)

---

## 📖 Pagination Implementation

The API uses **page-based pagination**:

- Default page size: **10 articles per page**
- Maximum page size: **100 articles per page**
- Page parameter: `?page=2`
- Page size parameter: `?page_size=5`

**Response Format:**

```json
{
  "count": 45,
  "next": "http://localhost:8000/api/v1/articles/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Energy Efficiency ideas...",
      "author": "Faaruq Azeez",
      "...": "..."
    }
  ]
}
```

**Usage Examples:**

- Get first page: `GET /api/v1/articles/`
- Get page 3 with 5 items: `GET /api/v1/articles/?page=3&page_size=5`
- Get next page: follow `"next"` from response

---

## 🎯 Design Choices and Assumptions

### 1. Data Model Choices

- **Soft Delete** → Articles marked `is_active=False` instead of physical deletion
- **String Dates** → `date` stored as `CharField` (preserves exact format from JSON)
- **URL Validation** → `image` field ensures proper URL format
- **Positive Integers** → `views`, `likes`, `comments` must be non-negative

### 2. API Design Choices

- **Field Mapping** → JSON uses `readMore`, model uses `read_more`
- **Default Values** → `readMore` defaults to `"#"` when not provided
- **Error Handling** → Consistent JSON error responses
- **Filtering** → Multiple filters + search supported

### 3. Validation Rules

- **Title** → 5–250 characters
- **Author** → Minimum 2 characters
- **Image** → Must be valid HTTP/HTTPS URL
- **Count Fields** → Must be non-negative integers
- **Business Logic** → Likes cannot exceed views

### 4. Technology Choices

- **Django REST Framework** → Industry standard for APIs
- **uv** → Modern package manager
- **SQLite** → Dev DB (switchable to PostgreSQL in production)
- **PageNumberPagination** → Simple + client-friendly

### 5. Security Considerations

- **CORS Enabled** → Frontend integration ready
- **Input Validation** → Strong validation prevents bad data
- **Error Sanitization** → No sensitive data in error responses

### 6. Assumptions

- Clients prefer page-based pagination
- Articles preserved with **soft delete**
- Dates always provided in proper format
- Image URLs assumed to point to images
- Consumers expect structured error responses

---

## 🛠 Development Notes

- **Virtual environment:** `.venv/` (ignored in `.gitignore`)
- **Database:** SQLite for development → PostgreSQL ready
- **Testing:** Comprehensive test suite (CRUD + validation)
- **Error Responses:** Consistent JSON across all endpoints
