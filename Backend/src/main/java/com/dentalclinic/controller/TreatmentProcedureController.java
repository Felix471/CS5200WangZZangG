package com.dentalclinic.controller;

import com.dentalclinic.model.TreatmentProcedure;
import com.dentalclinic.service.TreatmentProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatment-procedures")
public class TreatmentProcedureController {
  private final TreatmentProcedureService tpService;

  @Autowired
  public TreatmentProcedureController(TreatmentProcedureService tpService) {
    this.tpService = tpService;
  }

  @PostMapping
  public ResponseEntity<Void> createAssociation(@RequestBody TreatmentProcedure tp) {
    tpService.createTreatmentProcedure(tp);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping
  public ResponseEntity<List<TreatmentProcedure>> getAllAssociations() {
    return ResponseEntity.ok(tpService.getAllTreatmentProcedure());
  }

  @PutMapping
  public ResponseEntity<Void> updateAssociation(
      @RequestParam int oldProcedureId,
      @RequestParam int oldTreatmentId,
      @RequestParam int newProcedureId,
      @RequestParam int newTreatmentId
  ) {
    tpService.updateTreatmentProcedure(oldProcedureId, oldTreatmentId, newProcedureId, newTreatmentId);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteAssociation(
      @RequestParam int procedureId,
      @RequestParam int treatmentId
  ) {
    tpService.deleteTreatmentProcedure(procedureId, treatmentId);
    return ResponseEntity.noContent().build();
  }
}