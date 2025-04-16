package com.dentalclinic.model;

public class Clinic {
  private Integer clinicId;
  private String clinicName;
  private String address;
  private String clinicContactNumber;

  // Constructors
  public Clinic() {}

  public Clinic(int clinicId, String clinicName, String address, String clinicContactNumber) {
    this.clinicId = clinicId;
    this.clinicName = clinicName;
    this.address = address;
    this.clinicContactNumber = clinicContactNumber;
  }

  // Getters and Setters
  public Integer getClinicId() { return clinicId; }
  public void setClinicId(Integer clinicId) { this.clinicId = clinicId; }
  public String getClinicName() { return clinicName; }
  public void setClinicName(String clinicName) { this.clinicName = clinicName; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getClinicContactNumber() { return clinicContactNumber; }
  public void setClinicContactNumber(String clinicContactNumber) { this.clinicContactNumber = clinicContactNumber; }
}
