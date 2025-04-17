export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELED';

export interface Appointment {
    appointmentId: number;
    appointmentDate: string; // ISO string
    status: AppointmentStatus;
    patientId: number;
    dentistId: number;
}