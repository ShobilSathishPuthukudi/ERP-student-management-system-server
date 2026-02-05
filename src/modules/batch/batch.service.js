import Batch from './batch.model.js';

/**
 * Service to create a new batch
 */
export const createBatchService = async (batchData) => {
    const { batchName, courseId, facultyId, startDate, endDate, maxStudents, scheduleInfo, status } = batchData;

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
        maxStudents,
        scheduleInfo,
        status,
    });

    // Populate the newly created batch for UI consistency
    return await Batch.findById(batch._id)
        .populate('courseId', 'courseName courseCode')
        .populate('facultyId', 'fullName email');
};

/**
 * Service to fetch all batches
 */
export const getAllBatchesService = async (filters) => {
    const { courseId, facultyId, status } = filters;
    const query = {};

    if (courseId) query.courseId = courseId;
    if (facultyId) query.facultyId = facultyId;
    if (status) query.status = status;

    return await Batch.find(query)
        .populate('courseId', 'courseName courseCode')
        .populate('facultyId', 'fullName email')
        .sort({ createdAt: -1 });
};

/**
 * Service to fetch batch details
 */
export const getBatchByIdService = async (batchId) => {
    const batch = await Batch.findById(batchId)
        .populate('courseId', 'courseName courseCode department')
        .populate('facultyId', 'fullName email phone designation')
        .populate('students', 'fullName studentId email phone');

    if (!batch) throw new Error('Batch not found');
    return batch;
};

/**
 * Service to assign students to a batch
 */
export const assignStudentsToBatchService = async (batchId, studentIds) => {
    const batch = await Batch.findById(batchId);
    if (!batch) throw new Error('Batch not found');

    const studentSet = new Set(batch.students.map((id) => id.toString()));
    studentIds.forEach((id) => studentSet.add(id.toString()));

    batch.students = Array.from(studentSet);
    await batch.save();

    return batch;
};

/**
 * Service to update faculty assignment
 */
export const assignFacultyToBatchService = async (batchId, facultyId) => {
    const batch = await Batch.findByIdAndUpdate(
        batchId,
        { facultyId },
        { new: true, runValidators: true }
    ).populate('facultyId', 'fullName email');

    if (!batch) throw new Error('Batch not found');
    return batch;
};
