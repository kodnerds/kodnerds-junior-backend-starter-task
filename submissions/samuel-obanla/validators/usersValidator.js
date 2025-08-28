const { body, validationResult } = require('express-validator');

const validateRegisterUsers = [
    body('firstName')
        .notEmpty().withMessage('First Name is required')
        .isString().withMessage('First name should be in String only')
        .trim()
        .escape(),

    body('lastName')
        .notEmpty().withMessage('Last Name is required')
        .isString().withMessage('Last Name should be in String only')
        .trim(),
        
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('phoneNumber')
        .notEmpty().withMessage('phoneNumber is required')
        .isMobilePhone().withMessage('Please enter a valid PhoneNumber'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .isStrongPassword()
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one sign, and one number'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }));

            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: formattedErrors
            });
        }
        next();
    }
]

const validateLoginUsers = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }));

            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: formattedErrors
            });
        }
        next();
    }
]

module.exports = { validateRegisterUsers, validateLoginUsers }