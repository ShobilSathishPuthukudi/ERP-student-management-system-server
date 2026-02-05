import Student from './student.model.js';
import Course from '../course/course.model.js';
import Batch from '../batch/batch.model.js';
import User from '../auth/user.model.js';
import { hashPassword } from '../../utils/hashPassword.js';

/**
 * Service to create a new student record
 */
export const createStudentService = async (studentData) => {
    const {
        fullName,
        email,
        phone,
        gender,
        dob,
        address,
        courseId,
        batchId,
        status,
        enrolledCourses,
    } = studentData;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        throw new Error('Student with this email already exists');
    }

    // Age validation
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 15) {
        throw new Error('Student must be at least 15 years old');
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Selected course not found');
    }

    if (course.minAge && age < course.minAge) {
        throw new Error(`This course requires a minimum age of ${course.minAge} years`);
    }

    if (course.maxAge && age > course.maxAge) {
        throw new Error(`This course has a maximum age limit of ${course.maxAge} years`);
    }

    // Check if user account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User account with this email already exists');
    }

    // Always generate studentId automatically
    const count = await Student.countDocuments();
    const year = new Date().getFullYear();
    const studentId = `STU-${year}-${(count + 1).toString().padStart(4, '0')}`;

    const normalizedEmail = email.toLowerCase().trim();

    // Create student profile
    const student = await Student.create({
        studentId,
        fullName,
        email: normalizedEmail,
        phone,
        gender,
        dob,
        address,
        courseId,
        batchId,
        status: status || 'active',
        enrolledCourses: enrolledCourses || [],
    });

    // Create user account for the student
    await User.create({
        name: fullName,
        email: normalizedEmail,
        password: null, // No password for students
        role: 'student',
        isActive: true,
    });

    // Populate the newly created student for UI consistency
    const populatedStudent = await Student.findById(student._id)
        .populate('courseId', 'courseName department courseCode')
        .populate('batchId', 'batchName scheduleInfo');

    return populatedStudent;
};

/**
 * Service to fetch all students with optional filters
 */
export const getAllStudentsService = async (filters) => {
    const { status, courseId, batchId } = filters;

    const query = {};
    if (status) query.status = status;
    if (courseId) query.courseId = courseId;
    if (batchId) query.batchId = batchId;

    const students = await Student.find(query)
        .populate('courseId', 'courseName department courseCode')
        .populate('batchId', 'batchName scheduleInfo')
        .sort({ createdAt: -1 });

    return students;
};

/**
 * Service to fetch a single student by ID
 */
export const getStudentByIdService = async (studentId) => {
    const student = await Student.findById(studentId)
        .populate('courseId')
        .populate('batchId')
        .populate('enrolledCourses');

    if (!student) {
        throw new Error('Student not found');
    }

    return student;
};

/**
 * Service to update an existing student record
 */
export const updateStudentService = async (studentId, updateData) => {
    const student = await Student.findByIdAndUpdate(studentId, updateData, {
        new: true,
        runValidators: true,
    }).populate('courseId', 'courseName department courseCode')
        .populate('batchId', 'batchName scheduleInfo');

    if (!student) {
        throw new Error('Student not found');
    }

    return student;
};

/**
 * Service to enroll a student in an online course
 */
export const enrollOnlineCourseService = async (studentId, courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error('Student not found');
    }

    const isAlreadyEnrolled = student.enrolledCourses.some(
        (id) => id.toString() === courseId.toString()
    );

    if (!isAlreadyEnrolled) {
        student.enrolledCourses.push(courseId);
        await student.save();
    }

    return student;
};
