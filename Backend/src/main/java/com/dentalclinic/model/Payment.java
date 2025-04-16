package com.dentalclinic.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Payment {
  private Integer paymentId;
  private BigDecimal amount;
  private LocalDate paymentDate;
  private String method;
  private Integer patientId;
  private Integer appointmentId;

  public Payment() {}

  public Payment(Integer paymentId, BigDecimal amount, LocalDate paymentDate,
      String method, Integer patientId, Integer appointmentId) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.paymentDate = paymentDate;
    this.method = method;
    this.patientId = patientId;
    this.appointmentId = appointmentId;
  }

  // Getters and Setters
  public Integer getPaymentId() { return paymentId; }
  public void setPaymentId(Integer paymentId) { this.paymentId = paymentId; }
  public BigDecimal getAmount() { return amount; }
  public void setAmount(BigDecimal amount) { this.amount = amount; }
  public LocalDate getPaymentDate() { return paymentDate; }
  public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
  public String getMethod() { return method; }
  public void setMethod(String method) { this.method = method; }
  public Integer getPatientId() { return patientId; }
  public void setPatientId(Integer patientId) { this.patientId = patientId; }
  public Integer getAppointmentId() { return appointmentId; }
  public void setAppointmentId(Integer appointmentId) { this.appointmentId = appointmentId; }
}