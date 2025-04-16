package com.dentalclinic.controller;

import com.dentalclinic.model.Patient;
import com.dentalclinic.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
  private final PatientService patientService;

  @Autowired
  public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }

  @PostMapping
  public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(patientService.createPatient(patient));
  }

  @GetMapping
  public ResponseEntity<List<Patient>> getAllPatients() {
    return ResponseEntity.ok(patientService.getAllPatients());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updatePatient(@PathVariable int id, @RequestBody Patient patient) {
    patient.setPatientId(id);
    patientService.updatePatient(patient);
    return ResponseEntity.noContent().build();
  }


}