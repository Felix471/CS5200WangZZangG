// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTreatmentProcedure, getAllTreatmentProcedures } from '../api/treatmentProcedureApi';
import { TreatmentProcedure } from '../models/TreatmentProcedure';

function TreatmentProcedureListPage() {
    const navigate = useNavigate();
    const [tpList, setTpList] = useState<TreatmentProcedure[]>([]);

    useEffect(() => {
        getAllTreatmentProcedures()
            .then(setTpList)
            .catch(err => console.error('Failed to fetch treatment-procedure associations:', err));
    }, []);

    const handleNew = () => {
        navigate('/treatment-procedure/new');
    };

    const handleDelete = async (procedureId: number, treatmentId: number) => {
        if (!window.confirm('Are you sure to delete this association?')) return;
        try {
            await deleteTreatmentProcedure(procedureId, treatmentId);
            setTpList(prev => prev.filter(tp => !(tp.procedureId === procedureId && tp.treatmentId === treatmentId)));
        } catch (err) {
            console.error('Failed to delete association:', err);
        }
    };

    return (
        <div>
            <h2>Treatment - Procedure Associations</h2>
            <button onClick={handleNew}>Create New Association</button>
            {tpList.length === 0 ? (
                <p>No associations found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Procedure ID</th>
                        <th>Treatment ID</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tpList.map(tp => (
                        <tr key={`${tp.procedureId}-${tp.treatmentId}`}>
                            <td>{tp.procedureId}</td>
                            <td>{tp.treatmentId}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '#ff4d4f', marginLeft: '8px' }}
                                    onClick={() => handleDelete(tp.procedureId, tp.treatmentId)}
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

export default TreatmentProcedureListPage;
