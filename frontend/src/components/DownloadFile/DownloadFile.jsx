import React from "react";
import Papa from "papaparse";

const DownloadFile = ({ patients }) => {
    const handleDownloadCSV = () => {
        if (!patients || patients.length === 0) {
            alert("No patient data to download.");
            return;
        }

        // Flatten and convert data to CSV format
        const csvData = patients.map((record) => ({
            patient_id: record.patient?.patient_id || "",
            age: record.patient?.age || "",
            sex: record.patient?.sex || "",
            education_status: record.patient?.education_status || "",
            occupation_status: record.patient?.occupation_status || "",
            residency: record.patient?.residency || "",
            comorbidities_list: record.comorbidities?.comorbidities_list || "",
            smoking_status: record.personalHabits?.smoking_status || "",
            alcohol_status: record.personalHabits?.alcohol_status || "",
            bmi_status: record.nutritionalStatus?.bmi_status || "",
            diagnosis_type: record.diagnosis?.diagnosis_type || "",
            surgery_type: record.surgery?.surgery_type || "",
            infection_type: record.infections?.infection_type || "",
            preoperative_days: record.hospitalStay?.preoperative_days || "",
            postoperative_days: record.hospitalStay?.postoperative_days || "",
        }));

        const csv = Papa.unparse(csvData);

        // Create a downloadable CSV file
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", "patients_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleDownloadCSV} style={styles.downloadButton}>
            Download CSV
        </button>
    );
};

const styles = {
    downloadButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default DownloadFile;
