import * as lmsService from './lms.service.js';

export const submitCourse = async (req, res, next) => {
    try {
        const course = await lmsService.submitCourseForApproval(req.user.email, req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

export const getInstructorCourses = async (req, res, next) => {
    try {
        const courses = await lmsService.getInstructorCourses(req.user.email);
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

export const getPendingCourses = async (req, res, next) => {
    try {
        const courses = await lmsService.getPendingCourses();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

export const approveCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body; // 'published' or 'rejected'
        const course = await lmsService.updateCourseStatus(courseId, status);
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

export const getLiveCourses = async (req, res, next) => {
    try {
        const courses = await lmsService.getAllLiveCourses();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

export const getCourseDetails = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const course = await lmsService.getCourseBySlug(slug);
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

export const enroll = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const enrollment = await lmsService.enrollInCourse(req.user.email, courseId);
        res.status(201).json({ success: true, data: enrollment });
    } catch (error) {
        next(error);
    }
};

export const getEnrolledCourses = async (req, res, next) => {
    try {
        const courses = await lmsService.getStudentEnrolledCourses(req.user.email);
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

export const markProgress = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.body;
        const enrollment = await lmsService.updateLessonProgress(req.user.email, courseId, lessonId);
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        next(error);
    }
};
