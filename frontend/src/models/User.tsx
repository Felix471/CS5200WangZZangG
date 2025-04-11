export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: 'patient' | 'doctor' | 'admin';
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
}