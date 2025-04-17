import axiosInstance from './axiosInstance';
import { MedicalRecord } from '../models/MedicalRecord';

export async function getAllMedicalRecords(): Promise<MedicalRecord[]> {
    const res = await axiosInstance.get<MedicalRecord[]>('/api/medical-records');
    return res.data;
}

export async function getMedicalRecordById(id: number): Promise<MedicalRecord> {
    const res = await axiosInstance.get<MedicalRecord>(`/api/medical-records/${id}`);
    return res.data;
}

export async function createMedicalRecord(data: Partial<MedicalRecord>): Promise<void> {
    await axiosInstance.post('/api/medical-records', data);
}

export async function updateMedicalRecord(id: number, data: Partial<MedicalRecord>): Promise<void> {
    await axiosInstance.put(`/api/medical-records/${id}`, data);
}

export async function deleteMedicalRecord(id: number): Promise<void> {
    await axiosInstance.delete(`/api/medical-records/${id}`);
}
