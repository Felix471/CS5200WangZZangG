package com.dentalclinic.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Payment")
public class Payment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long paymentId;

  private BigDecimal amount;

  @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE")
  private LocalDate paymentDate;

  private String method;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "appointment_id")
  private Appointment appointment;

  // Constructors
  public Payment() {}

  public Payment(BigDecimal amount, String method) {
    this.amount = amount;
    this.method = method;
  }

  // Getters and Setters
  public Long getPaymentId() { return paymentId; }
  public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

  public BigDecimal getAmount() { return amount; }
  public void setAmount(BigDecimal amount) { this.amount = amount; }

  public LocalDate getPaymentDate() { return paymentDate; }
  public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }

  public String getMethod() { return method; }
  public void setMethod(String method) { this.method = method; }

  public Patient getPatient() { return patient; }
  public void setPatient(Patient patient) { this.patient = patient; }

  public Appointment getAppointment() { return appointment; }
  public void setAppointment(Appointment appointment) { this.appointment = appointment; }
}
