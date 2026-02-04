import { body } from 'express-validator';

export const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .isIn(['student'])
        .withMessage('Public registration is only allowed for the student role'),
];

export const adminCreateUserValidator = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['admin', 'student', 'accountant', 'faculty']).withMessage('Invalid role provided'),
];

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];
