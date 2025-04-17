import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deletePayment, getPayments } from '../api/paymentApi';
import { Payment } from '../models/Payment';

function PaymentListPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching payments...');
            const data = await getPayments();
            console.log('Fetched payments:', data);
            setPayments(data);
        } catch (err) {
            console.error('Error fetching payments:', err);
            setError('Failed to load payments. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [location.state]);

    const handleNewPayment = () => {
        navigate('/payment/new');
    };

    const handleDelete = async (paymentId: number) => {
        if (!window.confirm('Are you sure you want to delete this payment?')) {
            return;
        }
        try {
            await deletePayment(paymentId);
            fetchPayments();
        } catch (err) {
            console.error('Failed to delete payment:', err);
            alert('Failed to delete payment. Please try again.');
        }
    };

    return (
        <div>
            <h2>Payments</h2>
            <button onClick={handleNewPayment}>Add New Payment</button>

            {loading && <p>Loading payments...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && payments.length === 0 ? (
                <p>No payment records. <button onClick={fetchPayments}>Refresh</button></p>
            ) : (
                !loading && !error && (
                    <>
                        <button onClick={fetchPayments} style={{ marginLeft: '10px' }}>
                            Refresh
                        </button>
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
                                        <button
                                            onClick={() => handleDelete(p.paymentId)}
                                            style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )
            )}
        </div>
    );
}

export default PaymentListPage;