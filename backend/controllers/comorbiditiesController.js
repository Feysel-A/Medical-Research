const comorbiditiesService = require('../services/comorbiditiesService');

// Add comorbidities for a patient
const addComorbidities = async (req, res) => {
    try {
        const { patient_id, has_comorbidities, comorbidities_list } = req.body;

        if (!patient_id || has_comorbidities === undefined) {
            return res.status(400).json({ message: 'Patient ID and has_comorbidities are required.' });
        }

        const result = await comorbiditiesService.add({ patient_id, has_comorbidities, comorbidities_list });

        res.status(201).json({ message: 'Comorbidities added successfully.', comorbidityId: result.insertId });
    } catch (error) {
        console.error('Error adding comorbidities:', error);
        res.status(500).json({ message: 'An error occurred while adding comorbidities.' });
    }
};

// Get all comorbidities
const getAllComorbidities = async (req, res) => {
    try {
        const comorbidities = await comorbiditiesService.getAll();
        res.status(200).json(comorbidities);
    } catch (error) {
        console.error('Error fetching comorbidities:', error);
        res.status(500).json({ message: 'An error occurred while fetching comorbidities.' });
    }
};

// Get comorbidities for a specific patient
const getComorbiditiesByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const comorbidities = await comorbiditiesService.getByPatientId(patientId);

        if (!comorbidities) {
            return res.status(404).json({ message: 'No comorbidities found for the specified patient.' });
        }

        res.status(200).json(comorbidities);
    } catch (error) {
        console.error('Error fetching comorbidities:', error);
        res.status(500).json({ message: 'An error occurred while fetching comorbidities.' });
    }
};

// Update comorbidities for a specific patient
const updateComorbidities = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { has_comorbidities, comorbidities_list } = req.body;

        const result = await comorbiditiesService.update(patientId, { has_comorbidities, comorbidities_list });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No comorbidities found for the specified patient.' });
        }

        res.status(200).json({ message: 'Comorbidities updated successfully.' });
    } catch (error) {
        console.error('Error updating comorbidities:', error);
        res.status(500).json({ message: 'An error occurred while updating comorbidities.' });
    }
};

// Delete comorbidities for a specific patient
const deleteComorbidities = async (req, res) => {
    try {
        const { patientId } = req.params;

        const result = await comorbiditiesService.delete(patientId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No comorbidities found for the specified patient.' });
        }

        res.status(200).json({ message: 'Comorbidities deleted successfully.' });
    } catch (error) {
        console.error('Error deleting comorbidities:', error);
        res.status(500).json({ message: 'An error occurred while deleting comorbidities.' });
    }
};

module.exports = {
    addComorbidities,
    getAllComorbidities,
    getComorbiditiesByPatientId,
    updateComorbidities,
    deleteComorbidities,
};
