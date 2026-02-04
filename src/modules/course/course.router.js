import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse } from './course.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { createCourseValidator, updateCourseValidator } from './course.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

// Admin only: Create and Update courses
router.post('/', authorizeRoles('admin'), createCourseValidator, validate, createCourse);
router.put('/:id', authorizeRoles('admin'), updateCourseValidator, validate, updateCourse);

// Admin, Faculty, and Students can view courses
router.get('/', authorizeRoles('admin', 'faculty', 'student'), getCourses);
router.get('/:id', authorizeRoles('admin', 'faculty', 'student'), getCourseById);

export default router;
