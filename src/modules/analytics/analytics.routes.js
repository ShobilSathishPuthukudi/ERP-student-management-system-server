import express from 'express';
import { getAnalyticsOverview } from './analytics.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { analyticsOverviewValidator } from './analytics.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';

const router = express.Router();

// Apply auth middleware to all analytics routes
router.use(authMiddleware);

// Route: GET /api/analytics/overview
// Access: Private (Admin only)
router.get(
    '/overview',
    authorizeRoles('admin'),
    analyticsOverviewValidator,
    validate,
    getAnalyticsOverview
);

export default router;
