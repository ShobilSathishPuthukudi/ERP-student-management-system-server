import { body } from 'express-validator';

const allowedPaymentStatus = ['Paid', 'Pending', 'Partial'];

export const createFeeValidator = [
    body('studentId')
        .notEmpty()
        .withMessage('Student ID is required')
        .isMongoId()
        .withMessage('Invalid Student ID format'),
    body('totalFee')
        .notEmpty()
        .withMessage('Total fee is required')
        .isNumeric()
        .withMessage('Total fee must be a number')
        .custom((value) => value >= 0)
        .withMessage('Total fee must be greater than or equal to 0'),
    body('paidAmount')
        .optional()
        .isNumeric()
        .withMessage('Paid amount must be a number')
        .custom((value) => value >= 0)
        .withMessage('Paid amount must be greater than or equal to 0'),
    body('dueAmount')
        .notEmpty()
        .withMessage('Due amount is required')
        .isNumeric()
        .withMessage('Due amount must be a number')
        .custom((value) => value >= 0)
        .withMessage('Due amount must be greater than or equal to 0'),
    body('paymentStatus')
        .optional()
        .isIn(allowedPaymentStatus)
        .withMessage(`Payment status must be one of: ${allowedPaymentStatus.join(', ')}`),
];

export const updateFeeValidator = [
    body('totalFee')
        .optional()
        .isNumeric()
        .withMessage('Total fee must be a number')
        .custom((value) => value >= 0)
        .withMessage('Total fee must be greater than or equal to 0'),
    body('paidAmount')
        .optional()
        .isNumeric()
        .withMessage('Paid amount must be a number')
        .custom((value) => value >= 0)
        .withMessage('Paid amount must be greater than or equal to 0'),
    body('dueAmount')
        .optional()
        .isNumeric()
        .withMessage('Due amount must be a number')
        .custom((value) => value >= 0)
        .withMessage('Due amount must be greater than or equal to 0'),
    body('paymentStatus')
        .optional()
        .isIn(allowedPaymentStatus)
        .withMessage(`Payment status must be one of: ${allowedPaymentStatus.join(', ')}`),
];
