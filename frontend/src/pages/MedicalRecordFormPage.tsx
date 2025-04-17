import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createMedicalRecord,
    getMedicalRecordById,
    updateMedicalRecord
} from '../api/medicalRecordApi';
import { MedicalRecord } from '../models/MedicalRecord';

function MedicalRecordFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recordData, setRecordData] = useState<Partial<MedicalRecord>>({
        recordDescription: '',
        recordDate: '',
        patientId: 0,
        treatmentId: 0
    });

    useEffect(() => {
        if (id) {
            getMedicalRecordById(Number(id))
                .then(data => setRecordData(data))
                .catch(err => console.error('Failed to fetch record:', err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMedicalRecord(Number(id), recordData);
                alert('Record updated!');
            } else {
                await createMedicalRecord(recordData);
                alert('Record created!');
            }
            navigate('/medical-record');
        } catch (err) {
            console.error('Failed to save record:', err);
            alert('Failed to save record');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Medical Record' : 'Create Medical Record'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="recordDescription"
                        value={recordData.recordDescription || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="recordDate"
                        value={recordData.recordDate || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Patient ID:</label>
                    <input
                        type="number"
                        name="patientId"
                        value={recordData.patientId || 0}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Treatment ID:</label>
                    <input
                        type="number"
                        name="treatmentId"
                        value={recordData.treatmentId || 0}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/medical-record')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default MedicalRecordFormPage;
