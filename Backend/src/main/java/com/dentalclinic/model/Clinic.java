package com.dentalclinic.model;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Clinic")
public class Clinic {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long clinicId;

  private String clinicName;
  private String address;
  private String clinicContactNumber;

  @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
  private List<Dentist> dentists = new ArrayList<>();

  // Constructors
  public Clinic() {}

  public Clinic(String clinicName, String address, String clinicContactNumber) {
    this.clinicName = clinicName;
    this.address = address;
    this.clinicContactNumber = clinicContactNumber;
  }

  // Getters and Setters
  public Long getClinicId() { return clinicId; }
  public void setClinicId(Long clinicId) { this.clinicId = clinicId; }

  public String getClinicName() { return clinicName; }
  public void setClinicName(String clinicName) { this.clinicName = clinicName; }

  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }

  public String getClinicContactNumber() { return clinicContactNumber; }
  public void setClinicContactNumber(String clinicContactNumber) { this.clinicContactNumber = clinicContactNumber; }

  public List<Dentist> getDentists() { return dentists; }
  public void setDentists(List<Dentist> dentists) { this.dentists = dentists; }
}
