import Certificate from './certificate.model.js';
import Student from '../student/student.model.js';

/**
 * Service to issue a new certificate.
 */
export const issueCertificateService = async (data) => {
    const { studentId, courseId, grade, issuedBy } = data;

    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) throw new Error('Student not found');

    // Generate a unique certificate number
    const certificateNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const certificate = await Certificate.create({
        studentId,
        courseId,
        grade,
        certificateNumber,
        issuedBy,
    });

    return certificate;
};

/**
 * Service to get all certificates for a student.
 */
export const getStudentCertificatesService = async (studentId) => {
    return await Certificate.find({ studentId })
        .populate('courseId', 'courseName')
        .sort({ issueDate: -1 });
};

/**
 * Service to get all certificates (Admin).
 */
export const getAllCertificatesService = async () => {
    return await Certificate.find()
        .populate('studentId', 'name email')
        .populate('courseId', 'courseName')
        .sort({ issueDate: -1 });
};
