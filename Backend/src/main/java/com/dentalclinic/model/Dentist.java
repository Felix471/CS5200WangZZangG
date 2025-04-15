package com.dentalclinic.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Dentist")
public class Dentist {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long dentistId;

  private String firstName;
  private String lastName;

  @Column(unique = true)
  private String licenseNumber;

  private String description;
  private String phoneNumber;
  private String email;
  private String address;

  @ManyToOne
  @JoinColumn(name = "clinic_id")
  private Clinic clinic;

  @OneToMany(mappedBy = "dentist", cascade = CascadeType.ALL)
  private List<Appointment> appointments = new ArrayList<>();

  @OneToMany(mappedBy = "dentist", cascade = CascadeType.ALL)
  private List<Treatment> treatments = new ArrayList<>();

  // Constructors
  public Dentist() {}

  public Dentist(String firstName, String lastName, String licenseNumber, String description,
      String phoneNumber, String email, String address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.licenseNumber = licenseNumber;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }

  // Getters and Setters
  public Long getDentistId() { return dentistId; }
  public void setDentistId(Long dentistId) { this.dentistId = dentistId; }

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

  public Clinic getClinic() { return clinic; }
  public void setClinic(Clinic clinic) { this.clinic = clinic; }

  public List<Appointment> getAppointments() { return appointments; }
  public void setAppointments(List<Appointment> appointments) { this.appointments = appointments; }

  public List<Treatment> getTreatments() { return treatments; }
  public void setTreatments(List<Treatment> treatments) { this.treatments = treatments; }
}
