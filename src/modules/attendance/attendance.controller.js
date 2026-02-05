import {
    markAttendanceService,
    getBatchAttendanceService,
    getStudentAttendanceService,
} from './attendance.service.js';
import Student from '../student/student.model.js';

export const markAttendance = async (req, res, next) => {
    try {
        const attendanceData = {
            ...req.body,
            markedBy: req.user.id,
        };
        const record = await markAttendanceService(attendanceData);
        res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            data: record,
        });
    } catch (error) {
        next(error);
    }
};

export const getAttendance = async (req, res, next) => {
    try {
        const { course, batch, date } = req.query;
        // Generic search - for now we just use the existing service logic
        // If course or batch are names, we might need to find IDs first or update service.
        // Assuming for now they might be IDs or we'll handle names in service.
        const records = await getBatchAttendanceService(batch, {
            startDate: date,
            endDate: date,
            course // currently service doesn't use course, but we can pass it
        });
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        next(error);
    }
};

export const getBatchAttendance = async (req, res, next) => {
    try {
        const { batchId } = req.params;
        const records = await getBatchAttendanceService(batchId, req.query);
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStudentPersonalAttendance = async (req, res, next) => {
    try {
        let studentId = req.params.studentId;

        // If the requester is a student, we look up their profile based on their email
        if (req.user.role === 'student') {
            const studentProfile = await Student.findOne({ email: req.user.email });
            if (!studentProfile) {
                return res.status(404).json({ success: false, message: 'Student profile not found for this user account' });
            }
            studentId = studentProfile._id;
        }

        if (!studentId) {
            return res.status(400).json({ success: false, message: 'Student ID is required' });
        }

        const records = await getStudentAttendanceService(studentId);
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
