package com.dentalclinic.repository;

import com.dentalclinic.model.Insurance;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InsuranceRepository {
  private final DataSource dataSource;

  @Autowired
  public InsuranceRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Insurance createInsurance(Insurance insurance) throws SQLException {
    String sql = "{CALL Insurance_Create(?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, insurance.getProviderName());
      stmt.setString(2, insurance.getPolicyNumber());
      stmt.setDate(3, Date.valueOf(insurance.getValidFrom()));
      stmt.setDate(4, Date.valueOf(insurance.getValidTo()));
      stmt.setInt(5, insurance.getPatientId());
      stmt.execute();

      return insurance;
    }
  }

  public List<Insurance> getAllInsurances() throws SQLException {
    String sql = "{CALL Insurance_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Insurance> insurances = new ArrayList<>();
      while (rs.next()) {
        insurances.add(new Insurance(
            rs.getInt("insurance_id"),
            rs.getString("provider_name"),
            rs.getString("policy_number"),
            rs.getDate("valid_from").toLocalDate(),
            rs.getDate("valid_to").toLocalDate(),
            rs.getInt("patient_id")
        ));
      }
      return insurances;
    }
  }

  public void updateInsurance(Insurance insurance) throws SQLException {
    String sql = "{CALL Insurance_Update(?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, insurance.getInsuranceId());
      stmt.setString(2, insurance.getProviderName());
      stmt.setString(3, insurance.getPolicyNumber());
      stmt.setDate(4, Date.valueOf(insurance.getValidFrom()));
      stmt.setDate(5, Date.valueOf(insurance.getValidTo()));
      stmt.setInt(6, insurance.getPatientId());
      stmt.execute();
    }
  }

  public void deleteInsurance(int insuranceId) throws SQLException {
    String sql = "{CALL Insurance_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, insuranceId);
      stmt.execute();
    }
  }
}