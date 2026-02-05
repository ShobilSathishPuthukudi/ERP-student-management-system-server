import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        facultyId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        dob: {
            type: Date,
            required: true,
        },
        department: {
            type: String,
            required: true,
            enum: {
                values: [
                    'School of Engineering',
                    'Business Management',
                    'Medical Sciences',
                    'Creative Arts',
                    'Computer Science',
                    'Social Sciences',
                    'Humanities',
                    'General Academics'
                ],
                message: '{VALUE} is not a supported department'
            }
        },
        designation: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Professor',
                    'Associate Professor',
                    'Assistant Professor',
                    'Lecturer',
                    'Head of Department'
                ],
                message: '{VALUE} is not a valid designation'
            }
        },
        experienceYears: {
            type: Number,
            required: true,
        },
        assignedCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
