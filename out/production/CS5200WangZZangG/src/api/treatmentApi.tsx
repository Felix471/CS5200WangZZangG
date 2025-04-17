import axiosInstance from './axiosInstance';
import { Treatment } from '../models/Treatment';

export async function getAllTreatments(): Promise<Treatment[]> {
    const res = await axiosInstance.get<Treatment[]>('/api/treatments');
    return res.data;
}

export async function getTreatmentById(treatmentId: number): Promise<Treatment> {
    const res = await axiosInstance.get<Treatment>(`/api/treatments/${treatmentId}`);
    return res.data;
}

export async function createTreatment(data: Partial<Treatment>): Promise<void> {
    await axiosInstance.post('/api/treatments', data);
}

export async function updateTreatment(treatmentId: number, data: Partial<Treatment>): Promise<void> {
    await axiosInstance.put(`/api/treatments/${treatmentId}`, data);
}

export async function deleteTreatment(treatmentId: number): Promise<void> {
    await axiosInstance.delete(`/api/treatments/${treatmentId}`);
}
