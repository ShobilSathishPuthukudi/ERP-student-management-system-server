import Batch from './batch.model.js';

/**
 * Service to create a new batch.
 * @param {Object} batchData - Data to create the batch
 * @returns {Promise<Object>} The created batch document
 */
export const createBatchService = async (batchData) => {
    const { batchName, courseId, facultyId, startDate, endDate, status } = batchData;

    // Check for duplicate batch name
    const existingBatch = await Batch.findOne({ batchName });
    if (existingBatch) {
        throw new Error('A batch with this name already exists');
    }

    const batch = await Batch.create({
        batchName,
        courseId,
        facultyId,
        startDate,
        endDate,
        status,
    });

    return batch;
};

/**
 * Service to fetch all batches with optional filters.
 * @param {Object} filters - Filter criteria (courseId, facultyId, status)
 * @returns {Promise<Array>} List of batches
 */
export const getAllBatchesService = async (filters) => {
    const { courseId, facultyId, status } = filters;
    const query = {};

    if (courseId) query.courseId = courseId;
    if (facultyId) query.facultyId = facultyId;
    if (status) query.status = status;

    return await Batch.find(query)
        .populate('courseId', 'courseName')
        .populate('facultyId', 'name email')
        .sort({ createdAt: -1 });
};

/**
 * Service to fetch batch details, including the student list.
 * @param {string} batchId - The ID of the batch
 * @returns {Promise<Object>} The batch document with populated data
 */
export const getBatchByIdService = async (batchId) => {
    const batch = await Batch.findById(batchId)
        .populate('courseId', 'courseName')
        .populate('facultyId', 'name email')
        .populate('students', 'name email phone');

    if (!batch) {
        throw new Error('Batch not found');
    }

    return batch;
};

/**
 * Service to assign students to a batch.
 * @param {string} batchId - The ID of the batch
 * @param {Array<string>} studentIds - Array of student IDs to assign
 * @returns {Promise<Object>} The updated batch document
 */
export const assignStudentsToBatchService = async (batchId, studentIds) => {
    const batch = await Batch.findById(batchId);
    if (!batch) {
        throw new Error('Batch not found');
    }

    // Use Set to ensure unique student IDs
    const studentSet = new Set(batch.students.map((id) => id.toString()));
    studentIds.forEach((id) => studentSet.add(id.toString()));

    batch.students = Array.from(studentSet);
    await batch.save();

    return batch;
};

/**
 * Service to update faculty assignment.
 * @param {string} batchId - The ID of the batch
 * @param {string} facultyId - The ID of the faculty to assign
 * @returns {Promise<Object>} The updated batch document
 */
export const assignFacultyToBatchService = async (batchId, facultyId) => {
    const batch = await Batch.findByIdAndUpdate(
        batchId,
        { facultyId },
        { new: true, runValidators: true }
    );

    if (!batch) {
        throw new Error('Batch not found');
    }

    return batch;
};
