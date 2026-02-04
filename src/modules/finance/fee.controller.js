import {
    createFeeService,
    getAllFeesService,
    getFeeByIdService,
    updateFeeService,
} from './fee.service.js';

export const createFee = async (req, res) => {
    try {
        const fee = await createFeeService(req.body);

        res.status(201).json({
            success: true,
            message: 'Fee record created successfully',
            data: fee,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFees = async (req, res) => {
    try {
        const { studentId, paymentStatus } = req.query;
        const fees = await getAllFeesService({ studentId, paymentStatus });

        res.status(200).json({
            success: true,
            data: fees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFeeById = async (req, res) => {
    try {
        const fee = await getFeeByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: fee,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateFee = async (req, res) => {
    try {
        const fee = await updateFeeService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Fee record updated successfully',
            data: fee,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
