package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Dentist;
import com.dentalclinic.repository.DentistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class DentistService {
  private final DentistRepository dentistRepository;

  @Autowired
  public DentistService(DentistRepository dentistRepository) {
    this.dentistRepository = dentistRepository;
  }

  @Transactional
  public Dentist createDentist(Dentist dentist) {
    try {
      return dentistRepository.createDentist(dentist);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create dentist: " + e.getMessage());
    }
  }

  public List<Dentist> getAllDentists() {
    try {
      return dentistRepository.getAllDentists();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve dentists: " + e.getMessage());
    }
  }

  @Transactional
  public void updateDentist(Dentist dentist) {
    try {
      dentistRepository.updateDentist(dentist);
    } catch (SQLException e) {
      handleDentistError(e, dentist.getDentistId());
    }
  }

  private void handleDentistError(SQLException e, int dentistId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Dentist not found with ID: " + dentistId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}