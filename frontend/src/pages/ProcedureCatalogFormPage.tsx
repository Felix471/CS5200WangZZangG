import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createProcedure,
    getProcedureById,
    updateProcedure
} from '../api/procedureCatalogApi';
import { ProcedureCatalog } from '../models/ProcedureCatalog';

function ProcedureCatalogFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [procedureData, setProcedureData] = useState<Partial<ProcedureCatalog>>({
        procedureName: '',
        description: '',
        standardCost: 0
    });

    useEffect(() => {
        if (id) {
            getProcedureById(Number(id))
                .then(data => setProcedureData(data))
                .catch(err => console.error('Failed to fetch procedure:', err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProcedureData(prev => ({
            ...prev,
            [name]: name === 'standardCost' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateProcedure(Number(id), procedureData);
                alert('Procedure updated!');
            } else {
                await createProcedure(procedureData);
                alert('Procedure created!');
            }
            navigate('/procedure');
        } catch (err) {
            console.error('Failed to save procedure:', err);
            alert('Failed to save procedure');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Procedure' : 'Create Procedure'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Procedure Name:</label>
                    <input
                        type="text"
                        name="procedureName"
                        value={procedureData.procedureName || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        rows={3}
                        value={procedureData.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Standard Cost:</label>
                    <input
                        type="number"
                        name="standardCost"
                        value={procedureData.standardCost || 0}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button onClick={() => navigate('/procedure')} type="button">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default ProcedureCatalogFormPage;
