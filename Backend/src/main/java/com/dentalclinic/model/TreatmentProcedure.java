package com.dentalclinic.model;

public class TreatmentProcedure {
  private Integer procedureId;
  private Integer treatmentId;

  public TreatmentProcedure() {}

  public TreatmentProcedure(Integer procedureId, Integer treatmentId) {
    this.procedureId = procedureId;
    this.treatmentId = treatmentId;
  }

  // Getters and Setters
  public Integer getProcedureId() { return procedureId; }
  public void setProcedureId(Integer procedureId) { this.procedureId = procedureId; }
  public Integer getTreatmentId() { return treatmentId; }
  public void setTreatmentId(Integer treatmentId) { this.treatmentId = treatmentId; }
}
