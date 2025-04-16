package com.dentalclinic.model;

public class Treatment {
  private Integer treatmentId;
  private String description;
  private Integer dentistId;
  private Integer appointmentId;

  public Treatment() {}

  public Treatment(Integer treatmentId, String description, Integer dentistId, Integer appointmentId) {
    this.treatmentId = treatmentId;
    this.description = description;
    this.dentistId = dentistId;
    this.appointmentId = appointmentId;
  }

  // Getters and Setters
  public Integer getTreatmentId() { return treatmentId; }
  public void setTreatmentId(Integer treatmentId) { this.treatmentId = treatmentId; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public Integer getDentistId() { return dentistId; }
  public void setDentistId(Integer dentistId) { this.dentistId = dentistId; }
  public Integer getAppointmentId() { return appointmentId; }
  public void setAppointmentId(Integer appointmentId) { this.appointmentId = appointmentId; }
}
