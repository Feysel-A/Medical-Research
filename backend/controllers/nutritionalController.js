const nutritionalService = require('../services/nutritionalService');

// Add nutritional status for a patient
const addNutritionalStatus = async (req, res) => {
    try {
        const { patient_id, bmi_status, hg_status, albumin_status } = req.body;

        if (!patient_id) {
            return res.status(400).json({ message: 'Patient ID is required.' });
        }

        const result = await nutritionalService.add({ patient_id, bmi_status, hg_status, albumin_status });

        res.status(201).json({ message: 'Nutritional status added successfully.', nutritionId: result.insertId });
    } catch (error) {
        console.error('Error adding nutritional status:', error);
        res.status(500).json({ message: 'An error occurred while adding nutritional status.' });
    }
};

// Get all nutritional statuses
const getAllNutritionalStatuses = async (req, res) => {
    try {
        const nutritionalStatuses = await nutritionalService.getAll();
        res.status(200).json(nutritionalStatuses);
    } catch (error) {
        console.error('Error fetching nutritional statuses:', error);
        res.status(500).json({ message: 'An error occurred while fetching nutritional statuses.' });
    }
};

// Get nutritional status for a specific patient
const getNutritionalStatusByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const nutritionalStatus = await nutritionalService.getByPatientId(patientId);

        if (!nutritionalStatus) {
            return res.status(404).json({ message: 'Nutritional status not found for the specified patient.' });
        }

        res.status(200).json(nutritionalStatus);
    } catch (error) {
        console.error('Error fetching nutritional status:', error);
        res.status(500).json({ message: 'An error occurred while fetching nutritional status.' });
    }
};

// Update nutritional status for a specific patient
const updateNutritionalStatus = async (req, res) => {
    try {
        const { patientId } = req.params;
        const updates = req.body;

        const result = await nutritionalService.update(patientId, updates);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nutritional status not found for the specified patient.' });
        }

        res.status(200).json({ message: 'Nutritional status updated successfully.' });
    } catch (error) {
        console.error('Error updating nutritional status:', error);
        res.status(500).json({ message: 'An error occurred while updating nutritional status.' });
    }
};

// Delete nutritional status for a specific patient
const deleteNutritionalStatus = async (req, res) => {
    try {
        const { patientId } = req.params;

        const result = await nutritionalService.delete(patientId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nutritional status not found for the specified patient.' });
        }

        res.status(200).json({ message: 'Nutritional status deleted successfully.' });
    } catch (error) {
        console.error('Error deleting nutritional status:', error);
        res.status(500).json({ message: 'An error occurred while deleting nutritional status.' });
    }
};

module.exports = {
    addNutritionalStatus,
    getAllNutritionalStatuses,
    getNutritionalStatusByPatientId,
    updateNutritionalStatus,
    deleteNutritionalStatus,
};
