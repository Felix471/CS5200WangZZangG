use dentist_clinic;
DELIMITER //

-- Clinic Procedures
CREATE PROCEDURE Clinic_Create(
    IN p_clinic_name VARCHAR(50),
    IN p_address TEXT,
    IN p_clinic_contact_number VARCHAR(50)
)
BEGIN
    INSERT INTO Clinic (clinic_name, address, clinic_contact_number) 
		VALUES (p_clinic_name, p_address, p_clinic_contact_number);
END //

CREATE PROCEDURE Clinic_Update(
    IN p_clinic_id INT,
    IN p_clinic_name VARCHAR(50),
    IN p_address TEXT,
    IN p_clinic_contact_number VARCHAR(50)
)
BEGIN
    UPDATE Clinic
    SET clinic_name = COALESCE(p_clinic_name, clinic_name),
        address = COALESCE(p_address, address),
        clinic_contact_number = COALESCE(p_clinic_contact_number, clinic_contact_number)
    WHERE clinic_id = p_clinic_id;
END //

CREATE PROCEDURE Clinic_Read()
BEGIN
    SELECT * FROM Clinic;
END //

-- Dentist Procedures
CREATE PROCEDURE Dentist_Create(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_license_number VARCHAR(20),
    IN p_description VARCHAR(250),
    IN p_phone_number VARCHAR(15),
    IN p_email VARCHAR(100),
    IN p_address TEXT,
    IN p_clinic_id INT
)
BEGIN
    INSERT INTO Dentist (first_name, last_name, license_number, description, 
        phone_number, email, address, clinic_id)
    VALUES (p_first_name, p_last_name, p_license_number, p_description, 
        p_phone_number, p_email, p_address, p_clinic_id);
END //

CREATE PROCEDURE Dentist_Update(
    IN p_dentist_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_license_number VARCHAR(20),
    IN p_description VARCHAR(250),
    IN p_phone_number VARCHAR(15),
    IN p_email VARCHAR(100),
    IN p_address TEXT,
    IN p_clinic_id INT
)
BEGIN
    DECLARE dentist_count INT;
    DECLARE clinic_count INT;
    
    -- Validate dentist exists
    SELECT COUNT(*) INTO dentist_count FROM Dentist WHERE dentist_id = p_dentist_id;
    IF dentist_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Dentist not found - update failed';
    END IF;
    
    -- Validate clinic exists if provided
    IF p_clinic_id IS NOT NULL THEN
        SELECT COUNT(*) INTO clinic_count FROM Clinic WHERE clinic_id = p_clinic_id;
        IF clinic_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Clinic not found - update failed';
        END IF;
    END IF;

    -- Perform the update
    UPDATE Dentist
    SET 
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        license_number = COALESCE(p_license_number, license_number),
        description = COALESCE(p_description, description),
        phone_number = COALESCE(p_phone_number, phone_number),
        email = COALESCE(p_email, email),
        address = COALESCE(p_address, address),
        clinic_id = COALESCE(p_clinic_id, clinic_id)
    WHERE dentist_id = p_dentist_id;
END //

CREATE PROCEDURE Dentist_Read()
BEGIN
    SELECT * FROM Dentist;
END //

-- Patient Procedures
CREATE PROCEDURE Patient_Create(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_date_of_birth DATE,
    IN p_phone_number VARCHAR(15),
    IN p_email VARCHAR(100),
    IN p_address TEXT
)
BEGIN
	DECLARE v_current_date DATE;
    
    -- Set current date for age validation
    SET v_current_date = CURDATE();
    
    -- Validate date of birth is not in the future if provided
    IF p_date_of_birth IS NOT NULL AND p_date_of_birth > v_current_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date of birth cannot be in the future';
    END IF;
    
    -- Validate reasonable age range (0-120 years old)
    IF p_date_of_birth IS NOT NULL AND 
       (p_date_of_birth < DATE_SUB(v_current_date, INTERVAL 120 YEAR) OR 
       p_date_of_birth > v_current_date) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid date of birth - patient age must be between 0 and 120 years';
    END IF;

    INSERT INTO Patient (first_name, last_name, date_of_birth, phone_number, 
        email, address)
    VALUES (p_first_name, p_last_name, p_date_of_birth, p_phone_number, 
        p_email, p_address);
