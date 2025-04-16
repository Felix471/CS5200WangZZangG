package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Treatment;
import com.dentalclinic.repository.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class TreatmentService {
  private final TreatmentRepository treatmentRepository;

  @Autowired
  public TreatmentService(TreatmentRepository treatmentRepository) {
    this.treatmentRepository = treatmentRepository;
  }

  @Transactional
  public Treatment createTreatment(Treatment treatment) {
    try {
      return treatmentRepository.createTreatment(treatment);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create treatment: " + e.getMessage());
    }
  }

  public List<Treatment> getAllTreatments() {
    try {
      return treatmentRepository.getAllTreatments();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve treatments: " + e.getMessage());
    }
  }

  @Transactional
  public void updateTreatment(Treatment treatment) {
    try {
      treatmentRepository.updateTreatment(treatment);
    } catch (SQLException e) {
      handleTreatmentError(e, treatment.getTreatmentId());
    }
  }

  @Transactional
  public void deleteTreatment(int treatmentId) {
    try {
      treatmentRepository.deleteTreatment(treatmentId);
    } catch (SQLException e) {
      handleTreatmentError(e, treatmentId);
    }
  }

  private void handleTreatmentError(SQLException e, int treatmentId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Treatment not found with ID: " + treatmentId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}