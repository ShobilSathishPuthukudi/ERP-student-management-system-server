import express from 'express';
import {
    createFaculty,
    getAllFaculty,
    getFacultyById,
    updateFaculty,
    deleteFaculty,
} from './faculty.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import {
    createFacultyValidator,
    updateFacultyValidator,
} from './faculty.validation.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Apply auth middleware to all faculty routes
router.use(authMiddleware);

// Admin only: Add or Update Faculty
router.post('/', authorizeRoles('admin'), createFacultyValidator, validate, createFaculty);
router.put('/:id', authorizeRoles('admin'), updateFacultyValidator, validate, updateFaculty);
router.delete('/:id', authorizeRoles('admin'), deleteFaculty);

// Admin and Students can view all faculty
router.get('/', authorizeRoles('admin', 'student'), getAllFaculty);

// Admin, Students, and the Faculty members themselves can view profile
router.get('/:id', authorizeRoles('admin', 'faculty', 'student'), getFacultyById);

export default router;
