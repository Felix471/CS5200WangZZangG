import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInsurance, getInsuranceById, updateInsurance } from '../api/insuranceApi';
import { Insurance } from '../models/Insurance';

function InsuranceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [insuranceData, setInsuranceData] = useState<Partial<Insurance>>({
        providerName: '',
        policyNumber: '',
        validFrom: '',
        validTo: '',
        patientId: undefined,
    });

    useEffect(() => {
        if (id) {
            getInsuranceById(Number(id))
                .then(data => setInsuranceData(data))
                .catch(err => console.error('Failed to fetch insurance:', err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInsuranceData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateInsurance(Number(id), insuranceData);
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
            <h2>{id ? 'Edit Insurance' : 'Create Insurance'}</h2>
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
                    <label>Patient ID (optional):</label>
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
