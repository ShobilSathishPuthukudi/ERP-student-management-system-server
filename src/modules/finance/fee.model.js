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
