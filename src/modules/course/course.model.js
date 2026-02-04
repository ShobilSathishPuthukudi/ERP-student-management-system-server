import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        duration: {
            type: String,
            required: true,
            trim: true,
        },
        mode: {
            type: String,
            enum: ['Online', 'Offline', 'Hybrid'],
            required: true,
        },
        feeAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            enum: ['Postgraduate', 'Undergraduate', 'Paramedical', 'Arts', 'Skill-Improvement'],
            required: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
            enum: [
                'Medical & Allied Sciences',
                'School of Fine Arts',
                'Humanities & Social Sciences',
                'Professional Development Center',
                'General Academics'
            ],
        },
        requirements: {
            minQualification: {
                type: String,
                required: true,
                trim: true,
            },
            hasLabWork: {
                type: Boolean,
                default: false,
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
