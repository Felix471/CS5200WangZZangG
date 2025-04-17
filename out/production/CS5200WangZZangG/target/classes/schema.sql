-- Create database
DROP DATABASE IF EXISTS dentist_clinic;
CREATE DATABASE dentist_clinic;
USE dentist_clinic;

-- Table structure for Clinic
CREATE TABLE Clinic (
    clinic_id INT PRIMARY KEY AUTO_INCREMENT,
    clinic_name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    clinic_contact_number VARCHAR(50) NOT NULL
);


-- Table structure for Dentist
CREATE TABLE Dentist (
    dentist_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    license_number VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(250) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    clinic_id INT,
    FOREIGN KEY (clinic_id) REFERENCES Clinic(clinic_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Table structure for Patient
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    address TEXT NOT NULL
);

-- Table structure for Insurance
CREATE TABLE Insurance (
    insurance_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_name VARCHAR(100) NOT NULL,
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Table structure for Appointment
CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_date DATETIME NOT NULL,
    status ENUM('scheduled', 'completed', 'canceled') DEFAULT 'scheduled',
    patient_id INT,
    dentist_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (dentist_id) REFERENCES Dentist (dentist_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Table structure for Treatment
CREATE TABLE Treatment(
    treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    description varchar(250),
    dentist_id INT,
    appointment_id INT,
    FOREIGN KEY (dentist_id) REFERENCES Dentist (dentist_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
	FOREIGN KEY (appointment_id) REFERENCES Appointment (appointment_id)
        ON DELETE CASCADE ON UPDATE RESTRICT
);

-- Table structure for ProcedureCatalog
CREATE TABLE ProcedureCatalog (
    procedure_id INT PRIMARY KEY AUTO_INCREMENT,
    procedure_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    standard_cost DECIMAL(10,2) NOT NULL CHECK (standard_cost > 0)
);

-- Table structure for TreatmentProcedure
CREATE TABLE TreatmentProcedure (
    procedure_id INT,
    treatment_id INT,
    PRIMARY KEY (procedure_id, treatment_id),
    FOREIGN KEY (procedure_id) REFERENCES ProcedureCatalog (procedure_id)
        ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (treatment_id) REFERENCES Treatment (treatment_id)
        ON DELETE CASCADE ON UPDATE RESTRICT
);

-- Table structure for Payment
CREATE TABLE Payment(
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE DEFAULT (CURRENT_DATE),
    method varchar(50) not null,
    patient_id INT,
    appointment_id INT,
    FOREIGN KEY (appointment_id) REFERENCES Appointment (appointment_id)
        ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Table structure for DentistProcedure
CREATE TABLE DentistProcedure (
    procedure_id INT,
    dentist_id INT,
    PRIMARY KEY (procedure_id, dentist_id),
    FOREIGN KEY (procedure_id) REFERENCES ProcedureCatalog (procedure_id)
        ON DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (dentist_id) REFERENCES Dentist (dentist_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT 
);

-- Table structure for MedicalRecord
CREATE TABLE MedicalRecord (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    record_description varchar(250),
    record_date DATE DEFAULT (CURRENT_DATE),
    patient_id INT,
    treatment_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
        ON DELETE RESTRICT ON UPDATE RESTRICT, 
    FOREIGN KEY (treatment_id) REFERENCES Treatment(treatment_id)
        ON DELETE CASCADE ON UPDATE RESTRICT
);



