import Fee from './fee.model.js';
import Student from '../student/student.model.js';

/**
 * Service to fetch all fee records with optional filters.
 */
export const getAllFeesService = async (filters) => {
    const { studentId, paymentStatus } = filters;

    const query = {};
    if (studentId) query.studentId = studentId;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    // Fetch fees, populate student info with fullName and studentId, and sort by newest first
    const fees = await Fee.find(query)
        .populate('studentId', 'fullName studentId')
        .sort({ createdAt: -1 });

    return fees;
};

/**
 * Service to create a new fee record
 */
export const createFeeService = async (feeData) => {
    const { studentId, totalFee, paidAmount = 0 } = feeData;

    const student = await Student.findById(studentId);
    if (!student) throw new Error('Student not found');

    const dueAmount = totalFee - paidAmount;
    let paymentStatus = 'Pending';
    if (dueAmount === 0) paymentStatus = 'Paid';
    else if (paidAmount > 0) paymentStatus = 'Partial';

    return await Fee.create({
        studentId,
        totalFee,
        paidAmount,
        dueAmount,
        paymentStatus,
    });
};

/**
 * Service to fetch a single fee record by ID
 */
export const getFeeByIdService = async (feeId) => {
    const fee = await Fee.findById(feeId).populate('studentId', 'fullName studentId');
    if (!fee) throw new Error('Fee record not found');
    return fee;
};

/**
 * Service to update an existing fee record
 */
export const updateFeeService = async (feeId, updateData) => {
    const fee = await Fee.findById(feeId);
    if (!fee) throw new Error('Fee record not found');

    if (updateData.totalFee !== undefined) fee.totalFee = updateData.totalFee;
    if (updateData.paidAmount !== undefined) fee.paidAmount += Number(updateData.paidAmount); // Handle incremental payments if passed

    fee.dueAmount = fee.totalFee - fee.paidAmount;

    if (fee.dueAmount <= 0) {
        fee.dueAmount = 0;
        fee.paymentStatus = 'Paid';
    } else if (fee.paidAmount === 0) {
        fee.paymentStatus = 'Pending';
    } else {
        fee.paymentStatus = 'Partial';
    }

    await fee.save();
    return fee;
};
