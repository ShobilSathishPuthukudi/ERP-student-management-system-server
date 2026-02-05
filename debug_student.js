import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/modules/student/student.model.js';
import User from './src/modules/auth/user.model.js';

dotenv.config();

const debugStudent = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = 'student_demo1@erpdemo.com';
        const user = await User.findOne({ email });
        console.log('User Record:', user ? { email: user.email, role: user.role } : 'Not found');

        const student = await Student.findOne({ studentId: 'STU0001' });
        console.log('Student Record:', student ? {
            email: student.email,
            studentId: student.studentId,
            dob: student.dob,
            dobString: student.dob ? new Date(student.dob).toISOString() : 'N/A'
        } : 'Not found');

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

debugStudent();
