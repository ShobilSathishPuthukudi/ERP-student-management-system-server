import {
    sendNotificationService,
    getMyNotificationsService,
    markAsReadService,
} from './notification.service.js';

export const sendNotification = async (req, res) => {
    try {
        const data = { ...req.body, createdBy: req.user.id };
        const notification = await sendNotificationService(data);
        res.status(201).json({
            success: true,
            message: 'Notification sent successfully',
            data: notification,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await getMyNotificationsService(req.user.id, req.user.role);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const notification = await markAsReadService(req.params.id, req.user.id);
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
