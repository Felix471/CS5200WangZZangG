import axiosInstance from './axiosInstance';
import { TreatmentProcedure } from '../models/TreatmentProcedure';

export async function getAllTreatmentProcedures(): Promise<TreatmentProcedure[]> {
    const res = await axiosInstance.get<TreatmentProcedure[]>('/api/treatment-procedures');
    return res.data;
}

export async function createTreatmentProcedure(data: Partial<TreatmentProcedure>): Promise<void> {
    await axiosInstance.post('/api/treatment-procedures', data);
}

export async function updateTreatmentProcedure(
    oldProcedureId: number,
    oldTreatmentId: number,
    newProcedureId: number,
    newTreatmentId: number
): Promise<void> {
    await axiosInstance.put('/api/treatment-procedures', null, {
        params: {
            oldProcedureId,
            oldTreatmentId,
            newProcedureId,
            newTreatmentId,
        },
    });
}

export async function deleteTreatmentProcedure(procedureId: number, treatmentId: number): Promise<void> {
    await axiosInstance.delete('/api/treatment-procedures', {
        params: { procedureId, treatmentId },
    });
}
