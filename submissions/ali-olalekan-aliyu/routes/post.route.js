const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // fetch all posts from DB
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving posts",
      error: error.message
    });
  }
});

module.exports = router;