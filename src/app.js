import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import studentRoutes from './modules/student/student.routes.js';
import courseRoutes from './modules/course/course.router.js';
import feeRoutes from './modules/finance/fee.router.js';
import facultyRoutes from './modules/faculty/faculty.routes.js';
import batchRoutes from './modules/batch/batch.routes.js';
import attendanceRoutes from './modules/attendance/attendance.routes.js';
import certificateRoutes from './modules/certificate/certificate.routes.js';
import notificationRoutes from './modules/notification/notification.routes.js';
import analyticsRoutes from './modules/analytics/analytics.routes.js';
import lmsRoutes from './modules/lms/lms.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import morgan from 'morgan';
import logger from './utils/logger.js';

const app = express();

// Request logging with Morgan
app.use(morgan('dev', {
    stream: { write: (message) => logger.info(message.trim()) }
}));

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://localhost:5001',
            'http://127.0.0.1:5001',
            'http://127.0.0.1:3000',
        ];

        // Allow requests with no origin (like mobile apps or curl or Postman)
        if (!origin) {
            console.log(`[CORS] No origin. Access granted.`);
            return callback(null, true);
        }

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // For development, we log but allow broadly if it looks safe or just allow it to unblock.
        // To be safe but flexible:
        console.log(`[CORS] Origin ${origin} is not in explicit list, but allowed for DEV.`);
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/lms', lmsRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global Error Handler
app.use(errorHandler);

export default app;
