// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllInsurances, deleteInsurance } from '../api/insuranceApi';
import { Insurance } from '../models/Insurance';

function InsuranceListPage() {
    const [insurances, setInsurances] = useState<Insurance[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllInsurances()
            .then(data => setInsurances(data))
            .catch(err => console.error('Failed to fetch insurances:', err));
    }, []);

    const handleCreate = () => {
        navigate('/insurance/new');
    };

    const handleDelete = async (insuranceId: number) => {
        if (!window.confirm('Are you sure you want to delete this insurance?')) return;
        try {
            await deleteInsurance(insuranceId);
            setInsurances(prev => prev.filter(i => i.insuranceId !== insuranceId));
        } catch (err) {
            console.error('Failed to delete insurance:', err);
        }
    };

    return (
        <div>
            <h2>Insurance List</h2>
            <button onClick={handleCreate}>Create New Insurance</button>
            {insurances.length === 0 ? (
                <p>No insurances found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Provider</th>
                        <th>Policy Number</th>
                        <th>Valid From</th>
                        <th>Valid To</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {insurances.map(ins => (
                        <tr key={ins.insuranceId}>
                            <td>{ins.insuranceId}</td>
                            <td>{ins.providerName}</td>
                            <td>{ins.policyNumber}</td>
                            <td>{ins.validFrom}</td>
                            <td>{ins.validTo}</td>
                            <td>
                                <button onClick={() => navigate(`/insurance/edit/${ins.insuranceId}`)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(ins.insuranceId)}
                                    style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}
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

export default InsuranceListPage;
