const express = require('express')
const { validateCreateBooks, validateUpdateBooks } = require('../validators/booksValidator')
const { createBook, updateBook, getBooks } = require('../controllers/booksController')
const validateToken = require('../middlewares/validateToken')
const router = express.Router()

router.get('/', getBooks)
router.use(validateToken)
router.post('/create', validateCreateBooks, createBook)
router.put('/update', validateUpdateBooks, updateBook )

module.exports = router