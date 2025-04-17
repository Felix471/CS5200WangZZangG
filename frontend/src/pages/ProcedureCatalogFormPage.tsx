import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createProcedure,
    updateProcedure,
    getAllProcedures
} from '../api/procedureCatalogApi';
import { ProcedureCatalog } from '../models/ProcedureCatalog';

function ProcedureCatalogFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const procedureId = id ? parseInt(id, 10) : 0;
    const isEditMode = procedureId > 0;

    const [procedureData, setProcedureData] = useState<Partial<ProcedureCatalog>>({
        procedureId: 0,
        procedureName: '',
        description: '',
        standardCost: 0
    });

    useEffect(() => {
        if (isEditMode) {
            loadProcedureToEdit(procedureId);
        }
    }, [procedureId, isEditMode]);

    const loadProcedureToEdit = async (id: number) => {
        try {
            const allProcedures = await getAllProcedures();
            const found = allProcedures.find((p) => p.procedureId === id);
            if (found) {
                setProcedureData(found);
            } else {
                console.error(`Procedure with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load procedure:', error);
        }
    };

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
            if (isEditMode) {
                await updateProcedure(procedureId, procedureData);
                alert('Procedure updated!');
            } else {
                await createProcedure(procedureData);
                alert('Procedure created!');
            }
            navigate('/procedure-catalog');
        } catch (err) {
            console.error('Failed to save procedure:', err);
            alert('Failed to save procedure');
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Procedure' : 'Create Procedure'}</h2>
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
                <button onClick={() => navigate('/procedure-catalog')} type="button">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default ProcedureCatalogFormPage;