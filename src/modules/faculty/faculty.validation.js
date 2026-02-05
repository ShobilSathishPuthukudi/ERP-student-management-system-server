import { body, validationResult } from 'express-validator';

export const createFacultyValidator = [
    body('fullName')
        .notEmpty()
        .withMessage('Full Name is required')
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('department')
        .notEmpty()
        .withMessage('Department is required')
        .isIn([
            'School of Engineering',
            'Business Management',
            'Medical Sciences',
            'Creative Arts',
            'Computer Science',
            'Social Sciences',
            'Humanities',
            'General Academics'
        ])
        .withMessage('Invalid department. Please select from the approved institutional list.'),
    body('designation')
        .notEmpty()
        .withMessage('Designation is required')
        .isIn([
            'Professor',
            'Associate Professor',
            'Assistant Professor',
            'Lecturer',
            'Head of Department'
        ])
        .withMessage('Invalid designation. Please select a valid academic rank.'),
];

export const updateFacultyValidator = [
    body('fullName')
        .optional()
        .isString()
        .withMessage('Full Name must be a string')
        .trim(),
    body('department')
        .optional()
        .isIn([
            'School of Engineering',
            'Business Management',
            'Medical Sciences',
            'Creative Arts',
            'Computer Science',
            'Social Sciences',
            'Humanities',
            'General Academics'
        ])
        .withMessage('Invalid department.'),
    body('designation')
        .optional()
        .isIn([
            'Professor',
            'Associate Professor',
            'Assistant Professor',
            'Lecturer',
            'Head of Department'
        ])
        .withMessage('Invalid designation.'),
    body('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),
];
