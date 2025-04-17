import axiosInstance from './axiosInstance';
import { Payment } from '../models/Payment';

export async function getPayments(): Promise<Payment[]> {
    try {
        const response = await axiosInstance.get('/api/payments');
        return response.data;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
}

export async function getPaymentById(id: number): Promise<Payment> {
    const response = await axiosInstance.get(`/api/payments/${id}`);
    return response.data;
}

export async function createPayment(newPayment: Partial<Payment>): Promise<Payment> {
    const response = await axiosInstance.post('/api/payments', newPayment);
    return response.data;
}

export async function updatePayment(id: number, data: Partial<Payment>): Promise<Payment> {
    const response = await axiosInstance.put(`/api/payments/${id}`, data);
    return response.data;
}

export async function deletePayment(id: number): Promise<void> {
    await axiosInstance.delete(`/api/payments/${id}`);
}