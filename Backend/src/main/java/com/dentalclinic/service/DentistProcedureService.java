package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.model.DentistProcedure;
import com.dentalclinic.repository.DentistProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class DentistProcedureService {
  private final DentistProcedureRepository dentistProcedureRepository;

  @Autowired
  public DentistProcedureService(DentistProcedureRepository dentistProcedureRepository) {
    this.dentistProcedureRepository = dentistProcedureRepository;
  }

  @Transactional
  public void createDentistProcedure(DentistProcedure dp) {
    try {
      dentistProcedureRepository.createDentistProcedure(dp);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create association: " + e.getMessage());
    }
  }

  public List<DentistProcedure> getDentistProcedure() {
    try {
      return dentistProcedureRepository.getAllDentistProcedures();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve associations: " + e.getMessage());
    }
  }

  @Transactional
  public void updateDentistProcedure(int oldProcedureId, int oldDentistId,
      int newProcedureId, int newDentistId) {
    try {
      dentistProcedureRepository.updateDentistProcedure(
          oldProcedureId, oldDentistId, newProcedureId, newDentistId
      );
    } catch (SQLException e) {
      throw new DatabaseException("Failed to update association: " + e.getMessage());
    }
  }

  @Transactional
  public void deleteDentistProcedure(int procedureId, int dentistId) {
    try {
      dentistProcedureRepository.deleteDentistProcedure(procedureId, dentistId);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to delete association: " + e.getMessage());
    }
  }
}