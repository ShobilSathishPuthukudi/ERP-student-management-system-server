import jwt from 'jsonwebtoken';
import User from './user.model.js';
import { hashPassword, comparePassword } from '../../utils/hashPassword.js';
import generateAccessToken from '../../utils/generateAccessToken.js';
import generateRefreshToken from '../../utils/generateRefreshToken.js';

export const registerUser = async (data) => {
    const { name, email, password, role } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
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

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};

export const loginUser = async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
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

    const accessToken = generateAccessToken(user._id, user.role);
    return { accessToken };
};

export const logoutService = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.refreshToken = undefined;
        await user.save();
    }
};
