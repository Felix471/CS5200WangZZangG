package com.dentalclinic.controller;

import com.dentalclinic.model.Treatment;
import com.dentalclinic.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatments")
public class TreatmentController {
  private final TreatmentService treatmentService;

  @Autowired
  public TreatmentController(TreatmentService treatmentService) {
    this.treatmentService = treatmentService;
  }

  @PostMapping
  public ResponseEntity<Treatment> createTreatment(@RequestBody Treatment treatment) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(treatmentService.createTreatment(treatment));
  }

  @GetMapping
  public ResponseEntity<List<Treatment>> getAllTreatments() {
    return ResponseEntity.ok(treatmentService.getAllTreatments());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateTreatment(@PathVariable int id, @RequestBody Treatment treatment) {
    treatment.setTreatmentId(id);
    treatmentService.updateTreatment(treatment);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTreatment(@PathVariable int id) {
    treatmentService.deleteTreatment(id);
    return ResponseEntity.noContent().build();
  }
}