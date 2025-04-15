package com.dentalclinic.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Insurance")
public class Insurance {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long insuranceId;

  private String providerName;
  private String policyNumber;
  private LocalDate validFrom;
  private LocalDate validTo;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  // Constructors
  public Insurance() {}

  public Insurance(String providerName, String policyNumber, LocalDate validFrom, LocalDate validTo) {
    this.providerName = providerName;
    this.policyNumber = policyNumber;
    this.validFrom = validFrom;
    this.validTo = validTo;
  }

  // Getters and Setters
  public Long getInsuranceId() { return insuranceId; }
  public void setInsuranceId(Long insuranceId) { this.insuranceId = insuranceId; }

  public String getProviderName() { return providerName; }
  public void setProviderName(String providerName) { this.providerName = providerName; }

  public String getPolicyNumber() { return policyNumber; }
  public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

  public LocalDate getValidFrom() { return validFrom; }
  public void setValidFrom(LocalDate validFrom) { this.validFrom = validFrom; }

  public LocalDate getValidTo() { return validTo; }
  public void setValidTo(LocalDate validTo) { this.validTo = validTo; }

  public Patient getPatient() { return patient; }
  public void setPatient(Patient patient) { this.patient = patient; }
}
