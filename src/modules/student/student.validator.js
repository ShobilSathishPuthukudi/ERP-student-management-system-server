import { body } from 'express-validator';

const allowedEducationLevels = ['UG', 'PG', 'Paramedical', 'Arts', 'Skill-Improvement'];
const allowedStatus = ['active', 'inactive'];

export const createStudentValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim(),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isString().withMessage('Phone must be a string')
        .trim(),
    body('educationLevel')
        .notEmpty().withMessage('Education level is required')
        .isIn(allowedEducationLevels).withMessage(`Education level must be one of: ${allowedEducationLevels.join(', ')}`),
    body('currentCourse')
        .notEmpty().withMessage('Current course is required')
        .isMongoId().withMessage('Invalid course ID format'),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage(`Status must be one of: ${allowedStatus.join(', ')}`),
    body('enrolledCourses')
        .optional()
        .isArray().withMessage('Enrolled courses must be an array'),
    body('enrolledCourses.*')
        .optional()
        .isMongoId().withMessage('Each enrolled course must be a valid course ID'),
];

export const updateStudentValidator = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .trim(),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .optional()
        .isString().withMessage('Phone must be a string')
        .trim(),
    body('educationLevel')
        .optional()
        .isIn(allowedEducationLevels).withMessage(`Education level must be one of: ${allowedEducationLevels.join(', ')}`),
    body('currentCourse')
        .optional()
        .isMongoId().withMessage('Invalid course ID format'),
    body('status')
        .optional()
        .isIn(allowedStatus).withMessage(`Status must be one of: ${allowedStatus.join(', ')}`),
    body('enrolledCourses')
        .optional()
        .isArray().withMessage('Enrolled courses must be an array'),
    body('enrolledCourses.*')
        .optional()
        .isMongoId().withMessage('Each enrolled course must be a valid course ID'),
];
