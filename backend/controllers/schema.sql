-- Create Patients Table
CREATE TABLE Patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    sex VARCHAR(10) NOT NULL,
    education_status VARCHAR(100),
    occupation_status VARCHAR(100),
    residency VARCHAR(255)
);

-- Create Comorbidities Table
CREATE TABLE Comorbidities (
    comorbidity_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    has_comorbidities BOOLEAN NOT NULL,
    comorbidities_list TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create NutritionalStatus Table
CREATE TABLE NutritionalStatus (
    nutrition_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    bmi_status VARCHAR(50),
    hg_status VARCHAR(50),
    albumin_status VARCHAR(50),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create Diagnosis Table
CREATE TABLE Diagnosis (
    diagnosis_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    diagnosis_type VARCHAR(100),
    gyne_obstetrics VARCHAR(100),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create Surgery Table
CREATE TABLE Surgery (
    surgery_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    wound_class VARCHAR(50),
    surgery_type VARCHAR(50),
    main_procedure VARCHAR(100),
    asa_score INT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create Infections Table
CREATE TABLE Infections (
    infection_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    has_infection BOOLEAN NOT NULL,
    infection_date DATE,
    infection_type VARCHAR(50),
    microorganisms TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create HospitalStay Table
CREATE TABLE HospitalStay (
    stay_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    preoperative_days INT,
    postoperative_days INT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

-- Create Antibiotics Table
CREATE TABLE Antibiotics (
    antibiotic_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    given BOOLEAN NOT NULL,
    prophylactic BOOLEAN,
    antibiotics_list TEXT,
    duration INT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);
