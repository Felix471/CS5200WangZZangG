import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createAppointment,
    updateAppointment,
    getAppointmentById
} from '../api/appointmentApi';
import { getAllDentists } from '../api/dentistApi';
import { Dentist } from '../models/Dentist';
import { Appointment } from '../models/Appointment';

function AppointmentFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [formData, setFormData] = useState<Partial<Appointment>>({
        appointmentDate: '',
        status: 'scheduled',
        patientId: 1,
        dentistId: 0
    });

    useEffect(() => {
        getAllDentists()
            .then(setDentists)
            .catch(console.error);
        if (isEdit && id) {
            getAppointmentById(Number(id))
                .then(setFormData)
                .catch(console.error);
        }
    }, [id, isEdit]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:
                name === 'dentistId' || name === 'patientId'
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.dentistId || !formData.appointmentDate) {
            alert('Missing required fields');
            return;
        }
        try {
            if (isEdit && id) {
                await updateAppointment(Number(id), formData);
            } else {
                await createAppointment({
                    appointmentDate: formData.appointmentDate!,
                    status: formData.status || 'scheduled',
                    patientId: formData.patientId || 1,
                    dentistId: formData.dentistId!
                });
            }
            navigate('/appointment');
        } catch (error) {
            console.error(error);
            alert('Save failed');
        }
    };

    return (
        <div>
            <h2>{isEdit ? 'Edit Appointment' : 'Create Appointment'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Dentist</label>
                    <select
                        name="dentistId"
                        value={formData.dentistId || 0}
                        onChange={handleChange}
                    >
                        <option value={0}>--</option>
                        {dentists.map(d => (
                            <option key={d.dentistId} value={d.dentistId}>
                                {d.firstName} {d.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Appointment Date</label>
                    <input
                        type="datetime-local"
                        name="appointmentDate"
                        value={formData.appointmentDate || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status || 'scheduled'}
                        onChange={handleChange}
                    >
                        <option value="scheduled">scheduled</option>
                        <option value="completed">completed</option>
                        <option value="canceled">canceled</option>
                    </select>
                </div>
                <div>
                    <label>Patient ID</label>
                    <input
                        type="number"
                        name="patientId"
                        value={formData.patientId || 1}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/appointment')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AppointmentFormPage;
