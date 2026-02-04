import express from 'express';
import {
    createBatch,
    getAllBatches,
    getBatchById,
    assignStudents,
    assignFaculty,
} from './batch.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import {
    createBatchValidator,
    assignStudentsValidator,
    assignFacultyValidator,
} from './batch.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Admin only: Create Batch, Assign Faculty, Assign Students
router.post('/', authorizeRoles('admin'), createBatchValidator, validate, createBatch);
router.put('/:id/assign-students', authorizeRoles('admin'), assignStudentsValidator, validate, assignStudents);
router.put('/:id/assign-faculty', authorizeRoles('admin'), assignFacultyValidator, validate, assignFaculty);

// Admin, Faculty, and Students can view batches and details
router.get('/', authorizeRoles('admin', 'faculty', 'student'), getAllBatches);
router.get('/:id', authorizeRoles('admin', 'faculty', 'student'), getBatchById);

export default router;
