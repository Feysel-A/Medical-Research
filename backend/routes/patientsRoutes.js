const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

// Add or update a patient with all related details
router.post('/add-or-update', patientController.addOrUpdatePatient);

// Get all details for a specific patient
router.get('/:id', patientController.getPatientDetailsById);

// Delete a patient and all related details
router.delete('/:id', patientController.deletePatientWithDetails);

// Update specific details for a single patient by ID
router.put('/:id', patientController.updateSinglePatientById);

module.exports = router;
