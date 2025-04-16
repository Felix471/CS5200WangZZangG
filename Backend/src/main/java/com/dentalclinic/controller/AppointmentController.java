package com.dentalclinic.controller;

import com.dentalclinic.model.Appointment;
import com.dentalclinic.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
  private final AppointmentService appointmentService;

  @Autowired
  public AppointmentController(AppointmentService appointmentService) {
    this.appointmentService = appointmentService;
  }

  @PostMapping
  public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(appointmentService.createAppointment(appointment));
  }

  @GetMapping
  public ResponseEntity<List<Appointment>> getAllAppointments() {
    return ResponseEntity.ok(appointmentService.getAllAppointments());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateAppointment(@PathVariable int id, @RequestBody Appointment appointment) {
    appointment.setAppointmentId(id);
    appointmentService.updateAppointment(appointment);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAppointment(@PathVariable int id) {
    appointmentService.deleteAppointment(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}/total")
  public ResponseEntity<BigDecimal> calculateTotal(@PathVariable int id) {
    return ResponseEntity.ok(appointmentService.calculateAppointmentTotal(id));
  }
}