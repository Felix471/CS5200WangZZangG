import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTreatment, updateTreatment, getAllTreatments } from '../api/treatmentApi';
import { Treatment } from '../models/Treatment';

function TreatmentFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const treatmentId = id ? parseInt(id, 10) : 0;
    const isEditMode = treatmentId > 0;

    const [treatmentData, setTreatmentData] = useState<Partial<Treatment>>({
        treatmentId: 0,
        description: '',
        dentistId: 0,
        appointmentId: 0,
    });

    useEffect(() => {
        if (isEditMode) {
            loadTreatmentToEdit(treatmentId);
        }
    }, [treatmentId, isEditMode]);

    const loadTreatmentToEdit = async (id: number) => {
        try {
            const allTreatments = await getAllTreatments();
            const found = allTreatments.find((t) => t.treatmentId === id);
            if (found) {
                setTreatmentData(found);
            } else {
                console.error(`Treatment with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load treatment:', error);
        }
    };

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
            if (isEditMode) {
                await updateTreatment(treatmentId, treatmentData);
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
            <h2>{isEditMode ? 'Edit Treatment' : 'Create Treatment'}</h2>
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