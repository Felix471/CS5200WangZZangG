package com.dentalclinic.repository;

import com.dentalclinic.model.Appointment;
import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AppointmentRepository {
  private final DataSource dataSource;

  @Autowired
  public AppointmentRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Appointment createAppointment(Appointment appointment) throws SQLException {
    String sql = "{CALL Appointment_Create_Simple(?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setTimestamp(1, Timestamp.valueOf(appointment.getAppointmentDate()));
      stmt.setInt(2, appointment.getPatientId());
      stmt.setInt(3, appointment.getDentistId());
      stmt.executeUpdate();

      // Retrieve generated ID
      try (ResultSet rs = stmt.getGeneratedKeys()) {
        if (rs.next()) {
          appointment.setAppointmentId(rs.getInt(1));
        }
      }
      return appointment;
    }
  }

  public List<Appointment> getAllAppointments() throws SQLException {
    String sql = "{CALL Appointment_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Appointment> appointments = new ArrayList<>();
      while (rs.next()) {
        appointments.add(new Appointment(
            rs.getInt("appointment_id"),
            rs.getTimestamp("appointment_date").toLocalDateTime(),
            rs.getString("status"),
            rs.getInt("patient_id"),
            rs.getInt("dentist_id")
        ));
      }
      return appointments;
    }
  }

  public void updateAppointment(Appointment appointment) throws SQLException {
    String sql = "{CALL Appointment_Update(?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, appointment.getAppointmentId());
      stmt.setTimestamp(2, Timestamp.valueOf(appointment.getAppointmentDate()));
      stmt.setString(3, appointment.getStatus().toDatabaseValue());
      stmt.setInt(4, appointment.getPatientId());
      stmt.setInt(5, appointment.getDentistId());
      stmt.execute();
    }
  }

  public void deleteAppointment(int appointmentId) throws SQLException {
    String sql = "{CALL Appointment_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, appointmentId);
      stmt.execute();
    }
  }

  public BigDecimal calculateAppointmentTotal(int appointmentId) throws SQLException {
    String sql = "{CALL CalculateAppointmentTotal(?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, appointmentId);
      stmt.registerOutParameter(2, Types.DECIMAL);
      stmt.execute();

      return stmt.getBigDecimal(2);
    }
  }

}