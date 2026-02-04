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

const app = express();

app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
