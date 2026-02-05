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
        rl.question('⚠️ This will CLEAR and REPAIR all ERP data (preserving admin). Type YES to proceed: ', (answer) => {
            resolve(answer.toUpperCase() === 'YES');
        });
    });
};

const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seed = async () => {
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== undefined) {
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
        console.log('Connected to MongoDB for Repair & Seeding...');

        // Clear existing ERP records (preserve admin accounts)
        await Promise.all([
            Student.deleteMany({}),
            Faculty.deleteMany({}),
            Course.deleteMany({}),
            Batch.deleteMany({}),
            Fee.deleteMany({}),
            Attendance.deleteMany({}),
            User.deleteMany({ role: { $in: ['faculty', 'student'] } })
        ]);

        console.log('Broken test data cleared.');

        // 1. Generate COMPLETE Courses
        const coursesData = [
            { courseName: 'Full Stack Development', courseCode: 'FSD-001', durationMonths: 6, credits: 24, feeAmount: 45000, department: 'School of Engineering', description: 'Advanced web tech and systems design.', status: 'active' },
            { courseName: 'Digital Marketing Essentials', courseCode: 'DM-002', durationMonths: 3, credits: 12, feeAmount: 25000, department: 'Business Management', description: 'SEO, SEM, and social media branding.', status: 'active' },
            { courseName: 'Professional Nursing', courseCode: 'NS-003', durationMonths: 12, credits: 60, feeAmount: 85000, department: 'Medical Sciences', description: 'Clinical practice and healthcare basics.', status: 'active' },
            { courseName: 'Graphic & UI/UX Design', courseCode: 'DS-004', durationMonths: 4, credits: 16, feeAmount: 35000, department: 'Creative Arts', description: 'Visual communication and user interfaces.', status: 'active' },
            { courseName: 'Cyber Security & Ethics', courseCode: 'CS-005', durationMonths: 8, credits: 32, feeAmount: 60000, department: 'Computer Science', description: 'Network protection and ethical hacking.', status: 'active' },
            { courseName: 'Fine Arts & Painting', courseCode: 'FA-006', durationMonths: 24, credits: 80, feeAmount: 70000, department: 'Creative Arts', description: 'Traditional arts and modern expression.', status: 'active' },
            { courseName: 'Psychology of Human Behavior', courseCode: 'PY-007', durationMonths: 24, credits: 90, feeAmount: 75000, department: 'Social Sciences', description: 'Understanding human mind and emotions.', status: 'active' },
            { courseName: 'Robotics & Automation', courseCode: 'RB-008', durationMonths: 6, credits: 24, feeAmount: 55000, department: 'School of Engineering', description: 'Embedded systems and AI in robotics.', status: 'active' }
        ];

        const courses = await Course.insertMany(coursesData);
        console.log(`✅ Student-ready courses: ${courses.length}`);

        // 2. Generate COMPLETE Faculty
        const hashedPassword = await hashPassword('password123');
        const facultyUsers = [];
        for (let i = 1; i <= 12; i++) {
            facultyUsers.push({
                name: `Faculty Member ${i}`,
                email: `faculty${i}@erpdemo.com`,
                password: hashedPassword,
                role: 'faculty',
                isActive: true
            });
        }
        const createdUsers = await User.insertMany(facultyUsers);

        const facultyProfiles = createdUsers.map((user, idx) => ({
            userId: user._id,
            fullName: user.name,
            email: user.email,
            phone: `+91-9888${idx.toString().padStart(6, '0')}`,
            department: courses[idx % courses.length].department,
            designation: idx % 3 === 0 ? 'Professor' : 'Assistant Professor',
            experienceYears: 5 + (idx % 10),
            assignedCourses: [courses[idx % courses.length]._id],
            status: 'active'
        }));
        const faculty = await Faculty.insertMany(facultyProfiles);
        console.log(`✅ Faculty specialists: ${faculty.length}`);

        // 3. Generate COMPLETE Batches
        const batchesData = [];
        for (let i = 0; i < 6; i++) {
            const course = courses[i % courses.length];
            const fac = faculty[i % faculty.length];
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 2);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + course.durationMonths);

            batchesData.push({
                batchName: `Batch-${course.courseCode}-${i + 1}`,
                courseId: course._id,
                facultyId: fac._id,
                students: [],
                startDate,
                endDate,
                maxStudents: 30,
                scheduleInfo: 'Mon-Fri, 9:00 AM - 1:00 PM',
                status: 'Active'
            });
        }
        const batches = await Batch.insertMany(batchesData);
        console.log(`✅ Active batches: ${batches.length}`);

        // 4. Generate COMPLETE Students
        const studentsData = [];
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        for (let i = 1; i <= 60; i++) {
            const batchIdx = i % batches.length;
            const batch = batches[batchIdx];
            const course = courses.find(c => c._id.equals(batch.courseId));
            const createdAt = getRandomDate(sixMonthsAgo, new Date());

            studentsData.push({
                studentId: `STU${i.toString().padStart(4, '0')}`,
                fullName: `Student FullName ${i}`,
                email: `student_demo${i}@erpdemo.com`,
                phone: `91002233${i.toString().padStart(2, '0')}`,
                gender: i % 2 === 0 ? 'Female' : 'Male',
                dob: new Date(2000 + (i % 5), i % 12, (i % 28) + 1),
                address: `${i * 10}, Demo Street, Tech City - 400${i.toString().padStart(3, '0')}`,
                courseId: course._id,
                batchId: batch._id,
                status: 'active',
                createdAt
            });
        }
        const students = await Student.insertMany(studentsData);

        // Update batches with students
        for (const batch of batches) {
            const batchStudents = students.filter(s => s.batchId.equals(batch._id)).map(s => s._id);
            await Batch.findByIdAndUpdate(batch._id, { $set: { students: batchStudents } });
        }
        console.log(`✅ Student records: ${students.length}`);

        // 5. Generate Fees (for Analytics)
        const feesData = [];
        for (const student of students) {
            const course = courses.find(c => c._id.equals(student.courseId));
            const totalAmount = course.feeAmount;
            const paidAmount = Math.floor(totalAmount * (0.6 + Math.random() * 0.4));
            const pendingAmount = totalAmount - paidAmount;
            const status = pendingAmount === 0 ? 'Paid' : 'Partial';

            feesData.push({
                studentId: student._id,
                courseId: student.courseId,
                totalFee: totalAmount,
                paidAmount,
                dueAmount: pendingAmount,
                paymentStatus: status,
                createdAt: student.createdAt
            });
        }
        await Fee.insertMany(feesData);
        console.log(`✅ Revenue records: ${feesData.length}`);

        // 6. Generate Attendance (for Charts)
        const attendanceData = [];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        for (const batch of batches) {
            for (let d = 0; d < 30; d++) {
                const date = new Date(thirtyDaysAgo);
                date.setDate(date.getDate() + d);
                if (date.getDay() === 0) continue;

                const batchStudents = students.filter(s => s.batchId.equals(batch._id));
                const records = batchStudents.map(s => ({
                    studentId: s._id,
                    status: Math.random() > 0.15 ? 'Present' : 'Absent'
                }));

                attendanceData.push({
                    batchId: batch._id,
                    students: records,
                    date,
                    markedBy: createdUsers.find(u => u._id.equals(batch.facultyId))?._id || createdUsers[0]._id
                });
            }
        }
        await Attendance.insertMany(attendanceData);
        console.log(`✅ Daily logs: ${attendanceData.length}`);

        console.log('\n🚀 ALL SYSTEMS REPAIRED & SEEDED SUCCESSFULLY! 🚀');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Repair Failed!');
        console.error(error);
        process.exit(1);
    }
};

seed();
