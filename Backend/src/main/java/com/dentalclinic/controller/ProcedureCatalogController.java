package com.dentalclinic.controller;

import com.dentalclinic.model.ProcedureCatalog;
import com.dentalclinic.service.ProcedureCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procedures")
public class ProcedureCatalogController {
  private final ProcedureCatalogService procedureService;

  @Autowired
  public ProcedureCatalogController(ProcedureCatalogService procedureService) {
    this.procedureService = procedureService;
  }

  @PostMapping
  public ResponseEntity<ProcedureCatalog> createProcedure(@RequestBody ProcedureCatalog procedure) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(procedureService.createProcedure(procedure));
  }

  @GetMapping
  public ResponseEntity<List<ProcedureCatalog>> getAllProcedures() {
    return ResponseEntity.ok(procedureService.getAllProcedures());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateProcedure(@PathVariable int id, @RequestBody ProcedureCatalog procedure) {
    procedure.setProcedureId(id);
    procedureService.updateProcedure(procedure);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProcedure(@PathVariable int id) {
    procedureService.deleteProcedure(id);
    return ResponseEntity.noContent().build();
  }
}
