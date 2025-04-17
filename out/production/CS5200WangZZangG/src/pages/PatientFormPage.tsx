import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    createPatient,
    updatePatient,
    getAllPatients,
    Patient
} from '../api/patientApi';

function PatientFormPage() {
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Patient>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (isEditMode && id) {
            loadPatient(parseInt(id));
        }
    }, [id, isEditMode]);

    const loadPatient = async (patientId: number) => {
        try {
            const all = await getAllPatients();
            const found = all.find(p => p.patientId === patientId);
            if (found) setFormData(found);
        } catch (error) {
            console.error('Failed to load patient:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && id) {
                await updatePatient(parseInt(id), formData);
                alert('Updated!');
            } else {
                await createPatient(formData);
                alert('Created!');
            }
            navigate('/patients');
        } catch (error) {
            console.error(error);
            alert('Save failed.');
        }
    };

    return (
        <div>
            <h1>{isEditMode ? 'Edit' : 'Create'} Patient</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                    />
                </div>
                <button type="submit">
                    {isEditMode ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => navigate('/patients')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default PatientFormPage;