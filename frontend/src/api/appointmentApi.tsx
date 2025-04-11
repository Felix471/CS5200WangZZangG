import axiosInstance from './axiosInstance';
import { Appointment, AppointmentRequest } from '../models/Appointment';

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
export async function getAppointments(): Promise<Appointment[]> {
    const response = await axiosInstance.get('/appointments');
    return response.data;
}

/**
 * Create a new dental appointment
 */
export async function createAppointment(newAppointment: {
    date: string;
    doctor_id: number;
    notes: string;
    patient_id: number;
    treatment_id: number;
    time: string;
    status: string
}): Promise<Appointment> {
    const response = await axiosInstance.post('/appointments', newAppointment);
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
export async function getAvailableSlots(doctorId: number, date: string): Promise<string[]> {
    const response = await axiosInstance.get('/appointments/available-slots', {
        params: { doctor_id: doctorId, date }
    });
    return response.data;
}


