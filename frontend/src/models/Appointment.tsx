export type AppointmentStatus = 'scheduled' | 'completed' | 'canceled';

export interface Appointment {
    appointmentId: number;
    appointmentDate: string; // ISO string
    status: AppointmentStatus;
    patientId: number;
    dentistId: number;
}