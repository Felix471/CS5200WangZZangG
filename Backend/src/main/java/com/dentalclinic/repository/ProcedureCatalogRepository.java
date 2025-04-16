package com.dentalclinic.repository;

import com.dentalclinic.model.ProcedureCatalog;
import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProcedureCatalogRepository {
  private final DataSource dataSource;

  @Autowired
  public ProcedureCatalogRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public ProcedureCatalog createProcedureCatalog(ProcedureCatalog procedure) throws SQLException {
    String sql = "{CALL ProcedureCatalog_Create(?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setString(1, procedure.getProcedureName());
      stmt.setString(2, procedure.getDescription());
      stmt.setBigDecimal(3, procedure.getStandardCost());
      stmt.execute();

      return procedure;
    }
  }

  public List<ProcedureCatalog> getAllProcedures() throws SQLException {
    String sql = "{CALL ProcedureCatalog_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<ProcedureCatalog> procedures = new ArrayList<>();
      while (rs.next()) {
        procedures.add(new ProcedureCatalog(
            rs.getInt("procedure_id"),
            rs.getString("procedure_name"),
            rs.getString("description"),
            rs.getBigDecimal("standard_cost")
        ));
      }
      return procedures;
    }
  }

  public void updateProcedureCatalog(ProcedureCatalog procedure) throws SQLException {
    String sql = "{CALL ProcedureCatalog_Update(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, procedure.getProcedureId());
      stmt.setString(2, procedure.getProcedureName());
      stmt.setString(3, procedure.getDescription());
      stmt.setBigDecimal(4, procedure.getStandardCost());
      stmt.execute();
    }
  }

  public void deleteProcedureCatalog(int procedureId) throws SQLException {
    String sql = "{CALL ProcedureCatalog_Delete(?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, procedureId);
      stmt.execute();
    }
  }
}