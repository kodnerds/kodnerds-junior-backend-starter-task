"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.updateSchema = exports.paginationSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSchema = joi_1.default.object({
    author: joi_1.default.string().min(2).required().messages({
        "string.min": "Author must be more than 2 characters",
    }),
    date: joi_1.default.string().required(),
    title: joi_1.default.string().required().messages({
        "string.min": "Author must be more than 2 characters",
    }),
    description: joi_1.default.string().required().messages({
        "string.min": "Description must be at least 6 characters",
    }),
    image: joi_1.default.string().uri().required().messages({
        "string.min": "Image url must be more than 2 characters",
    }),
    views: joi_1.default.number().integer().min(0).default(0),
    likes: joi_1.default.number().integer().min(0).default(0),
    comments: joi_1.default.number().integer().min(0).default(0).messages({
        string: "Comments received ",
    }),
    readMore: joi_1.default.string().required(),
});
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(10),
});
exports.updateSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).max(100).optional(),
    date: joi_1.default.string().min(1900).max(new Date().getFullYear()).optional(),
    author: joi_1.default.string().min(2).max(50).optional(),
    description: joi_1.default.string().min(2).max(100).optional(),
    comment: joi_1.default.number().integer().min(2).max(100).optional(),
    views: joi_1.default.number().integer().min(2).max(100).optional(),
    likes: joi_1.default.number().integer().min(2).max(100).optional(),
}).min(1);
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "Validation error",
            details: error.details.map((err) => err.message),
        });
    }
    next();
};
exports.validate = validate;
