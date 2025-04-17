// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTreatment, getAllTreatments } from '../api/treatmentApi';
import { Treatment } from '../models/Treatment';

function TreatmentListPage() {
    const navigate = useNavigate();
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    useEffect(() => {
        getAllTreatments()
            .then(data => setTreatments(data))
            .catch(err => console.error('Failed to fetch treatments:', err));
    }, []);

    const handleNew = () => {
        navigate('/treatment/new');
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this treatment?')) return;
        try {
            await deleteTreatment(id);
            setTreatments(prev => prev.filter(t => t.treatmentId !== id));
        } catch (err) {
            console.error('Failed to delete treatment:', err);
        }
    };

    return (
        <div>
            <h2>Treatments</h2>
            <button onClick={handleNew}>Create New Treatment</button>
            {treatments.length === 0 ? (
                <p>No treatments found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Treatment ID</th>
                        <th>Description</th>
                        <th>Dentist ID</th>
                        <th>Appointment ID</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {treatments.map(t => (
                        <tr key={t.treatmentId}>
                            <td>{t.treatmentId}</td>
                            <td>{t.description}</td>
                            <td>{t.dentistId}</td>
                            <td>{t.appointmentId}</td>
                            <td>
                                <button onClick={() => navigate(`/treatment/edit/${t.treatmentId}`)}>Edit</button>
                                <button
                                    onClick={() => handleDelete(t.treatmentId)}
                                    style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}
                                >
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

export default TreatmentListPage;
