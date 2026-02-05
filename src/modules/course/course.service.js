import Course from './course.model.js';

/**
 * Service to create a new course
 */
export const createCourseService = async (courseData) => {
    const {
        courseName,
        courseCode,
        durationMonths,
        credits,
        feeAmount,
        department,
        description,
        status
    } = courseData;

    const existingCourse = await Course.findOne({
        $or: [{ courseName }, { courseCode }]
    });

    if (existingCourse) {
        throw new Error('A course with this name or code already exists');
    }

    return await Course.create({
        courseName,
        courseCode,
        durationMonths,
        credits,
        feeAmount,
        department,
        description,
        status
    });
};

/**
 * Service to fetch all courses
 */
export const getCoursesService = async (filters) => {
    const { department, status } = filters;
    const query = {};
    if (department) query.department = department;
    if (status) query.status = status;

    return await Course.find(query).sort({ createdAt: -1 });
};

/**
 * Service to fetch a single course
 */
export const getCourseByIdService = async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found');
    return course;
};

/**
 * Service to update an existing course
 */
export const updateCourseService = async (courseId, updateData) => {
    const course = await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!course) throw new Error('Course not found');
    return course;
};

/**
 * Service to delete an existing course
 */
export const deleteCourseService = async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found');

    // Deleting a course is a destructive operation.
    // In a real system, you might want to check for dependencies here.
    return await Course.findByIdAndDelete(courseId);
};
