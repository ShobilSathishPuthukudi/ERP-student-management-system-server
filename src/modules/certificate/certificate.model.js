import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        certificateNumber: {
            type: String,
            required: true,
            unique: true,
        },
        grade: {
            type: String,
        },
        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
