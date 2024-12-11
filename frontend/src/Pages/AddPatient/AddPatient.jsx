import React, { useState } from "react";
import styles from "./AddPatient.module.css";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    patient: {
      age: "20",
      sex: "Female",
      education_status: "No Degree",
      occupation_status: "Farmer",
      residency: "Ethiopia",
    },
    comorbidities: {
      has_comorbidities: false,
      comorbidities_list: "Diabetes, Hypertension",
    },
    personalHabits: {
      smoking_status: "No",
      alcohol_status: "No",
      substance_abuse: false,
    },
    nutritionalStatus: {
      bmi_status: "Overweight",
      hg_status: "Moderate",
      albumin_status: "Normal",
    },
    diagnosis: {
      diagnosis_type: "Cardiovascular",
      gyne_obstetrics: "N/A",
    },
    surgery: {
      wound_class: "Class 2",
      surgery_type: "Open Heart",
      main_procedure: "Bypass",
      duration_of_surgery: "3 hours",
      asa_score: "3",
    },
    infections: {
      has_infection: false,
      infection_date: "2023-09-01",
      infection_type: "Sepsis",
      microorganisms: "Staphylococcus",
    },
    hospitalStay: {
      preoperative_days: "3",
      postoperative_days: "6",
    },
    antibiotics: {
      given: false,
      prophylactic: false,
      antibiotics_list: "Penicillin",
      duration: "7",
    },
    previousHospitalization: {
      date: "2022-05-10",
    },
    previousSurgeries: {
      type_of_surgery: "Appendectomy",
      date: "2019-08-20",
    },
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const navigator = useNavigate();
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // Replace with API call logic
    const response = fetch("http://localhost:3001/api/patients/add-or-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigator("/");
        }, 2000);
        // navigator("/patients");
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Patient</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Patient Details */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Patient Details</h2>
          <label>Age</label>
          <input
            type="number"
            value={formData.patient.age}
            onChange={(e) => handleChange("patient", "age", e.target.value)}
            required
          />
          <label>Sex</label>
          <select
            value={formData.patient.sex}
            onChange={(e) => handleChange("patient", "sex", e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Education Status</label>
          <input
            type="text"
            value={formData.patient.education_status}
            onChange={(e) =>
              handleChange("patient", "education_status", e.target.value)
            }
          />
          <label>Occupation Status</label>
          <input
            type="text"
            value={formData.patient.occupation_status}
            onChange={(e) =>
              handleChange("patient", "occupation_status", e.target.value)
            }
          />
          <label>Residency</label>
          <input
            type="text"
            value={formData.patient.residency}
            onChange={(e) =>
              handleChange("patient", "residency", e.target.value)
            }
          />
        </section>
        {/* Comorbidities */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Comorbidities</h2>
          <div className={styles.checkbox}>
            <label>Has Comorbidities</label>
            <input
              type="checkbox"
              checked={formData.comorbidities.has_comorbidities}
              onChange={(e) =>
                handleChange(
                  "comorbidities",
                  "has_comorbidities",
                  e.target.checked
                )
              }
            />
          </div>

          <label>Comorbidities List</label>
          <textarea
            value={formData.comorbidities.comorbidities_list}
            onChange={(e) =>
              handleChange(
                "comorbidities",
                "comorbidities_list",
                e.target.value
              )
            }
          />
        </section>

        {/* Personal Habits */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Habits</h2>
          <label>Smoking Status</label>
          <select
            value={formData.personalHabits.smoking_status}
            onChange={(e) =>
              handleChange("personalHabits", "smoking_status", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label>Alcohol Status</label>
          <select
            value={formData.personalHabits.alcohol_status}
            onChange={(e) =>
              handleChange("personalHabits", "alcohol_status", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label>Substance Abuse</label>
          <input
            type="checkbox"
            checked={formData.personalHabits.substance_abuse}
            onChange={(e) =>
              handleChange(
                "personalHabits",
                "substance_abuse",
                e.target.checked
              )
            }
          />
        </section>
        {/* Nutritional Status */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nutritional Status</h2>
          <label>BMI Status</label>
          <input
            type="text"
            value={formData.nutritionalStatus.bmi_status}
            onChange={(e) =>
              handleChange("nutritionalStatus", "bmi_status", e.target.value)
            }
          />
          <label>Hemoglobin Status</label>
          <input
            type="text"
            value={formData.nutritionalStatus.hg_status}
            onChange={(e) =>
              handleChange("nutritionalStatus", "hg_status", e.target.value)
            }
          />
          <label>Albumin Status</label>
          <input
            type="text"
            value={formData.nutritionalStatus.albumin_status}
            onChange={(e) =>
              handleChange(
                "nutritionalStatus",
                "albumin_status",
                e.target.value
              )
            }
          />
        </section>

        {/* Diagnosis */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Diagnosis</h2>
          <label>Diagnosis Type</label>
          <input
            type="text"
            value={formData.diagnosis.diagnosis_type}
            onChange={(e) =>
              handleChange("diagnosis", "diagnosis_type", e.target.value)
            }
          />
          <label>Gynecology/Obstetrics</label>
          <input
            type="text"
            value={formData.diagnosis.gyne_obstetrics}
            onChange={(e) =>
              handleChange("diagnosis", "gyne_obstetrics", e.target.value)
            }
          />
        </section>

        {/* Surgery */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Surgery</h2>
          <label>Wound Class</label>
          <input
            type="text"
            value={formData.surgery.wound_class}
            onChange={(e) =>
              handleChange("surgery", "wound_class", e.target.value)
            }
          />
          <label>Surgery Type</label>
          <input
            type="text"
            value={formData.surgery.surgery_type}
            onChange={(e) =>
              handleChange("surgery", "surgery_type", e.target.value)
            }
          />
          <label>Main Procedure</label>
          <input
            type="text"
            value={formData.surgery.main_procedure}
            onChange={(e) =>
              handleChange("surgery", "main_procedure", e.target.value)
            }
          />
          <label>Duration of Surgery</label>
          <input
            type="text"
            value={formData.surgery.duration_of_surgery}
            onChange={(e) =>
              handleChange("surgery", "duration_of_surgery", e.target.value)
            }
          />
          <label>ASA Score</label>
          <input
            type="number"
            value={formData.surgery.asa_score}
            onChange={(e) =>
              handleChange("surgery", "asa_score", e.target.value)
            }
          />
        </section>
        {/* Infections Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Infections</h2>
          <label>Has Infection</label>
          <input
            type="checkbox"
            checked={formData.infections.has_infection}
            onChange={(e) =>
              handleChange("infections", "has_infection", e.target.checked)
            }
          />
          <label>Infection Date</label>
          <input
            type="date"
            value={formData.infections.infection_date}
            onChange={(e) =>
              handleChange("infections", "infection_date", e.target.value)
            }
          />
          <label>Infection Type</label>
          <input
            type="text"
            value={formData.infections.infection_type}
            onChange={(e) =>
              handleChange("infections", "infection_type", e.target.value)
            }
          />
          <label>Microorganisms</label>
          <textarea
            value={formData.infections.microorganisms}
            onChange={(e) =>
              handleChange("infections", "microorganisms", e.target.value)
            }
          />
        </section>

        {/* Hospital Stay Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hospital Stay</h2>
          <label>Preoperative Days</label>
          <input
            type="number"
            value={formData.hospitalStay.preoperative_days}
            onChange={(e) =>
              handleChange("hospitalStay", "preoperative_days", e.target.value)
            }
          />
          <label>Postoperative Days</label>
          <input
            type="number"
            value={formData.hospitalStay.postoperative_days}
            onChange={(e) =>
              handleChange("hospitalStay", "postoperative_days", e.target.value)
            }
          />
        </section>

        {/* Antibiotics Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Antibiotics</h2>
          <div className={styles.checkbox}>
            <label>Given</label>
            <input
              type="checkbox"
              checked={formData.antibiotics.given}
              onChange={(e) =>
                handleChange("antibiotics", "given", e.target.checked)
              }
            />
          </div>

          <label>Prophylactic</label>
          <input
            type="checkbox"
            checked={formData.antibiotics.prophylactic}
            onChange={(e) =>
              handleChange("antibiotics", "prophylactic", e.target.checked)
            }
          />
          <label>Antibiotics List</label>
          <textarea
            value={formData.antibiotics.antibiotics_list}
            onChange={(e) =>
              handleChange("antibiotics", "antibiotics_list", e.target.value)
            }
          />
          <label>Duration (Days)</label>
          <input
            type="number"
            value={formData.antibiotics.duration}
            onChange={(e) =>
              handleChange("antibiotics", "duration", e.target.value)
            }
          />
        </section>

        {/* Previous Hospitalization Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Previous Hospitalization</h2>
          <label>Hospitalization Date</label>
          <input
            type="date"
            value={formData.previousHospitalization.date}
            onChange={(e) =>
              handleChange("previousHospitalization", "date", e.target.value)
            }
          />
        </section>

        {/* Previous Surgeries Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Previous Surgeries</h2>
          <label>Type of Surgery</label>
          <input
            type="text"
            value={formData.previousSurgeries.type_of_surgery}
            onChange={(e) =>
              handleChange(
                "previousSurgeries",
                "type_of_surgery",
                e.target.value
              )
            }
          />
          <label>Surgery Date</label>
          <input
            type="date"
            value={formData.previousSurgeries.date}
            onChange={(e) =>
              handleChange("previousSurgeries", "date", e.target.value)
            }
          />
        </section>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
