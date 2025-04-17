package com.dentalclinic.repository;

import com.dentalclinic.model.Payment;
import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentRepository {
  private final DataSource dataSource;

  @Autowired
  public PaymentRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Payment createPayment(Payment payment) throws SQLException {
    String sql = "{CALL Payment_Create(?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setBigDecimal(1, payment.getAmount());
      stmt.setDate(2, Date.valueOf(payment.getPaymentDate()));
      stmt.setString(3, payment.getMethod());
      stmt.setInt(4, payment.getPatientId());
      stmt.setInt(5, payment.getAppointmentId());
      stmt.execute();

      return payment;
    }
  }

  public List<Payment> getAllPayments() throws SQLException {
    String sql = "{CALL Payment_Read()}";
    try (Connection conn = dataSource.getConnection();
         CallableStatement stmt = conn.prepareCall(sql);
         ResultSet rs = stmt.executeQuery()) {

      List<Payment> payments = new ArrayList<>();
      while (rs.next()) {
        java.sql.Date paymentDate = rs.getDate("payment_date");
        LocalDate localPaymentDate = (paymentDate != null) ? paymentDate.toLocalDate() : null;

        payments.add(new Payment(
            rs.getInt("payment_id"),
            rs.getBigDecimal("amount"),
            localPaymentDate,
            rs.getString("method"),
            rs.getInt("patient_id"),
            rs.getInt("appointment_id")
        ));
      }
      return payments;
    }
  }

  public void updatePayment(Payment payment) throws SQLException {
    String sql = "{CALL Payment_Update(?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, payment.getPaymentId());
      stmt.setBigDecimal(2, payment.getAmount());
      stmt.setDate(3, Date.valueOf(payment.getPaymentDate()));
      stmt.setString(4, payment.getMethod());
      stmt.setInt(5, payment.getPatientId());
      stmt.setInt(6, payment.getAppointmentId());
      stmt.execute();
    }
  }

  public void deletePayment(int paymentId) throws SQLException {
    String sql = "{CALL Payment_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, paymentId);
      stmt.execute();
    }
  }
}