import express from 'express';
import {
    issueCertificate,
    getMyCertificates,
    getAllCertificates,
} from './certificate.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Admin only: Issue certificates
router.post('/issue', authorizeRoles('admin'), issueCertificate);

// Admin only: View all certificates
router.get('/all', authorizeRoles('admin'), getAllCertificates);

// Students: View their own certificates
router.get('/my', authorizeRoles('student'), getMyCertificates);

export default router;
