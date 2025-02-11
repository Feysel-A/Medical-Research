import React, { useState, useEffect, useContext } from "react";
import styles from "./RetrievePatients.module.css";
import Modal from "../../components/CustomModel/Modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api_url from "../../Axio";
import { AppState } from "../../Context/DataContext";
import DownloadFile from "../../components/DownloadFile/DownloadFile";

const RetrievePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const navigator = useNavigate();
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${api_url}/patients`);
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
      await fetch(`${api_url}/patients/${selectedPatientId}`, {
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
  const { user } = useContext(AppState);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigator("/login");
    }
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <br />
      <br />
      <br />
      <span
        style={{ float: "right", marginRight: "10px", marginBottom: "10px" }}
      >
        <span style={{ fontSize:"20px" }}>All Patients</span>{" "}
        <DownloadFile patients={patients} />
      </span>
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
          {patients.length === 0 ? (
            <tr>
              <h2>No patients found.</h2>
            </tr>
          ) : (
            patients?.map((patient) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RetrievePatients;
