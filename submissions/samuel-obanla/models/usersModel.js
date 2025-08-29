const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        booksCreated: { type: [mongoose.Schema.Types.ObjectId], ref: "books" },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)
const users = mongoose.model("users", usersSchema)

module.exports = { users }