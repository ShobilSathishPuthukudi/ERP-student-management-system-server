import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loginUser } from './src/modules/auth/auth.service.js';

dotenv.config();

const simulateStudentLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const credentials = {
            email: 'student_demo1@erpdemo.com',
            studentId: 'STU0001',
            dob: '2001-02-01',
            password: null,
            facultyId: null
        };

        console.log('Attempting student login with:', credentials);
        const result = await loginUser(credentials);
        console.log('SUCCESS! Logged in as:', result.user.email);

        await mongoose.disconnect();
    } catch (error) {
        console.error('LOGIN FAILED:', error.message);
    }
};

simulateStudentLogin();
