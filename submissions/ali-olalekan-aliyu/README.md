
# Kodnerds Task 1 – RESTful API with Pagination

This project is a RESTful API built with **Node.js, Express, and MongoDB (Mongoose)**.  
It allows you to create, read, update, and delete posts, with support for **pagination**.

---

## 🚀 Features
- Create new posts
- Retrieve all posts with **pagination** (`page`, `limit`, `offset`)
- Retrieve a single post (by `id`)
- Update a post
- Delete a post
- Automatic timestamps (`createdAt`, `updatedAt`)
- Proper error handling and validation

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB

Update the connection string in **index.js**:

```js
mongoose.connect("your-mongodb-uri-here")
```

Example using MongoDB Atlas:

```txt
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 4. Start the server

```bash
npm start
```

or if you’re using `nodemon`:

```bash
npm run dev
```

Server will run at:
👉 `http://localhost:3000`

---

## 📌 API Endpoints

* **Create a Post**

  ```http
  POST /api/posts
  ```

* **Get All Posts (with Pagination)**

  ```http
  GET /api/posts?page=1&limit=5
  ```

* **Get Single Post**

  ```http
  GET /api/posts/:id
  ```

* **Update a Post**

  ```http
  PUT /api/posts/:id
  ```

* **Delete a Post**

  ```http
  DELETE /api/posts/:id
  ```

---

## 🧪 Example Request (Manual Test with Postman)

### 1. Create a Post
- Open **Postman**
- Select **POST** method
- Enter URL:  [http://localhost:3000/api/posts](http://localhost:3000/api/posts)

- Go to the **Body** tab → Select **raw** → Choose **JSON**
- Paste this sample JSON:

```json
{
  "author": "Faaruq Azeez",
  "title": "Energy Efficiency ideas to improve business sustainability",
  "description": "Energy Efficiency with Business Sustainability for substantial savings.",
  "image": "https://via.placeholder.com/300x200",
  "views": 20,
  "likes": 20,
  "comments": 20,
  "readMore": "#"
}
````

* Click **Send**

✅ Example Response:

```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "64b160ba99a1d5857acc08a9",
    "author": "Faaruq Azeez",
    "title": "Energy Efficiency ideas to improve business sustainability",
    "description": "Energy Efficiency with Business Sustainability for substantial savings.",
    "image": "https://via.placeholder.com/300x200",
    "views": 20,
    "likes": 20,
    "comments": 20,
    "readMore": "#",
    "createdAt": "2025-08-29T07:42:10.123Z",
    "updatedAt": "2025-08-29T07:42:10.123Z",
    "__v": 0
  }
}
```

---

### 2. Get All Posts (with Pagination)

* Method: **GET**
* URL:

  ```
  http://localhost:3000/api/posts?page=1&limit=4
  ```
* Click **Send**

✅ Example Response:

```json
{
  "message": "Posts retrieved successfully",
  "pagination": {
    "totalPosts": 5,
    "currentPage": 1,
    "totalPages": 1,
    "limit": 5,
    "offset": 0
  },
  "posts": [
    {
      "_id": "64b160ba99a1d5857acc08a9",
      "author": "Faaruq Azeez",
      "title": "Energy Efficiency ideas to improve business sustainability",
      "description": "Energy Efficiency with Business Sustainability for substantial savings.",
      "image": "https://via.placeholder.com/300x200",
      "views": 20,
      "likes": 20,
      "comments": 20,
      "readMore": "#",
      "createdAt": "2025-08-29T07:42:10.123Z",
      "updatedAt": "2025-08-29T07:42:10.123Z",
      "__v": 0
    }
  ]
}
```
