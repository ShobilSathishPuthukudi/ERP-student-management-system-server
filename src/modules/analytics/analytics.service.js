import Student from '../student/student.model.js';
import Course from '../course/course.model.js';
import Faculty from '../faculty/faculty.model.js';
import Fee from '../finance/fee.model.js';
import Batch from '../batch/batch.model.js';
import Attendance from '../attendance/attendance.model.js';

/**
 * Service to calculate comprehensive analytics for the admin dashboard
 */
export const getAnalyticsOverviewService = async () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 1. Parallel counts and basic data
    const [
        totalStudents,
        totalFaculty,
        totalCourses,
        totalBatches,
        fees,
        allStudents,
        allAttendance,
        recentStudents,
        recentFaculty,
        recentFees
    ] = await Promise.all([
        Student.countDocuments(),
        Faculty.countDocuments(),
        Course.countDocuments(),
        Batch.countDocuments(),
        Fee.find(),
        Student.find({ createdAt: { $gte: sixMonthsAgo } }, 'createdAt'),
        Attendance.find({
            date: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)
            }
        }), // Last 7 days including today
        Student.find().sort({ createdAt: -1 }).limit(3).lean(),
        Faculty.find().sort({ createdAt: -1 }).limit(3).lean(),
        Fee.find().sort({ createdAt: -1 }).limit(3).populate('studentId', 'fullName').lean()
    ]);

    // 2. Financial KPIs
    const collected = fees.reduce((acc, fee) => acc + (fee.paidAmount || 0), 0);
    const pending = fees.reduce((acc, fee) => acc + (fee.dueAmount || 0), 0);

    // 3. Monthly Student Growth (last 6 months)
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push(d.toLocaleString('default', { month: 'short' }));
    }

    const growthMap = {};
    months.forEach(m => growthMap[m] = 0);

    allStudents.forEach(s => {
        const month = s.createdAt.toLocaleString('default', { month: 'short' });
        if (growthMap[month] !== undefined) growthMap[month]++;
    });

    const studentsGrowth = months.map(m => ({
        name: m,
        students: growthMap[m]
    }));

    // 4. Revenue Stats (Monthly Collections)
    const revenueMap = {};
    months.forEach(m => revenueMap[m] = 0);

    fees.forEach(f => {
        if (f.createdAt >= sixMonthsAgo) {
            const month = f.createdAt.toLocaleString('default', { month: 'short' });
            if (revenueMap[month] !== undefined) revenueMap[month] += (f.paidAmount || 0);
        }
    });

    const revenueStats = months.map(m => ({
        name: m,
        amount: revenueMap[m]
    }));

    // 5. Attendance Stats (Simplified Pie Chart Data)
    let totalPresent = 0;
    let totalAbsent = 0;

    allAttendance.forEach(session => {
        session.students.forEach(s => {
            if (s.status === 'Present') totalPresent++;
            else totalAbsent++;
        });
    });

    const totalAttendanceRecords = totalPresent + totalAbsent;
    const attendancePercentage = totalAttendanceRecords > 0
        ? Math.round((totalPresent / totalAttendanceRecords) * 100)
        : 0;

    // 6. Recent Activity Compilation
    const activities = [
        ...recentStudents.map(s => ({
            type: 'student',
            message: `New student enrolled: ${s.fullName}`,
            time: s.createdAt,
            icon: '👨‍🎓',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        })),
        ...recentFaculty.map(f => ({
            type: 'faculty',
            message: `New faculty joined: ${f.fullName}`,
            time: f.createdAt,
            icon: '👩‍🏫',
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        })),
        ...recentFees.map(f => ({
            type: 'fee',
            message: `Fee payment received from ${f.studentId?.fullName || 'Student'}: ₹${f.paidAmount}`,
            time: f.createdAt,
            icon: '💰',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

    const attendanceLogMap = {};
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayName = dayNames[d.getDay()];
        last7Days.push(dayName);
        attendanceLogMap[dayName] = 0;
    }

    allAttendance.forEach(session => {
        const dayName = dayNames[new Date(session.date).getDay()];
        if (attendanceLogMap[dayName] !== undefined) {
            attendanceLogMap[dayName] += session.students.filter(s => s.status === 'Present').length;
        }
    });

    const attendanceLog = last7Days.map(day => ({
        name: day,
        value: attendanceLogMap[day]
    }));

    return {
        kpis: {
            totalStudents,
            totalFaculty,
            totalCourses,
            totalBatches,
            revenueCollected: collected,
            revenuePending: pending,
            attendanceRate: attendancePercentage
        },
        studentsGrowth,
        revenueStats,
        attendanceStats: [
            { name: 'Present', value: totalPresent || 1, color: '#10b981' },
            { name: 'Absent', value: totalAbsent || 0, color: '#ef4444' }
        ],
        attendanceLog,
        recentActivity: activities
    };
};
