const asyncHandler = require('express-async-handler');
const { books } = require("../models/booksModel");
const { users } = require("../models/usersModel");


const createBook = asyncHandler(async (req, res) => {
    try {
        const { title, description, readMore, image } = req.body

        const book = await books.create({
            title,
            description,
            readMore,
            image,
            author: req.user.userId
        })

        if (!book) {
            return res.status(400).json({
                success: false,
                message: "something went wrong while creating book"
            })
        }

        await users.findByIdAndUpdate(
            req.user.userId,
            {$push: {"booksCreated": book._id}}
        )

        res.status(200).json({
            success: true,
            message: `${title} created successfully`
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}) 

const updateBook = asyncHandler(async (req, res) => {
    try {
        const book = await books.findOneAndUpdate(
            { _id: req.params.id, author: req.user.userId },
            { ...req.body },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found or user not authorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const getBooks = asyncHandler(async (req, res) => {
    try {
        let { page, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        const [results, total] = await Promise.all([
            books.find()
                .populate("author", "firstName lastName email")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            books.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            message: "Books fetch successfully",
            data: {
                page,
                totalPages: Math.ceil(total / limit),
                totalBooks: total,
                count: results.length,
                books: results
            }
            
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

const getBooksById = asyncHandler(async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})


module.exports = {
    createBook,
    updateBook,
    getBooks,
    getBooksById
}