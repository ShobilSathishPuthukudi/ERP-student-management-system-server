import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        educationLevel: {
            type: String,
            enum: ['UG', 'PG', 'Paramedical', 'Arts', 'Skill-Improvement'],
            required: true,
        },
        currentCourse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: 'active',
        },
        enrolledCourses: [{ type: ObjectId, ref: "Course" }]
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
