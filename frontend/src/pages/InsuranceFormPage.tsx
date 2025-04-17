import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInsurance, updateInsurance, getAllInsurances } from '../api/insuranceApi';
import { Insurance } from '../models/Insurance';

function InsuranceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const insuranceId = id ? parseInt(id, 10) : 0;
    const isEditMode = insuranceId > 0;

    const [insuranceData, setInsuranceData] = useState<Partial<Insurance>>({
        insuranceId: 0,
        providerName: '',
        policyNumber: '',
        validFrom: '',
        validTo: '',
        patientId: undefined,
    });

    useEffect(() => {
        if (isEditMode) {
            loadInsuranceToEdit(insuranceId);
        }
    }, [insuranceId, isEditMode]);

    const loadInsuranceToEdit = async (id: number) => {
        try {
            const allInsurances = await getAllInsurances();
            const found = allInsurances.find((ins) => ins.insuranceId === id);
            if (found) {
                setInsuranceData(found);
            } else {
                console.error(`Insurance with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load insurance:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInsuranceData(prev => ({
            ...prev,
            [name]: name === 'patientId' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateInsurance(insuranceId, insuranceData);
                alert('Insurance updated successfully!');
            } else {
                await createInsurance(insuranceData);
                alert('Insurance created successfully!');
            }
            navigate('/insurance');
        } catch (err) {
            console.error('Failed to save insurance:', err);
            alert('Failed to save insurance');
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Insurance' : 'Create Insurance'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Provider Name:</label>
                    <input
                        type="text"
                        name="providerName"
                        value={insuranceData.providerName || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Policy Number:</label>
                    <input
                        type="text"
                        name="policyNumber"
                        value={insuranceData.policyNumber || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Valid From:</label>
                    <input
                        type="date"
                        name="validFrom"
                        value={insuranceData.validFrom || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Valid To:</label>
                    <input
                        type="date"
                        name="validTo"
                        value={insuranceData.validTo || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Patient ID:</label>
                    <input
                        type="number"
                        name="patientId"
                        value={insuranceData.patientId || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button onClick={() => navigate('/insurance')} type="button">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default InsuranceFormPage;