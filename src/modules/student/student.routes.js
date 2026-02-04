import express from 'express';
import {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    enrollOnlineCourse,
} from './student.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { createStudentValidator, updateStudentValidator } from './student.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

// Admin only: Create, Update, Delete students
router.post('/', authorizeRoles('admin'), createStudentValidator, validate, createStudent);
router.put('/:id', authorizeRoles('admin'), updateStudentValidator, validate, updateStudent);
router.delete('/:id', authorizeRoles('admin'), deleteStudent);

// Admin and Faculty can view all students
router.get('/', authorizeRoles('admin', 'faculty'), getStudents);

// Admin, Faculty, and the Student themselves can view profile
router.get('/:id', authorizeRoles('admin', 'faculty', 'student'), getStudentById);

// Students can self-enroll in online courses
router.post('/enroll', authorizeRoles('admin', 'student'), enrollOnlineCourse);

export default router;
