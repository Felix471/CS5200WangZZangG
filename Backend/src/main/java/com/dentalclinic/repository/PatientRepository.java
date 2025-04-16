package com.dentalclinic.repository;

import com.dentalclinic.model.Patient;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PatientRepository {
  private final DataSource dataSource;

  @Autowired
  public PatientRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Patient createPatient(Patient patient) throws SQLException {
    String sql = "{CALL Patient_Create(?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, patient.getFirstName());
      stmt.setString(2, patient.getLastName());
      stmt.setDate(3, Date.valueOf(patient.getDateOfBirth()));
      stmt.setString(4, patient.getPhoneNumber());
      stmt.setString(5, patient.getEmail());
      stmt.setString(6, patient.getAddress());
      stmt.execute();

      return patient;
    }
  }

  public List<Patient> getAllPatients() throws SQLException {
    String sql = "{CALL Patient_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Patient> patients = new ArrayList<>();
      while (rs.next()) {
        patients.add(new Patient(
            rs.getInt("patient_id"),
            rs.getString("first_name"),
            rs.getString("last_name"),
            rs.getDate("date_of_birth").toLocalDate(),
            rs.getString("phone_number"),
            rs.getString("email"),
            rs.getString("address")
        ));
      }
      return patients;
    }
  }

  public void updatePatient(Patient patient) throws SQLException {
    String sql = "{CALL Patient_Update(?, ?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, patient.getPatientId());
      stmt.setString(2, patient.getFirstName());
      stmt.setString(3, patient.getLastName());
      stmt.setDate(4, Date.valueOf(patient.getDateOfBirth()));
      stmt.setString(5, patient.getPhoneNumber());
      stmt.setString(6, patient.getEmail());
      stmt.setString(7, patient.getAddress());
      stmt.execute();
    }
  }

}