import Course from './course.model.js';

/**
 * Service to create a new course with business logic validation.
 * @param {Object} courseData - Data to create the course
 * @returns {Promise<Object>} The created course document
 */
export const createCourseService = async (courseData) => {
    const {
        courseName,
        duration,
        mode,
        feeAmount,
        category,
        department,
        requirements,
    } = courseData;

    // Check if course with same name already exists
    const existingCourse = await Course.findOne({ courseName });
    if (existingCourse) {
        throw new Error('A course with this name already exists');
    }

    // Create and return the new course document
    const course = await Course.create({
        courseName,
        duration,
        mode,
        feeAmount,
        category,
        department,
        requirements,
    });

    return course;
};

/**
 * Service to fetch all courses based on dynamic filters.
 * @param {Object} filters - Filter criteria (category, department, mode)
 * @returns {Promise<Array>} List of courses sorted by createdAt descending
 */
export const getCoursesService = async (filters) => {
    const { category, department, mode } = filters;

    // Build a MongoDB filter object dynamically
    const query = {};
    if (category) query.category = category;
    if (department) query.department = department;
    if (mode) query.mode = mode;

    // Fetch courses with filters and sort by newest first
    const courses = await Course.find(query).sort({ createdAt: -1 });

    return courses;
};

/**
 * Service to fetch a single course by its ID.
 * @param {string} courseId - The ID of the course
 * @returns {Promise<Object>} The course document
 */
export const getCourseByIdService = async (courseId) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error('Course not found');
    }

    return course;
};

/**
 * Service to update an existing course.
 * @param {string} courseId - The ID of the course to update
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} The updated course document
 */
export const updateCourseService = async (courseId, updateData) => {
    const course = await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!course) {
        throw new Error('Course not found');
    }

    return course;
};
