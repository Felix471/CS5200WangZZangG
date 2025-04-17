import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDentistProcedure } from '../api/dentistProcedureApi';

function DentistProcedureFormPage() {
    const navigate = useNavigate();
    const [procedureId, setProcedureId] = useState<number>(0);
    const [dentistId, setDentistId] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!procedureId || !dentistId) {
            alert('Please input valid IDs');
            return;
        }
        try {
            await createDentistProcedure({ procedureId, dentistId });
            alert('Association created!');
            navigate('/dentist-procedure');
        } catch (err) {
            console.error('Failed to create association:', err);
            alert('Failed to create association');
        }
    };

    return (
        <div>
            <h2>Create Dentist-Procedure Association</h2>
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
