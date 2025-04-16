package com.dentalclinic.controller;

import com.dentalclinic.model.DentistProcedure;
import com.dentalclinic.service.DentistProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentist-procedures")
public class DentistProcedureController {
  private final DentistProcedureService dpService;

  @Autowired
  public DentistProcedureController(DentistProcedureService dpService) {
    this.dpService = dpService;
  }

  @PostMapping
  public ResponseEntity<Void> createAssociation(@RequestBody DentistProcedure dp) {
    dpService.createDentistProcedure(dp);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping
  public ResponseEntity<List<DentistProcedure>> getAllAssociations() {
    return ResponseEntity.ok(dpService.getDentistProcedure());
  }

  @PutMapping
  public ResponseEntity<Void> updateAssociation(
      @RequestParam int oldProcedureId,
      @RequestParam int oldDentistId,
      @RequestParam int newProcedureId,
      @RequestParam int newDentistId
  ) {
    dpService.updateDentistProcedure(oldProcedureId, oldDentistId, newProcedureId, newDentistId);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteAssociation(
      @RequestParam int procedureId,
      @RequestParam int dentistId
  ) {
    dpService.deleteDentistProcedure(procedureId, dentistId);
    return ResponseEntity.noContent().build();
  }
}