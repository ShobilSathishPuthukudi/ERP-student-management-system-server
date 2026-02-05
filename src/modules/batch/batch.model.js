import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
    {
        batchName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        maxStudents: {
            type: Number,
            required: true,
        },
        scheduleInfo: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Upcoming', 'Active', 'Completed'],
            default: 'Upcoming',
        },
    },
    {
        timestamps: true,
    }
);

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
