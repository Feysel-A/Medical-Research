const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

// Add a new patient
router.post('/add', patientController.addPatient);

// Get all patients
router.get('/all', patientController.getAllPatients);

// Get a specific patient by ID
router.get('/:id', patientController.getPatientById);

// Update a specific patient by ID
router.put('/:id', patientController.updatePatient);

// Delete a specific patient by ID
router.delete('/:id', patientController.deletePatient);

module.exports = router;
