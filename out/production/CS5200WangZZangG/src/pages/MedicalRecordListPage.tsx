// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMedicalRecord, getAllMedicalRecords } from '../api/medicalRecordApi';
import { MedicalRecord } from '../models/MedicalRecord';

function MedicalRecordListPage() {
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMedicalRecords()
            .then(setRecords)
            .catch(err => console.error('Failed to fetch medical records:', err));
    }, []);

    const handleNew = () => navigate('/medical-record/new');

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await deleteMedicalRecord(id);
            setRecords(prev => prev.filter(r => r.recordId !== id));
        } catch (err) {
            console.error('Failed to delete record:', err);
        }
    };

    return (
        <div>
            <h2>Medical Records</h2>
            <button onClick={handleNew}>New Record</button>
            {records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Patient ID</th>
                        <th>Treatment ID</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map(rec => (
                        <tr key={rec.recordId}>
                            <td>{rec.recordId}</td>
                            <td>{rec.recordDescription}</td>
                            <td>{rec.recordDate}</td>
                            <td>{rec.patientId}</td>
                            <td>{rec.treatmentId}</td>
                            <td>
                                <button onClick={() => navigate(`/medical-record/edit/${rec.recordId}`)}>
                                    Edit
                                </button>
                                <button
                                    style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}
                                    onClick={() => handleDelete(rec.recordId)}
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

export default MedicalRecordListPage;
