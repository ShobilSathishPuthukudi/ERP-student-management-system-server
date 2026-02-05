import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Faculty from './src/modules/faculty/faculty.model.js';
import User from './src/modules/auth/user.model.js';

dotenv.config();

const checkFaculty = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const email = 'faculty-x@mail.com';
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        console.log('User found:', user ? { id: user._id, role: user.role, email: user.email } : 'Not found');

        const faculty = await Faculty.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        console.log('Faculty found:', faculty ? { id: faculty._id, facultyId: faculty.facultyId, email: faculty.email, dob: faculty.dob } : 'Not found');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkFaculty();
