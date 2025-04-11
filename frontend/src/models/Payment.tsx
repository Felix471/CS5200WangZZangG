export interface Payment {
    id: number;
    patient_id: number;
    appointment_id: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    payment_method: 'credit_card' | 'cash' | 'refunded_credit' | 'no-co-pay';
    transaction_id?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PaymentRequest {
    appointment_id: number;
    payment_method: string;
    amount: number;
}