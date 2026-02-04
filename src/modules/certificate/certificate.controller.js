import {
    issueCertificateService,
    getStudentCertificatesService,
    getAllCertificatesService,
} from './certificate.service.js';

export const issueCertificate = async (req, res) => {
    try {
        const data = { ...req.body, issuedBy: req.user.id };
        const certificate = await issueCertificateService(data);
        res.status(201).json({
            success: true,
            message: 'Certificate issued successfully',
            data: certificate,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getMyCertificates = async (req, res) => {
    try {
        const certificates = await getStudentCertificatesService(req.user.id);
        res.status(200).json({ success: true, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllCertificates = async (req, res) => {
    try {
        const certificates = await getAllCertificatesService();
        res.status(200).json({ success: true, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
