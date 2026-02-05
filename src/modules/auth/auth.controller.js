import {
    registerUser,
    loginUser,
    refreshAccessTokenService,
    logoutService,
} from './auth.service.js';

export const register = async (req, res, next) => {
    try {
        const { user, accessToken, refreshToken } = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res, next) => {
    try {
        console.log('[Login Controller] Request Body:', JSON.stringify(req.body));
        const { email, password, studentId, facultyId, dob, role } = req.body;
        const { user, accessToken, refreshToken } = await loginUser({ email, password, studentId, facultyId, dob, role });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const { accessToken } = await refreshAccessTokenService(refreshToken);

        res.status(200).json({
            success: true,
            data: { accessToken },
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req, res, next) => {
    try {
        await logoutService(req.user.id);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const adminCreateUser = async (req, res, next) => {
    try {
        const { user } = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User created successfully by admin',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

