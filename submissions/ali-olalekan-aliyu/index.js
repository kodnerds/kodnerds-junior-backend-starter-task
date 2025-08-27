const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/posts.model");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World, Ali is a Dev");
});

// To create a new Post
app.post("/api/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// To read all Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://aliolalekan:AliyuAli@backenddb.vfidi1s.mongodb.net/Kodnerds?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
