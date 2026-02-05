import {
    createCourseService,
    getCoursesService,
    getCourseByIdService,
    updateCourseService,
    deleteCourseService,
} from './course.service.js';

export const createCourse = async (req, res, next) => {
    try {
        const course = await createCourseService(req.body);

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCourses = async (req, res, next) => {
    try {
        const { category, department, mode } = req.query;
        const courses = await getCoursesService({ category, department, mode });

        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const course = await getCourseByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCourse = async (req, res, next) => {
    try {
        const course = await updateCourseService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCourse = async (req, res, next) => {
    try {
        await deleteCourseService(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
