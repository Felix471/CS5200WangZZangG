package com.dentalclinic.repository;

import com.dentalclinic.model.DentistProcedure;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DentistProcedureRepository {
  private final DataSource dataSource;

  @Autowired
  public DentistProcedureRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public void createDentistProcedure(DentistProcedure dp) throws SQLException {
    String sql = "{CALL DentistProcedure_Create(?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, dp.getProcedureId());
      stmt.setInt(2, dp.getDentistId());
      stmt.execute();
    }
  }

  public void updateDentistProcedure(int oldProcedureId, int oldDentistId,
      int newProcedureId, int newDentistId) throws SQLException {
    String sql = "{CALL DentistProcedure_Update(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, oldProcedureId);
      stmt.setInt(2, oldDentistId);
      stmt.setInt(3, newProcedureId);
      stmt.setInt(4, newDentistId);
      stmt.execute();
    }
  }


  public List<DentistProcedure> getAllDentistProcedures() throws SQLException {
    String sql = "{CALL DentistProcedure_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<DentistProcedure> associations = new ArrayList<>();
      while (rs.next()) {
        associations.add(new DentistProcedure(
            rs.getInt("procedure_id"),
            rs.getInt("dentist_id")
        ));
      }
      return associations;
    }
  }

  public void deleteDentistProcedure(int procedureId, int dentistId) throws SQLException {
    String sql = "{CALL DentistProcedure_Delete(?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, procedureId);
      stmt.setInt(2, dentistId);
      stmt.execute();
    }
  }
}