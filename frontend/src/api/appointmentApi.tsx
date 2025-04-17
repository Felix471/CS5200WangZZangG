import axiosInstance from './axiosInstance';
import { Appointment, AppointmentStatus } from '../models/Appointment';

export async function getAppointments(): Promise<Appointment[]> {
    const response = await axiosInstance.get('/api/appointments');
    return response.data;
}

export async function getAppointmentById(id: number): Promise<Appointment> {
    const response = await axiosInstance.get(`/api/appointments/${id}`);
    return response.data;
}

export async function createAppointment(data: {
    appointmentDate: string;
    status: AppointmentStatus;
    patientId: number;
    dentistId: number;
}): Promise<Appointment> {
    const response = await axiosInstance.post('/api/appointments', data);
    return response.data;
}

export async function updateAppointment(
    id: number,
    data: Partial<Appointment>
): Promise<void> {
    await axiosInstance.put(`/api/appointments/${id}`, data);
}

export async function cancelAppointment(id: number): Promise<void> {
    await axiosInstance.delete(`/api/appointments/${id}`);
}

export async function calculateAppointmentTotal(id: number): Promise<number> {
    const response = await axiosInstance.get(`/api/appointments/${id}/total`);
    return response.data;
}
