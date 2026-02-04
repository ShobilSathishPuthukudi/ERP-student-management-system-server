import {
    createBatchService,
    getAllBatchesService,
    getBatchByIdService,
    assignStudentsToBatchService,
    assignFacultyToBatchService,
} from './batch.service.js';

export const createBatch = async (req, res) => {
    try {
        const batch = await createBatchService(req.body);
        res.status(201).json({
            success: true,
            message: 'Batch created successfully',
            data: batch,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllBatches = async (req, res) => {
    try {
        const { courseId, facultyId, status } = req.query;
        const batches = await getAllBatchesService({ courseId, facultyId, status });
        res.status(200).json({ success: true, data: batches });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBatchById = async (req, res) => {
    try {
        const batch = await getBatchByIdService(req.params.id);
        res.status(200).json({ success: true, data: batch });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const assignStudents = async (req, res) => {
    try {
        const { studentIds } = req.body;
        const batch = await assignStudentsToBatchService(req.params.id, studentIds);
        res.status(200).json({
            success: true,
            message: 'Students assigned to batch successfully',
            data: batch,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const assignFaculty = async (req, res) => {
    try {
        const { facultyId } = req.body;
        const batch = await assignFacultyToBatchService(req.params.id, facultyId);
        res.status(200).json({
            success: true,
            message: 'Faculty assigned to batch successfully',
            data: batch,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
