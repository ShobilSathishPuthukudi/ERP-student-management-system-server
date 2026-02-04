import Faculty from './faculty.model.js';

export const createFaculty = async (data) => {
    const { userId, name, email, assignedCourses, status } = data;

    const faculty = await Faculty.create({
        userId,
        name,
        email,
        assignedCourses,
        status,
    });

    return faculty;
};

export const getAllFaculty = async () => {
    const faculty = await Faculty.find()
        .populate('userId', 'name email role')
        .populate('assignedCourses', 'courseName department');

    return faculty;
};

export const getFacultyById = async (id) => {
    const faculty = await Faculty.findById(id)
        .populate('userId', 'name email role')
        .populate('assignedCourses', 'courseName department duration');

    if (!faculty) {
        throw new Error('Faculty not found');
    }

    return faculty;
};

export const updateFaculty = async (id, data) => {
    const faculty = await Faculty.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!faculty) {
        throw new Error('Faculty not found');
    }

    return faculty;
};
