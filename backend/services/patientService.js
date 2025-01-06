const db = require("../config/db");

// Add or update a patient and all related details
const addOrUpdatePatient = async (
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
) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Add or update patient details
    const patientQuery = `
            INSERT INTO Patients (age, sex, education_status, occupation_status, residency) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                age = VALUES(age),
                sex = VALUES(sex),
                education_status = VALUES(education_status),
                occupation_status = VALUES(occupation_status),
                residency = VALUES(residency)
        `;
    const [patientResult] = await connection.query(patientQuery, [
      patient.age || 0, // Default to 0 if null
      patient.sex || "Unknown", // Default to "Unknown"
      patient.education_status || "Not Specified", // Default to "Not Specified"
      patient.occupation_status || "Unemployed", // Default to "Unemployed"
      patient.residency || "Unknown", // Default to "Unknown"
    ]);
    const patientId = patientResult.insertId || patientResult.affectedRows;

    // Insert or update all related data

    // Comorbidities
    if (comorbidities) {
      const comorbiditiesQuery = `
                INSERT INTO Comorbidities (patient_id, has_comorbidities, comorbidities_list) 
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    has_comorbidities = VALUES(has_comorbidities),
                    comorbidities_list = VALUES(comorbidities_list)
            `;
      await connection.query(comorbiditiesQuery, [
        patientId,
        comorbidities.has_comorbidities ?? false, // Default to false
        comorbidities.comorbidities_list || "None", // Default to "None"
      ]);
    }

    // Personal Habits
    if (personalHabits) {
      const habitsQuery = `
                INSERT INTO PersonalHabits (patient_id, smoking_status, alcohol_status, substance_abuse) 
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    smoking_status = VALUES(smoking_status),
                    alcohol_status = VALUES(alcohol_status),
                    substance_abuse = VALUES(substance_abuse)
            `;
      await connection.query(habitsQuery, [
        patientId,
        personalHabits.smoking_status || "No", // Default to "No"
        personalHabits.alcohol_status || "No", // Default to "No"
        personalHabits.substance_abuse ?? false, // Default to false
      ]);
    }

    // Nutritional Status
    if (nutritionalStatus) {
      const nutritionalQuery = `
                INSERT INTO NutritionalStatus (patient_id, bmi_status, hg_status, albumin_status) 
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    bmi_status = VALUES(bmi_status),
                    hg_status = VALUES(hg_status),
                    albumin_status = VALUES(albumin_status)
            `;
      await connection.query(nutritionalQuery, [
        patientId,
        nutritionalStatus.bmi_status || "Normal", // Default to "Normal"
        nutritionalStatus.hg_status || "Normal", // Default to "Normal"
        nutritionalStatus.albumin_status || "Normal", // Default to "Normal"
      ]);
    }

    // Diagnosis
    if (diagnosis) {
      const diagnosisQuery = `
                INSERT INTO Diagnosis (patient_id, diagnosis_type, gyne_obstetrics) 
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    diagnosis_type = VALUES(diagnosis_type),
                    gyne_obstetrics = VALUES(gyne_obstetrics)
            `;
      await connection.query(diagnosisQuery, [
        patientId,
        diagnosis.diagnosis_type || "Not Specified", // Default to "Not Specified"
        diagnosis.gyne_obstetrics || "N/A", // Default to "N/A"
      ]);
    }

    // Surgery
    if (surgery) {
      const surgeryQuery = `
                INSERT INTO Surgery (patient_id, wound_class, surgery_type, main_procedure, duration_of_surgery, asa_score) 
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    wound_class = VALUES(wound_class),
                    surgery_type = VALUES(surgery_type),
                    main_procedure = VALUES(main_procedure),
                    duration_of_surgery = VALUES(duration_of_surgery),
                    asa_score = VALUES(asa_score)
            `;
      await connection.query(surgeryQuery, [
        patientId,
        surgery.wound_class || "Unknown", // Default to "Unknown"
        surgery.surgery_type || "Not Specified", // Default to "Not Specified"
        surgery.main_procedure || "None", // Default to "None"
        surgery.duration_of_surgery || "0 hours", // Default to "0 hours"
        surgery.asa_score || 0, // Default to 0
      ]);
    }

    // Infections
    if (infections) {
      const infectionsQuery = `
                INSERT INTO Infections (patient_id, has_infection, infection_date, infection_type, microorganisms) 
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    has_infection = VALUES(has_infection),
                    infection_date = VALUES(infection_date),
                    infection_type = VALUES(infection_type),
                    microorganisms = VALUES(microorganisms)
            `;
      await connection.query(infectionsQuery, [
        patientId,
        infections.has_infection ?? false, // Default to false
        infections.infection_date || "1970-01-01", // Default to epoch date
        infections.infection_type || "None", // Default to "None"
        infections.microorganisms || "None", // Default to "None"
      ]);
    }

    // Hospital Stay
    if (hospitalStay) {
      const hospitalStayQuery = `
                INSERT INTO HospitalStay (patient_id, preoperative_days, postoperative_days) 
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    preoperative_days = VALUES(preoperative_days),
                    postoperative_days = VALUES(postoperative_days)
            `;
      await connection.query(hospitalStayQuery, [
        patientId,
        hospitalStay.preoperative_days || 0, // Default to 0
        hospitalStay.postoperative_days || 0, // Default to 0
      ]);
    }

    // Antibiotics
    if (antibiotics) {
      const antibioticsQuery = `
                INSERT INTO Antibiotics (patient_id, given, prophylactic, antibiotics_list, duration) 
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    given = VALUES(given),
                    prophylactic = VALUES(prophylactic),
                    antibiotics_list = VALUES(antibiotics_list),
                    duration = VALUES(duration)
            `;
      await connection.query(antibioticsQuery, [
        patientId,
        antibiotics.given ?? false, // Default to false
        antibiotics.prophylactic ?? false, // Default to false
        antibiotics.antibiotics_list || "None", // Default to "None"
        antibiotics.duration || 0, // Default to 0
      ]);
    }

    // Previous Hospitalization
    if (previousHospitalization) {
      const prevHospQuery = `
                INSERT INTO PreviousHospitalization (patient_id, date) 
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE
                    date = VALUES(date)
            `;
      await connection.query(prevHospQuery, [
        patientId,
        previousHospitalization.date || "1970-01-01", // Default to epoch date
      ]);
    }

    // Previous Surgeries
    if (previousSurgeries) {
      const prevSurgQuery = `
                INSERT INTO PreviousSurgeries (patient_id, type_of_surgery, date) 
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    type_of_surgery = VALUES(type_of_surgery),
                    date = VALUES(date)
            `;
      await connection.query(prevSurgQuery, [
        patientId,
        previousSurgeries.type_of_surgery || "None", // Default to "None"
        previousSurgeries.date || "1970-01-01", // Default to epoch date
      ]);
    }

    await connection.commit();
    return { patientId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


// Get all details for a specific patient
const getPatientDetailsById = async (patientId) => {
  const patientQuery = "SELECT * FROM Patients WHERE patient_id = ?";
  const [patientRows] = await db.query(patientQuery, [patientId]);
  const patient = patientRows[0];

  if (!patient) return { patient: null };

  // Get related data from all tables for comorbidities, personal habits, nutritional status, etc.
  const comorbiditiesQuery = "SELECT * FROM Comorbidities WHERE patient_id = ?";
  const nutritionalQuery =
    "SELECT * FROM NutritionalStatus WHERE patient_id = ?";
  const habitsQuery = "SELECT * FROM PersonalHabits WHERE patient_id = ?";
  const diagnosisQuery = "SELECT * FROM Diagnosis WHERE patient_id = ?";
  const surgeryQuery = "SELECT * FROM Surgery WHERE patient_id = ?";
  const infectionsQuery = "SELECT * FROM Infections WHERE patient_id = ?";
  const hospitalStayQuery = "SELECT * FROM HospitalStay WHERE patient_id = ?";
  const antibioticsQuery = "SELECT * FROM Antibiotics WHERE patient_id = ?";
  const prevHospQuery =
    "SELECT * FROM PreviousHospitalization WHERE patient_id = ?";
  const prevSurgQuery = "SELECT * FROM PreviousSurgeries WHERE patient_id = ?";

  // Fetch all related data in parallel
  const [comorbidities] = await db.query(comorbiditiesQuery, [patientId]);
  const [nutritionalStatus] = await db.query(nutritionalQuery, [patientId]);
  const [personalHabits] = await db.query(habitsQuery, [patientId]);
  const [diagnosis] = await db.query(diagnosisQuery, [patientId]);
  const [surgery] = await db.query(surgeryQuery, [patientId]);
  const [infections] = await db.query(infectionsQuery, [patientId]);
  const [hospitalStay] = await db.query(hospitalStayQuery, [patientId]);
  const [antibiotics] = await db.query(antibioticsQuery, [patientId]);
  const [previousHospitalization] = await db.query(prevHospQuery, [patientId]);
  const [previousSurgeries] = await db.query(prevSurgQuery, [patientId]);

  return {
    patient,
    comorbidities,
    nutritionalStatus,
    personalHabits,
    diagnosis,
    surgery,
    infections,
    hospitalStay,
    antibiotics,
    previousHospitalization,
    previousSurgeries,
  };
};

// Delete a patient and all related details
const deletePatientWithDetails = async (patientId) => {
  const query = "DELETE FROM Patients WHERE patient_id = ?";
  await db.query(query, [patientId]);

  // Delete related data from all tables
  await db.query("DELETE FROM Comorbidities WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM PersonalHabits WHERE patient_id = ?", [
    patientId,
  ]);
  await db.query("DELETE FROM NutritionalStatus WHERE patient_id = ?", [
    patientId,
  ]);
  await db.query("DELETE FROM Diagnosis WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM Surgery WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM Infections WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM HospitalStay WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM Antibiotics WHERE patient_id = ?", [patientId]);
  await db.query("DELETE FROM PreviousHospitalization WHERE patient_id = ?", [
    patientId,
  ]);
  await db.query("DELETE FROM PreviousSurgeries WHERE patient_id = ?", [
    patientId,
  ]);
};
const updateSinglePatientById = async (
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
) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Update the main patient details
    if (patient) {
      const patientQuery = `
                UPDATE Patients
                SET age = ?, sex = ?, education_status = ?, occupation_status = ?, residency = ?
                WHERE patient_id = ?
            `;
      await connection.query(patientQuery, [
        patient.age,
        patient.sex,
        patient.education_status,
        patient.occupation_status,
        patient.residency,
        patientId,
      ]);
    }

    // Update comorbidities
    if (comorbidities) {
      const comorbiditiesQuery = `
                UPDATE Comorbidities
                SET has_comorbidities = ?, comorbidities_list = ?
                WHERE patient_id = ?
            `;
      await connection.query(comorbiditiesQuery, [
        comorbidities.has_comorbidities,
        comorbidities.comorbidities_list,
        patientId,
      ]);
    }

    // Update personal habits
    if (personalHabits) {
      const habitsQuery = `
                UPDATE PersonalHabits
                SET smoking_status = ?, alcohol_status = ?, substance_abuse = ?
                WHERE patient_id = ?
            `;
      await connection.query(habitsQuery, [
        personalHabits.smoking_status,
        personalHabits.alcohol_status,
        personalHabits.substance_abuse,
        patientId,
      ]);
    }

    // Update nutritional status
    if (nutritionalStatus) {
      const nutritionalQuery = `
                UPDATE NutritionalStatus
                SET bmi_status = ?, hg_status = ?, albumin_status = ?
                WHERE patient_id = ?
            `;
      await connection.query(nutritionalQuery, [
        nutritionalStatus.bmi_status,
        nutritionalStatus.hg_status,
        nutritionalStatus.albumin_status,
        patientId,
      ]);
    }

    // Update diagnosis
    if (diagnosis) {
      const diagnosisQuery = `
                UPDATE Diagnosis
                SET diagnosis_type = ?, gyne_obstetrics = ?
                WHERE patient_id = ?
            `;
      await connection.query(diagnosisQuery, [
        diagnosis.diagnosis_type,
        diagnosis.gyne_obstetrics,
        patientId,
      ]);
    }

    // Update surgery
    if (surgery) {
      const surgeryQuery = `
                UPDATE Surgery
                SET wound_class = ?, surgery_type = ?, main_procedure = ?, duration_of_surgery = ?, asa_score = ?
                WHERE patient_id = ?
            `;
      await connection.query(surgeryQuery, [
        surgery.wound_class,
        surgery.surgery_type,
        surgery.main_procedure,
        surgery.duration_of_surgery,
        surgery.asa_score,
        patientId,
      ]);
    }

    // Update infections
    if (infections) {
      const infectionsQuery = `
                UPDATE Infections
                SET has_infection = ?, infection_date = ?, infection_type = ?, microorganisms = ?
                WHERE patient_id = ?
            `;
      await connection.query(infectionsQuery, [
        infections.has_infection,
        infections.infection_date,
        infections.infection_type,
        infections.microorganisms,
        patientId,
      ]);
    }

    // Update hospital stay
    if (hospitalStay) {
      const hospitalStayQuery = `
                UPDATE HospitalStay
                SET preoperative_days = ?, postoperative_days = ?
                WHERE patient_id = ?
            `;
      await connection.query(hospitalStayQuery, [
        hospitalStay.preoperative_days,
        hospitalStay.postoperative_days,
        patientId,
      ]);
    }

    // Update antibiotics
    if (antibiotics) {
      const antibioticsQuery = `
                UPDATE Antibiotics
                SET given = ?, prophylactic = ?, antibiotics_list = ?, duration = ?
                WHERE patient_id = ?
            `;
      await connection.query(antibioticsQuery, [
        antibiotics.given,
        antibiotics.prophylactic,
        antibiotics.antibiotics_list,
        antibiotics.duration,
        patientId,
      ]);
    }

    // Update previous hospitalization
    if (previousHospitalization) {
      const prevHospQuery = `
                UPDATE PreviousHospitalization
                SET date = ?
                WHERE patient_id = ?
            `;
      await connection.query(prevHospQuery, [
        previousHospitalization.date,
        patientId,
      ]);
    }

    // Update previous surgeries
    if (previousSurgeries) {
      const prevSurgQuery = `
                UPDATE PreviousSurgeries
                SET type_of_surgery = ?, date = ?
                WHERE patient_id = ?
            `;
      await connection.query(prevSurgQuery, [
        previousSurgeries.type_of_surgery,
        previousSurgeries.date,
        patientId,
      ]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
const getAllPatientsWithDetails = async () => {
  // Query the main Patients table, ordering by patient_id in descending order
  const patientQuery = "SELECT * FROM Patients ORDER BY patient_id DESC";
  const [patients] = await db.query(patientQuery);

  if (!patients || patients.length === 0) {
    return [];
  }

  // Query all related tables for each patient
  const patientDetails = await Promise.all(
    patients.map(async (patient) => {
      const patientId = patient.patient_id;

      const comorbiditiesQuery =
        "SELECT * FROM Comorbidities WHERE patient_id = ?";
      const nutritionalQuery =
        "SELECT * FROM NutritionalStatus WHERE patient_id = ?";
      const habitsQuery = "SELECT * FROM PersonalHabits WHERE patient_id = ?";
      const diagnosisQuery = "SELECT * FROM Diagnosis WHERE patient_id = ?";
      const surgeryQuery = "SELECT * FROM Surgery WHERE patient_id = ?";
      const infectionsQuery = "SELECT * FROM Infections WHERE patient_id = ?";
      const hospitalStayQuery =
        "SELECT * FROM HospitalStay WHERE patient_id = ?";
      const antibioticsQuery = "SELECT * FROM Antibiotics WHERE patient_id = ?";
      const prevHospQuery =
        "SELECT * FROM PreviousHospitalization WHERE patient_id = ?";
      const prevSurgQuery =
        "SELECT * FROM PreviousSurgeries WHERE patient_id = ?";

      // Fetch data for each table
      const [comorbidities] = await db.query(comorbiditiesQuery, [patientId]);
      const [nutritionalStatus] = await db.query(nutritionalQuery, [patientId]);
      const [personalHabits] = await db.query(habitsQuery, [patientId]);
      const [diagnosis] = await db.query(diagnosisQuery, [patientId]);
      const [surgery] = await db.query(surgeryQuery, [patientId]);
      const [infections] = await db.query(infectionsQuery, [patientId]);
      const [hospitalStay] = await db.query(hospitalStayQuery, [patientId]);
      const [antibiotics] = await db.query(antibioticsQuery, [patientId]);
      const [previousHospitalization] = await db.query(prevHospQuery, [
        patientId,
      ]);
      const [previousSurgeries] = await db.query(prevSurgQuery, [patientId]);

      return {
        patient,
        comorbidities: comorbidities[0] || null,
        personalHabits: personalHabits[0] || null,
        nutritionalStatus: nutritionalStatus[0] || null,
        diagnosis: diagnosis[0] || null,
        surgery: surgery[0] || null,
        infections: infections[0] || null,
        hospitalStay: hospitalStay[0] || null,
        antibiotics: antibiotics[0] || null,
        previousHospitalization: previousHospitalization[0] || null,
        previousSurgeries: previousSurgeries[0] || null,
      };
    })
  );

  return patientDetails;
};


module.exports = {
  addOrUpdatePatient,
  getPatientDetailsById,
  deletePatientWithDetails,
  updateSinglePatientById,
  getAllPatientsWithDetails,
};
