import { body, query } from 'express-validator';

export const markAttendanceValidator = [
    body('batchId')
        .notEmpty().withMessage('Batch ID is required')
        .isMongoId().withMessage('Invalid Batch ID format'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .matches(/^\d{2}-\d{2}-\d{4}$/).withMessage('Invalid date format (DD-MM-YYYY)'),
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
