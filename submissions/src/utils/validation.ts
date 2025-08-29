import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createSchema = Joi.object({
  author: Joi.string().min(2).required().messages({
    "string.min": "Author must be more than 2 characters",
  }),
  date: Joi.string().required(),
  title: Joi.string().required().messages({
    "string.min": "Author must be more than 2 characters",
  }),
  description: Joi.string().required().messages({
    "string.min": "Description must be at least 6 characters",
  }),
  image: Joi.string().uri().required().messages({
    "string.min": "Image url must be more than 2 characters",
  }),
  views: Joi.number().integer().min(0).default(0),
  likes: Joi.number().integer().min(0).default(0),
  comments: Joi.number().integer().min(0).default(0).messages({
    string: "Comments received ",
  }),
  readMore: Joi.string().required(),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

export const updateSchema = Joi.object({
  title: Joi.string().min(2).max(100).optional(),
  date: Joi.string().min(1900).max(new Date().getFullYear()).optional(),
  author: Joi.string().min(2).max(50).optional(),
  description: Joi.string().min(2).max(100).optional(),
  comment: Joi.number().integer().min(2).max(100).optional(),
  views: Joi.number().integer().min(2).max(100).optional(),
  likes: Joi.number().integer().min(2).max(100).optional(),
}).min(1);

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
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
