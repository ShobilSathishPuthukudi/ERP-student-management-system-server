import LmsCourse from './lmsCourse.model.js';
import LmsEnrollment from './lmsEnrollment.model.js';
import Faculty from '../faculty/faculty.model.js';
import Student from '../student/student.model.js';

// --- Faculty Methods ---

export const submitCourseForApproval = async (facultyEmail, courseData) => {
    // Search by email is more robust given the current sync state
    const faculty = await Faculty.findOne({ email: facultyEmail });
    if (!faculty) throw new Error('Faculty profile not found');

    const course = await LmsCourse.create({
        ...courseData,
        instructor: faculty._id,
        status: 'pending'
    });
    return course;
};

export const getInstructorCourses = async (facultyEmail) => {
    const faculty = await Faculty.findOne({ email: facultyEmail });
    if (!faculty) throw new Error('Faculty profile not found');

    return await LmsCourse.find({ instructor: faculty._id }).sort('-createdAt');
};

// --- Admin Methods ---

export const getPendingCourses = async () => {
    return await LmsCourse.find({ status: 'pending' }).populate('instructor', 'fullName department');
};

export const updateCourseStatus = async (courseId, status, reason = '') => {
    const course = await LmsCourse.findByIdAndUpdate(
        courseId,
        { status },
        { new: true }
    );
    if (!course) throw new Error('Course not found');
    return course;
};

// --- Student Methods ---

export const getAllLiveCourses = async () => {
    return await LmsCourse.find({ status: 'published' })
        .populate('instructor', 'fullName department thumbnail')
        .sort('-createdAt');
};

export const getCourseBySlug = async (slug) => {
    const course = await LmsCourse.findOne({ slug, status: 'published' })
        .populate('instructor', 'fullName department thumbnail description');
    if (!course) throw new Error('Course not found');
    return course;
};

export const enrollInCourse = async (studentEmail, courseId, paymentData = {}) => {
    const student = await Student.findOne({ email: studentEmail });
    if (!student) throw new Error('Student profile not found');

    const course = await LmsCourse.findById(courseId);
    if (!course) throw new Error('Course not found');
    if (course.status !== 'published') throw new Error('Course is not available for enrollment');

    // Check if already enrolled
    const existing = await LmsEnrollment.findOne({ student: student._id, course: courseId });
    if (existing) throw new Error('Already enrolled in this course');

    const enrollment = await LmsEnrollment.create({
        student: student._id,
        course: courseId,
        purchasePrice: course.price,
        paymentStatus: course.price === 0 ? 'free' : 'completed', // Simulation: auto-complete if paid
        paymentId: paymentData.paymentId || (course.price === 0 ? 'FREE_ACCESS' : 'SIM_PAY_123')
    });

    // Update enrollment count
    await LmsCourse.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    return enrollment;
};

export const getStudentEnrolledCourses = async (studentEmail) => {
    const student = await Student.findOne({ email: studentEmail });
    if (!student) throw new Error('Student profile not found');

    return await LmsEnrollment.find({ student: student._id })
        .populate({
            path: 'course',
            populate: { path: 'instructor', select: 'fullName' }
        })
        .sort('-createdAt');
};

export const updateLessonProgress = async (studentEmail, courseId, lessonId) => {
    const student = await Student.findOne({ email: studentEmail });
    if (!student) throw new Error('Student profile not found');

    const enrollment = await LmsEnrollment.findOne({ student: student._id, course: courseId });
    if (!enrollment) throw new Error('Enrollment not found');

    // Add to progress if not already there
    const exists = enrollment.progress.find(p => p.lessonId === lessonId);
    if (!exists) {
        enrollment.progress.push({ lessonId });

        // Simple progress calculation (needs total lessons count from course)
        const course = await LmsCourse.findById(courseId);
        const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

        enrollment.completionPercentage = Math.round((enrollment.progress.length / totalLessons) * 100);
        if (enrollment.completionPercentage >= 100) enrollment.isCompleted = true;

        await enrollment.save();
    }

    return enrollment;
};
