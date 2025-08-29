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
            message: `${title} created successfully`,
            data: book
        })
    } catch (err) {
        res.status(500).json({ message: "Unable to create book", error: err.message });
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
        res.status(500).json({ message: "Unable to update book", error: err.message });
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
        res.status(500).json({ message: "Unable to get books", error: err.message });
    }
})

const getBooksById = asyncHandler(async (req, res) => {
    try {
        const book = await books.findById(req.params.id)
            .populate("author", "firstName lastName email")
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Book get successfully",
            data: book
        })
    } catch (err) {
        res.status(500).json({ message: "Unable to get book", error: err.message });
    }
})

const likeBook = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.user;

        const book = await books.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ 
                success: false,
                message: "Book not found" 
            });
        }

        const alreadyLiked = book.likes.includes(userId);

        if (alreadyLiked) {
            book.likes = book.likes.filter((id) => id.toString() !== userId.toString());
            await book.save();

            return res.status(200).json({
                success: true,
                message: "Book un-liked successfully",
                data: {
                    likesCount: book.likes.length,
                    likes: book.likes,
                }
                
            });
        } else {
            
        book.likes.push(userId);
        await book.save();

        return res.status(200).json({
            success: true,
            message: "Book liked successfully",
            data: {
                likesCount: book.likes.length,
                likes: book.likes,
            }
        });
        }
    } catch (err) {
        res.status(500).json({ message: "Unable to like book", error: err.message });
    }
})

const comment = asyncHandler(async (req, res) => {
    try {
        const { comment } = req.body;

        const updatedBook = await books.findByIdAndUpdate(
            req.params.id,
            { 
                $push: { comments: { users: req.user.userId, comment } } 
            },
            { new: true }
        ).populate({
            path: "comments.users",
            select: "firstName lastName email",
        });

        if (!updatedBook) {
            return res.status(404).json({ 
                success: false,
                message: "Book not found" 
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            data: updatedBook,
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to add comment", error: err.message });
    }
})

const views = asyncHandler(async (req, res) => {
    try {
        const view = await books.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!view) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "View Increased",
            data: {
                view
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Unable to add view", error: err.message });
    }
})

const deleteBook = asyncHandler(async (req, res) => {
    try {
        const book = await books.findOneAndDelete(
            { _id: req.params.id, author: req.user.userId },
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
            message: `${book.title} deleted successfully`
        });  
    } catch (err) {
        res.status(500).json({ message: "Unable to delete book", error: err.message });
    }
})

const searchForBook = asyncHandler(async (req, res) => {
    try {
        const keyword = req.query.q
        if (!keyword) {
            return res.status(404).json({ 
                success: false, 
                message: "Search query is missing" 
            });
        }

        const results = await books.find(
            { $text: { $search: keyword } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.status(200).json({
            success: true,
            message: 'Books with related keywords',
            data: results
        })
    } catch (err) {
        res.status(500).json({ message: "Unable to get books", error: err.message });
    }
})


module.exports = {
    createBook,
    updateBook,
    getBooks,
    getBooksById,
    likeBook,
    comment,
    views,
    deleteBook,
    searchForBook
}