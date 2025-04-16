package com.dentalclinic.repository;

import com.dentalclinic.model.Clinic;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ClinicRepository {
  private final DataSource dataSource;

  @Autowired
  public ClinicRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Clinic createClinic(Clinic clinicDTO) throws SQLException {
    String sql = "{CALL Clinic_Create(?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, clinicDTO.getClinicName());
      stmt.setString(2, clinicDTO.getAddress());
      stmt.setString(3, clinicDTO.getClinicContactNumber());
      stmt.execute();

      return clinicDTO;
    }
  }

  public List<Clinic> getAllClinics() throws SQLException {
    String sql = "{CALL Clinic_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Clinic> clinics = new ArrayList<>();
      while (rs.next()) {
        clinics.add(new Clinic(
            rs.getInt("clinic_id"),
            rs.getString("clinic_name"),
            rs.getString("address"),
            rs.getString("clinic_contact_number")
        ));
      }
      return clinics;
    }
  }

  public void updateClinic(Clinic clinicDTO) throws SQLException {
    String sql = "{CALL Clinic_Update(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, clinicDTO.getClinicId());
      stmt.setString(2, clinicDTO.getClinicName());
      stmt.setString(3, clinicDTO.getAddress());
      stmt.setString(4, clinicDTO.getClinicContactNumber());
      stmt.execute();
    }
  }

}
