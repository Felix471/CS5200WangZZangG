import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createMedicalRecord,
    updateMedicalRecord,
    getAllMedicalRecords
} from '../api/medicalRecordApi';
import { MedicalRecord } from '../models/MedicalRecord';

function MedicalRecordFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const recordId = id ? parseInt(id, 10) : 0;
    const isEditMode = recordId > 0;

    const [recordData, setRecordData] = useState<Partial<MedicalRecord>>({
        recordId: 0,
        recordDescription: '',
        recordDate: '',
        patientId: 0,
        treatmentId: 0
    });

    useEffect(() => {
        if (isEditMode) {
            loadMedicalRecordToEdit(recordId);
        }
    }, [recordId, isEditMode]);

    const loadMedicalRecordToEdit = async (id: number) => {
        try {
            const allRecords = await getAllMedicalRecords();
            const found = allRecords.find((r) => r.recordId === id);
            if (found) {
                setRecordData(found);
            } else {
                console.error(`Medical Record with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load medical record:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecordData(prev => ({
            ...prev,
            [name]: name === 'patientId' || name === 'treatmentId'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateMedicalRecord(recordId, recordData);
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
            <h2>{isEditMode ? 'Edit Medical Record' : 'Create Medical Record'}</h2>
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