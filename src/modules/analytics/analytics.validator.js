import { query } from 'express-validator';

/**
 * Validator for analytics query parameters
 */
export const analyticsOverviewValidator = [
    query('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid ISO 8601 date'),
    query('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid ISO 8601 date'),
];
