package com.dentalclinic.repository;

import com.dentalclinic.model.Treatment;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TreatmentRepository {
  private final DataSource dataSource;

  @Autowired
  public TreatmentRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Treatment createTreatment(Treatment treatment) throws SQLException {
    String sql = "{CALL Treatment_Create(?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, treatment.getDescription());
      stmt.setInt(2, treatment.getDentistId());
      stmt.setInt(3, treatment.getAppointmentId());
      stmt.execute();

      return treatment;
    }
  }

  public List<Treatment> getAllTreatments() throws SQLException {
    String sql = "{CALL Treatment_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Treatment> treatments = new ArrayList<>();
      while (rs.next()) {
        treatments.add(new Treatment(
            rs.getInt("treatment_id"),
            rs.getString("description"),
            rs.getInt("dentist_id"),
            rs.getInt("appointment_id")
        ));
      }
      return treatments;
    }
  }

  public void updateTreatment(Treatment treatment) throws SQLException {
    String sql = "{CALL Treatment_Update(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, treatment.getTreatmentId());
      stmt.setString(2, treatment.getDescription());
      stmt.setInt(3, treatment.getDentistId());
      stmt.setInt(4, treatment.getAppointmentId());
      stmt.execute();
    }
  }

  public void deleteTreatment(int treatmentId) throws SQLException {
    String sql = "{CALL Treatment_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, treatmentId);
      stmt.execute();
    }
  }

}