// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProcedure, getAllProcedures } from '../api/procedureCatalogApi';
import { ProcedureCatalog } from '../models/ProcedureCatalog';

function ProcedureCatalogListPage() {
    const [procedures, setProcedures] = useState<ProcedureCatalog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProcedures()
            .then(setProcedures)
            .catch(err => console.error('Failed to fetch procedures:', err));
    }, []);

    const handleNew = () => navigate('/procedure-catalog/new');

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure to delete this procedure?')) return;
        try {
            await deleteProcedure(id);
            setProcedures(prev => prev.filter(p => p.procedureId !== id));
        } catch (err) {
            console.error('Failed to delete procedure:', err);
        }
    };

    return (
        <div>
            <h2>Procedure Catalog</h2>
            <button onClick={handleNew}>New Procedure</button>
            {procedures.length === 0 ? (
                <p>No procedures found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Procedure Name</th>
                        <th>Description</th>
                        <th>Standard Cost</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {procedures.map(proc => (
                        <tr key={proc.procedureId}>
                            <td>{proc.procedureId}</td>
                            <td>{proc.procedureName}</td>
                            <td>{proc.description}</td>
                            <td>{proc.standardCost}</td>
                            <td>
                                <button onClick={() => navigate(`/procedure-catalog/edit/${proc.procedureId}`)}>
                                    Edit
                                </button>
                                <button
                                    style={{ marginLeft: '8px', backgroundColor: '#ff4d4f' }}
                                    onClick={() => handleDelete(proc.procedureId)}
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

export default ProcedureCatalogListPage;
