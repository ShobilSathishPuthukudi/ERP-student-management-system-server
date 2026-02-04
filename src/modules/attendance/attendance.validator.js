import { body, query } from 'express-validator';

export const markAttendanceValidator = [
    body('batchId')
        .notEmpty().withMessage('Batch ID is required')
        .isMongoId().withMessage('Invalid Batch ID format'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Invalid date format'),
    body('students')
        .isArray({ min: 1 }).withMessage('Students attendance array is required'),
    body('students.*.studentId')
        .isMongoId().withMessage('Invalid Student ID in list'),
    body('students.*.status')
        .isIn(['Present', 'Absent', 'Late']).withMessage('Invalid status value'),
];

export const getAttendanceQueryValidator = [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
];
