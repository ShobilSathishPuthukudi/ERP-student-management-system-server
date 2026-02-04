import {
    createFaculty as createFacultyService,
    getAllFaculty as getAllFacultyService,
    getFacultyById as getFacultyByIdService,
    updateFaculty as updateFacultyService,
} from './faculty.service.js';

export const createFaculty = async (req, res) => {
    try {
        const faculty = await createFacultyService(req.body);

        res.status(201).json({
            success: true,
            message: 'Faculty created successfully',
            data: faculty,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllFaculty = async (req, res) => {
    try {
        const faculty = await getAllFacultyService();

        res.status(200).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFacultyById = async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await getFacultyByIdService(id);

        res.status(200).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await updateFacultyService(id, req.body);

        res.status(200).json({
            success: true,
            message: 'Faculty updated successfully',
            data: faculty,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
