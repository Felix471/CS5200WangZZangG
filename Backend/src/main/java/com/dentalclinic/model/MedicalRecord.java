package com.dentalclinic.model;

import java.time.LocalDate;

public class MedicalRecord {
  private Integer recordId;
  private String recordDescription;
  private LocalDate recordDate;
  private Integer patientId;
  private Integer treatmentId;

  public MedicalRecord() {}

  public MedicalRecord(Integer recordId, String recordDescription, LocalDate recordDate,
      Integer patientId, Integer treatmentId) {
    this.recordId = recordId;
    this.recordDescription = recordDescription;
    this.recordDate = recordDate;
    this.patientId = patientId;
    this.treatmentId = treatmentId;
  }

  // Getters and Setters
  public Integer getRecordId() { return recordId; }
  public void setRecordId(Integer recordId) { this.recordId = recordId; }
  public String getRecordDescription() { return recordDescription; }
  public void setRecordDescription(String recordDescription) { this.recordDescription = recordDescription; }
  public LocalDate getRecordDate() { return recordDate; }
  public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
  public Integer getPatientId() { return patientId; }
  public void setPatientId(Integer patientId) { this.patientId = patientId; }
  public Integer getTreatmentId() { return treatmentId; }
  public void setTreatmentId(Integer treatmentId) { this.treatmentId = treatmentId; }
}
