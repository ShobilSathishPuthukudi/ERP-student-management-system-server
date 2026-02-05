import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Log error for debugging
    logger.error(`[Error] ${req.method} ${req.url} - ${message}`);
    if (statusCode === 500) {
        logger.error(err.stack);
    }

    // Mongoose Bad ObjectId (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Express Validator Errors (Handled if passed via next(error))
    if (err.isValidationError && err.errors) {
        statusCode = 400;
        message = err.errors[0].msg;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
