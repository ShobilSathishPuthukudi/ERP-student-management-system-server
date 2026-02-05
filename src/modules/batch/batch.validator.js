import { body, param } from 'express-validator';

export const createBatchValidator = [
    body('batchName')
        .notEmpty().withMessage('Batch name is required')
        .isString().withMessage('Batch name must be a string')
        .trim(),
    body('courseId')
        .notEmpty().withMessage('Course ID is required')
        .isMongoId().withMessage('Invalid Course ID format'),
    body('facultyId')
        .notEmpty().withMessage('Faculty (User) ID is required')
        .isMongoId().withMessage('Invalid Faculty ID format'),
    body('startDate')
        .notEmpty().withMessage('Start date is required')
        .matches(/^\d{2}-\d{2}-\d{4}$/).withMessage('Invalid date format (DD-MM-YYYY)'),
    body('status')
        .optional()
        .isIn(['Upcoming', 'Active', 'Completed']).withMessage('Invalid status'),
];

export const assignStudentsValidator = [
    body('studentIds')
        .isArray({ min: 1 }).withMessage('studentIds must be a non-empty array'),
    body('studentIds.*')
        .isMongoId().withMessage('Each studentId must be a valid Mongo ID'),
];

export const assignFacultyValidator = [
    body('facultyId')
        .notEmpty().withMessage('Faculty ID is required')
        .isMongoId().withMessage('Invalid Faculty ID format'),
];
