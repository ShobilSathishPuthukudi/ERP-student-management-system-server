import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`[Validation Error] ${req.method} ${req.url}:`, errors.array());
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        error.isValidationError = true;
        error.errors = errors.array();
        return next(error);
    }
    next();
};