import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loginUser } from './src/modules/auth/auth.service.js';

dotenv.config();

const simulateLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const credentials = {
            email: 'faculty-x@mail.com',
            facultyId: 'FAC-2026-0017',
            dob: '2000-05-20',
            password: null,
            studentId: null
        };

        console.log('Attempting login with:', credentials);
        const result = await loginUser(credentials);
        console.log('Login Result:', result.user.email, 'Role:', result.user.role);

        await mongoose.disconnect();
    } catch (error) {
        console.error('SIMULATION FAILED:', error.message);
        if (error.stack) console.error(error.stack);
    }
};

simulateLogin();
