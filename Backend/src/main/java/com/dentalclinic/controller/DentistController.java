package com.dentalclinic.controller;

import com.dentalclinic.model.Dentist;
import com.dentalclinic.service.DentistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentists")
public class DentistController {
  private final DentistService dentistService;

  @Autowired
  public DentistController(DentistService dentistService) {
    this.dentistService = dentistService;
  }

  @PostMapping
  public ResponseEntity<Dentist> createDentist(@RequestBody Dentist dentist) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(dentistService.createDentist(dentist));
  }

  @GetMapping
  public ResponseEntity<List<Dentist>> getAllDentists() {
    return ResponseEntity.ok(dentistService.getAllDentists());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateDentist(@PathVariable int id, @RequestBody Dentist dentist) {
    dentist.setDentistId(id);
    dentistService.updateDentist(dentist);
    return ResponseEntity.noContent().build();
  }
}