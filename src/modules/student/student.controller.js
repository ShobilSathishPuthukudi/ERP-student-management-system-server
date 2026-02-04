import {
    createStudentService,
    getAllStudentsService,
    getStudentByIdService,
    updateStudentService,
    enrollOnlineCourseService,
} from './student.service.js';
import Student from './student.model.js';

export const createStudent = async (req, res) => {
    try {
        const student = await createStudentService(req.body);

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getStudents = async (req, res) => {
    try {
        const { educationLevel, status, currentCourse } = req.query;
        const students = await getAllStudentsService({
            educationLevel,
            status,
            currentCourse,
        });

        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await getStudentByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const student = await updateStudentService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const enrollOnlineCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const student = await enrollOnlineCourseService(studentId, courseId);

        res.status(200).json({
            success: true,
            message: 'Self-enrolled in online course successfully',
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
