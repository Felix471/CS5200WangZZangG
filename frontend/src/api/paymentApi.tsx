import axiosInstance from './axiosInstance';
import { Payment } from '../models/Payment';

export async function getPayments(): Promise<Payment[]> {
    const response = await axiosInstance.get('/payments');
    return response.data;
}

export async function getPaymentById(id: number): Promise<Payment> {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
}

export async function createPayment(newPayment: Partial<Payment>): Promise<Payment> {
    const response = await axiosInstance.post('/payments', newPayment);
    return response.data;
}

export async function updatePayment(id: number, data: Partial<Payment>): Promise<Payment> {
    const response = await axiosInstance.put(`/payments/${id}`, data);
    return response.data;
}

export async function deletePayment(id: number): Promise<void> {
    await axiosInstance.delete(`/payments/${id}`);
}
