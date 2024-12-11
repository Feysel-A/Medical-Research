import React, { useState, useEffect } from "react";
import styles from "./RetrievePatients.module.css";
import Modal from "../../components/CustomModel/Modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const RetrievePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const navigator = useNavigate();
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async () => {
    try {
      await fetch(`http://localhost:3001/api/patients/${selectedPatientId}`, {
        method: "DELETE",
      });
      setPatients(
        patients.filter(
          (patient) => patient?.patient?.patient_id !== selectedPatientId
        )
      );
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Patients</h1>
      {modalVisible && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this patient?"
          onConfirm={deletePatient}
          onCancel={() => setModalVisible(false)}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Age</th>
            <th>Sex</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <tr key={patient?.patient.patient_id}>
              <td>{patient?.patient.patient_id}</td>
              <td>{patient?.patient.age}</td>
              <td>{patient?.patient.sex}</td>
              <td>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    navigator(`/view-patient/${patient?.patient.patient_id}`)
                  }
                >
                  <FaArrowUpRightFromSquare />
                </button>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    setSelectedPatientId(patient?.patient.patient_id);
                    setModalVisible(true);
                  }}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetrievePatients;
