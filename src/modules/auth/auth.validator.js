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
    body('role').isIn(['admin', 'accountant', 'faculty']).withMessage('Invalid role provided'),
];

export const loginValidator = [
    // 1. Email is always required for identification
    body('email')
        .trim()
        .notEmpty().withMessage('Email/Username is required'),

    // 2. Password is required for Admin/Accountant (and optional/ignored for others if they use ID/DOB)
    body('password')
        .if((value, { req }) => ['admin', 'accountant'].includes(req.body.role))
        .notEmpty().withMessage('Password is required'),

    // 3. Student ID is required for Students
    body('studentId')
        .if((value, { req }) => req.body.role === 'student')
        .trim()
        .notEmpty().withMessage('Student ID is required'),

    // 4. Faculty ID is required for Faculty
    body('facultyId')
        .if((value, { req }) => req.body.role === 'faculty')
        .trim()
        .notEmpty().withMessage('Faculty ID is required'),

    // 5. DOB is required for Students and Faculty
    body('dob')
        .if((value, { req }) => ['student', 'faculty'].includes(req.body.role))
        .notEmpty().withMessage('Date of Birth is required')
        .isISO8601().withMessage('Invalid date format (YYYY-MM-DD)'),
];
