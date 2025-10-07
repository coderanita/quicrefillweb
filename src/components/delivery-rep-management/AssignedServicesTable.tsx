import React, { useState } from 'react';
import { FaTimes, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';

// --- MOCK DATA ---
const mockServices = [
    {
        id: 'SVC-001',
        name: '12.5kg Gas Refill',
        category: 'Gas Refill',
        status: 'Active',
        orders: 120,
        dateListed: '2025-02-10',
        lastUpdated: '2025-03-15',
        description: 'Standard domestic cooking gas cylinder refill service. Available in all active zones.',
        price: '₦8,500',
        zone: 'Ikeja, Lekki, Surulere'
    },
    {
        id: 'SVC-002',
        name: 'Diesel Supply',
        category: 'Diesel',
        status: 'Inactive',
        orders: 45,
        dateListed: '2025-01-20',
        lastUpdated: '2025-02-28',
        description: 'Bulk diesel supply for generators and industrial use. Currently paused due to supply chain issues.',
        price: '₦1,200/Liter',
        zone: 'Industrial Areas'
    },
    {
        id: 'SVC-003',
        name: 'LPG Cylinder (50kg)',
        category: 'Accessories',
        status: 'Discontinued',
        orders: 30,
        dateListed: '2024-12-05',
        lastUpdated: '2025-01-15',
        description: 'Sale of new 50kg empty gas cylinders. This item is permanently discontinued.',
        price: '₦55,000',
        zone: 'Lagos Mainland'
    },
];

// ----------------------------------------------------------------------
// --- 1. REUSABLE MODAL COMPONENT ---
// ----------------------------------------------------------------------
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// --- 2. VIEW DETAILS POP-UP MODAL COMPONENT ---
// ----------------------------------------------------------------------
const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
    if (!service) return null;

    // Data structure for the details table
    const details = [
        { label: 'Service ID', value: service.id },
        { label: 'Name', value: service.name },
        { label: 'Category', value: service.category },
        { label: 'Price', value: service.price },
        { label: 'Status', value: service.status, className: service.status === 'Active' ? 'text-green-600 font-bold' : (service.status === 'Inactive' ? 'text-orange-600 font-bold' : 'text-red-600 font-bold') },
        { label: 'Total Orders', value: service.orders.toLocaleString() },
        { label: 'Date Listed', value: service.dateListed },
        { label: 'Last Updated', value: service.lastUpdated },
        { label: 'Service Zones', value: service.zone },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Details for: ${service.name}`}>
            <p className="text-gray-600 mb-4 border-b pb-3 italic">{service.description}</p>
            
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <tbody>
                        {details.map((item, index) => (
                            <tr key={item.label} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-3 font-medium text-gray-600 w-1/3">{item.label}</td>
                                <td className={`px-4 py-3 text-gray-800 font-semibold ${item.className || ''}`}>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-end mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-150"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};


// ----------------------------------------------------------------------
// --- 3. MAIN COMPONENT: AssignedServicesTable ---
// ----------------------------------------------------------------------
export const AssignedServicesTable = () => {
    const [services, setServices] = useState(mockServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Function to open the modal and set the selected service data
    const handleViewDetails = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    // Function to handle the Deactivate/Activate toggle
    const handleToggleStatus = (serviceId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        
        setServices(prevServices =>
            prevServices.map(svc =>
                svc.id === serviceId
                    ? { ...svc, status: newStatus }
                    : svc
            )
        );
        // In a real app, you'd show a success notification here (e.g., SweetAlert2)
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600';
            case 'Inactive': return 'text-orange-500';
            case 'Discontinued': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6 mb-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Assigned Services Management</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                                <th className="p-3">Service ID</th>
                                <th className="p-3">Service Name</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Orders</th>
                                <th className="p-3">Date Listed</th>
                                <th className="p-3">Last Updated</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} className="border-t text-gray-700 hover:bg-gray-100 transition duration-100">
                                    <td className="p-3 font-medium">{service.id}</td>
                                    <td className="p-3">{service.name}</td>
                                    <td className="p-3">{service.category}</td>
                                    <td className={`p-3 font-semibold ${getStatusClass(service.status)}`}>{service.status}</td>
                                    <td className="p-3">{service.orders}</td>
                                    <td className="p-3">{service.dateListed}</td>
                                    <td className="p-3">{service.lastUpdated}</td>
                                    <td className="p-3 whitespace-nowrap flex flex-col sm:flex-row sm:space-x-2">
                                        
                                        {/* View Button (Opens Modal) */}
                                        <button
                                            onClick={() => handleViewDetails(service)}
                                            className="text-blue-600 hover:text-blue-800 font-medium mr-3 flex items-center text-sm mb-1 sm:mb-0"
                                            title="View Details"
                                        >
                                            <FaEye className="mr-1 w-4 h-4"/> View
                                        </button>
                                        
                                        {/* Deactivate/Activate Button */}
                                        <button
                                            onClick={() => handleToggleStatus(service.id, service.status)}
                                            className={`font-medium flex items-center text-sm ${service.status === 'Active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'}`}
                                            title={service.status === 'Active' ? 'Deactivate Service' : 'Activate Service'}
                                            disabled={service.status === 'Discontinued'}
                                        >
                                            {service.status === 'Active' ? (
                                                <>
                                                    <FaToggleOn className="mr-1 w-4 h-4"/> Deactivate
                                                </>
                                            ) : (
                                                <>
                                                    <FaToggleOff className="mr-1 w-4 h-4"/> Activate
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* The Details Modal Component */}
            <ServiceDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={selectedService}
            />
        </div>
    );
};