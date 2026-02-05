
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/modules/student/student.model.js';
import Faculty from './src/modules/faculty/faculty.model.js';
import User from './src/modules/auth/user.model.js';

dotenv.config({ path: '/Users/shobilsathish/Desktop/SMS/server/.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const getCredentials = async () => {
    await connectDB();
    try {
        console.log('\n--- LATEST CREDENTIALS ---\n');

        // 1. Last Created Student
        const student = await Student.findOne().sort({ createdAt: -1 });
        if (student) {
            console.log('--- DATA FOR LAST STUDENT ---');
            console.log(`Role:       Student`);
            console.log(`Name:       ${student.fullName}`);
            console.log(`Email:      ${student.email}`);
            console.log(`Student ID: ${student.studentId}`);
            console.log(`DOB:        ${student.dob ? new Date(student.dob).toISOString().split('T')[0] : 'N/A'}`);
            console.log('-----------------------------\n');
        } else {
            console.log('No students found.\n');
        }

        // 2. Last Created Faculty
        const faculty = await Faculty.findOne().sort({ createdAt: -1 });
        if (faculty) {
            console.log('--- DATA FOR LAST FACULTY ---');
            console.log(`Role:       Faculty`);
            console.log(`Name:       ${faculty.fullName}`);
            console.log(`Email:      ${faculty.email}`);
            console.log(`Faculty ID: ${faculty.facultyId}`);
            console.log(`DOB:        ${faculty.dob ? new Date(faculty.dob).toISOString().split('T')[0] : 'N/A'}`);
            console.log('-----------------------------\n');
        } else {
            console.log('No faculty found.\n');
        }

        // 3. Last Created User (Generic)
        const user = await User.findOne().sort({ createdAt: -1 });
        if (user) {
            console.log('--- LAST REGISTERED USER (AUTH DB) ---');
            console.log(`Role:       ${user.role}`);
            console.log(`Name:       ${user.name}`);
            console.log(`Email:      ${user.email}`);
            if (user.role === 'admin') {
                console.log(`Password:   (Hidden, likely standard admin password)`);
            }
            console.log('-----------------------------\n');
        }

    } catch (error) {
        console.error('Error fetching credentials:', error);
    } finally {
        await mongoose.disconnect();
    }
};

getCredentials();
