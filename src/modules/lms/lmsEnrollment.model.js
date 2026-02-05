import mongoose from 'mongoose';

const lmsEnrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LmsCourse',
            required: true,
        },
        purchasePrice: {
            type: Number,
            required: true,
        },
        progress: [{
            lessonId: { type: String },
            completedAt: { type: Date, default: Date.now }
        }],
        completionPercentage: {
            type: Number,
            default: 0
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        paymentId: {
            type: String, // Reference to payment transaction
            default: 'FREE_ENROLL'
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'free'],
            default: 'free'
        }
    },
    {
        timestamps: true,
    }
);

// Ensure a student can only have one enrollment per course
lmsEnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const LmsEnrollment = mongoose.model('LmsEnrollment', lmsEnrollmentSchema);

export default LmsEnrollment;
