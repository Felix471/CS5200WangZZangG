package com.dentalclinic.model;

import java.time.LocalDate;

public class Insurance {
  private Integer insuranceId;
  private String providerName;
  private String policyNumber;
  private LocalDate validFrom;
  private LocalDate validTo;
  private Integer patientId;

  public Insurance() {}

  public Insurance(Integer insuranceId, String providerName, String policyNumber,
      LocalDate validFrom, LocalDate validTo, Integer patientId) {
    this.insuranceId = insuranceId;
    this.providerName = providerName;
    this.policyNumber = policyNumber;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.patientId = patientId;
  }

  // Getters and Setters
  public Integer getInsuranceId() { return insuranceId; }
  public void setInsuranceId(Integer insuranceId) { this.insuranceId = insuranceId; }
  public String getProviderName() { return providerName; }
  public void setProviderName(String providerName) { this.providerName = providerName; }
  public String getPolicyNumber() { return policyNumber; }
  public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }
  public LocalDate getValidFrom() { return validFrom; }
  public void setValidFrom(LocalDate validFrom) { this.validFrom = validFrom; }
  public LocalDate getValidTo() { return validTo; }
  public void setValidTo(LocalDate validTo) { this.validTo = validTo; }
  public Integer getPatientId() { return patientId; }
  public void setPatientId(Integer patientId) { this.patientId = patientId; }
}
