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
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure MongoDB
```bash
mongoose.connect("your-mongodb-uri-here")
```
### 4. Start the server
```bash
mongoose.connect("your-mongodb-uri-here")
```
or if you’re using `nodemon`:
```bash
npm run dev
```
Server will run at:
👉 `http://localhost:3000`