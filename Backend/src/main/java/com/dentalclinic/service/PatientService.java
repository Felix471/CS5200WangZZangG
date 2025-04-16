package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Patient;
import com.dentalclinic.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class PatientService {
  private final PatientRepository patientRepository;

  @Autowired
  public PatientService(PatientRepository patientRepository) {
    this.patientRepository = patientRepository;
  }

  @Transactional
  public Patient createPatient(Patient patient) {
    try {
      return patientRepository.createPatient(patient);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create patient: " + e.getMessage());
    }
  }

  public List<Patient> getAllPatients() {
    try {
      return patientRepository.getAllPatients();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve patients: " + e.getMessage());
    }
  }

  @Transactional
  public void updatePatient(Patient patient) {
    try {
      patientRepository.updatePatient(patient);
    } catch (SQLException e) {
      handlePatientError(e, patient.getPatientId());
    }
  }

  private void handlePatientError(SQLException e, int patientId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Patient not found with ID: " + patientId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}