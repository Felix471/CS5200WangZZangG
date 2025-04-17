import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../api/appointmentApi';
import { getAllDentists } from '../api/dentistApi';
import { Dentist } from '../models/Dentist';

function AppointmentFormPage() {
    const navigate = useNavigate();
    const [dentists, setDentists] = useState<Dentist[]>([]);

    const [dentistId, setDentistId] = useState<number | ''>('');
    const [appointmentDate, setAppointmentDate] = useState<string>('');

    const [patientId] = useState<number>(1);
    const [status] = useState<string>('scheduled');

    useEffect(() => {
        getAllDentists()
            .then((data) => setDentists(data))
            .catch((err) => console.error('Failed to load dentists', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dentistId || !appointmentDate) {
            alert('Please select a dentist and choose a date/time.');
            return;
        }

        const [date, time] = appointmentDate.split('T');

        const newAppointment = {
            date,
            time,
            doctor_id: Number(dentistId),
            patient_id: patientId,
            status,
            notes: '',
            treatment_id: 0
        };

        try {
            await createAppointment(newAppointment);
            alert('Appointment created successfully!');
            navigate('/appointment');
        } catch (err) {
            console.error('Error creating appointment:', err);
            alert('Failed to create appointment');
        }
    };

    return (
        <div>
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Dentist:</label>
                    <select
                        value={dentistId}
                        onChange={(e) => setDentistId(e.target.value ? Number(e.target.value) : '')}
                    >
                        <option value="">-- Select Dentist --</option>
                        {dentists.map((d) => (
                            <option key={d.dentistId} value={d.dentistId}>
                                {d.firstName} {d.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => navigate('/appointment')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AppointmentFormPage;
