import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AppState } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Example from "../../components/Example/Example";
import api_url from "../../Axio";
const HomePage = () => {
  const { user } = useContext(AppState);
  const [patients, setPatients] = useState([]);
  const navigator = useNavigate();
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${api_url}/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigator("/login");
    }
    fetchPatients();
  }, [user]);

  return (
    <>
      <div className={styles.container_one}>
        {/* Banner Section */}
        <section className={styles.banner}>
          <h1 className={styles.title_one}>Welcome to the Healthcare App</h1>
          <p className={styles.subtitle}>
            Manage patient information with ease
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => navigator("/add-patient")}
          >
            Add Patient
          </button>
        </section>
        <div className={styles.content}>
          <div className={styles.container}>
            <h1 className={styles.title}>Patient Reports</h1>

            <div className={styles.chartSection}>
              <h2 className={styles.chartTitle}>Age Distribution</h2>
              <div className={styles.chartWrapper}>
                {patients.length > 0 && <Example patientData={patients} />}
              </div>
            </div>

            {/* Add more charts below */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
