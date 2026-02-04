import express from 'express';
import {
    markAttendance,
    getBatchAttendance,
    getStudentPersonalAttendance,
} from './attendance.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import {
    markAttendanceValidator,
    getAttendanceQueryValidator,
} from './attendance.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Mark Attendance: Faculty and Admin only
router.post('/mark', authorizeRoles('faculty', 'admin'), markAttendanceValidator, validate, markAttendance);

// View Batch Attendance: Faculty and Admin
router.get('/batch/:batchId', authorizeRoles('faculty', 'admin'), getAttendanceQueryValidator, validate, getBatchAttendance);

// View Student Personal Attendance: Student (Self) or Admin
router.get('/my-attendance', authorizeRoles('student', 'admin'), getStudentPersonalAttendance);
router.get('/student/:studentId', authorizeRoles('admin', 'faculty'), getStudentPersonalAttendance);

export default router;
