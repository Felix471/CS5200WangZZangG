package com.dentalclinic.model;

import java.math.BigDecimal;

public class ProcedureCatalog {
  private Integer procedureId;
  private String procedureName;
  private String description;
  private BigDecimal standardCost;

  public ProcedureCatalog() {}

  public ProcedureCatalog(Integer procedureId, String procedureName, String description, BigDecimal standardCost) {
    this.procedureId = procedureId;
    this.procedureName = procedureName;
    this.description = description;
    this.standardCost = standardCost;
  }

  // Getters and Setters
  public Integer getProcedureId() { return procedureId; }
  public void setProcedureId(Integer procedureId) { this.procedureId = procedureId; }
  public String getProcedureName() { return procedureName; }
  public void setProcedureName(String procedureName) { this.procedureName = procedureName; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public BigDecimal getStandardCost() { return standardCost; }
  public void setStandardCost(BigDecimal standardCost) { this.standardCost = standardCost; }
}