import axiosInstance from './axiosInstance';
import { ProcedureCatalog } from '../models/ProcedureCatalog';

export async function getAllProcedures(): Promise<ProcedureCatalog[]> {
    const res = await axiosInstance.get<ProcedureCatalog[]>('/api/procedures');
    return res.data;
}

export async function getProcedureById(id: number): Promise<ProcedureCatalog> {
    const res = await axiosInstance.get<ProcedureCatalog>(`/api/procedures/${id}`);
    return res.data;
}

export async function createProcedure(data: Partial<ProcedureCatalog>): Promise<void> {
    await axiosInstance.post('/api/procedures', data);
}

export async function updateProcedure(id: number, data: Partial<ProcedureCatalog>): Promise<void> {
    await axiosInstance.put(`/api/procedures/${id}`, data);
}

export async function deleteProcedure(id: number): Promise<void> {
    await axiosInstance.delete(`/api/procedures/${id}`);
}
