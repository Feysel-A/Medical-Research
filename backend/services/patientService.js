const db = require('../config/db');

// Add a new patient
const add = async ({ age, sex, education_status, occupation_status, residency }) => {
    const query = `
        INSERT INTO Patients (age, sex, education_status, occupation_status, residency) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [age, sex, education_status, occupation_status, residency]);
    return result;
};

// Get all patients
const getAll = async () => {
    const query = 'SELECT * FROM Patients';
    const [rows] = await db.query(query);
    return rows;
};

// Get a specific patient by ID
const getById = async (id) => {
    const query = 'SELECT * FROM Patients WHERE patient_id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
};

// Update a specific patient by ID
const update = async (id, updates) => {
    const { age, sex, education_status, occupation_status, residency } = updates;
    const query = `
        UPDATE Patients 
        SET age = ?, sex = ?, education_status = ?, occupation_status = ?, residency = ? 
        WHERE patient_id = ?
    `;
    const [result] = await db.query(query, [age, sex, education_status, occupation_status, residency, id]);
    return result;
};

// Delete a specific patient by ID
const deletePatient = async (id) => {
    const query = 'DELETE FROM Patients WHERE patient_id = ?';
    const [result] = await db.query(query, [id]);
    return result;
};

module.exports = { add, getAll, getById, update, delete: deletePatient };
