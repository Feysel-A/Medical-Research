const express = require('express');
const nutritionalController = require('../controllers/nutritionalController');
const router = express.Router();

// Add nutritional status for a patient
router.post('/add', nutritionalController.addNutritionalStatus);

// Get all nutritional statuses
router.get('/all', nutritionalController.getAllNutritionalStatuses);

// Get nutritional status for a specific patient
router.get('/:patientId', nutritionalController.getNutritionalStatusByPatientId);

// Update nutritional status for a specific patient
router.put('/:patientId', nutritionalController.updateNutritionalStatus);

// Delete nutritional status for a specific patient
router.delete('/:patientId', nutritionalController.deleteNutritionalStatus);

module.exports = router;
