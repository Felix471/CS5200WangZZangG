import axiosInstance from './axiosInstance';
import { Clinic } from '../models/Clinic';

export async function getAllClinics(): Promise<Clinic[]> {
    const response = await axiosInstance.get<Clinic[]>('/api/clinics');
    return response.data;
}

export async function getClinicById(id: number): Promise<Clinic> {
    const response = await axiosInstance.get<Clinic>(`/api/clinics/${id}`);
    return response.data;
}

export async function createClinic(data: Partial<Clinic>): Promise<void> {
    await axiosInstance.post('/api/clinics', data);
}

export async function updateClinic(id: number, data: Partial<Clinic>): Promise<void> {
    await axiosInstance.put(`/api/clinics/${id}`, data);
}

