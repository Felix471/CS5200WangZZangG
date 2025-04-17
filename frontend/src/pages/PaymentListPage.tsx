import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePayment, getPayments } from '../api/paymentApi';
import { Payment } from '../models/Payment';

function PaymentListPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPayments()
            .then(data => setPayments(data))
            .catch(err => console.error('Error fetching payments:', err));
    }, []);

    const handleNewPayment = () => {
        navigate('/payment/new');
    };

    const handleDelete = async (paymentId: number) => {
        if (!window.confirm('Are you sure you want to delete this payment?')) {
            return;
        }

        try {
            await deletePayment(paymentId);
            setPayments(payments.filter(p => p.paymentId !== paymentId));
        } catch (err) {
            console.error('Failed to delete payment:', err);
        }
    };

    return (
        <div>
            <h2>My Payments</h2>
            <button onClick={handleNewPayment}>Add New Payment</button>
            {payments.length === 0 ? (
                <p>No payment records.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Appointment</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map(p => (
                        <tr key={p.paymentId}>
                            <td>{p.paymentId}</td>
                            <td>{p.appointmentId}</td>
                            <td>{p.amount}</td>
                            <td>{p.paymentDate}</td>
                            <td>{p.method}</td>
                            <td>
                                <button onClick={() => navigate(`/payment/edit/${p.paymentId}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(p.paymentId)}
                                        style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PaymentListPage;