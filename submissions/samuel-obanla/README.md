# 📚 Samuel-Obanla Backend Starter Task — API Documentation

This documentation provides setup instructions, authentication details, and a **comprehensive guide** to using every available API endpoint under `/api/v1`.

---

## 🚀 Prerequisites

* **Node.js** v18+
* **MongoDB** (local or hosted instance)

---

## ⚙️ Installation & Setup

1. Navigate into the project folder:

   ```bash
   cd submissions/samuel-obanla
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   CONNECTION_STRING=mongodb://localhost:27017/kodnerds
   TEST_STRING=mongodb://localhost:27017/kodnerds_test
   ACCESS_TOKEN_SECRET=your_jwt_secret
   PORT=5000
   ```

   * **CONNECTION\_STRING** → MongoDB connection for the app
   * **TEST\_STRING** → MongoDB connection for test database
   * **ACCESS\_TOKEN\_SECRET** → Secret key for signing JWT tokens
   * **PORT** → Port to run the server (default: 5000)

---

## ▶️ Running the App

* Development mode:

  ```bash
  npm run dev
  ```

* Production mode:

  ```bash
  npm start
  ```

The server runs on:

```
http://localhost:5000
```

---

## 🧪 Running Tests

Run the full Jest + Supertest suite:

```bash
npm test
```

⚠️ **Note:** Tests connect to `TEST_STRING` database and clear `users` & `books` collections after execution. Use a **dedicated test DB**.

---

## 🔐 Authentication

* Authentication uses **JWT (Bearer Tokens)**.
* Obtain a token via:

  ```http
  POST /api/v1/user/login
  ```
* For protected routes, include header:

  ```
  Authorization: Bearer <token>
  ```

---

## 📘 API Reference

Base URL:

```
/api/v1
```

---

### 👤 Users

#### **Register User**

`POST /api/v1/user/register`

* **Body:**

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "09012345678",
    "password": "Password.1234"
  }
  ```

* **Responses:**

  * ✅ 200 — User registered
  * ❌ 400 — Validation or duplicate error

---

#### **Login User**

`POST /api/v1/user/login`

* **Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "Password.1234"
  }
  ```

* **Responses:**

  * ✅ 200 — Returns JWT token
  * ❌ 400/404 — Invalid credentials

---

#### **Get User by ID**

`GET /api/v1/user/:id`

* **Responses:**

  * ✅ 200 — User object (password excluded)
  * ❌ 404 — User not found

---

### 📚 Books

#### **List Books**

`GET /api/v1/books?page=1&limit=10`

* **Query Params:**

  * `page` → required
  * `limit` → optional (default: 10)

* **Response Example:**

  ```json
  {
    "success": true,
    "data": {
      "page": 1,
      "totalPages": 1,
      "totalBooks": 1,
      "books": [
        { "_id": "...", "title": "Book Title", "author": { "firstName": "John" } }
      ]
    }
  }
  ```

---

#### **Get Book by ID**

`GET /api/v1/books/:id`

* ✅ 200 — Returns book details
* ❌ 404 — Not found

---

#### **Create Book** (🔒 Protected)

`POST /api/v1/books/create`

* **Headers:**

  ```
  Authorization: Bearer <token>
  ```

* **Body:**

  ```json
  {
    "title": "Test book",
    "description": "Test book description",
    "readMore": "https://example.com",
    "image": "https://img.example.com/cover.png"
  }
  ```

* **Responses:**

  * ✅ 200 — Book created
  * ❌ 400 — Validation error
  * ❌ 401 — Unauthorized

---

#### **Update Book** (🔒 Protected)

`PUT /api/v1/books/update/:id`

* **Body (optional fields):**

  ```json
  {
    "title": "Updated Title",
    "description": "Updated description"
  }
  ```

* **Responses:**

  * ✅ 200 — Updated successfully
  * ❌ 404 — Not found / Unauthorized

---

#### **Like/Unlike Book** (🔒 Protected)

`PUT /api/v1/books/like/:id`

* ✅ 200 — Toggles like/unlike
* ❌ 404 — Book not found

---

#### **Comment on Book** (🔒 Protected)

`PUT /api/v1/books/comment/:id`

* **Body:**

  ```json
  { "comment": "Great book!" }
  ```

* **Responses:**

  * ✅ 200 — Comment added
  * ❌ 404 — Book not found

---

#### **Increase Book View** (🔒 Protected)

`PUT /api/v1/books/view/:id`

* ✅ 200 — View count incremented
* ❌ 404 — Not found

---

#### **Delete Book** (🔒 Protected)

`DELETE /api/v1/books/delete/:id`

* ✅ 200 — Deleted successfully
* ❌ 404 — Not found / Unauthorized

---

## ⚠️ Error Format

All errors return a consistent structure:

```json
{
  "status": <code>,
  "message": "<error message>"
}
```

Validation errors include detailed field-level feedback.

---

## 🛠 Example cURL Usage

```bash
# Register
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phoneNumber":"09012345678","password":"Password.1234"}'

# Login
curl -X POST http://localhost:5000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password.1234"}'

# Create a Book
curl -X POST http://localhost:5000/api/v1/books/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test book","description":"Test book description","readMore":"https://example.com","image":"https://img.example.com/cover.png"}'
```

---

✅ With this guide, you can quickly **set up, test, and consume every endpoint** in the Samuel-Obanla backend starter task project.
