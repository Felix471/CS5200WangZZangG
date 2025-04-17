package com.dentalclinic.model;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.time.LocalDateTime;

public class Appointment {
  public enum AppointmentStatus {
    SCHEDULED, COMPLETED, CANCELED;

    @JsonCreator
    public static AppointmentStatus fromString(String value) {
      return AppointmentStatus.valueOf(value.toUpperCase());
    }

    // Convert between enum and database string representation
    public String toDatabaseValue() {
      return name().toLowerCase();
    }

    public static AppointmentStatus fromDatabaseValue(String value) {
      return valueOf(value.toUpperCase());
    }
  }

  private Integer appointmentId;
  private LocalDateTime appointmentDate;
  private AppointmentStatus status;
  private Integer patientId;
  private Integer dentistId;

  // Constructors
  public Appointment() {}

  public Appointment(Integer appointmentId, LocalDateTime appointmentDate,
      String status, Integer patientId, Integer dentistId) {
    this.appointmentId = appointmentId;
    this.appointmentDate = appointmentDate;
    this.status = AppointmentStatus.fromDatabaseValue(status);
    this.patientId = patientId;
    this.dentistId = dentistId;
  }

  // Getters and Setters
  public Integer getAppointmentId() { return appointmentId; }
  public void setAppointmentId(Integer appointmentId) { this.appointmentId = appointmentId; }

  public LocalDateTime getAppointmentDate() { return appointmentDate; }
  public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }

  public AppointmentStatus getStatus() { return status; }
  public void setStatus(AppointmentStatus status) { this.status = status; }

  public Integer getPatientId() { return patientId; }
  public void setPatientId(Integer patientId) { this.patientId = patientId; }

  public Integer getDentistId() { return dentistId; }
  public void setDentistId(Integer dentistId) { this.dentistId = dentistId; }
}