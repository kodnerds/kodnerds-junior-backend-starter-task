const express = require('express')
const { registerUser, loginUser, getUser } = require('../controllers/usersController')
const { validateRegisterUsers, validateLoginUsers } = require('../validators/usersValidator')
const router = express.Router()

router.post('/register', validateRegisterUsers, registerUser)
router.post('/login', validateLoginUsers, loginUser)
router.get('/:id', getUser)

module.exports = router