export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    treatment_id: number;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'canceled';
    notes?: string;
    doctor_name: string;
    department: string;
    treatment_name: string;
    created_at: string;
    updated_at: string;
}

export interface AppointmentRequest {
    doctor_id: number;
    treatment_id: number;
    date: string;
    time: string;
    notes?: string;
}

export interface Treatment {
    id: number;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    department: string;
}