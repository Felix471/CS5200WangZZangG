import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTreatmentProcedure } from '../api/treatmentProcedureApi';

function TreatmentProcedureFormPage() {
    const navigate = useNavigate();
    const [procedureId, setProcedureId] = useState<number>(0);
    const [treatmentId, setTreatmentId] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!procedureId || !treatmentId) {
            alert('Please input valid procedureId and treatmentId');
            return;
        }
        try {
            await createTreatmentProcedure({ procedureId, treatmentId });
            alert('Association created!');
            navigate('/treatment-procedure');
        } catch (err) {
            console.error('Failed to create association:', err);
            alert('Failed to create association');
        }
    };

    return (
        <div>
            <h2>Create Treatment-Procedure Association</h2>
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
                    <label>Treatment ID:</label>
                    <input
                        type="number"
                        value={treatmentId}
                        onChange={e => setTreatmentId(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/treatment-procedure')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default TreatmentProcedureFormPage;
