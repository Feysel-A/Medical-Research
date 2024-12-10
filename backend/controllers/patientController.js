const patientService = require('../services/patientService');

// Add a new patient
const addPatient = async (req, res) => {
    try {
        const { age, sex, education_status, occupation_status, residency } = req.body;

        if (!age || !sex || !residency) {
            return res.status(400).json({ message: 'Age, sex, and residency are required.' });
        }

        const result = await patientService.add({ age, sex, education_status, occupation_status, residency });

        res.status(201).json({ message: 'Patient added successfully.', patientId: result.insertId });
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ message: 'An error occurred while adding the patient.' });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAll();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'An error occurred while fetching patients.' });
    }
};

// Get a specific patient by ID
const getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await patientService.getById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'An error occurred while fetching the patient.' });
    }
};

// Update a specific patient by ID
const updatePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const updates = req.body;

        const result = await patientService.update(patientId, updates);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({ message: 'Patient updated successfully.' });
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'An error occurred while updating the patient.' });
    }
};

// Delete a specific patient by ID
const deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;

        const result = await patientService.delete(patientId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({ message: 'Patient deleted successfully.' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'An error occurred while deleting the patient.' });
    }
};

module.exports = { addPatient, getAllPatients, getPatientById, updatePatient, deletePatient };
