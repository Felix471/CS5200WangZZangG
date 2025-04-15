package com.dentalclinic.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Patient")
public class Patient {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long patientId;

  private String firstName;
  private String lastName;
  private LocalDate dateOfBirth;

  @Column(unique = true)
  private String phoneNumber;

  @Column(unique = true)
  private String email;

  private String address;

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<Appointment> appointments = new ArrayList<>();

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<Insurance> insurances = new ArrayList<>();

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<Payment> payments = new ArrayList<>();

  // Constructors
  public Patient() {}

  public Patient(String firstName, String lastName, LocalDate dateOfBirth,
      String phoneNumber, String email, String address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }

  // Getters and Setters
  public Long getPatientId() { return patientId; }
  public void setPatientId(Long patientId) { this.patientId = patientId; }

  public String getFirstName() { return firstName; }
  public void setFirstName(String firstName) { this.firstName = firstName; }

  public String getLastName() { return lastName; }
  public void setLastName(String lastName) { this.lastName = lastName; }

  public LocalDate getDateOfBirth() { return dateOfBirth; }
  public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

  public String getPhoneNumber() { return phoneNumber; }
  public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }

  public List<Appointment> getAppointments() { return appointments; }
  public void setAppointments(List<Appointment> appointments) { this.appointments = appointments; }

  public List<Insurance> getInsurances() { return insurances; }
  public void setInsurances(List<Insurance> insurances) { this.insurances = insurances; }

  public List<Payment> getPayments() { return payments; }
  public void setPayments(List<Payment> payments) { this.payments = payments; }
}
