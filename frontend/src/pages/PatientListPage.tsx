import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients, Patient } from '../api/patientApi';

function PatientListPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const navigate = useNavigate();

    const fetchPatients = async () => {
        try {
            const data = await getAllPatients();
            setPatients(data);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchPatients();
        };

        loadData();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <h1>Patients</h1>
            <button onClick={() => navigate('/patients/new')}>
                + New Patient
            </button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((p) => (
                    <tr key={p.patientId}>
                        <td>{p.patientId}</td>
                        <td>{p.firstName} {p.lastName}</td>
                        <td>{formatDate(p.dateOfBirth)}</td>
                        <td>{p.phoneNumber}</td>
                        <td>{p.email}</td>
                        <td>{p.address}</td>
                        <td>
                            <button onClick={() => navigate(`/patients/edit/${p.patientId}`)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientListPage;