package com.dentalclinic.controller;

import com.dentalclinic.model.Appointment;
import com.dentalclinic.service.AppointmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")

public class AppointmentController {
  private final AppointmentService appointmentService;

  public AppointmentController(AppointmentService service) {
    this.appointmentService = service;
  }

  @GetMapping
  public List<Appointment> getAllAppointments() {
    return appointmentService.findAll();
  }

}
