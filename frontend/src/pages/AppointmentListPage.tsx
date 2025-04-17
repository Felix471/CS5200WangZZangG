import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAppointments,
    cancelAppointment
} from '../api/appointmentApi';
import { getAllDentists } from '../api/dentistApi';
import { Appointment } from '../models/Appointment';
import { Dentist } from '../models/Dentist';

function AppointmentListPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAppointments()
            .then((res) => setAppointments(res))
            .catch((err) => console.error(err));
        getAllDentists()
            .then((res) => setDentists(res))
            .catch((err) => console.error(err));
    }, []);

    const getDentistName = (dentistId: number) => {
        const found = dentists.find((d) => d.dentistId === dentistId);
        if (!found) return '';
        return `${found.firstName} ${found.lastName}`;
    };

    const handleNew = () => {
        navigate('/appointment/new');
    };

    const handleEdit = (id: number) => {
        navigate(`/appointment/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this appointment?')) return;
        try {
            await cancelAppointment(id);
            setAppointments((prev) => prev.filter((a) => a.appointmentId !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Appointments</h2>
            <button onClick={handleNew}>Create New Appointment</button>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dentist</th>
                        <th>Appointment Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.appointmentId}>
                            <td>{appt.appointmentId}</td>
                            <td>{getDentistName(appt.dentistId)}</td>
                            <td>{appt.appointmentDate}</td>
                            <td>{appt.status}</td>
                            <td>
                                <button onClick={() => handleEdit(appt.appointmentId)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(appt.appointmentId)}
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

export default AppointmentListPage;
