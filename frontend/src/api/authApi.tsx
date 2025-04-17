import axiosInstance from './axiosInstance';

interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    username: string;
}

export async function login(credentials: LoginCredentials): Promise<void> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);

    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('username', response.data.username);
    } else {
        throw new Error('No token in response');
    }
}

export function logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
}

export function getCurrentUsername(): string | null {
    return localStorage.getItem('username');
}