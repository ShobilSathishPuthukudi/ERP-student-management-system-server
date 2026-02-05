import express from 'express';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth.middleware.js';
import * as lmsController from './lms.controller.js';

const router = express.Router();

// --- Public / All Authenticated ---
router.get('/live', authMiddleware, lmsController.getLiveCourses);
router.get('/course/:slug', authMiddleware, lmsController.getCourseDetails);

// --- Student Routes ---
router.post('/enroll', authMiddleware, authorizeRoles('student'), lmsController.enroll);
router.get('/my-courses', authMiddleware, authorizeRoles('student'), lmsController.getEnrolledCourses);
router.post('/progress', authMiddleware, authorizeRoles('student'), lmsController.markProgress);

// --- Faculty Routes ---
router.post('/submit', authMiddleware, authorizeRoles('faculty'), lmsController.submitCourse);
router.get('/instructor-courses', authMiddleware, authorizeRoles('faculty'), lmsController.getInstructorCourses);

// --- Admin Routes ---
router.get('/pending', authMiddleware, authorizeRoles('admin'), lmsController.getPendingCourses);
router.patch('/approve/:courseId', authMiddleware, authorizeRoles('admin'), lmsController.approveCourse);

export default router;
