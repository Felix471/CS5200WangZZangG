package com.dentalclinic.model;

public class DentistProcedure {
  private Integer procedureId;
  private Integer dentistId;

  public DentistProcedure() {}

  public DentistProcedure(Integer procedureId, Integer dentistId) {
    this.procedureId = procedureId;
    this.dentistId = dentistId;
  }

  // Getters and Setters
  public Integer getProcedureId() { return procedureId; }
  public void setProcedureId(Integer procedureId) { this.procedureId = procedureId; }
  public Integer getDentistId() { return dentistId; }
  public void setDentistId(Integer dentistId) { this.dentistId = dentistId; }
}
