package com.dentalclinic.repository;

import com.dentalclinic.model.TreatmentProcedure;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TreatmentProcedureRepository {
  private final DataSource dataSource;

  @Autowired
  public TreatmentProcedureRepository(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public void createTreatmentProcedure(TreatmentProcedure tp) throws SQLException {
    String sql = "{CALL TreatmentProcedure_Create(?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, tp.getProcedureId());
      stmt.setInt(2, tp.getTreatmentId());
      stmt.execute();
    }
  }

  public void updateTreatmentProcedure(int oldProcedureId, int oldTreatmentId,
      int newProcedureId, int newTreatmentId) throws SQLException {
    String sql = "{CALL TreatmentProcedure_Update(?, ?, ?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, oldProcedureId);
      stmt.setInt(2, oldTreatmentId);
      stmt.setInt(3, newProcedureId);
      stmt.setInt(4, newTreatmentId);
      stmt.execute();
    }
  }

  public List<TreatmentProcedure> getAllTreatmentProcedures() throws SQLException {
    String sql = "{CALL TreatmentProcedure_Read()}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql);
        ResultSet rs = stmt.executeQuery()) {

      List<TreatmentProcedure> associations = new ArrayList<>();
      while (rs.next()) {
        associations.add(new TreatmentProcedure(
            rs.getInt("procedure_id"),
            rs.getInt("treatment_id")
        ));
      }
      return associations;
    }
  }


  public void deleteTreatmentProcedure(int procedureId, int treatmentId) throws SQLException {
    String sql = "{CALL TreatmentProcedure_Delete(?, ?)}";
    try (Connection conn = dataSource.getConnection();
        CallableStatement stmt = conn.prepareCall(sql)) {

      stmt.setInt(1, procedureId);
      stmt.setInt(2, treatmentId);
      stmt.execute();
    }
  }
}