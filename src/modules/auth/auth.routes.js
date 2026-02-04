import express from 'express';
import { register, login, refreshToken, logout, adminCreateUser } from './auth.controller.js';
import { registerValidator, loginValidator, adminCreateUserValidator } from './auth.validator.js';
import { validate } from '../../middlewares/validator.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/refresh', refreshToken);
router.post('/logout', authMiddleware, logout);

// Admin-only user creation (for Faculty, Accountants, etc.)
router.post('/users', authMiddleware, authorizeRoles('admin'), adminCreateUserValidator, validate, adminCreateUser);

export default router;
