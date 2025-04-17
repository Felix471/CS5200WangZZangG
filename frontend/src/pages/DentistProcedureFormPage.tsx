import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createDentistProcedure, deleteDentistProcedure } from '../api/dentistProcedureApi';
import { DentistProcedure } from '../models/DentistProcedure';

function DentistProcedureFormPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.dp as DentistProcedure | undefined;

    const [procedureId, setProcedureId] = useState<number>(editData?.procedureId || 0);
    const [dentistId, setDentistId] = useState<number>(editData?.dentistId || 0);
    const isEditing = !!editData;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!procedureId || !dentistId) {
            alert('Please input valid IDs');
            return;
        }
        try {
            if (isEditing) {
                await deleteDentistProcedure(editData!.procedureId, editData!.dentistId);
            }
            await createDentistProcedure({ procedureId, dentistId });
            alert(isEditing ? 'Association updated!' : 'Association created!');
            navigate('/dentist-procedure');
        } catch (err) {
            console.error('Failed to save association:', err);
            alert('Failed to save association');
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Association' : 'Create Association'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Procedure ID:</label>
                    <input
                        type="number"
                        value={procedureId}
                        onChange={e => setProcedureId(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Dentist ID:</label>
                    <input
                        type="number"
                        value={dentistId}
                        onChange={e => setDentistId(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/dentist-procedure')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default DentistProcedureFormPage;
