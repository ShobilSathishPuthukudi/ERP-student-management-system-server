import express from 'express';
import {
    sendNotification,
    getMyNotifications,
    markAsRead,
} from './notification.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Admin only: Configure/Send notifications
router.post('/send', authorizeRoles('admin'), sendNotification);

// All roles: Receive/View their own notifications
router.get('/my', getMyNotifications);

// Mark as read
router.patch('/:id/read', markAsRead);

export default router;
