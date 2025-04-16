package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.TreatmentProcedure;
import com.dentalclinic.repository.TreatmentProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class TreatmentProcedureService {
  private final TreatmentProcedureRepository treatmentProcedureRepository;

  @Autowired
  public TreatmentProcedureService(TreatmentProcedureRepository treatmentProcedureRepository) {
    this.treatmentProcedureRepository = treatmentProcedureRepository;
  }

  @Transactional
  public void createTreatmentProcedure(TreatmentProcedure tp) {
    try {
      treatmentProcedureRepository.createTreatmentProcedure(tp);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create association: " + e.getMessage());
    }
  }

  public List<TreatmentProcedure> getAllTreatmentProcedure() {
    try {
      return treatmentProcedureRepository.getAllTreatmentProcedures();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve associations: " + e.getMessage());
    }
  }

  @Transactional
  public void updateTreatmentProcedure(int oldProcedureId, int oldTreatmentId,
      int newProcedureId, int newTreatmentId) {
    try {
      treatmentProcedureRepository.updateTreatmentProcedure(
          oldProcedureId, oldTreatmentId, newProcedureId, newTreatmentId
      );
    } catch (SQLException e) {
      throw new DatabaseException("Failed to update association: " + e.getMessage());
    }
  }

  @Transactional
  public void deleteTreatmentProcedure(int procedureId, int treatmentId) {
    try {
      treatmentProcedureRepository.deleteTreatmentProcedure(procedureId, treatmentId);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to delete association: " + e.getMessage());
    }
  }
}