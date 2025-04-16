package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Insurance;
import com.dentalclinic.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class InsuranceService {
  private final InsuranceRepository insuranceRepository;

  @Autowired
  public InsuranceService(InsuranceRepository insuranceRepository) {
    this.insuranceRepository = insuranceRepository;
  }

  @Transactional
  public Insurance createInsurance(Insurance insurance) {
    try {
      return insuranceRepository.createInsurance(insurance);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create insurance: " + e.getMessage());
    }
  }

  public List<Insurance> getAllInsurances() {
    try {
      return insuranceRepository.getAllInsurances();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve insurances: " + e.getMessage());
    }
  }

  @Transactional
  public void updateInsurance(Insurance insurance) {
    try {
      insuranceRepository.updateInsurance(insurance);
    } catch (SQLException e) {
      handleInsuranceError(e, insurance.getInsuranceId());
    }
  }

  @Transactional
  public void deleteInsurance(int insuranceId) {
    try {
      insuranceRepository.deleteInsurance(insuranceId);
    } catch (SQLException e) {
      handleInsuranceError(e, insuranceId);
    }
  }

  private void handleInsuranceError(SQLException e, int insuranceId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Insurance not found with ID: " + insuranceId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}