package com.dentalclinic.controller;

import com.dentalclinic.model.Clinic;
import com.dentalclinic.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {
  private final ClinicService clinicService;

  @Autowired
  public ClinicController(ClinicService clinicService) {
    this.clinicService = clinicService;
  }

  @PostMapping
  public ResponseEntity<Clinic> createClinic(@RequestBody Clinic clinic) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(clinicService.createClinic(clinic));
  }

  @GetMapping
  public ResponseEntity<List<Clinic>> getAllClinics() {
    return ResponseEntity.ok(clinicService.getAllClinics());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateClinic(@PathVariable int id, @RequestBody Clinic clinic) {
    clinic.setClinicId(id);
    clinicService.updateClinic(clinic);
    return ResponseEntity.noContent().build();
  }
}