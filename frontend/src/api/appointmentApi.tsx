import axiosInstance from './axiosInstance';
import { Appointment, AppointmentRequest, Doctor } from '../models/Appointment';

/**
 * Get all appointments for the current user
 */
export async function getUserAppointments(): Promise<Appointment[]> {
    const response = await axiosInstance.get('/appointments');
    return response.data;
}

/**
 * Get a specific appointment by ID
 */
export async function getAppointment(id: number): Promise<Appointment> {
    const response = await axiosInstance.get(`/appointments/${id}`);
    return response.data;
}

/**
 * Create a new dental appointment
 */
export async function createAppointment(appointmentData: AppointmentRequest): Promise<Appointment> {
    const response = await axiosInstance.post('/appointments', appointmentData);
    return response.data;
}

/**
 * Update an existing appointment
 */
export async function updateAppointment(id: number, appointmentData: Partial<AppointmentRequest>): Promise<Appointment> {
    const response = await axiosInstance.put(`/appointments/${id}`, appointmentData);
    return response.data;
}

/**
 * Cancel an appointment
 */
export async function cancelAppointment(id: number): Promise<void> {
    await axiosInstance.delete(`/appointments/${id}`);
}

/**
 * Get available time slots for a specific dentist on a given date
 */
export async function getAvailableTimeSlots(doctorId: number, date: string): Promise<string[]> {
    const response = await axiosInstance.get('/appointments/available-slots', {
        params: { doctor_id: doctorId, date }
    });
    return response.data;
}

/**
 * Get all dentists
 */
export async function getAllDoctors(): Promise<Doctor[]> {
    const response = await axiosInstance.get('/doctors');
    return response.data;
}

/**
 * Get dentists by department
 */
export async function getDoctorsByDepartment(department: string): Promise<Doctor[]> {
    const response = await axiosInstance.get(`/doctors`, {
        params: { department }
    });
    return response.data;
}

/**
 * Get a specific dentist by ID
 */
export async function getDoctor(id: number): Promise<Doctor> {
    const response = await axiosInstance.get(`/doctors/${id}`);
    return response.data;
}