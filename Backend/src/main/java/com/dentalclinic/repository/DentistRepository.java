package com.dentalclinic.repository;

import com.dentalclinic.model.Dentist;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DentistRepository {
  private final DataSource dataSource;

  @Autowired
  public DentistRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Dentist createDentist(Dentist dentist) throws SQLException {
    String sql = "{CALL Dentist_Create(?, ?, ?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, dentist.getFirstName());
      stmt.setString(2, dentist.getLastName());
      stmt.setString(3, dentist.getLicenseNumber());
      stmt.setString(4, dentist.getDescription());
      stmt.setString(5, dentist.getPhoneNumber());
      stmt.setString(6, dentist.getEmail());
      stmt.setString(7, dentist.getAddress());
      stmt.setInt(8, dentist.getClinicId());
      stmt.execute();

      return dentist;
    }
  }

  public List<Dentist> getAllDentists() throws SQLException {
    String sql = "{CALL Dentist_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<Dentist> dentists = new ArrayList<>();
      while (rs.next()) {
        dentists.add(new Dentist(
            rs.getInt("dentist_id"),
            rs.getString("first_name"),
            rs.getString("last_name"),
            rs.getString("license_number"),
            rs.getString("description"),
            rs.getString("phone_number"),
            rs.getString("email"),
            rs.getString("address"),
            rs.getInt("clinic_id")
        ));
      }
      return dentists;
    }
  }

  public void updateDentist(Dentist dentist) throws SQLException {
    String sql = "{CALL Dentist_Update(?, ?, ?, ?, ?, ?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, dentist.getDentistId());
      stmt.setString(2, dentist.getFirstName());
      stmt.setString(3, dentist.getLastName());
      stmt.setString(4, dentist.getLicenseNumber());
      stmt.setString(5, dentist.getDescription());
      stmt.setString(6, dentist.getPhoneNumber());
      stmt.setString(7, dentist.getEmail());
      stmt.setString(8, dentist.getAddress());
      stmt.setInt(9, dentist.getClinicId());
      stmt.execute();
    }
  }


}