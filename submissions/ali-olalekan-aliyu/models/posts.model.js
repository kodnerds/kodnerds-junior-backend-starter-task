const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    readMore: { type: String },
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
