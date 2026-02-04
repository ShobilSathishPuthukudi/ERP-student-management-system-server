import {
    markAttendanceService,
    getBatchAttendanceService,
    getStudentAttendanceService,
} from './attendance.service.js';

export const markAttendance = async (req, res) => {
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
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getBatchAttendance = async (req, res) => {
    try {
        const { batchId } = req.params;
        const records = await getBatchAttendanceService(batchId, req.query);
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStudentPersonalAttendance = async (req, res) => {
    try {
        // If student, force their own ID. If admin, allow ID from params or default to self.
        const studentId = req.user.role === 'student' ? req.user.id : req.params.studentId;

        if (!studentId) {
            return res.status(400).json({ success: false, message: 'Student ID is required' });
        }

        const records = await getStudentAttendanceService(studentId);
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
