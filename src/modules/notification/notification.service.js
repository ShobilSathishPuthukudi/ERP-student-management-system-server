import Notification from './notification.model.js';

/**
 * Service to send a notification.
 */
export const sendNotificationService = async (data) => {
    return await Notification.create(data);
};

/**
 * Service to get notifications for the logged-in user.
 */
export const getMyNotificationsService = async (userId, role) => {
    return await Notification.find({
        $or: [
            { recipientId: userId },
            { recipientRole: role },
            { recipientRole: 'all' }
        ]
    }).sort({ createdAt: -1 });
};

/**
 * Service to mark a notification as read.
 */
export const markAsReadService = async (notificationId, userId) => {
    return await Notification.findOneAndUpdate(
        { _id: notificationId, recipientId: userId },
        { isRead: true },
        { new: true }
    );
};
