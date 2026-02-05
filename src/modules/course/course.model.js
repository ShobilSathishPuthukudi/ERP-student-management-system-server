import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        courseCode: {
            type: String,
            required: true,
            unique: true,
        },
        durationMonths: {
            type: Number,
            required: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        feeAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        department: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        minAge: {
            type: Number,
            default: 15,
            min: 15,
        },
        maxAge: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
