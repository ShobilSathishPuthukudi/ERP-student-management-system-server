import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/modules/auth/user.model.js';
import Student from './src/modules/student/student.model.js';
import Faculty from './src/modules/faculty/faculty.model.js';

dotenv.config();

const syncUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        // Sync Students
        const students = await Student.find();
        for (const student of students) {
            const userExists = await User.findOne({ email: student.email });
            if (!userExists) {
                console.log(`Creating user for student: ${student.email}`);
                await User.create({
                    name: student.fullName || student.name || 'Student',
                    email: student.email,
                    role: 'student',
                    isActive: true
                });
            }
        }

        // Sync Faculty
        const faculties = await Faculty.find();
        for (const faculty of faculties) {
            const userExists = await User.findOne({ email: faculty.email });
            if (!userExists) {
                console.log(`Creating user for faculty: ${faculty.email}`);
                await User.create({
                    name: faculty.fullName || faculty.name || 'Faculty',
                    email: faculty.email,
                    role: 'faculty',
                    isActive: true
                });
            }
        }

        console.log('Sync complete');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Sync failed:', error);
    }
};

syncUsers();
