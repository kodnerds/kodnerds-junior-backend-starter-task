const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: true },
        readMore: { type: String, required: true },
        image: { type: String, require: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        views: { type: Number },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
        comments: [
            {
                users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                comment: { type: String }
            }
        ]
    },
    { timestamps: true }
)

booksSchema.index({
  title: "text",
  description: "text"
});

const books = mongoose.model("books", booksSchema)
module.exports = { books }