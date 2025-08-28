const { body, validationResult } = require('express-validator');

const validateCreateBooks = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),

    body('readMore')
        .notEmpty().withMessage('Read More is required')
        .isString().withMessage('Read More must be a string')
        .isURL().withMessage('Read More must be a valid URL'),

    body('image')
        .notEmpty().withMessage('Image is required')
        .isString().withMessage('Image must be a string')
        .isURL().withMessage('Image must be a valid URL'),

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

const validateUpdateBooks = [
    body('title')
        .isString().withMessage('Title must be a string'),

    body('description')
        .isString().withMessage('Description must be a string'),

    body('readMore')
        .isString().withMessage('Read More must be a string')
        .isURL().withMessage('Read More must be a valid URL'),

    body('image')
        .isString().withMessage('Image must be a string')
        .isURL().withMessage('Image must be a valid URL'),

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

module.exports = {
    validateCreateBooks,
    validateUpdateBooks
}