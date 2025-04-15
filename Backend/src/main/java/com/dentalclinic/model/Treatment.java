package com.dentalclinic.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Treatment")
public class Treatment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long treatmentId;

  private String description;

  @ManyToOne
  @JoinColumn(name = "dentist_id")
  private Dentist dentist;

  @OneToOne
  @JoinColumn(name = "appointment_id")
  private Appointment appointment;

  @ManyToMany
  @JoinTable(
      name = "TreatmentProcedure",
      joinColumns = @JoinColumn(name = "treatment_id"),
      inverseJoinColumns = @JoinColumn(name = "procedure_id")
  )
  private List<ProcedureCatalog> procedures = new ArrayList<>();

  // Constructors
  public Treatment() {}

  public Treatment(String description) {
    this.description = description;
  }

  // Getters and Setters
  public Long getTreatmentId() { return treatmentId; }
  public void setTreatmentId(Long treatmentId) { this.treatmentId = treatmentId; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public Dentist getDentist() { return dentist; }
  public void setDentist(Dentist dentist) { this.dentist = dentist; }

  public Appointment getAppointment() { return appointment; }
  public void setAppointment(Appointment appointment) { this.appointment = appointment; }

  public List<ProcedureCatalog> getProcedures() { return procedures; }
  public void setProcedures(List<ProcedureCatalog> procedures) { this.procedures = procedures; }
}
