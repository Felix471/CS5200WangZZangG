// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTreatments, deleteTreatment } from '../api/treatmentApi';
import { Treatment } from '../models/Treatment';

function TreatmentListPage() {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTreatments()
            .then(setTreatments)
            .catch(err => console.error('Failed to fetch treatments:', err));
    }, []);

    const handleCreate = () => {
        navigate('/treatment/new');
    };

    const handleEdit = (id: number) => {
        navigate(`/treatment/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this treatment?')) {
            await deleteTreatment(id);
            setTreatments(prev => prev.filter(t => t.treatmentId !== id));
        }
    };

    return (
        <div>
            <h2>Treatment List</h2>
            <button onClick={handleCreate}>Create New Treatment</button>
            {treatments.length === 0 ? (
                <p>No treatments found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
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
                                <button onClick={() => handleEdit(t.treatmentId)}>Edit</button>
                                <button onClick={() => handleDelete(t.treatmentId)}>Delete</button>
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
