import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch',
            required: true,
        },
        students: [
            {
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student',
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['Present', 'Absent', 'Late'],
                    default: 'Present',
                },
            },
        ],
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to prevent duplicate attendance for the same batch on the same date
attendanceSchema.index({ batchId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
