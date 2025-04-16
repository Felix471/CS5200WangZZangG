package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.ProcedureCatalog;
import com.dentalclinic.repository.ProcedureCatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class ProcedureCatalogService {
  private final ProcedureCatalogRepository procedureRepository;

  @Autowired
  public ProcedureCatalogService(ProcedureCatalogRepository procedureRepository) {
    this.procedureRepository = procedureRepository;
  }

  @Transactional
  public ProcedureCatalog createProcedure(ProcedureCatalog procedure) {
    try {
      return procedureRepository.createProcedureCatalog(procedure);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create procedure: " + e.getMessage());
    }
  }

  public List<ProcedureCatalog> getAllProcedures() {
    try {
      return procedureRepository.getAllProcedures();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve procedures: " + e.getMessage());
    }
  }

  @Transactional
  public void updateProcedure(ProcedureCatalog procedure) {
    try {
      procedureRepository.updateProcedureCatalog(procedure);
    } catch (SQLException e) {
      handleProcedureError(e, procedure.getProcedureId());
    }
  }

  @Transactional
  public void deleteProcedure(int procedureId) {
    try {
      procedureRepository.deleteProcedureCatalog(procedureId);
    } catch (SQLException e) {
      handleProcedureError(e, procedureId);
    }
  }

  private void handleProcedureError(SQLException e, int procedureId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Procedure not found with ID: " + procedureId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}