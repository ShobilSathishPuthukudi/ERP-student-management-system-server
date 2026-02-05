import {
    createStudentService,
    getAllStudentsService,
    getStudentByIdService,
    updateStudentService,
    enrollOnlineCourseService,
} from './student.service.js';
import Student from './student.model.js';
import User from '../auth/user.model.js';

export const createStudent = async (req, res, next) => {
    try {
        const student = await createStudentService(req.body);

        res.status(201).json({
            success: true,
            message: `Student created successfully. Login credentials: Email: ${student.email}, Registration ID: ${student.studentId}, Birthday: ${new Date(student.dob).toLocaleDateString()}`,
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const { status, courseId, batchId } = req.query;
        const students = await getAllStudentsService({
            status,
            courseId,
            batchId,
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

export const getStudentById = async (req, res, next) => {
    try {
        const student = await getStudentByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

export const getStudentProfile = async (req, res, next) => {
    try {
        const student = await Student.findOne({ email: req.user.email })
            .populate('courseId')
            .populate('batchId')
            .populate('enrolledCourses');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student profile not found',
            });
        }

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
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

export const enrollOnlineCourse = async (req, res, next) => {
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

export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        // Delete the associated user account
        await User.findOneAndDelete({ email: student.email });

        // Delete the student profile
        await Student.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Student and associated user account deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
