const db = require('../config/db');

// Add nutritional status for a patient
const add = async ({ patient_id, bmi_status, hg_status, albumin_status }) => {
    const query = `
        INSERT INTO NutritionalStatus (patient_id, bmi_status, hg_status, albumin_status) 
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [patient_id, bmi_status, hg_status, albumin_status]);
    return result;
};

// Get all nutritional statuses
const getAll = async () => {
    const query = 'SELECT * FROM NutritionalStatus';
    const [rows] = await db.query(query);
    return rows;
};

// Get nutritional status for a specific patient
const getByPatientId = async (patientId) => {
    const query = 'SELECT * FROM NutritionalStatus WHERE patient_id = ?';
    const [rows] = await db.query(query, [patientId]);
    return rows[0];
};

// Update nutritional status for a specific patient
const update = async (patientId, { bmi_status, hg_status, albumin_status }) => {
    const query = `
        UPDATE NutritionalStatus 
        SET bmi_status = ?, hg_status = ?, albumin_status = ? 
        WHERE patient_id = ?
    `;
    const [result] = await db.query(query, [bmi_status, hg_status, albumin_status, patientId]);
    return result;
};

// Delete nutritional status for a specific patient
const deleteNutritionalStatus = async (patientId) => {
    const query = 'DELETE FROM NutritionalStatus WHERE patient_id = ?';
    const [result] = await db.query(query, [patientId]);
    return result;
};

module.exports = { add, getAll, getByPatientId, update, delete: deleteNutritionalStatus };
