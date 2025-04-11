import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createPayment, getPaymentById, updatePayment } from '../api/paymentApi';
import { Payment } from '../models/Payment';

function PaymentFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const [paymentData, setPaymentData] = useState<Partial<Payment>>({
        patient_id: 1,
        appointment_id: 0,
        amount: 0,
        status: 'pending',
        payment_method: 'credit_card',
    });

    useEffect(() => {

        if (id) {
            getPaymentById(Number(id))
                .then((res) => {
                    setPaymentData(res);
                })
                .catch((err) => {
                    console.error('Failed to load payment:', err);
                });
        } else {

            const apptIdParam = searchParams.get('appointment_id');
            if (apptIdParam) {
                setPaymentData((prev) => ({
                    ...prev,
                    appointment_id: Number(apptIdParam),
                }));
            }
        }
    }, [id, searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!paymentData.appointment_id || !paymentData.amount) {
            alert('Appointment ID and amount are required.');
            return;
        }

        try {
            if (id) {

                await updatePayment(Number(id), paymentData);
                alert('Payment updated successfully!');
            } else {

                await createPayment(paymentData);
                alert('Payment created successfully!');
            }
            navigate('/payment');
        } catch (err) {
            console.error('Payment creation/update failed:', err);
            alert('Failed to save payment.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Payment' : 'Create Payment'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointment ID:</label>
                    <input
                        type="number"
                        name="appointment_id"
                        value={paymentData.appointment_id || 0}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={paymentData.amount || 0}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Payment Method:</label>
                    <select
                        name="payment_method"
                        value={paymentData.payment_method}
                        onChange={handleChange}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="cash">Cash</option>
                        <option value="insurance">Insurance</option>
                    </select>
                </div>

                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={paymentData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/payment')}>Cancel</button>
            </form>
        </div>
    );
}

export default PaymentFormPage;