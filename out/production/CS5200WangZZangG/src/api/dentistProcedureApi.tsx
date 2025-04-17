import axiosInstance from './axiosInstance';
import { DentistProcedure } from '../models/DentistProcedure';

export async function getAllDentistProcedures(): Promise<DentistProcedure[]> {
    const res = await axiosInstance.get<DentistProcedure[]>('/api/dentist-procedures');
    return res.data;
}

export async function getDentistProcedureById(procedureId: number, dentistId: number): Promise<DentistProcedure> {
    const res = await axiosInstance.get<DentistProcedure>('/api/dentist-procedures/detail', {
        params: { procedureId, dentistId }
    });
    return res.data;
}

export async function createDentistProcedure(data: Partial<DentistProcedure>): Promise<void> {
    await axiosInstance.post('/api/dentist-procedures', data);
}

export async function updateDentistProcedure(
    procedureId: number,
    dentistId: number,
    data: Partial<DentistProcedure>
): Promise<void> {
    await axiosInstance.put('/api/dentist-procedures', data, {
        params: { procedureId, dentistId }
    });
}

export async function deleteDentistProcedure(procedureId: number, dentistId: number): Promise<void> {
    await axiosInstance.delete('/api/dentist-procedures', {
        params: { procedureId, dentistId }
    });
}