import { body } from 'express-validator';

const allowedDepartments = [
    'School of Engineering',
    'Business Management',
    'Medical Sciences',
    'Creative Arts',
    'Computer Science',
    'Social Sciences',
    'Humanities',
    'General Academics'
];

const allowedStatus = ['active', 'inactive'];

export const createCourseValidator = [
    body('courseName')
        .notEmpty().withMessage('Course name is required')
        .isString().withMessage('Course name must be a string')
        .trim(),
    body('courseCode')
        .notEmpty().withMessage('Course code is required')
        .isString().withMessage('Course code must be a string')
        .trim(),
    body('durationMonths')
        .notEmpty().withMessage('Duration in months is required')
        .isNumeric().withMessage('Duration must be a number'),
    body('credits')
        .notEmpty().withMessage('Credits is required')
        .isNumeric().withMessage('Credits must be a number'),
    body('feeAmount')
        .notEmpty().withMessage('Fee amount is required')
        .isNumeric().withMessage('Fee amount must be a number')
        .custom((value) => value >= 0).withMessage('Fee amount must be greater than or equal to 0'),
    body('department')
        .notEmpty().withMessage('Department is required')
        .isIn(allowedDepartments).withMessage('Please select a valid department from the institutional list'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim(),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage('Status must be either active or inactive'),
    body('minAge')
        .optional()
        .isNumeric().withMessage('Minimum age must be a number')
        .custom((value) => value >= 15).withMessage('Minimum age cannot be below 15 years'),
    body('maxAge')
        .optional()
        .isNumeric().withMessage('Maximum age must be a number'),
];

export const updateCourseValidator = [
    body('courseName')
        .optional()
        .isString().withMessage('Course name must be a string')
        .trim(),
    body('courseCode')
        .optional()
        .isString().withMessage('Course code must be a string')
        .trim(),
    body('durationMonths')
        .optional()
        .isNumeric().withMessage('Duration must be a number'),
    body('credits')
        .optional()
        .isNumeric().withMessage('Credits must be a number'),
    body('feeAmount')
        .optional()
        .isNumeric().withMessage('Fee amount must be a number')
        .custom((value) => value >= 0).withMessage('Fee amount must be greater than or equal to 0'),
    body('department')
        .optional()
        .isIn(allowedDepartments).withMessage('Invalid department'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim(),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage('Status must be either active or inactive'),
    body('minAge')
        .optional()
        .isNumeric().withMessage('Minimum age must be a number')
        .custom((value) => value >= 15).withMessage('Minimum age cannot be below 15 years'),
    body('maxAge')
        .optional()
        .isNumeric().withMessage('Maximum age must be a number'),
];
