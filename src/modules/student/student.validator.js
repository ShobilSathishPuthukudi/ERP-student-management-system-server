import { body } from 'express-validator';

const allowedStatus = ['active', 'inactive'];

export const createStudentValidator = [
    body('fullName')
        .notEmpty().withMessage('Full Name is required')
        .isString().withMessage('Full Name must be a string')
        .trim(),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits')
        .trim(),
    body('courseId')
        .notEmpty().withMessage('Academic Course is required')
        .isMongoId().withMessage('Invalid course ID format'),
    body('batchId')
        .optional()
        .isMongoId().withMessage('Invalid batch ID format'),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage(`Status must be one of: ${allowedStatus.join(', ')}`),
    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isISO8601().withMessage('Invalid date format (ISO8601)'),
    body('enrolledCourses')
        .optional()
        .isArray().withMessage('Enrolled courses must be an array'),
];

export const updateStudentValidator = [
    body('fullName')
        .optional()
        .isString().withMessage('Full Name must be a string')
        .trim(),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .optional()
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits')
        .trim(),
    body('courseId')
        .optional()
        .isMongoId().withMessage('Invalid course ID format'),
    body('batchId')
        .optional()
        .isMongoId().withMessage('Invalid batch ID format'),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage(`Status must be one of: ${allowedStatus.join(', ')}`),
    body('enrolledCourses')
        .optional()
        .isArray().withMessage('Enrolled courses must be an array'),
];
