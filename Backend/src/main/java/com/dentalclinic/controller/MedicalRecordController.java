package com.dentalclinic.controller;

import com.dentalclinic.model.MedicalRecord;
import com.dentalclinic.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {
  private final MedicalRecordService medicalRecordService;

  @Autowired
  public MedicalRecordController(MedicalRecordService medicalRecordService) {
    this.medicalRecordService = medicalRecordService;
  }

  @PostMapping
  public ResponseEntity<MedicalRecord> createMedicalRecord(@RequestBody MedicalRecord record) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(medicalRecordService.createMedicalRecord(record));
  }

  @GetMapping
  public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {
    return ResponseEntity.ok(medicalRecordService.getAllMedicalRecords());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateMedicalRecord(@PathVariable int id, @RequestBody MedicalRecord record) {
    record.setRecordId(id);
    medicalRecordService.updateMedicalRecord(record);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMedicalRecord(@PathVariable int id) {
    medicalRecordService.deleteMedicalRecord(id);
    return ResponseEntity.noContent().build();
  }
}
