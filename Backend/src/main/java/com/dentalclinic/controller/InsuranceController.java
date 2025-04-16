package com.dentalclinic.controller;

import com.dentalclinic.model.Insurance;
import com.dentalclinic.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurances")
public class InsuranceController {
  private final InsuranceService insuranceService;

  @Autowired
  public InsuranceController(InsuranceService insuranceService) {
    this.insuranceService = insuranceService;
  }

  @PostMapping
  public ResponseEntity<Insurance> createInsurance(@RequestBody Insurance insurance) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(insuranceService.createInsurance(insurance));
  }

  @GetMapping
  public ResponseEntity<List<Insurance>> getAllInsurances() {
    return ResponseEntity.ok(insuranceService.getAllInsurances());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateInsurance(@PathVariable int id, @RequestBody Insurance insurance) {
    insurance.setInsuranceId(id);
    insuranceService.updateInsurance(insurance);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteInsurance(@PathVariable int id) {
    insuranceService.deleteInsurance(id);
    return ResponseEntity.noContent().build();
  }
}