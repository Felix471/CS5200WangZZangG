package com.dentalclinic.service;

import com.dentalclinic.exception.DatabaseException;
import com.dentalclinic.exception.NotFoundException;
import com.dentalclinic.model.Appointment;
import com.dentalclinic.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@Service
public class AppointmentService {
  private final AppointmentRepository appointmentRepository;

  @Autowired
  public AppointmentService(AppointmentRepository appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  @Transactional
  public Appointment createAppointment(Appointment appointment) {
    try {
      return appointmentRepository.createAppointment(appointment);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to create appointment: " + e.getMessage());
    }
  }

  public List<Appointment> getAllAppointments() {
    try {
      return appointmentRepository.getAllAppointments();
    } catch (SQLException e) {
      throw new DatabaseException("Failed to retrieve appointments: " + e.getMessage());
    }
  }

  @Transactional
  public void updateAppointment(Appointment appointment) {
    try {
      appointmentRepository.updateAppointment(appointment);
    } catch (SQLException e) {
      handleAppointmentError(e, appointment.getAppointmentId());
    }
  }

  @Transactional
  public void deleteAppointment(int appointmentId) {
    try {
      appointmentRepository.deleteAppointment(appointmentId);
    } catch (SQLException e) {
      handleAppointmentError(e, appointmentId);
    }
  }

  public BigDecimal calculateAppointmentTotal(int appointmentId) {
    try {
      return appointmentRepository.calculateAppointmentTotal(appointmentId);
    } catch (SQLException e) {
      throw new DatabaseException("Failed to calculate total: " + e.getMessage());
    }
  }

  private void handleAppointmentError(SQLException e, int appointmentId) {
    if (e.getErrorCode() == 1644) {
      throw new NotFoundException("Appointment not found with ID: " + appointmentId);
    }
    throw new DatabaseException("Database error: " + e.getMessage());
  }
}