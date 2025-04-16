package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Payment;
import com.dentalclinic.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class PaymentService {
  private final PaymentRepository paymentRepository;

  @Autowired
  public PaymentService(PaymentRepository paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  @Transactional
  public Payment createPayment(Payment payment) {
    try {
      return paymentRepository.createPayment(payment);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create payment: " + e.getMessage());
    }
  }

  public List<Payment> getAllPayments() {
    try {
      return paymentRepository.getAllPayments();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve payments: " + e.getMessage());
    }
  }

  @Transactional
  public void updatePayment(Payment payment) {
    try {
      paymentRepository.updatePayment(payment);
    } catch (SQLException e) {
      handlePaymentError(e, payment.getPaymentId());
    }
  }

  @Transactional
  public void deletePayment(int paymentId) {
    try {
      paymentRepository.deletePayment(paymentId);
    } catch (SQLException e) {
      handlePaymentError(e, paymentId);
    }
  }

  private void handlePaymentError(SQLException e, int paymentId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Payment not found with ID: " + paymentId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}