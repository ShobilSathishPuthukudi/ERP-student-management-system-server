import jwt from 'jsonwebtoken';
import User from './user.model.js';
import { hashPassword, comparePassword } from '../../utils/hashPassword.js';
import generateAccessToken from '../../utils/generateAccessToken.js';
import generateRefreshToken from '../../utils/generateRefreshToken.js';
import Student from '../student/student.model.js';
import Faculty from '../faculty/faculty.model.js';

export const registerUser = async (data) => {
    const { name, email, password, role } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    if (role === 'student') {
        throw new Error('Student accounts can only be created by an Admin through the student management module');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    const accessToken = generateAccessToken(user._id, user.role, user.email);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};

export const loginUser = async ({ email, password, studentId, facultyId, dob, role }) => {
    // 1. Common: Find potential user by Email first
    const normalizedEmail = email.toLowerCase().trim();
    console.log(`[AuthService] Attempting login for email: '${normalizedEmail}'`);

    // Debug: Check if user exists with exact match first
    const exactUser = await User.findOne({ email: normalizedEmail });
    console.log(`[AuthService] Exact match found: ${!!exactUser}`);

    const user = await User.findOne({
        email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') }
    });
    console.log(`[AuthService] Regex match found: ${!!user}`);

    if (!user) {
        console.log('[AuthService] User not found in DB');
        throw new Error(`User not found for email: ${normalizedEmail}`);
    }

    // 2. Role-based Authentication Logic
    if (user.role === 'student' || user.role === 'faculty') {
        const isStudent = user.role === 'student';
        const loginId = isStudent ? studentId : facultyId;
        const idLabel = isStudent ? 'Registration ID' : 'Faculty ID';

        // Check if required credentials are provided
        if (!loginId || !dob) {
            throw new Error(`${idLabel} and Date of Birth are required for verification`);
        }

        const normalizedId = loginId.trim().toUpperCase();

        // Verify against specific collection (Student or Faculty)
        // STRICT CHECK: Email AND ID must match the same record
        let record;
        if (isStudent) {
            record = await Student.findOne({
                email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
                studentId: normalizedId
            });
        } else {
            record = await Faculty.findOne({
                email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
                facultyId: normalizedId
            });
        }

        if (!record) {
            throw new Error(`Invalid ${idLabel} for this email`);
        }

        // Verify DOB
        const inputDate = new Date(dob);
        const recordDate = new Date(record.dob);

        // Simple ISO date comparison (YYYY-MM-DD)
        const inputDateStr = inputDate.toISOString().split('T')[0];
        const recordDateStr = recordDate.toISOString().split('T')[0];

        if (inputDateStr !== recordDateStr) {
            throw new Error('Invalid Date of Birth');
        }

    } else {
        // 3. Admin / Accountant Authentication
        if (!password) {
            throw new Error('Password is required');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Password');
        }
    }

    // 4. Generate Tokens
    const accessToken = generateAccessToken(user._id, user.role, user.email);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};

export const refreshAccessTokenService = async (token) => {
    if (!token) throw new Error('Refresh token is required');

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired refresh token');
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
        throw new Error('Invalid refresh token');
    }

    const accessToken = generateAccessToken(user._id, user.role, user.email);
    return { accessToken };
};

export const logoutService = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.refreshToken = undefined;
        await user.save();
    }
};


