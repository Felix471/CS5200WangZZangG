import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment, getAvailableSlots } from '../api/appointmentApi';
import { getDoctors } from '../api/doctorApi';
import {getAllTreatments} from '../api/treatmentApi';
import {Treatment} from "../models/Appointment.tsx";
import {Doctor} from "../models/Doctor.tsx";


function AppointmentFormPage() {
    const navigate = useNavigate();

    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [treatmentList, setTreatmentList] = useState<Treatment[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedTreatment, setSelectedTreatment] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');

    //Here we suppose the current patient id is 1, the real app will fetch from token or context
    const patientId = 1;

    useEffect(() => {

            getDoctors()
                .then((res) => setDoctorList(res as Doctor[]))
                .catch((err) => console.error(err));

            getAllTreatments()
                .then((res) => setTreatmentList(res as Treatment[]))
                .catch((err) => console.error(err));
        },
        []);

    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            getAvailableSlots(selectedDoctor, selectedDate)
                .then((slots) => {
                    setAvailableSlots(slots || []);
                    setSelectedTime('');
                })
                .catch((err) => console.error(err));
        }
    }, [selectedDoctor, selectedDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDoctor || !selectedDate || !selectedTime || !selectedTreatment) {
            alert('Please fill out all required fields');
            return;
        }

        try {
            const newAppointment = {
                patient_id: patientId,
                doctor_id: selectedDoctor,
                treatment_id: selectedTreatment,
                date: selectedDate,
                time: selectedTime,
                status: 'pending',
                notes
            };

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
                    <label>Doctor:</label>
                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(Number(e.target.value))}
                    >
                        <option value="">Select a doctor</option>
                        {doctorList.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.name} - {doc.department}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>Available Slots:</label>
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">Select a time</option>
                        {availableSlots.map((slot, idx) => (
                            <option key={idx} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Treatment:</label>
                    <select
                        value={selectedTreatment}
                        onChange={(e) => setSelectedTreatment(Number(e.target.value))}
                    >
                        <option value="">Select a treatment</option>
                        {treatmentList.map((treat) => (
                            <option key={treat.id} value={treat.id}>
                                {treat.name} - {treat.department}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Notes (optional):</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
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