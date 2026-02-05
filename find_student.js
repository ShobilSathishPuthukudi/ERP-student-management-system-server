import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/modules/student/student.model.js';

dotenv.config();

const listStudents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const students = await Student.find().limit(1);
        if (students.length > 0) {
            const s = students[0];
            console.log('Student Credentials:');
            console.log('Email:', s.email);
            console.log('Student ID:', s.studentId);
            // dob is stored as Date, we need it in DD-MM-YYYY format for login
            const dob = new Date(s.dob);
            const formattedDob = `${dob.getUTCDate().toString().padStart(2, '0')}${(dob.getUTCMonth() + 1).toString().padStart(2, '0')}${dob.getUTCFullYear()}`;
            console.log('DOB (for input):', formattedDob);
        } else {
            console.log('No students found in database.');
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

listStudents();
