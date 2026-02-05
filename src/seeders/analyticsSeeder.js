import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';

// Models
import User from '../modules/auth/user.model.js';
import Student from '../modules/student/student.model.js';
import Faculty from '../modules/faculty/faculty.model.js';
import Course from '../modules/course/course.model.js';
import Batch from '../modules/batch/batch.model.js';
import Fee from '../modules/finance/fee.model.js';
import Attendance from '../modules/attendance/attendance.model.js';

// Utilities
import { hashPassword } from '../utils/hashPassword.js';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askConfirmation = () => {
    return new Promise((resolve) => {
        rl.question('⚠️ This will CLEAR and SEED analytics data. Are you sure? (yes/no): ', (answer) => {
            resolve(answer.toLowerCase() === 'yes');
        });
    });
};

const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seed = async () => {
    // Basic Environment Check
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev') {
        console.error('❌ Seeder can only be run in development environment.');
        process.exit(1);
    }

    const confirmed = await askConfirmation();
    if (!confirmed) {
        console.log('Seed cancelled.');
        process.exit(0);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing test data
        // We preserve 'admin' and 'accountant' roles to avoid breaking access
        await Promise.all([
            Student.deleteMany({}),
            Faculty.deleteMany({}),
            Course.deleteMany({}),
            Batch.deleteMany({}),
            Fee.deleteMany({}),
            Attendance.deleteMany({}),
            User.deleteMany({ role: { $in: ['faculty', 'student'] } })
        ]);

        console.log('Old test data cleared.');

        // 1. Seed Courses
        const coursesData = [
            { courseName: 'Full Stack Development', duration: '6 Months', mode: 'Hybrid', feeAmount: 45000, category: 'Skill-Improvement', department: 'Professional Development Center', requirements: { minQualification: 'Graduation', hasLabWork: true } },
            { courseName: 'Bachelor of Fine Arts', duration: '3 Years', mode: 'Offline', feeAmount: 120000, category: 'Arts', department: 'School of Fine Arts', requirements: { minQualification: '12th Pass', hasLabWork: true } },
            { courseName: 'Nursing Essentials', duration: '1 Year', mode: 'Offline', feeAmount: 85000, category: 'Paramedical', department: 'Medical & Allied Sciences', requirements: { minQualification: '12th Science', hasLabWork: true } },
            { courseName: 'Modern Philosophy', duration: '2 Years', mode: 'Online', feeAmount: 35000, category: 'Postgraduate', department: 'Humanities & Social Sciences', requirements: { minQualification: 'Degree', hasLabWork: false } },
            { courseName: 'Graphic Design Masterclass', duration: '4 Months', mode: 'Online', feeAmount: 25000, category: 'Arts', department: 'School of Fine Arts', requirements: { minQualification: '10th Pass', hasLabWork: false } },
            { courseName: 'Clinical Psychology', duration: '2 Years', mode: 'Hybrid', feeAmount: 95000, category: 'Postgraduate', department: 'Humanities & Social Sciences', requirements: { minQualification: 'Psychology Graduate', hasLabWork: true } },
            { courseName: 'Digital Marketing', duration: '3 Months', mode: 'Online', feeAmount: 20000, category: 'Skill-Improvement', department: 'General Academics', requirements: { minQualification: 'None', hasLabWork: false } },
            { courseName: 'Basic Anatomy', duration: '6 Months', mode: 'Offline', feeAmount: 50000, category: 'Undergraduate', department: 'Medical & Allied Sciences', requirements: { minQualification: '12th Science', hasLabWork: true } }
        ];

        const courses = await Course.insertMany(coursesData);
        console.log(`✅ Inserted ${courses.length} courses.`);

        // 2. Seed Faculty
        const hashedPassword = await hashPassword('password123');
        const facultyUsersData = [];
        for (let i = 1; i <= 15; i++) {
            facultyUsersData.push({
                name: `Faculty Member ${i}`,
                email: `faculty${i}@sms.edu`,
                password: hashedPassword,
                role: 'faculty',
                isActive: true
            });
        }
        const facultyUsers = await User.insertMany(facultyUsersData);

        const facultyProfilesData = facultyUsers.map(user => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            assignedCourses: [courses[Math.floor(Math.random() * courses.length)]._id],
            status: 'active'
        }));
        await Faculty.insertMany(facultyProfilesData);
        console.log(`✅ Inserted ${facultyUsers.length} faculty profiles.`);

        // 3. Seed Students
        const studentsData = [];
        const educationLevels = ['UG', 'PG', 'Paramedical', 'Arts', 'Skill-Improvement'];
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        for (let i = 1; i <= 100; i++) {
            const course = courses[Math.floor(Math.random() * courses.length)];
            const createdAt = getRandomDate(sixMonthsAgo, new Date());
            studentsData.push({
                name: `Student ${i}`,
                email: `student${i}@example.com`,
                phone: `910000${i.toString().padStart(4, '0')}`,
                educationLevel: educationLevels[Math.floor(Math.random() * educationLevels.length)],
                currentCourse: course._id,
                status: 'active',
                enrolledCourses: [course._id],
                createdAt
            });
        }
        const students = await Student.insertMany(studentsData);
        console.log(`✅ Inserted ${students.length} students.`);

        // 4. Seed Batches
        const batchesData = [];
        for (let i = 1; i <= 5; i++) {
            const course = courses[Math.floor(Math.random() * courses.length)];
            const faculty = facultyUsers[Math.floor(Math.random() * facultyUsers.length)];
            const batchStudents = students.filter(s => s.currentCourse.toString() === course._id.toString()).slice(0, 20);

            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 3));
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 6);

            batchesData.push({
                batchName: `Batch ${course.courseName.split(' ')[0]} ${i}`,
                courseId: course._id,
                facultyId: faculty._id,
                students: batchStudents.map(s => s._id),
                startDate,
                endDate,
                status: 'Active'
            });
        }
        const batches = await Batch.insertMany(batchesData);
        console.log(`✅ Inserted ${batches.length} batches.`);

        // 5. Seed Fees
        const feesData = [];
        for (const student of students) {
            const course = courses.find(c => c._id.toString() === student.currentCourse.toString());
            const totalFee = course.feeAmount;
            const paidAmount = Math.floor(totalFee * (0.6 + Math.random() * 0.4)); // 60-100%
            const dueAmount = totalFee - paidAmount;
            const status = dueAmount === 0 ? 'Paid' : 'Partial';

            feesData.push({
                studentId: student._id,
                totalFee,
                paidAmount,
                dueAmount,
                paymentStatus: status,
                createdAt: student.createdAt
            });
        }
        await Fee.insertMany(feesData);
        console.log(`✅ Inserted ${students.length} fee records.`);

        // 6. Seed Attendance
        const attendanceData = [];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        for (const batch of batches) {
            for (let d = 0; d < 30; d++) {
                const date = new Date(thirtyDaysAgo);
                date.setDate(date.getDate() + d);

                if (date.getDay() === 0) continue; // Skip Sundays

                const studentsAttendance = batch.students.map(studentId => {
                    const rand = Math.random();
                    let status = 'Present';
                    if (rand > 0.85) status = 'Absent';
                    else if (rand > 0.75) status = 'Late';
                    return { studentId, status };
                });

                attendanceData.push({
                    batchId: batch._id,
                    students: studentsAttendance,
                    date,
                    markedBy: batch.facultyId
                });
            }
        }
        await Attendance.insertMany(attendanceData);
        console.log(`✅ Inserted ${attendanceData.length} daily attendance logs.`);

        console.log('\n🌟 Seeding Completed Successfully! 🌟');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Seeding Failed!');
        console.error(error);
        process.exit(1);
    }
};

seed();
