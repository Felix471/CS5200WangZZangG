import axiosInstance from './axiosInstance';

export interface Patient {
    patientId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    address: string;
}

// CREATE
export async function createPatient(p: Patient): Promise<Patient> {
    const res = await axiosInstance.post('/api/patients', p);
    return res.data;
}

// READ (getAll)
export async function getAllPatients(): Promise<Patient[]> {
    const res = await axiosInstance.get('/api/patients');
    return res.data;
}

// UPDATE
export async function updatePatient(id: number, p: Patient): Promise<void> {
    await axiosInstance.put(`/api/patients/${id}`, p);
}

/*NOTE: We don't actually implement patient deletion on the backend due to
potential data integrity issues. This API endpoint is written for
demonstration/development purposes only and should not be used in production.

export async function deletePatient(id: number): Promise<void> {
    await axiosInstance.delete(`/api/patients/${id}`);
}

 */