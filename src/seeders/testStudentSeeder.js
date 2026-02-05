import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../modules/auth/user.model.js';
import Student from '../modules/student/student.model.js';
import Course from '../modules/course/course.model.js';
import Batch from '../modules/batch/batch.model.js';
import { hashPassword } from '../utils/hashPassword.js';

dotenv.config();

const seedStudent = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        const email = 'student@test.com';
        const password = 'password123';

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await hashPassword(password);
            user = await User.create({
                name: 'Test Student',
                email,
                password: hashedPassword,
                role: 'student',
                isActive: true
            });
            console.log('✅ Student User created');
        } else {
            console.log('ℹ️ Student User already exists');
        }

        // 2. Get a course and batch for the student
        const course = await Course.findOne();
        const batch = await Batch.findOne();

        if (!course || !batch) {
            console.log('❌ Error: No course or batch found. Please run the main seeder first.');
            process.exit(1);
        }

        // 3. Create/Update student profile
        let studentProfile = await Student.findOne({ email });
        if (!studentProfile) {
            studentProfile = await Student.create({
                studentId: 'STU-TEST-001',
                fullName: 'Test Student',
                email,
                phone: '9876543210',
                gender: 'Male',
                dob: new Date('2000-01-01'),
                address: 'Test Address',
                courseId: course._id,
                batchId: batch._id,
                status: 'active'
            });
            console.log('✅ Student Profile created');
        } else {
            console.log('ℹ️ Student Profile already exists');
        }

        console.log('\n--- Student Credentials ---');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('---------------------------\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedStudent();
