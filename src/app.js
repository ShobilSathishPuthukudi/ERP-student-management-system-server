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
            process.env.CLIENT_URL, // From Vercel
        ].filter(Boolean); // Remove undefined/null

        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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
