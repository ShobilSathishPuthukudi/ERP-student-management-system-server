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
        rl.question('⚠️ This will CLEAR Students, Faculty, Courses, Batches, Fees, and Attendance. Are you sure? (yes/no): ', (answer) => {
            resolve(answer.toLowerCase() === 'yes');
        });
    });
};

const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seedERP = async () => {
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
        console.log('🔗 Connected to MongoDB...');

        // Clear existing data EXCEPT Admin users
        console.log('🧹 Clearing existing collections...');
        await Promise.all([
            Student.deleteMany({}),
            Faculty.deleteMany({}),
            Course.deleteMany({}),
            Batch.deleteMany({}),
            Fee.deleteMany({}),
            Attendance.deleteMany({}),
            User.deleteMany({ role: { $in: ['faculty', 'student'] } })
        ]);

        const password = await hashPassword('password123');

        // 1. Seed Courses (6 Courses with strict validation)
        const coursesData = [
            {
                courseName: 'Full Stack Web Dev',
                duration: '6 Months',
                mode: 'Hybrid',
                feeAmount: 48000,
                category: 'Skill-Improvement',
                department: 'Professional Development Center',
                requirements: { minQualification: 'Graduation', hasLabWork: true }
            },
            {
                courseName: 'Business Analytics',
                duration: '2 Years',
                mode: 'Online',
                feeAmount: 42000,
                category: 'Postgraduate',
                department: 'General Academics',
                requirements: { minQualification: 'Degree', hasLabWork: false }
            },
            {
                courseName: 'Digital Marketing',
                duration: '1 Year',
                mode: 'Online',
                feeAmount: 28000,
                category: 'Skill-Improvement',
                department: 'General Academics',
                requirements: { minQualification: 'None', hasLabWork: false }
            },
            {
                courseName: 'UI/UX Design Masterclass',
                duration: '6 Months',
                mode: 'Hybrid',
                feeAmount: 35000,
                category: 'Skill-Improvement',
                department: 'School of Fine Arts',
                requirements: { minQualification: '12th Pass', hasLabWork: true }
            },
            {
                courseName: 'Clinical Psychology',
                duration: '2 Years',
                mode: 'Offline',
                feeAmount: 55000,
                category: 'Postgraduate',
                department: 'Humanities & Social Sciences',
                requirements: { minQualification: 'Psychology Graduate', hasLabWork: false }
            },
            {
                courseName: 'Basic Anatomy',
                duration: '6 Months',
                mode: 'Offline',
                feeAmount: 50000,
                category: 'Undergraduate',
                department: 'Medical & Allied Sciences',
                requirements: { minQualification: '12th Science', hasLabWork: true }
            }
        ];
        const courses = await Course.insertMany(coursesData);
        console.log(`✅ Courses created: ${courses.length}`);

        // 2. Seed Faculty (10 Faculty)
        const facultyUsersData = [];
        for (let i = 1; i <= 10; i++) {
            facultyUsersData.push({
                name: `ERP Faculty ${i}`,
                email: `faculty_erp${i}@erp.com`,
                password,
                role: 'faculty',
                isActive: true
            });
        }
        const createdFacultyUsers = await User.insertMany(facultyUsersData);

        const facultyProfilesData = createdFacultyUsers.map((user, idx) => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            assignedCourses: [courses[idx % courses.length]._id],
            status: 'active'
        }));
        await Faculty.insertMany(facultyProfilesData);
        console.log(`✅ Faculty created: ${createdFacultyUsers.length}`);

        // 3. Seed Students (50 Students)
        const studentsData = [];
        const educationLevels = ['UG', 'PG', 'Paramedical', 'Arts', 'Skill-Improvement'];
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

        for (let i = 1; i <= 50; i++) {
            const course = courses[Math.floor(Math.random() * courses.length)];
            studentsData.push({
                name: `ERP Student ${i}`,
                email: `student_erp${i}@erp.com`,
                phone: `91876543${i.toString().padStart(2, '0')}`,
                educationLevel: educationLevels[Math.floor(Math.random() * educationLevels.length)],
                currentCourse: course._id,
                enrolledCourses: [course._id],
                status: 'active',
                createdAt: getRandomDate(fourMonthsAgo, new Date())
            });
        }
        const students = await Student.insertMany(studentsData);
        console.log(`✅ Students created: ${students.length}`);

        // 4. Seed Batches (4 Batches)
        const batchesData = [];
        for (let i = 1; i <= 4; i++) {
            const course = courses[i - 1];
            const facultyUser = createdFacultyUsers[i - 1];

            const batchStudents = students.filter(s => s.currentCourse.toString() === course._id.toString()).map(s => s._id);

            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            const end = new Date(start);
            end.setMonth(end.getMonth() + 6);

            batchesData.push({
                batchName: `ERP-Batch-${course.courseName.split(' ')[0]}-${i}`,
                courseId: course._id,
                facultyId: facultyUser._id,
                students: batchStudents,
                startDate: start,
                endDate: end,
                status: 'Active'
            });
        }
        const batches = await Batch.insertMany(batchesData);
        console.log(`✅ Batches created: ${batches.length}`);

        // 5. Seed Fees
        const feesData = students.map(student => {
            const course = courses.find(c => c._id.toString() === student.currentCourse.toString());
            const totalFee = course.feeAmount;
            const paidAmount = Math.floor(totalFee * (0.6 + Math.random() * 0.4));
            const dueAmount = totalFee - paidAmount;

            return {
                studentId: student._id,
                totalFee,
                paidAmount,
                dueAmount,
                paymentStatus: dueAmount === 0 ? 'Paid' : 'Partial'
            };
        });
        await Fee.insertMany(feesData);
        console.log(`✅ Fees created: ${feesData.length}`);

        // 6. Seed Attendance (Last 20 Days)
        const attendanceData = [];
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

        for (let i = 0; i < 20; i++) {
            const currentDate = new Date(twentyDaysAgo);
            currentDate.setDate(currentDate.getDate() + i);

            if (currentDate.getDay() === 0) continue;

            for (const batch of batches) {
                const studentsAttendance = batch.students.map(studentId => ({
                    studentId,
                    status: Math.random() > 0.2 ? 'Present' : 'Absent'
                }));

                if (studentsAttendance.length > 0) {
                    attendanceData.push({
                        batchId: batch._id,
                        students: studentsAttendance,
                        date: currentDate,
                        markedBy: batch.facultyId
                    });
                }
            }
        }
        await Attendance.insertMany(attendanceData);
        console.log(`✅ Attendance logs created: ${attendanceData.length}`);

        console.log('\n🌟 Relational ERP Seeding Completed Successfully! 🌟');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Seeding Failed!');
        console.error(error);
        process.exit(1);
    }
};

seedERP();
