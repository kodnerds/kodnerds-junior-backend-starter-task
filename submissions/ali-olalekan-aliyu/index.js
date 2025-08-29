const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/posts.model");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World, This is my solution to Kodnerd task 1");
});

// Create a new Post
app.post("/api/posts", async (req, res) => {
  try {
    const { author, title, description, image, readMore } = req.body;

    // Basic validation
    if (!author || !title || !description) {
      return res.status(400).json({
        message: "author , title, and description are required",
      });
    }

    // Find the highest existing id to auto-increment
    const lastPost = await Post.findOne().sort({ id: -1 });
    const newId = lastPost ? lastPost.id + 1 : 1;

    const post = await Post.create({
      id: newId,
      author,
      title,
      description,
      image,
      readMore,
    });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// To Read all Posts with Pagination
app.get("/posts", async (req, res) => {
  try {
    let { page, limit, offset } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 4;
    offset = parseInt(offset) || (page - 1) * limit;

    if (page < 1 || limit < 1 || offset < 0) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().skip(offset).limit(limit);

    res.status(200).json({
      message: "Posts retrieved successfully",
      pagination: {
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
        offset,
      },
      posts
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// To update a Post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findOneAndUpdate({ id: Number(id) }, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// To delete a Post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findOneAndDelete({ id: Number(id) });

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
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
