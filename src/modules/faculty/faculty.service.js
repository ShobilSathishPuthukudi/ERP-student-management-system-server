import Faculty from './faculty.model.js';
import User from '../auth/user.model.js';
import bcrypt from 'bcryptjs';

export const createFaculty = async (data) => {
    const { fullName, email, phone, designation, department, assignedCourses, status, dob } = data;

    // Check if user account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User account with this email already exists');
    }

    // Generate facultyId automatically
    const count = await Faculty.countDocuments();
    const year = new Date().getFullYear();
    const facultyId = `FAC-${year}-${(count + 1).toString().padStart(4, '0')}`;

    // Create user account for the faculty
    const user = await User.create({
        name: fullName,
        email: email.toLowerCase().trim(),
        password: null, // No password for faculty login via ID/DOB
        role: 'faculty',
        isActive: true,
    });

    // Parse DD-MM-YYYY if provided as string
    let birthDate;
    if (typeof dob === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(dob)) {
        const [d, m, y] = dob.split('-').map(Number);
        birthDate = new Date(Date.UTC(y, m - 1, d));
    } else {
        birthDate = new Date(dob);
    }

    const faculty = await Faculty.create({
        userId: user._id,
        facultyId,
        fullName,
        email: email.toLowerCase().trim(),
        phone,
        dob: birthDate,
        designation,
        department,
        experienceYears: data.experienceYears || 0,
        assignedCourses: assignedCourses || [],
        status: status || 'active',
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
export const deleteFaculty = async (id) => {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
        throw new Error('Faculty not found');
    }

    // Optional: Delete associated user if they only have faculty role
    // For now just delete the faculty profile
    await Faculty.findByIdAndDelete(id);

    // Also delete the User record if it exists
    if (faculty.userId) {
        await User.findByIdAndDelete(faculty.userId);
    }

    return { success: true };
};
