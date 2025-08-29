const express = require('express')
const { validateCreateBooks, validateUpdateBooks, validateBooksComments } = require('../validators/booksValidator')
const { createBook, updateBook, getBooks, getBooksById, likeBook, comment, views, deleteBook } = require('../controllers/booksController')
const validateToken = require('../middlewares/validateToken')
const router = express.Router()


router.get('/', getBooks)
router.get('/:id', getBooksById)

router.use(validateToken)
router.post('/create', validateCreateBooks, createBook)
router.put('/update/:id', validateUpdateBooks, updateBook )
router.put('/like/:id', likeBook)
router.put('/comment/:id', validateBooksComments, comment)
router.put('/view/:id', views)
router.delete('/delete/:id', deleteBook)


module.exports = router