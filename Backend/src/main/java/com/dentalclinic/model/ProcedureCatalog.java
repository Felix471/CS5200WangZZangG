package com.dentalclinic.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ProcedureCatalog")
public class ProcedureCatalog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long procedureId;

  @Column(unique = true)
  private String procedureName;

  private String description;
  private BigDecimal standardCost;

  @ManyToMany(mappedBy = "procedures")
  private List<Treatment> treatments = new ArrayList<>();

  // Constructors
  public ProcedureCatalog() {}

  public ProcedureCatalog(String procedureName, String description, BigDecimal standardCost) {
    this.procedureName = procedureName;
    this.description = description;
    this.standardCost = standardCost;
  }

  // Getters and Setters
  public Long getProcedureId() { return procedureId; }
  public void setProcedureId(Long procedureId) { this.procedureId = procedureId; }

  public String getProcedureName() { return procedureName; }
  public void setProcedureName(String procedureName) { this.procedureName = procedureName; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public BigDecimal getStandardCost() { return standardCost; }
  public void setStandardCost(BigDecimal standardCost) { this.standardCost = standardCost; }

  public List<Treatment> getTreatments() { return treatments; }
  public void setTreatments(List<Treatment> treatments) { this.treatments = treatments; }
}
