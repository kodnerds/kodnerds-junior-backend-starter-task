# Abdulhakeem Sulaiman – Backend Submission (Django + DRF)

This project implements a RESTful API in Django REST Framework to manage a dataset of articles/posts. It supports full CRUD, pagination, filtering, searching, ordering, and includes a data seeding command and basic tests.

## Stack
- Python 3.x
- Django 5.x
- Django REST Framework (DRF)
- django-filter
- pytest + pytest-django (tests)

## Project Layout
```
submissions/Abdulhakeem-Sulaiman/
├── blog_api/                # Django project
├── articles/                # App with models, serializers, views, urls
├── data/clean_data.json     # Cleaned dataset used for seeding
├── manage.py
├── requirements.txt
├── pytest.ini
└── README.md
```

## How to Run (Windows PowerShell)
1) Create and activate a virtualenv, then install deps:
```
python -m venv venv
./venv/Scripts/Activate.ps1
pip install -r requirements.txt
```

2) Apply migrations:
```
python manage.py migrate
```

3) Load seed data (optional):
```
python manage.py load_data --file data/clean_data.json
```

4) Start server:
```
python manage.py runserver
```

Server runs at: http://127.0.0.1:8000/

 To drop seed data (optional):
```
python manage.py drop_data
```

## Endpoints
Base path: `/api/`

- `GET /api/articles/` – List (paginated)
  - Query params:
    - `limit`: number of items to return (e.g., 5)
    - `offset`: number of items to skip (e.g., 10)
    - `search`: free-text search on title, description, author
    - `ordering`: e.g., `ordering=date` or `ordering=-views`
    - `author`: filter by author
    - `date`: filter by date (`YYYY-MM-DD`)
- `POST /api/articles/` – Create
- `GET /api/articles/{id}/` – Retrieve
- `PUT /api/articles/{id}/` – Update
- `PATCH /api/articles/{id}/` – Partial update
- `DELETE /api/articles/{id}/` – Delete

### Sample request (create)
```
POST /api/articles/
Content-Type: application/json
{
  "author": "Tester",
  "date": "23 May, 2024",
  "title": "New",
  "description": "More desc",
  "image": "https://example.com/img2.png",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "readMore": "https://example.com/read"
}
```

### Sample response (list)
```
200 OK
{
  "count": 12,
  "next": "http://127.0.0.1:8000/api/articles/?limit=5&offset=5",
  "previous": null,
  "results": [
    {"id": 1, "author": "...", "date": "2024-05-23", "title": "...", ...}
  ]
}
```
### sample get response

![getresponse](https://github.com/kodnerds/kodnerds-junior-backend-starter-task/submissions/blob/Abdulhakeem-backend/example_testing.png)

## Pagination
This project uses limit/offset pagination via DRF `LimitOffsetPagination`.
- Example: `/api/articles/?limit=5&offset=10`
- Response includes: `count`, `next`, `previous`, and `results`.

## Validation & Error Handling
- Non-negative validation for `views`, `likes`, `comments`.
- Dates accept `"23 May, 2024"` or ISO format; stored as DateField.
- URL fields validated by DRF.
- DRF returns consistent JSON errors for invalid payloads or 404s.

## Testing
Run tests:
```
pytest
```
Tests include:
- Pagination on list endpoint.
- Successful create endpoint.


## AI Usage
- AI assistance was used to scaffold the Django/DRF boilerplate, seed command, and tests.


