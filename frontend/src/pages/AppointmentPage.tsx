import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../api/appointmentApi';
import { Appointment } from '../models/Appointment';
import { Doctor} from "../models/Doctor.tsx";
import {getDoctors} from "../api/doctorApi.tsx";

function AppointmentPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAppointments(/* patient_id */)
            .then(data => {
                setAppointments(data);
            })
            .catch(err => {
                console.error('Error fetching appointments', err);
            });

        getDoctors()
            .then(data => setDoctors(data))
            .catch(err => console.error(err));
    }, []);

    const getDoctorName = (doctorId: number) => {
        const doc = doctors.find((d) => d.id === doctorId);
        return doc ? doc.name : '';
    };

    const handleNewAppointment = () => {
        navigate('/appointment/new');
    };

    return (
        <div>
            <h2>My Appointments</h2>
            <button onClick={handleNewAppointment}>Create New Appointment</button>
            <hr />

            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.id}>
                            <td>{appt.id}</td>
                            <td>{appt.doctor_name || getDoctorName(appt.doctor_id)}</td>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>{appt.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AppointmentPage;