import React, { useEffect, useState } from 'react';
import { createClinic, getClinicById, updateClinic } from '../api/clinicApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Clinic } from '../models/Clinic';

function ClinicFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clinicData, setClinicData] = useState<Partial<Clinic>>({
        clinicName: '',
        address: '',
        clinicContactNumber: ''
    });

    useEffect(() => {
        if (id) {
            getClinicById(Number(id))
                .then(data => setClinicData(data))
                .catch(err => console.error('Failed to fetch clinic by id:', err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClinicData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateClinic(Number(id), clinicData);
                alert('Clinic updated successfully!');
            } else {
                await createClinic(clinicData);
                alert('Clinic created successfully!');
            }
            navigate('/clinic');
        } catch (error) {
            console.error('Failed to save clinic:', error);
            alert('Failed to save clinic');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Clinic' : 'Create Clinic'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Clinic Name:</label>
                    <input
                        type="text"
                        name="clinicName"
                        value={clinicData.clinicName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={clinicData.address || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="clinicContactNumber"
                        value={clinicData.clinicContactNumber || ''}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/clinic')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default ClinicFormPage;
