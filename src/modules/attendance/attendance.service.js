import Attendance from './attendance.model.js';
import Batch from '../batch/batch.model.js';

/**
 * Service to mark attendance for a batch.
 * @param {Object} attendanceData - The attendance data (batchId, students array, date, markedBy)
 * @returns {Promise<Object>} The saved attendance record
 */
export const markAttendanceService = async (attendanceData) => {
    const { batchId, students, date, markedBy } = attendanceData;

    // Verify batch exists
    const batch = await Batch.findById(batchId);
    if (!batch) {
        throw new Error('Batch not found');
    }

    // Use a start-of-day date to avoid time-based duplicate index issues
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Check if attendance already marked for this batch/date
    const existingRecord = await Attendance.findOne({ batchId, date: attendanceDate });
    if (existingRecord) {
        // If exists, update it instead of failing (allowing corrections)
        existingRecord.students = students;
        existingRecord.markedBy = markedBy;
        return await existingRecord.save();
    }

    const record = await Attendance.create({
        batchId,
        students,
        date: attendanceDate,
        markedBy,
    });

    return record;
};

/**
 * Service to fetch attendance records for a batch.
 * @param {string} batchId - The ID of the batch
 * @param {Object} query - Optional date filters
 * @returns {Promise<Array>} List of attendance records
 */
export const getBatchAttendanceService = async (batchId, queryParams = {}) => {
    const { startDate, endDate } = queryParams;
    const filter = { batchId };

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    return await Attendance.find(filter)
        .populate('students.studentId', 'name email')
        .sort({ date: -1 });
};

/**
 * Service to fetch attendance summary for a specific student.
 * @param {string} studentId - The ID of the student
 * @returns {Promise<Array>} List of attendance entries relevant to the student
 */
export const getStudentAttendanceService = async (studentId) => {
    // Find all attendance records where this student is present
    const records = await Attendance.find({ 'students.studentId': studentId })
        .populate('batchId', 'batchName')
        .sort({ date: -1 });

    // Map to a more student-centric view
    return records.map(record => {
        const studentEntry = record.students.find(s => s.studentId.toString() === studentId.toString());
        return {
            date: record.date,
            batchName: record.batchId.batchName,
            status: studentEntry.status,
        };
    });
};
