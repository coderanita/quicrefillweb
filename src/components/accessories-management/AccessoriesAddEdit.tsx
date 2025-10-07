import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTimes, FaUpload, FaPlus, FaEdit } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';
import { accessoriesData } from '../../MockData/AccessoriesData';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';


export const AccessoriesAddEdit = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    const { id } = useParams();

    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            const accessory = accessoriesData.find(item => item.accessoryId === id);
            if (accessory) {
                setForm({
                    name: accessory.name || '',
                    description: accessory.description || '',
                    price: accessory.price || '',
                    stock: typeof accessory.stockCount === "string" && accessory.stockCount.includes(" ")
                        ? parseInt(accessory.stockCount.split(" ")[0], 10)
                        : 0,
                    image: null, // You can preload image URL if needed
                });
            } else {
                showSweetAlert('Accessory not found for editing.', 'error');
                navigate('/accessories');
            }
        }
    }, [isEditMode, id]);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        if (!form.price) newErrors.price = 'Price is required';
        if (!form.stock) newErrors.stock = 'Stock count is required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        /*const payload = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (value !== null) payload.append(key, value);
        });
    
        const endpoint = isEditMode
          ? `/api/accessories/${id}`
          : '/api/accessories';
    
        const method = isEditMode ? 'PUT' : 'POST';
    
        await fetch(endpoint, {
          method,
          body: payload,
        });
        */
        showSweetAlert(
            isEditMode ? 'Accessory updated successfully!' : 'Accessory created successfully!',
            'success'
        );

        navigate('/accessories-management');
    };

    const handleCancel = () => {
        navigate('/accessories-management');
        showSweetAlert('Accessory action cancelled.', 'info');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <PageHeaderWithFilters
                        title={isEditMode ? 'Edit Accessory' : 'Add Accessory'}
                        breadcrumbs={[]}
                        showExportButton={false}
                        filterCategories={[]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showDateSelector={false}
                        showBackButton={true}
                        onBackClick={() => navigate('/accessories-management')}
                    />
                    <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-6">



                        <form className="space-y-5">
                            {['name', 'description', 'price', 'stock'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type={field === 'stock' || field === 'price' ? 'number' : 'text'}
                                        value={form[field]}
                                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image/URL</label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                    />
                                    <div className="z-0">
                                        <FaUpload className="text-2xl text-gray-400 mb-2 mx-auto" />
                                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md flex justify-center items-center space-x-2"
                                >
                                    {isEditMode ? <FaEdit /> : <FaPlus />}
                                    <span>{isEditMode ? 'Update' : 'Create'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md flex justify-center items-center space-x-2"
                                >
                                    <FaTimes />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </main>
            </div>
        </div>
    );
};


