export interface Payment {
    paymentId: number;
    amount: number;
    paymentDate: string;
    method: string;
    patientId: number;
    appointmentId: number;
}