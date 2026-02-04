import { body } from 'express-validator';

const allowedModes = ['Online', 'Offline', 'Hybrid'];
const allowedCategories = [
    'Postgraduate',
    'Undergraduate',
    'Paramedical',
    'Arts',
    'Skill-Improvement',
];
const allowedDepartments = [
    'Medical & Allied Sciences',
    'School of Fine Arts',
    'Humanities & Social Sciences',
    'Professional Development Center',
    'General Academics',
];

export const createCourseValidator = [
    body('courseName')
        .notEmpty().withMessage('Course name is required')
        .isString().withMessage('Course name must be a string')
        .trim(),
    body('duration')
        .notEmpty().withMessage('Duration is required')
        .isString().withMessage('Duration must be a string')
        .trim(),
    body('mode')
        .notEmpty().withMessage('Mode is required')
        .isIn(allowedModes).withMessage(`Mode must be one of: ${allowedModes.join(', ')}`),
    body('feeAmount')
        .notEmpty().withMessage('Fee amount is required')
        .isNumeric().withMessage('Fee amount must be a number')
        .custom((value) => value >= 0).withMessage('Fee amount must be greater than or equal to 0'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(', ')}`),
    body('department')
        .notEmpty().withMessage('Department is required')
        .isIn(allowedDepartments).withMessage(`Department must be one of: ${allowedDepartments.join(', ')}`),
    body('requirements.minQualification')
        .notEmpty().withMessage('Minimum qualification is required')
        .isString().withMessage('Minimum qualification must be a string')
        .trim(),
    body('requirements.hasLabWork')
        .optional()
        .isBoolean().withMessage('hasLabWork must be a boolean'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean'),
];

export const updateCourseValidator = [
    body('courseName')
        .optional()
        .isString().withMessage('Course name must be a string')
        .trim(),
    body('duration')
        .optional()
        .isString().withMessage('Duration must be a string')
        .trim(),
    body('mode')
        .optional()
        .isIn(allowedModes).withMessage(`Mode must be one of: ${allowedModes.join(', ')}`),
    body('feeAmount')
        .optional()
        .isNumeric().withMessage('Fee amount must be a number')
        .custom((value) => value >= 0).withMessage('Fee amount must be greater than or equal to 0'),
    body('category')
        .optional()
        .isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(', ')}`),
    body('department')
        .optional()
        .isIn(allowedDepartments).withMessage(`Department must be one of: ${allowedDepartments.join(', ')}`),
    body('requirements.minQualification')
        .optional()
        .isString().withMessage('Minimum qualification must be a string')
        .trim(),
    body('requirements.hasLabWork')
        .optional()
        .isBoolean().withMessage('hasLabWork must be a boolean'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean'),
];
