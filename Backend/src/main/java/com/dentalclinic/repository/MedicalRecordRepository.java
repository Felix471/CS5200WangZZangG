package com.dentalclinic.repository;

import com.dentalclinic.model.MedicalRecord;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MedicalRecordRepository {
  private final DataSource dataSource;

  @Autowired
  public MedicalRecordRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public MedicalRecord createMedicalRecord(MedicalRecord record) throws SQLException {
    String sql = "{CALL MedicalRecord_Create(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, record.getRecordDescription());
      stmt.setInt(2, record.getPatientId());
      stmt.setInt(3, record.getTreatmentId());
      stmt.setDate(4, Date.valueOf(record.getRecordDate()));
      stmt.execute();

      return record;
    }
  }

  public List<MedicalRecord> getAllMedicalRecords() throws SQLException {
    String sql = "{CALL MedicalRecord_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<MedicalRecord> records = new ArrayList<>();
      while (rs.next()) {
        records.add(new MedicalRecord(
            rs.getInt("record_id"),
            rs.getString("record_description"),
            rs.getDate("record_date").toLocalDate(),
            rs.getInt("patient_id"),
            rs.getInt("treatment_id")
        ));
      }
      return records;
    }
  }

  public void updateMedicalRecord(MedicalRecord record) throws SQLException {
    String sql = "{CALL MedicalRecord_Update(?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, record.getRecordId());
      stmt.setString(2, record.getRecordDescription());
      stmt.setDate(3, Date.valueOf(record.getRecordDate()));
      stmt.setInt(4, record.getPatientId());
      stmt.setInt(5, record.getTreatmentId());
      stmt.execute();
    }
  }

  public void deleteMedicalRecord(int recordId) throws SQLException {
    String sql = "{CALL MedicalRecord_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, recordId);
      stmt.execute();
    }
  }
}
