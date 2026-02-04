import express from 'express';
import { createFee, getFees, getFeeById, updateFee } from './fee.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { createFeeValidator, updateFeeValidator } from './fee.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

// Admin and Accountant only: Create and Update fee records
router.post('/', authorizeRoles('admin', 'accountant'), createFeeValidator, validate, createFee);
router.put('/:id', authorizeRoles('admin', 'accountant'), updateFeeValidator, validate, updateFee);

// Admin and Accountant can view all fee records
router.get('/', authorizeRoles('admin', 'accountant'), getFees);

// Admin, Accountant, and Students can view specific fee record (own)
router.get('/:id', authorizeRoles('admin', 'accountant', 'student'), getFeeById);

export default router;