END //

CREATE PROCEDURE Patient_Update(
    IN p_patient_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_date_of_birth DATE,
    IN p_phone_number VARCHAR(15),
    IN p_email VARCHAR(100),
    IN p_address TEXT
)
BEGIN
    DECLARE patient_count INT;
    DECLARE v_current_date DATE;
    
    -- Set current date for age validation
    SET v_current_date = CURDATE();
    
    -- Validate patient exists
    SELECT COUNT(*) INTO patient_count FROM Patient WHERE patient_id = p_patient_id;
    IF patient_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Patient not found - update failed';
    END IF;
    
    -- Validate date of birth is not in the future if provided
    IF p_date_of_birth IS NOT NULL AND p_date_of_birth > v_current_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date of birth cannot be in the future';
    END IF;
    
    -- Validate reasonable age range (0-120 years old)
    IF p_date_of_birth IS NOT NULL AND 
       (p_date_of_birth < DATE_SUB(v_current_date, INTERVAL 120 YEAR) OR 
       p_date_of_birth > v_current_date) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid date of birth - patient age must be between 0 and 120 years';
    END IF;
    
    -- Perform the update
    UPDATE Patient
    SET 
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        date_of_birth = COALESCE(p_date_of_birth, date_of_birth),
        phone_number = COALESCE(p_phone_number, phone_number),
        email = COALESCE(p_email, email),
        address = COALESCE(p_address, address)
    WHERE patient_id = p_patient_id;
END //

CREATE PROCEDURE Patient_Read()
BEGIN
    SELECT * FROM Patient;
END //

-- Insurance Procedures
CREATE PROCEDURE Insurance_Create(
    IN p_provider_name VARCHAR(100),
    IN p_policy_number VARCHAR(50),
    IN p_valid_from DATE,
    IN p_valid_to DATE,
    IN p_patient_id INT
)
BEGIN
    DECLARE patient_count INT;
    
	    -- Validate patient exists if provided
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO patient_count FROM Patient WHERE patient_id = p_patient_id;
        IF patient_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient not found - update failed';
        END IF;
    END IF;
    
	    -- Validate date range (valid_from must be before valid_to)
    IF (p_valid_from IS NOT NULL AND p_valid_to IS NOT NULL) AND (p_valid_from > p_valid_to) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid date range - valid_from must be before valid_to';
    END IF;
    
    INSERT INTO Insurance (provider_name, policy_number, valid_from, valid_to, patient_id)
    VALUES (p_provider_name, p_policy_number, p_valid_from, p_valid_to, p_patient_id);
END //


CREATE PROCEDURE Insurance_Update(
    IN p_insurance_id INT,
    IN p_provider_name VARCHAR(100),
    IN p_policy_number VARCHAR(50),
    IN p_valid_from DATE,
    IN p_valid_to DATE,
    IN p_patient_id INT
)
BEGIN
    DECLARE insurance_count INT;
    DECLARE patient_count INT;
    
    
    -- Validate insurance record exists
    SELECT COUNT(*) INTO insurance_count FROM Insurance WHERE insurance_id = p_insurance_id;
    IF insurance_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Insurance record not found - update failed';
    END IF;
    
    -- Validate patient exists if provided
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO patient_count FROM Patient WHERE patient_id = p_patient_id;
        IF patient_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient not found - update failed';
        END IF;
    END IF;
    
    -- Validate date range (valid_from must be before valid_to)
    IF (p_valid_from IS NOT NULL AND p_valid_to IS NOT NULL) AND (p_valid_from > p_valid_to) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid date range - valid_from must be before valid_to';
    END IF;
    
    -- Perform the update
    UPDATE Insurance
    SET 
        provider_name = COALESCE(p_provider_name, provider_name),
        policy_number = COALESCE(p_policy_number, policy_number),
        valid_from = COALESCE(p_valid_from, valid_from),
        valid_to = COALESCE(p_valid_to, valid_to),
        patient_id = COALESCE(p_patient_id, patient_id)
    WHERE insurance_id = p_insurance_id;

