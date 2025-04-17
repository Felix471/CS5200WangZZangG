import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createPayment, getPaymentById, updatePayment } from '../api/paymentApi';
import { Payment } from '../models/Payment';

function PaymentFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState<Partial<Payment>>({
        patientId: 1,
        appointmentId: 0,
        amount: 0,
        method: 'credit_card',
        paymentDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (id) {
            getPaymentById(Number(id))
                .then((res) => {
                    const formattedData = {
                        ...res,
                        paymentDate: res.paymentDate ? new Date(res.paymentDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                    };
                    setPaymentData(formattedData);
                    console.log('Loaded payment data:', formattedData);
                })
                .catch((err) => {
                    console.error('Failed to load payment:', err);
                });
        } else {
            const apptIdParam = searchParams.get('appointment_id');
            if (apptIdParam) {
                setPaymentData((prev) => ({
                    ...prev,
                    appointmentId: Number(apptIdParam),
                }));
            }
        }
    }, [id, searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({
            ...prev,
            [name]: (name === 'amount' || name === 'appointmentId' || name === 'patientId')
                ? Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentData.appointmentId || !paymentData.amount) {
            alert('Appointment ID and amount are required.');
            return;
        }

        const formattedData = {
            amount: paymentData.amount,
            paymentDate: paymentData.paymentDate,
            method: paymentData.method,
            patientId: paymentData.patientId,
            appointmentId: paymentData.appointmentId
        };

        console.log('Submitting payment data:', formattedData);

        try {
            if (id) {
                await updatePayment(Number(id), formattedData);
                alert('Payment updated successfully!');
            } else {
                await createPayment(formattedData);
                alert('Payment created successfully!');
            }
            navigate('/payment', { state: { refresh: Date.now() } });
        } catch (err) {
            console.error('Payment creation/update failed:', err);
            if (err.response && err.response.data) {
                alert(`Failed to save payment: ${err.response.data.message || JSON.stringify(err.response.data)}`);
            } else {
                alert(`Failed to save payment: ${err.message}`);
            }
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
                        name="appointmentId"
                        value={paymentData.appointmentId || 0}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Patient ID:</label>
                    <input
                        type="number"
                        name="patientId"
                        value={paymentData.patientId || 1}
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
                    <label>Payment Date:</label>
                    <input
                        type="date"
                        name="paymentDate"
                        value={paymentData.paymentDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Payment Method:</label>
                    <select
                        name="method"
                        value={paymentData.method}
                        onChange={handleChange}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="cash">Cash</option>
                        <option value="insurance">Insurance</option>
                    </select>
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/payment')}>Cancel</button>
            </form>
        </div>
    );
}

export default PaymentFormPage;