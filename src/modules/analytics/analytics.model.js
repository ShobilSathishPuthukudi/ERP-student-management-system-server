import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
    {
        totalStudents: {
            type: Number,
            required: true,
            default: 0,
        },
        totalCourses: {
            type: Number,
            required: true,
            default: 0,
        },
        totalFaculty: {
            type: Number,
            required: true,
            default: 0,
        },
        financials: {
            collected: {
                type: Number,
                required: true,
                default: 0,
            },
            pending: {
                type: Number,
                required: true,
                default: 0,
            },
        },
        generatedAt: {
            type: Date,
            default: Date.now,
        },
        snapshotPeriod: {
            startDate: Date,
            endDate: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
