package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.MedicalRecord;
import com.dentalclinic.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class MedicalRecordService {
  private final MedicalRecordRepository medicalRecordRepository;

  @Autowired
  public MedicalRecordService(MedicalRecordRepository medicalRecordRepository) {
    this.medicalRecordRepository = medicalRecordRepository;
  }

  @Transactional
  public MedicalRecord createMedicalRecord(MedicalRecord record) {
    try {
      return medicalRecordRepository.createMedicalRecord(record);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create medical record: " + e.getMessage());
    }
  }

  public List<MedicalRecord> getAllMedicalRecords() {
    try {
      return medicalRecordRepository.getAllMedicalRecords();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve medical records: " + e.getMessage());
    }
  }

  @Transactional
  public void updateMedicalRecord(MedicalRecord record) {
    try {
      medicalRecordRepository.updateMedicalRecord(record);
    } catch (SQLException e) {
      handleMedicalRecordError(e, record.getRecordId());
    }
  }

  @Transactional
  public void deleteMedicalRecord(int recordId) {
    try {
      medicalRecordRepository.deleteMedicalRecord(recordId);
    } catch (SQLException e) {
      handleMedicalRecordError(e, recordId);
    }
  }

  private void handleMedicalRecordError(SQLException e, int recordId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Medical record not found with ID: " + recordId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}