import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AppState } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AppState);
  const navigator = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigator("/login");
    }
  }, [user]);
  return (
    <>
      <div className={styles.container}>
        {/* Banner Section */}
        <section className={styles.banner}>
          <h1 className={styles.title}>Welcome to the Healthcare App</h1>
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

        {/* Cards Section */}
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Patient 1</h2>
            <p className={styles.cardText}>Status: Healthy</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Patient 2</h2>
            <p className={styles.cardText}>Status: Recovering</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Patient 3</h2>
            <p className={styles.cardText}>Status: Critical</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
