const patientService = require('../services/patientService');

// Add or update patient and all related details
const addOrUpdatePatient = async (req, res) => {
    try {
        const { patient, comorbidities, personalHabits, nutritionalStatus, diagnosis, surgery, infections, hospitalStay, antibiotics, previousHospitalization, previousSurgeries } = req.body;

        if (!patient) {
            return res.status(400).json({ message: 'Patient details are required.' });
        }

        const result = await patientService.addOrUpdatePatient(
            patient,
            comorbidities,
            personalHabits,
            nutritionalStatus,
            diagnosis,
            surgery,
            infections,
            hospitalStay,
            antibiotics,
            previousHospitalization,
            previousSurgeries
        );

        res.status(201).json({ message: 'Patient and related details added/updated successfully.', patientId: result.patientId });
    } catch (error) {
        console.error('Error adding/updating patient details:', error);
        res.status(500).json({ message: 'An error occurred while adding/updating patient details.' });
    }
};

// Get all details for a specific patient
const getPatientDetailsById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const details = await patientService.getPatientDetailsById(patientId);

        if (!details.patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json(details);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        res.status(500).json({ message: 'An error occurred while fetching patient details.' });
    }
};

// Delete a patient and all related details
const deletePatientWithDetails = async (req, res) => {
    try {
        const patientId = req.params.id;

        await patientService.deletePatientWithDetails(patientId);

        res.status(200).json({ message: 'Patient and related details deleted successfully.' });
    } catch (error) {
        console.error('Error deleting patient details:', error);
        res.status(500).json({ message: 'An error occurred while deleting patient details.' });
    }
};
const updateSinglePatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const { patient, comorbidities, personalHabits, nutritionalStatus, diagnosis, surgery, infections, hospitalStay, antibiotics, previousHospitalization, previousSurgeries } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required.' });
        }

        // Call the service to update specific patient details
        await patientService.updateSinglePatientById(
            patientId,
            patient,
            comorbidities,
            personalHabits,
            nutritionalStatus,
            diagnosis,
            surgery,
            infections,
            hospitalStay,
            antibiotics,
            previousHospitalization,
            previousSurgeries
        );

        res.status(200).json({ message: 'Patient details updated successfully.' });
    } catch (error) {
        console.error('Error updating patient details:', error);
        res.status(500).json({ message: 'An error occurred while updating patient details.' });
    }
};
const getAllPatientsWithDetails = async (req, res) => {
    try {
        const patients = await patientService.getAllPatientsWithDetails();

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found.' });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error('Error retrieving all patients:', error);
        res.status(500).json({ message: 'An error occurred while retrieving patients.' });
    }
};

module.exports = {
    addOrUpdatePatient,
    getPatientDetailsById,
    updateSinglePatientById,
    getAllPatientsWithDetails,
    deletePatientWithDetails
};
