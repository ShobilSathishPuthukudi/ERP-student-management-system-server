import Fee from './fee.model.js';
import Student from '../student/student.model.js';

/**
 * Service to create a new fee record with automatic status calculation.
 * @param {Object} feeData - The data for the fee record
 * @returns {Promise<Object>} The created fee document
 */
export const createFeeService = async (feeData) => {
    const { studentId, totalFee, paidAmount = 0 } = feeData;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error('Student not found');
    }

    // Calculate dueAmount and paymentStatus
    const dueAmount = totalFee - paidAmount;
    let paymentStatus = 'Pending';

    if (dueAmount === 0) {
        paymentStatus = 'Paid';
    } else if (paidAmount > 0) {
        paymentStatus = 'Partial';
    }

    // Create and return the fee record
    const fee = await Fee.create({
        studentId,
        totalFee,
        paidAmount,
        dueAmount,
        paymentStatus,
    });

    return fee;
};

/**
 * Service to fetch all fee records with optional filters.
 * @param {Object} filters - Filter criteria (studentId, paymentStatus)
 * @returns {Promise<Array>} List of fee records sorted by createdAt descending
 */
export const getAllFeesService = async (filters) => {
    const { studentId, paymentStatus } = filters;

    // Build MongoDB filter dynamically
    const query = {};
    if (studentId) query.studentId = studentId;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    // Fetch fees, populate student info, and sort by newest first
    const fees = await Fee.find(query)
        .populate('studentId', 'name email')
        .sort({ createdAt: -1 });

    return fees;
};

/**
 * Service to fetch a single fee record by ID.
 * @param {string} feeId - The ID of the fee record
 * @returns {Promise<Object>} The fee document with populated student info
 */
export const getFeeByIdService = async (feeId) => {
    const fee = await Fee.findById(feeId).populate('studentId', 'name email');

    if (!fee) {
        throw new Error('Fee record not found');
    }

    return fee;
};

/**
 * Service to update an existing fee record with status recalculation.
 * @param {string} feeId - The ID of the fee record to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} The updated fee document
 */
export const updateFeeService = async (feeId, updateData) => {
    const fee = await Fee.findById(feeId);
    if (!fee) {
        throw new Error('Fee record not found');
    }

    // Update fields
    if (updateData.totalFee !== undefined) fee.totalFee = updateData.totalFee;
    if (updateData.paidAmount !== undefined) fee.paidAmount = updateData.paidAmount;

    // Recalculate dueAmount and update status automatically
    fee.dueAmount = fee.totalFee - fee.paidAmount;

    if (fee.dueAmount === 0) {
        fee.paymentStatus = 'Paid';
    } else if (fee.paidAmount === 0) {
        fee.paymentStatus = 'Pending';
    } else {
        fee.paymentStatus = 'Partial';
    }

    await fee.save();
    return fee;
};
