import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllClinics, createClinic, updateClinic } from "../api/clinicApi.tsx";
import { Clinic } from '../models/Clinic';
import { AxiosError } from 'axios';

function ClinicFormPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const clinicId = id ? parseInt(id, 10) : 0;

    const [formData, setFormData] = useState<Clinic>({
        clinicId: 0,
        clinicName: '',
        address: '',
        clinicContactNumber: ''
    });

    const isEditMode = clinicId > 0;

    useEffect(() => {
        if (isEditMode) {
            loadClinicToEdit(clinicId);
        }
    }, [clinicId, isEditMode]);

    const loadClinicToEdit = async (id: number) => {
        try {
            const allClinics = await getAllClinics();
            const found = allClinics.find((c) => c.clinicId === id);
            if (found) {
                setFormData(found);
            } else {
                console.error(`Clinic with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load clinic:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateClinic(clinicId, formData);
                alert('Clinic updated successfully!');
            } else {
                await createClinic(formData);
                alert('Clinic created successfully!');
            }
            navigate('/clinics');
        } catch (error: unknown) {
            console.error('Error saving clinic:', error);

            if (error instanceof AxiosError && error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Save failed');
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">
                {isEditMode ? 'Edit Clinic' : 'Create Clinic'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block mb-1">Clinic Name</label>
                    <input
                        type="text"
                        name="clinicName"
                        value={formData.clinicName || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Address</label>
                    <textarea
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Contact Number</label>
                    <input
                        type="text"
                        name="clinicContactNumber"
                        value={formData.clinicContactNumber || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isEditMode ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
}

export default ClinicFormPage;