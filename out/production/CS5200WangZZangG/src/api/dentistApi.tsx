import axiosInstance from './axiosInstance';
import { Dentist } from '../models/Dentist';

export async function getAllDentists(): Promise<Dentist[]> {
    const res = await axiosInstance.get('/api/dentists');
    return res.data;
}

export async function createDentist(dentist: Dentist): Promise<Dentist> {
    const res = await axiosInstance.post('/api/dentists', dentist);
    return res.data;
}

export async function updateDentist(id: number, dentist: Dentist): Promise<void> {
    await axiosInstance.put(`/api/dentists/${id}`, dentist);
}
