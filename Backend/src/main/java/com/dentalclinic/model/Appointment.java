package com.dentalclinic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointment")
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long appointmentId;

  private LocalDateTime appointmentDate;

  @Enumerated(EnumType.STRING)
  private AppointmentStatus status = AppointmentStatus.SCHEDULED;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "dentist_id")
  private Dentist dentist;

  @OneToOne(mappedBy = "appointment")
  private Treatment treatment;

  @OneToOne(mappedBy = "appointment")
  private Payment payment;

  // Enum
  public enum AppointmentStatus {
    SCHEDULED, COMPLETED, CANCELED
  }

  // Constructors
  public Appointment() {}

  public Appointment(LocalDateTime appointmentDate, AppointmentStatus status) {
    this.appointmentDate = appointmentDate;
    this.status = status;
  }

  // Getters and Setters
  public Long getAppointmentId() { return appointmentId; }
  public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

  public LocalDateTime getAppointmentDate() { return appointmentDate; }
  public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }

  public AppointmentStatus getStatus() { return status; }
  public void setStatus(AppointmentStatus status) { this.status = status; }

  public Patient getPatient() { return patient; }
  public void setPatient(Patient patient) { this.patient = patient; }

  public Dentist getDentist() { return dentist; }
  public void setDentist(Dentist dentist) { this.dentist = dentist; }

  public Treatment getTreatment() { return treatment; }
  public void setTreatment(Treatment treatment) { this.treatment = treatment; }

  public Payment getPayment() { return payment; }
  public void setPayment(Payment payment) { this.payment = payment; }
}