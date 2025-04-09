package com.dentalclinic.service;

import com.dentalclinic.model.Appointment;
import com.dentalclinic.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
  private final AppointmentRepository repo;
  public AppointmentService(AppointmentRepository repo) {
    this.repo = repo;
  }
  public List<Appointment> findAll() {
    return repo.findAll();
  }

  // 其他的
}