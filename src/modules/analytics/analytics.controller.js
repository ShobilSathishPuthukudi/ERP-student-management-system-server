import { getAnalyticsOverviewService } from './analytics.service.js';

/**
 * Controller to handle analytics overview requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAnalyticsOverview = async (req, res, next) => {
    try {
        const stats = await getAnalyticsOverviewService(req.query);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        next(error);
    }
};
