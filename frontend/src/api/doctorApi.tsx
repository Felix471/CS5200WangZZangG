import axiosInstance from './axiosInstance';
import { Doctor } from '../models/Doctor';

export async function getDoctors(): Promise<Doctor[]> {
    const response = await axiosInstance.get('/doctors');
    return response.data;
}

export async function getAllDoctors(): Promise<Doctor[]> {
    const response = await axiosInstance.get('/doctors');
    return response.data;
}

export async function getDoctorsByDepartment(department: string): Promise<Doctor[]> {
    const response = await axiosInstance.get(`/doctors`, {
        params: { department }
    });
    return response.data;
}