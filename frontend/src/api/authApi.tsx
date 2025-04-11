import axiosInstance from './axiosInstance';
import { User, LoginCredentials, RegisterData } from '../models/User';

/**
 * Login user with credentials
 */
export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await axiosInstance.post('/auth/login', credentials);

    // If login successful, store token
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
}

/**
 * Register a new user
 */
export async function register(userData: RegisterData): Promise<{ user: User; token: string }> {
    const response = await axiosInstance.post('/auth/register', userData);

    // If registration successful, store token
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
}

/**
 * Logout current user
 */
export function logout(): void {
    localStorage.removeItem('authToken');
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
}