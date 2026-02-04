import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // Optional if sending to a whole role
        },
        recipientRole: {
            type: String,
            enum: ['admin', 'student', 'accountant', 'faculty', 'all'],
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['info', 'warning', 'success', 'error'],
            default: 'info',
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
