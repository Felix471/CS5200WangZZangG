import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDentist, updateDentist, getAllDentists } from '../api/dentistApi';
import { Dentist } from '../models/Dentist';
import { AxiosError } from 'axios';

function DentistFormPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const dentistId = id ? parseInt(id, 10) : 0;

    const [formData, setFormData] = useState<Dentist>({
        dentistId: 0,
        firstName: '',
        lastName: '',
        licenseNumber: '',
        description: '',
        phoneNumber: '',
        email: '',
        address: '',
        clinicId: 0,
    });

    const isEditMode = dentistId > 0;

    useEffect(() => {
        if (isEditMode) {
            loadDentistToEdit(dentistId);
        }
    }, [dentistId, isEditMode]);

    const loadDentistToEdit = async (id: number) => {
        try {
            const allDentists = await getAllDentists();
            const found = allDentists.find((d) => d.dentistId === id);
            if (found) {
                setFormData(found);
            } else {
                console.error(`Dentist with ID ${id} not found`);
            }
        } catch (error) {
            console.error('Failed to load dentist:', error);
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
                await updateDentist(dentistId, formData);
                alert('Dentist updated successfully!');
            } else {
                await createDentist(formData);
                alert('Dentist created successfully!');
            }
            navigate('/dentists');
        } catch (error: unknown) {
            console.error('Error saving dentist:', error);

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
                {isEditMode ? 'Edit Dentist' : 'Create Dentist'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">License Number</label>
                    <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
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
                    />
                </div>
                <div>
                    <label className="block mb-1">Clinic ID</label>
                    <input
                        type="number"
                        name="clinicId"
                        value={formData.clinicId || ''}
                        onChange={handleChange}
                        className="border p-1 w-full"
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

export default DentistFormPage;
