import axiosInstance from './axiosInstance';
import { Treatment } from '../models/Appointment';

/**
 * Get a specific treatment by ID
 */
export async function getTreatments(id: number): Promise<Treatment[]> {
    const response = await axiosInstance.get(`/treatments/${id}`);
    return response.data;
}

/**
 * Get all dental treatments
 */
export async function getAllTreatments(): Promise<Treatment[]> {
    const response = await axiosInstance.get('/treatments');
    return response.data;
}

/**
 * Get treatments by department
 */
export async function getTreatmentsByDepartment(department: string): Promise<Treatment[]> {
    const response = await axiosInstance.get('/treatments', {
        params: { department }
    });
    return response.data;
}
