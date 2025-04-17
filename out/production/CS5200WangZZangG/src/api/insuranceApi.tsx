import axiosInstance from './axiosInstance';
import { Insurance } from '../models/Insurance';

export async function getAllInsurances(): Promise<Insurance[]> {
    const res = await axiosInstance.get<Insurance[]>('/api/insurances');
    return res.data;
}

export async function getInsuranceById(id: number): Promise<Insurance> {
    const res = await axiosInstance.get<Insurance>(`/api/insurances/${id}`);
    return res.data;
}

export async function createInsurance(data: Partial<Insurance>): Promise<void> {
    await axiosInstance.post('/api/insurances', data);
}

export async function updateInsurance(id: number, data: Partial<Insurance>): Promise<void> {
    await axiosInstance.put(`/api/insurances/${id}`, data);
}

export async function deleteInsurance(id: number): Promise<void> {
    await axiosInstance.delete(`/api/insurances/${id}`);
}
