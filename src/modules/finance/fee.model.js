import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        totalFee: {
            type: Number,
            required: true,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        dueAmount: {
            type: Number,
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        paymentDate: {
            type: Date,
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Online'],
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Pending', 'Partial'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
