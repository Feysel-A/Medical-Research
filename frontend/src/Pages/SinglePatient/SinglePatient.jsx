import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./SinglePatientDetail.module.css";
import api_url from "../../Axio";

const SinglePatientDetail = () => {
  const { patientId } = useParams(); // Assuming you're using React Router
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patient details from API
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`${api_url}/patients/${patientId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patientData) {
    return <div>No patient data found.</div>;
  }

  const {
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
  } = patientData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patient Details</h1>

      {/* Patient Basic Info */}
      <section className={styles.section}>
        <h2>Basic Information</h2>
        <p>
          <strong>Patient ID:</strong> {patient.patient_id}
        </p>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Sex:</strong> {patient.sex}
        </p>
        <p>
          <strong>Education:</strong> {patient.education_status}
        </p>
        <p>
          <strong>Occupation:</strong> {patient.occupation_status}
        </p>
        <p>
          <strong>Residency:</strong> {patient.residency}
        </p>
      </section>

      {/* Comorbidities */}
      {comorbidities?.length > 0 && (
        <section className={styles.section}>
          <h2>Comorbidities</h2>
          <p>
            <strong>Has Comorbidities:</strong>{" "}
            {comorbidities[0].has_comorbidities ? "Yes" : "No"}
          </p>
          <p>
            <strong>List:</strong> {comorbidities[0].comorbidities_list}
          </p>
        </section>
      )}

      {/* Nutritional Status */}
      {nutritionalStatus?.length > 0 && (
        <section className={styles.section}>
          <h2>Nutritional Status</h2>
          <p>
            <strong>BMI:</strong> {nutritionalStatus[0].bmi_status}
          </p>
          <p>
            <strong>Hemoglobin:</strong> {nutritionalStatus[0].hg_status}
          </p>
          <p>
            <strong>Albumin:</strong> {nutritionalStatus[0].albumin_status}
          </p>
        </section>
      )}

      {/* Diagnosis */}
      {diagnosis?.length > 0 && (
        <section className={styles.section}>
          <h2>Diagnosis</h2>
          <p>
            <strong>Type:</strong> {diagnosis[0].diagnosis_type}
          </p>
          <p>
            <strong>Gyne/Obstetrics:</strong> {diagnosis[0].gyne_obstetrics}
          </p>
        </section>
      )}

      {/* Surgery */}
      {surgery?.length > 0 && (
        <section className={styles.section}>
          <h2>Surgery</h2>
          <p>
            <strong>Type:</strong> {surgery[0].surgery_type}
          </p>
          <p>
            <strong>Main Procedure:</strong> {surgery[0].main_procedure}
          </p>
          <p>
            <strong>Duration:</strong> {surgery[0].duration_of_surgery}
          </p>
          <p>
            <strong>ASA Score:</strong> {surgery[0].asa_score}
          </p>
        </section>
      )}

      {/* Infections */}
      {infections?.length > 0 && (
        <section className={styles.section}>
          <h2>Infections</h2>
          <p>
            <strong>Type:</strong> {infections[0].infection_type}
          </p>
          <p>
            <strong>Microorganisms:</strong> {infections[0].microorganisms}
          </p>
        </section>
      )}

      {/* Hospital Stay */}
      {hospitalStay?.length > 0 && (
        <section className={styles.section}>
          <h2>Hospital Stay</h2>
          <p>
            <strong>Preoperative Days:</strong>{" "}
            {hospitalStay[0].preoperative_days}
          </p>
          <p>
            <strong>Postoperative Days:</strong>{" "}
            {hospitalStay[0].postoperative_days}
          </p>
        </section>
      )}

      {/* Antibiotics */}
      {antibiotics?.length > 0 && (
        <section className={styles.section}>
          <h2>Antibiotics</h2>
          <p>
            <strong>Given:</strong> {antibiotics[0].given ? "Yes" : "No"}
          </p>
          <p>
            <strong>Prophylactic:</strong>{" "}
            {antibiotics[0].prophylactic ? "Yes" : "No"}
          </p>
          <p>
            <strong>List:</strong> {antibiotics[0].antibiotics_list}
          </p>
        </section>
      )}

      {/* Previous Hospitalization */}
      {previousHospitalization?.length > 0 && (
        <section className={styles.section}>
          <h2>Previous Hospitalization</h2>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(previousHospitalization[0].date).toDateString()}
          </p>
        </section>
      )}

      {/* Previous Surgeries */}
      {previousSurgeries?.length > 0 && (
        <section className={styles.section}>
          <h2>Previous Surgeries</h2>
          <p>
            <strong>Type:</strong> {previousSurgeries[0].type_of_surgery}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(previousSurgeries[0].date).toDateString()}
          </p>
        </section>
      )}
    </div>
  );
};

export default SinglePatientDetail;
