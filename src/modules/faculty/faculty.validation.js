import { body, validationResult } from 'express-validator';

export const createFacultyValidator = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('Invalid User ID format'),
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
];

export const updateFacultyValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .trim(),
    body('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),
];
