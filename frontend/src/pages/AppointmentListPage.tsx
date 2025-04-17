import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../api/appointmentApi';
import { getAllDentists } from '../api/dentistApi';
import { Appointment } from '../models/Appointment';
import { Dentist } from '../models/Dentist';

function AppointmentListPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAppointments()
            .then((data) => {
                setAppointments(data);
            })
            .catch((err) => {
                console.error('Error fetching appointments', err);
            });

        getAllDentists()
            .then((data) => setDentists(data))
            .catch((err) => console.error('Error fetching dentists', err));
    }, []);

    const getDentistName = (dentistId?: number) => {
        const dentist = dentists.find((d) => d.dentistId === dentistId);
        if (!dentist) return '';
        return `${dentist.firstName ?? ''} ${dentist.lastName ?? ''}`.trim();
    };

    const handleNewAppointment = () => {
        navigate('/appointment/new');
    };

    return (
        <div>
            <h2>Appointments</h2>
            <button onClick={handleNewAppointment}>Create New Appointment</button>
            <hr />

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
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.appointmentId}>
                            <td>{appt.appointmentId}</td>
                            <td>{getDentistName(appt.dentistId)}</td>
                            <td>{appt.appointmentDate}</td>
                            <td>{appt.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AppointmentListPage;
