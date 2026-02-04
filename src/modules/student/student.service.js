import Student from './student.model.js';
import Course from '../course/course.model.js';

/**
 * Service to create a new student record
 * @param {Object} studentData - Data for the new student
 * @returns {Promise<Object>} The created student document
 */
export const createStudentService = async (studentData) => {
    const {
        name,
        email,
        phone,
        educationLevel,
        currentCourse,
        status,
        enrolledCourses,
    } = studentData;

    // Check if student with same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        throw new Error('Student with this email already exists');
    }

    // Create and return the student document
    const student = await Student.create({
        name,
        email,
        phone,
        educationLevel,
        currentCourse,
        status,
        enrolledCourses,
    });

    return student;
};

/**
 * Service to fetch all students with optional filters
 * @param {Object} filters - Filter criteria (educationLevel, status, currentCourse)
 * @returns {Promise<Array>} List of students sorted by createdAt descending
 */
export const getAllStudentsService = async (filters) => {
    const { educationLevel, status, currentCourse } = filters;

    // Build dynamic MongoDB filter object
    const query = {};
    if (educationLevel) query.educationLevel = educationLevel;
    if (status) query.status = status;
    if (currentCourse) query.currentCourse = currentCourse;

    // Fetch students, populate currentCourse, and sort by newest first
    const students = await Student.find(query)
        .populate('currentCourse', 'courseName mode')
        .sort({ createdAt: -1 });

    return students;
};

/**
 * Service to fetch a single student by ID
 * @param {string} studentId - The ID of the student
 * @returns {Promise<Object>} The student document with populated references
 */
export const getStudentByIdService = async (studentId) => {
    const student = await Student.findById(studentId)
        .populate('currentCourse')
        .populate('enrolledCourses');

    if (!student) {
        throw new Error('Student not found');
    }

    return student;
};

/**
 * Service to update an existing student record
 * @param {string} studentId - The ID of the student to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} The updated student document
 */
export const updateStudentService = async (studentId, updateData) => {
    const student = await Student.findByIdAndUpdate(studentId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!student) {
        throw new Error('Student not found');
    }

    return student;
};

/**
 * Service to enroll a student in an online course
 * @param {string} studentId - The ID of the student
 * @param {string} courseId - The ID of the course to enroll in
 * @returns {Promise<Object>} The updated student document
 */
export const enrollOnlineCourseService = async (studentId, courseId) => {
    // Fetch course by ID to check its mode
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    if (course.mode !== 'Online') {
        throw new Error('Only online courses can be self-enrolled');
    }

    // Find student and push courseId into enrolledCourses if not already present
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error('Student not found');
    }

    // Check if already enrolled
    const isAlreadyEnrolled = student.enrolledCourses.some(
        (id) => id.toString() === courseId.toString()
    );

    if (!isAlreadyEnrolled) {
        student.enrolledCourses.push(courseId);
        await student.save();
    }

    return student;
};