END //

CREATE PROCEDURE Insurance_Read()
BEGIN
    SELECT * FROM Insurance;
END //

CREATE PROCEDURE Insurance_Delete(
    IN p_insurance_id INT
)
BEGIN
    DECLARE insurance_count INT;
    
    -- Check if insurance record exists
    SELECT COUNT(*) INTO insurance_count 
    FROM Insurance 
    WHERE insurance_id = p_insurance_id;
    
    IF insurance_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insurance record not found - delete failed';
    END IF;

    DELETE FROM Insurance WHERE insurance_id = p_insurance_id;
END //

-- Appointment Procedures

CREATE PROCEDURE Appointment_Create_Simple(
    IN p_appointment_date DATETIME,
    IN p_patient_id INT,
    IN p_dentist_id INT
)
BEGIN
    -- Validate patient exists
    IF NOT EXISTS (SELECT 1 FROM Patient WHERE patient_id = p_patient_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Patient does not exist';
    END IF;

    -- Validate dentist exists
    IF NOT EXISTS (SELECT 1 FROM Dentist WHERE dentist_id = p_dentist_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist does not exist';
    END IF;

    -- Create the appointment
    INSERT INTO Appointment (
        appointment_date,
        patient_id,
        dentist_id,
        status
    ) VALUES (
        p_appointment_date,
        p_patient_id,
        p_dentist_id,
        'scheduled' -- Default status
    );
    
END //

CREATE PROCEDURE Appointment_Update(
    IN p_appointment_id INT,
    IN p_appointment_date DATETIME,
    IN p_status ENUM('scheduled', 'completed', 'canceled'),
    IN p_patient_id INT,
    IN p_dentist_id INT
)
BEGIN
    DECLARE v_current_status ENUM('scheduled', 'completed', 'canceled');
    DECLARE v_patient_exists INT;
    DECLARE v_dentist_exists INT;
    DECLARE v_time_conflict INT;
    
    -- Verify appointment exists and get current status
    SELECT status INTO v_current_status 
    FROM Appointment 
    WHERE appointment_id = p_appointment_id;
    
    IF v_current_status IS NULL THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Appointment not found';
    END IF;
    
    -- Validate patient if being changed
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO v_patient_exists FROM Patient WHERE patient_id = p_patient_id;
        IF v_patient_exists = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient does not exist';
        END IF;
    END IF;
    
    -- Validate dentist if being changed
    IF p_dentist_id IS NOT NULL THEN
        SELECT COUNT(*) INTO v_dentist_exists FROM Dentist WHERE dentist_id = p_dentist_id;
        IF v_dentist_exists = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Dentist does not exist';
        END IF;
    END IF;
    
    -- Validate new date if provided (not in past for scheduled appointments)
    IF p_appointment_date IS NOT NULL AND p_appointment_date < NOW() AND 
       (p_status IS NULL OR p_status = 'scheduled') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot schedule appointments in the past';
    END IF;
    
    -- Update the appointment
    UPDATE Appointment
    SET 
        appointment_date = COALESCE(p_appointment_date, appointment_date),
        status = COALESCE(p_status, status),
        patient_id = COALESCE(p_patient_id, patient_id),
        dentist_id = COALESCE(p_dentist_id, dentist_id)
    WHERE appointment_id = p_appointment_id;
END //

CREATE PROCEDURE Appointment_Read()
BEGIN
    SELECT * FROM Appointment;
END //

CREATE PROCEDURE Appointment_Delete(
    IN p_appointment_id INT
)
BEGIN
    DECLARE appointment_count INT;
    
    -- Check if appointment exists
    SELECT COUNT(*) INTO appointment_count 
    FROM Appointment 
    WHERE appointment_id = p_appointment_id;
    
    IF appointment_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Appointment not found - delete failed';
    END IF;

    DELETE FROM Appointment WHERE appointment_id = p_appointment_id;
END //

-- ProcedureCatalog Procedures
CREATE PROCEDURE ProcedureCatalog_Create(
    IN p_procedure_name VARCHAR(100),
    IN p_description TEXT,
    IN p_standard_cost DECIMAL(10,2)
)
BEGIN
    INSERT INTO ProcedureCatalog (procedure_name, description, standard_cost)
    VALUES (p_procedure_name, p_description, p_standard_cost);
END //

CREATE PROCEDURE ProcedureCatalog_Update(
    IN p_procedure_id INT,
    IN p_procedure_name VARCHAR(100),
    IN p_description TEXT,
    IN p_standard_cost DECIMAL(10,2)
)
BEGIN
    DECLARE procedure_count INT;
    
    -- Validate procedure exists
    SELECT COUNT(*) INTO procedure_count 
    FROM ProcedureCatalog WHERE procedure_id = p_procedure_id;
    
    IF procedure_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Procedure not found - update failed';
    END IF;

    UPDATE ProcedureCatalog
    SET 
        procedure_name = COALESCE(p_procedure_name, procedure_name),
        description = COALESCE(p_description, description),
        standard_cost = COALESCE(p_standard_cost, standard_cost)
    WHERE procedure_id = p_procedure_id;
END //

CREATE PROCEDURE ProcedureCatalog_Read()
BEGIN
    SELECT * FROM ProcedureCatalog;
END //

-- DentistProcedure Procedures
CREATE PROCEDURE DentistProcedure_Create(
    IN p_procedure_id INT,
    IN p_dentist_id INT
)
BEGIN
    DECLARE procedure_count INT;
    DECLARE dentist_count INT;
    
    -- Validate procedure exists
    SELECT COUNT(*) INTO procedure_count 
    FROM ProcedureCatalog 
    WHERE procedure_id = p_procedure_id;
    
    IF procedure_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Procedure does not exist';
    END IF;

    -- Validate dentist exists
    SELECT COUNT(*) INTO dentist_count 
    FROM Dentist 
    WHERE dentist_id = p_dentist_id;
    
    IF dentist_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Dentist does not exist';
    END IF;

    INSERT INTO DentistProcedure (procedure_id, dentist_id)
    VALUES (p_procedure_id, p_dentist_id);
END //

CREATE PROCEDURE DentistProcedure_Update(
    IN p_old_procedure_id INT,
    IN p_old_dentist_id INT,
    IN p_new_procedure_id INT,
    IN p_new_dentist_id INT
)
BEGIN
    DECLARE old_association_count INT;
    DECLARE new_procedure_count INT;
    DECLARE new_dentist_count INT;
    
    -- Validate old association exists
    SELECT COUNT(*) INTO old_association_count 
    FROM DentistProcedure 
    WHERE procedure_id = p_old_procedure_id 
    AND dentist_id = p_old_dentist_id;
    
    IF old_association_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Original association not found';
    END IF;

    -- Validate new procedure exists
    SELECT COUNT(*) INTO new_procedure_count 
    FROM ProcedureCatalog 
    WHERE procedure_id = p_new_procedure_id;
    
    IF new_procedure_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'New procedure does not exist';
    END IF;

    -- Validate new dentist exists
    SELECT COUNT(*) INTO new_dentist_count 
    FROM Dentist 
    WHERE dentist_id = p_new_dentist_id;
    
    IF new_dentist_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'New dentist does not exist';
    END IF;

    -- Update the association
    DELETE FROM DentistProcedure 
    WHERE procedure_id = p_old_procedure_id 
    AND dentist_id = p_old_dentist_id;

    INSERT INTO DentistProcedure (procedure_id, dentist_id)
    VALUES (p_new_procedure_id, p_new_dentist_id);
END //

CREATE PROCEDURE DentistProcedure_Read()
BEGIN
    SELECT * FROM DentistProcedure;
END //

CREATE PROCEDURE DentistProcedure_Delete(
    IN p_procedure_id INT,
    IN p_dentist_id INT
)
BEGIN
    DECLARE association_count INT;
    
    -- Check if association exists
    SELECT COUNT(*) INTO association_count 
    FROM DentistProcedure 
    WHERE procedure_id = p_procedure_id 
    AND dentist_id = p_dentist_id;
    
    IF association_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Dentist-procedure association not found';
    END IF;

    DELETE FROM DentistProcedure 
    WHERE procedure_id = p_procedure_id 
    AND dentist_id = p_dentist_id;
END //

-- TreatmentProcedure Procedures
CREATE PROCEDURE TreatmentProcedure_Create(
    IN p_procedure_id INT,
    IN p_treatment_id INT
)
BEGIN
    DECLARE procedure_exists INT DEFAULT 0;
    DECLARE treatment_exists INT DEFAULT 0;

    -- Check procedure existence
    SELECT COUNT(*) INTO procedure_exists 
    FROM ProcedureCatalog WHERE procedure_id = p_procedure_id;
    
    IF procedure_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Procedure does not exist';
    END IF;

    -- Check treatment existence
    SELECT COUNT(*) INTO treatment_exists 
    FROM Treatment WHERE treatment_id = p_treatment_id;
    
    IF treatment_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Treatment does not exist';
    END IF;

    -- Create association if both exist
    INSERT INTO TreatmentProcedure (procedure_id, treatment_id)
    VALUES (p_procedure_id, p_treatment_id);
END //

CREATE PROCEDURE TreatmentProcedure_Update(
    IN p_old_procedure_id INT,
    IN p_old_treatment_id INT,
    IN p_new_procedure_id INT,
    IN p_new_treatment_id INT
)
BEGIN
    DECLARE treatment_count INT;
    DECLARE procedure_count INT;

    -- Validate new treatment exists
    SELECT COUNT(*) INTO treatment_count 
    FROM Treatment WHERE treatment_id = p_new_treatment_id;
    IF treatment_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'New treatment does not exist';
    END IF;

    -- Validate new procedure exists
    SELECT COUNT(*) INTO procedure_count 
    FROM ProcedureCatalog WHERE procedure_id = p_new_procedure_id;
    IF procedure_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'New procedure does not exist';
    END IF;

    -- Delete old association
    DELETE FROM TreatmentProcedure 
    WHERE procedure_id = p_old_procedure_id 
    AND treatment_id = p_old_treatment_id;

    -- Create new association
    INSERT INTO TreatmentProcedure (procedure_id, treatment_id)
    VALUES (p_new_procedure_id, p_new_treatment_id);
END //

CREATE PROCEDURE TreatmentProcedure_Read()
BEGIN
    SELECT * FROM TreatmentProcedure;
END //

CREATE PROCEDURE TreatmentProcedure_Delete(
    IN p_procedure_id INT,
    IN p_treatment_id INT
)
BEGIN
    DECLARE association_count INT;
    
    -- Check if association exists
    SELECT COUNT(*) INTO association_count 
    FROM TreatmentProcedure 
    WHERE procedure_id = p_procedure_id 
    AND treatment_id = p_treatment_id;
    
    IF association_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Treatment-procedure association not found';
    END IF;

    DELETE FROM TreatmentProcedure 
    WHERE procedure_id = p_procedure_id 
    AND treatment_id = p_treatment_id;
END //

-- Treatment Procedures
CREATE PROCEDURE Treatment_Create(
    IN p_description VARCHAR(250),
    IN p_dentist_id INT,
    IN p_appointment_id INT
)
BEGIN
    INSERT INTO Treatment (description, dentist_id, appointment_id)
    VALUES (p_description, p_dentist_id, p_appointment_id);
END //

CREATE PROCEDURE Treatment_Update(
    IN p_treatment_id INT,
    IN p_description VARCHAR(250),
    IN p_dentist_id INT,
    IN p_appointment_id INT
)
BEGIN
    DECLARE treatment_count INT;
    DECLARE dentist_count INT;
    DECLARE appointment_count INT;
    
    -- Validate treatment exists
    SELECT COUNT(*) INTO treatment_count 
    FROM Treatment WHERE treatment_id = p_treatment_id;
    
    IF treatment_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Treatment not found - update failed';
    END IF;

    -- Validate dentist exists if provided
    IF p_dentist_id IS NOT NULL THEN
        SELECT COUNT(*) INTO dentist_count 
        FROM Dentist WHERE dentist_id = p_dentist_id;
        IF dentist_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Dentist not found';
        END IF;
    END IF;

    -- Validate appointment exists if provided
    IF p_appointment_id IS NOT NULL THEN
        SELECT COUNT(*) INTO appointment_count 
        FROM Appointment WHERE appointment_id = p_appointment_id;
        IF appointment_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Appointment not found';
        END IF;
    END IF;

    UPDATE Treatment
    SET 
        description = COALESCE(p_description, description),
        dentist_id = COALESCE(p_dentist_id, dentist_id),
        appointment_id = COALESCE(p_appointment_id, appointment_id)
    WHERE treatment_id = p_treatment_id;
END //

CREATE PROCEDURE Treatment_Read()
BEGIN
    SELECT * FROM Treatment;
END //

CREATE PROCEDURE Treatment_Delete(
    IN p_treatment_id INT
)
BEGIN
    DECLARE treatment_count INT;
    
    -- Check if treatment exists
    SELECT COUNT(*) INTO treatment_count 
    FROM Treatment 
    WHERE treatment_id = p_treatment_id;
    
    IF treatment_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Treatment not found - delete failed';
    END IF;

    DELETE FROM Treatment WHERE treatment_id = p_treatment_id;
END //

-- MedicalRecord Procedures
CREATE PROCEDURE MedicalRecord_Create(
    IN p_record_description VARCHAR(250),
    IN p_patient_id INT,
    IN p_treatment_id INT,
    IN p_record_date DATE
)
BEGIN
    DECLARE patient_exists INT DEFAULT 0;
    DECLARE treatment_exists INT DEFAULT 0;

    -- Check patient existence
    SELECT COUNT(*) INTO patient_exists 
    FROM Patient WHERE patient_id = p_patient_id;
    
    IF patient_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Patient does not exist';
    END IF;

    -- Check treatment existence
    SELECT COUNT(*) INTO treatment_exists 
    FROM Treatment WHERE treatment_id = p_treatment_id;
    
    IF treatment_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Treatment does not exist';
    END IF;

    -- Create record if all checks pass
    INSERT INTO MedicalRecord (record_description, patient_id, treatment_id, record_date)
    VALUES (p_record_description, p_patient_id, p_treatment_id, 
        COALESCE(p_record_date, CURDATE()));
END //

CREATE PROCEDURE MedicalRecord_Update(
    IN p_record_id INT,
    IN p_record_description VARCHAR(250),
    IN p_patient_id INT,
    IN p_treatment_id INT,
    IN p_record_date DATE
)
BEGIN
    DECLARE record_count INT;
    DECLARE patient_count INT;
    DECLARE treatment_count INT;
    
    -- Validate medical record exists
    SELECT COUNT(*) INTO record_count 
    FROM MedicalRecord WHERE record_id = p_record_id;
    
    IF record_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Medical record not found - update failed';
    END IF;

    -- Validate patient exists if provided
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO patient_count 
        FROM Patient WHERE patient_id = p_patient_id;
        IF patient_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient not found';
        END IF;
    END IF;

    -- Validate treatment exists if provided
    IF p_treatment_id IS NOT NULL THEN
        SELECT COUNT(*) INTO treatment_count 
        FROM Treatment WHERE treatment_id = p_treatment_id;
        IF treatment_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Treatment not found';
        END IF;
    END IF;

    UPDATE MedicalRecord
    SET 
        record_description = COALESCE(p_record_description, record_description),
        patient_id = COALESCE(p_patient_id, patient_id),
        treatment_id = COALESCE(p_treatment_id, treatment_id),
        record_date = COALESCE(p_record_date, record_date)
    WHERE record_id = p_record_id;
END //

CREATE PROCEDURE MedicalRecord_Read()
BEGIN
    SELECT * FROM MedicalRecord;
END //

CREATE PROCEDURE MedicalRecord_Delete(
    IN p_record_id INT
)
BEGIN
    DECLARE record_count INT;
    
    -- Check if medical record exists
    SELECT COUNT(*) INTO record_count 
    FROM MedicalRecord 
    WHERE record_id = p_record_id;
    
    IF record_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Medical record not found - delete failed';
    END IF;

    DELETE FROM MedicalRecord WHERE record_id = p_record_id;
END //

-- Payment Procedures

CREATE PROCEDURE Payment_Create(
    IN p_amount DECIMAL(10,2),
    IN p_payment_date DATE,
    IN p_method VARCHAR(50),
    IN p_patient_id INT,
    IN p_appointment_id INT
)
BEGIN
    DECLARE patient_count INT;
    DECLARE appointment_count INT;
    
    -- Validate patient exists
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO patient_count 
        FROM Patient WHERE patient_id = p_patient_id;
        IF patient_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient not found';
        END IF;
    END IF;

    -- Validate appointment exists
    IF p_appointment_id IS NOT NULL THEN
        SELECT COUNT(*) INTO appointment_count 
        FROM Appointment WHERE appointment_id = p_appointment_id;
        IF appointment_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Appointment not found';
        END IF;
    END IF;

    INSERT INTO Payment (amount, payment_date, method, patient_id, appointment_id)
    VALUES (p_amount, p_payment_date, p_method, p_patient_id, p_appointment_id);
END //

CREATE PROCEDURE Payment_Read()
BEGIN
    SELECT * FROM Payment;
END //

CREATE PROCEDURE Payment_Update(
    IN p_payment_id INT,
    IN p_amount DECIMAL(10,2),
    IN p_payment_date DATE,
    IN p_method VARCHAR(50),
    IN p_patient_id INT,
    IN p_appointment_id INT
)
BEGIN
    DECLARE payment_count INT;
    
    -- Validate payment exists
    SELECT COUNT(*) INTO payment_count 
    FROM Payment WHERE payment_id = p_payment_id;
    
    IF payment_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Payment not found - update failed';
    END IF;
    
        -- Validate patient exists
    IF p_patient_id IS NOT NULL THEN
        SELECT COUNT(*) INTO patient_count 
        FROM Patient WHERE patient_id = p_patient_id;
        IF patient_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Patient not found';
        END IF;
    END IF;

    -- Validate appointment exists
    IF p_appointment_id IS NOT NULL THEN
        SELECT COUNT(*) INTO appointment_count 
        FROM Appointment WHERE appointment_id = p_appointment_id;
        IF appointment_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Appointment not found';
        END IF;
    END IF;

    UPDATE Payment
    SET 
        amount = COALESCE(p_amount, amount),
        payment_date = COALESCE(p_payment_date, payment_date),
        method = COALESCE(p_method, method),
        patient_id = COALESCE(p_patient_id, patient_id),
        appointment_id = COALESCE(p_appointment_id, appointment_id)
    WHERE payment_id = p_payment_id;
END //

CREATE PROCEDURE Payment_Delete(IN p_payment_id INT)
BEGIN
    DELETE FROM Payment WHERE payment_id = p_payment_id;
END //

CREATE PROCEDURE Payment_Delete(
    IN p_payment_id INT
)
BEGIN
    DECLARE payment_count INT;
    
    -- Check if payment exists
    SELECT COUNT(*) INTO payment_count 
    FROM Payment 
    WHERE payment_id = p_payment_id;
    
    IF payment_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Payment not found - delete failed';
    END IF;

    DELETE FROM Payment WHERE payment_id = p_payment_id;
END //

-- Calculate Appointment total.
CREATE PROCEDURE CalculateAppointmentTotal(
    IN input_appointment_id INT,
    OUT total_amount DECIMAL(10,2)
)
BEGIN
    DECLARE appointment_exists INT;

    -- Check if appointment exists
    SELECT COUNT(*) INTO appointment_exists 
    FROM Appointment 
    WHERE appointment_id = input_appointment_id;

    IF appointment_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Appointment not found';
    END IF;

    -- Calculate total from linked procedures
    SELECT COALESCE(SUM(pc.standard_cost), 0.00) INTO total_amount
    FROM ProcedureCatalog pc
    JOIN TreatmentProcedure tp ON pc.procedure_id = tp.procedure_id
    JOIN Treatment t ON tp.treatment_id = t.treatment_id
    WHERE t.appointment_id = input_appointment_id;

END //


DELIMITER ;

