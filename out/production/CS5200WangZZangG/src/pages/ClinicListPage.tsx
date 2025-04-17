// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClinics } from '../api/clinicApi';
import { Clinic } from '../models/Clinic';

function ClinicListPage() {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllClinics()
            .then(data => setClinics(data))
            .catch(err => console.error('Failed to fetch clinics:', err));
    }, []);

    const handleCreate = () => {
        navigate('/clinic/new');
    };

    const handleEdit = (clinic: Clinic) => {
        navigate(`/clinic/edit/${clinic.clinicId}`, {
            state: { clinic }
        });
    };

    return (
        <div>
            <h2>Clinic List</h2>
            <button onClick={handleCreate}>Create New Clinic</button>
            {clinics.length === 0 ? (
                <p>No clinics found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Clinic Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clinics.map(clinic => (
                        <tr key={clinic.clinicId}>
                            <td>{clinic.clinicId}</td>
                            <td>{clinic.clinicName}</td>
                            <td>{clinic.address}</td>
                            <td>{clinic.clinicContactNumber}</td>
                            <td>
                                <button onClick={() => handleEdit(clinic)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ClinicListPage;
