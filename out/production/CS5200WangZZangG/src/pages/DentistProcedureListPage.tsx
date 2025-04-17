// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    deleteDentistProcedure,
    getAllDentistProcedures
} from '../api/dentistProcedureApi';
import { DentistProcedure } from '../models/DentistProcedure';

function DentistProcedureListPage() {
    const [dpList, setDpList] = useState<DentistProcedure[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllDentistProcedures()
            .then(setDpList)
            .catch(err => console.error('Failed to fetch associations:', err));
    }, []);

    const handleNew = () => navigate('/dentist-procedure/new');

    const handleEdit = (dp: DentistProcedure) => {
        navigate(`/dentist-procedure/edit`, {
            state: { dp }
        });
    };

    const handleDelete = async (procedureId: number, dentistId: number) => {
        if (!window.confirm('Delete this association?')) return;
        try {
            await deleteDentistProcedure(procedureId, dentistId);
            setDpList(prev =>
                prev.filter(dp => !(dp.procedureId === procedureId && dp.dentistId === dentistId))
            );
        } catch (err) {
            console.error('Failed to delete association:', err);
        }
    };

    return (
        <div>
            <h2>Dentist - Procedure Associations</h2>
            <button onClick={handleNew}>New Association</button>
            {dpList.length === 0 ? (
                <p>No associations found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Procedure ID</th>
                        <th>Dentist ID</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dpList.map(dp => (
                        <tr key={`${dp.procedureId}-${dp.dentistId}`}>
                            <td>{dp.procedureId}</td>
                            <td>{dp.dentistId}</td>
                            <td>
                                <button onClick={() => handleEdit(dp)}>Edit</button>
                                <button
                                    onClick={() => handleDelete(dp.procedureId, dp.dentistId)}
                                    style={{ backgroundColor: '#ff4d4f' }}
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

export default DentistProcedureListPage;
