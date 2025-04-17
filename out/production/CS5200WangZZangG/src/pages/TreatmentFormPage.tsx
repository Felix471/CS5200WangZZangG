import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTreatment, getTreatmentById, updateTreatment } from '../api/treatmentApi';
import { Treatment } from '../models/Treatment';

function TreatmentFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [treatmentData, setTreatmentData] = useState<Partial<Treatment>>({
        description: '',
        dentistId: 0,
        appointmentId: 0,
    });

    useEffect(() => {
        if (id) {

            getTreatmentById(Number(id))
                .then(data => setTreatmentData(data))
                .catch(err => console.error('Failed to fetch treatment by id:', err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTreatmentData(prev => ({
            ...prev,
            [name]: name === 'dentistId' || name === 'appointmentId'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateTreatment(Number(id), treatmentData);
                alert('Treatment updated successfully!');
            } else {
                await createTreatment(treatmentData);
                alert('Treatment created successfully!');
            }
            navigate('/treatment');
        } catch (err) {
            console.error('Failed to save treatment:', err);
            alert('Failed to save treatment.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Treatment' : 'Create Treatment'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={treatmentData.description || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Dentist ID:</label>
                    <input
                        type="number"
                        name="dentistId"
                        value={treatmentData.dentistId || 0}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Appointment ID:</label>
                    <input
                        type="number"
                        name="appointmentId"
                        value={treatmentData.appointmentId || 0}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/treatment')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default TreatmentFormPage;
