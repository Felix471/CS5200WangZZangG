// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDentists } from '../api/dentistApi';
import { Dentist } from '../models/Dentist';

function DentistListPage() {
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDentists();
    }, []);

    const fetchDentists = async () => {
        try {
            const data = await getAllDentists();
            setDentists(data);
        } catch (error) {
            console.error('Failed to fetch dentists:', error);
        }
    };

    const handleCreate = () => {
        navigate('/dentists/new');
    };

    const handleEdit = (id: number) => {
        navigate(`/dentists/edit/${id}`);
    };



    return (
        <div>
            <h1 className="text-2xl mb-4">Dentists</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                onClick={handleCreate}
            >
                + Create New Dentist
            </button>

            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">License</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Clinic ID</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {dentists.map((d) => (
                    <tr key={d.dentistId}>
                        <td className="border p-2">{d.dentistId}</td>
                        <td className="border p-2">{d.firstName} {d.lastName}</td>
                        <td className="border p-2">{d.licenseNumber}</td>
                        <td className="border p-2">{d.phoneNumber}</td>
                        <td className="border p-2">{d.email}</td>
                        <td className="border p-2">{d.clinicId ?? 'N/A'}</td>
                        <td className="border p-2">
                            <button
                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                onClick={() => handleEdit(d.dentistId!)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DentistListPage;