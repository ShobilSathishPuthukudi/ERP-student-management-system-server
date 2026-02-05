import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        dob: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch',
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: 'active',
        },
        enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
