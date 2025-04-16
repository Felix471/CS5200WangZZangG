package com.dentalclinic.model;


public class Dentist {
  private Integer dentistId;
  private String firstName;
  private String lastName;
  private String licenseNumber;
  private String description;
  private String phoneNumber;
  private String email;
  private String address;
  private Integer clinicId;

  public Dentist() {}

  public Dentist(Integer dentistId, String firstName, String lastName, String licenseNumber,
      String description, String phoneNumber, String email, String address, Integer clinicId) {
    this.dentistId = dentistId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.licenseNumber = licenseNumber;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.clinicId = clinicId;
  }

  // Getters and Setters
  public Integer getDentistId() { return dentistId; }
  public void setDentistId(Integer dentistId) { this.dentistId = dentistId; }
  public String getFirstName() { return firstName; }
  public void setFirstName(String firstName) { this.firstName = firstName; }
  public String getLastName() { return lastName; }
  public void setLastName(String lastName) { this.lastName = lastName; }
  public String getLicenseNumber() { return licenseNumber; }
  public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getPhoneNumber() { return phoneNumber; }
  public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public Integer getClinicId() { return clinicId; }
  public void setClinicId(Integer clinicId) { this.clinicId = clinicId; }
}
