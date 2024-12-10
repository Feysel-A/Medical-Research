const express = require('express');
const comorbiditiesController = require('../controllers/comorbiditiesController');
const router = express.Router();

// Add comorbidities for a patient
router.post('/add', comorbiditiesController.addComorbidities);

// Get all comorbidities
router.get('/all', comorbiditiesController.getAllComorbidities);

// Get comorbidities for a specific patient
router.get('/:patientId', comorbiditiesController.getComorbiditiesByPatientId);

// Update comorbidities for a specific patient
router.put('/:patientId', comorbiditiesController.updateComorbidities);

// Delete comorbidities for a specific patient
router.delete('/:patientId', comorbiditiesController.deleteComorbidities);

module.exports = router;
