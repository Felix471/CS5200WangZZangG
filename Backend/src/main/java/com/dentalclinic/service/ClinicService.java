package com.dentalclinic.service;

import com.dentalclinic.model.Clinic;
import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class ClinicService {
  private final ClinicRepository clinicRepository;

  @Autowired
  public ClinicService(ClinicRepository clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  @Transactional
  public Clinic createClinic(Clinic clinic) {
    try {
      return clinicRepository.createClinic(clinic);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create clinic: " + e.getMessage());
    }
  }

  public List<Clinic> getAllClinics() {
    try {
      return clinicRepository.getAllClinics();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve clinics: " + e.getMessage());
    }
  }

  @Transactional
  public void updateClinic(Clinic clinic) {
    try {
      clinicRepository.updateClinic(clinic);
    } catch (SQLException e) {
      handleUpdateError(e, clinic.getClinicId());
    }
  }

  private void handleUpdateError(SQLException e, int clinicId) {
    if (e.getErrorCode() == 1644) { // Custom error code from stored procedure
      throw new NotFoundException("Clinic not found with ID: " + clinicId);
    }
    throw new DatabaseException("Failed to update clinic: " + e.getMessage());
  }

  private void handleDeleteError(SQLException e, int clinicId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Clinic not found with ID: " + clinicId);
    }
    throw new DatabaseException("Failed to delete clinic: " + e.getMessage());
  }
}