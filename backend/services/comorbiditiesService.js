const db = require('../config/db');

// Add comorbidities for a patient
const add = async ({ patient_id, has_comorbidities, comorbidities_list }) => {
    const query = `
        INSERT INTO Comorbidities (patient_id, has_comorbidities, comorbidities_list) 
        VALUES (?, ?, ?)
    `;
    const [result] = await db.query(query, [patient_id, has_comorbidities, comorbidities_list]);
    return result;
};

// Get all comorbidities
const getAll = async () => {
    const query = 'SELECT * FROM Comorbidities';
    const [rows] = await db.query(query);
    return rows;
};

// Get comorbidities for a specific patient
const getByPatientId = async (patientId) => {
    const query = 'SELECT * FROM Comorbidities WHERE patient_id = ?';
    const [rows] = await db.query(query, [patientId]);
    return rows[0];
};

// Update comorbidities for a specific patient
const update = async (patientId, { has_comorbidities, comorbidities_list }) => {
    const query = `
        UPDATE Comorbidities 
        SET has_comorbidities = ?, comorbidities_list = ? 
        WHERE patient_id = ?
    `;
    const [result] = await db.query(query, [has_comorbidities, comorbidities_list, patientId]);
    return result;
};

// Delete comorbidities for a specific patient
const deleteComorbidities = async (patientId) => {
    const query = 'DELETE FROM Comorbidities WHERE patient_id = ?';
    const [result] = await db.query(query, [patientId]);
    return result;
};

module.exports = { add, getAll, getByPatientId, update, delete: deleteComorbidities };
