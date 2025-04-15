package com.dentalclinic.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "MedicalRecord")
public class MedicalRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long recordId;

  private String recordDescription;

  @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE")
  private LocalDate recordDate;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "treatment_id")
  private Treatment treatment;

  // Constructors
  public MedicalRecord() {}

  public MedicalRecord(String recordDescription) {
    this.recordDescription = recordDescription;
  }

  // Getters and Setters
  public Long getRecordId() { return recordId; }
  public void setRecordId(Long recordId) { this.recordId = recordId; }

  public String getRecordDescription() { return recordDescription; }
  public void setRecordDescription(String recordDescription) { this.recordDescription = recordDescription; }

  public LocalDate getRecordDate() { return recordDate; }
  public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

  public Patient getPatient() { return patient; }
  public void setPatient(Patient patient) { this.patient = patient; }

  public Treatment getTreatment() { return treatment; }
  public void setTreatment(Treatment treatment) { this.treatment = treatment; }
}
