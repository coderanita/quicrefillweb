import React, { useState } from 'react';
import { 
    FaEye, 
    FaWindowClose,
    FaCheckCircle, 
    FaClock, 
    FaTimesCircle, 
    FaTag 
} from 'react-icons/fa';


import { showSweetAlert } from "../Includes/SweetAlert2";

// --- MOCK DATA FOR VENDOR SERVICES ---
const VENDOR_SERVICES_MOCK_DATA = [
    {
        serviceId: 'SVC-001',
        name: '12.5kg Gas Refill',
        category: 'Gas Refill',
        status: 'Pending Approval',
        price: '₦8,500',
        description: 'Refill service for standard 12.5kg domestic gas cylinders.',
        dateAdded: '2025-06-01'
    },
    {
        serviceId: 'SVC-002',
        name: 'Diesel Supply',
        category: 'Diesel',
        status: 'Pending Approval',
        price: 'N/A (Market Price)',
        description: 'Bulk diesel supply (min 50 liters) for generators and industrial use.',
        dateAdded: '2025-06-05'
    },
    {
        serviceId: 'SVC-003',
        name: '6kg Gas Refill',
        category: 'Gas Refill',
        status: 'Approved',
        price: '₦4,200',
        description: 'Refill service for small 6kg gas cylinders.',
        dateAdded: '2025-05-10'
    },
    {
        serviceId: 'SVC-004',
        name: 'Kerosene Delivery',
        category: 'Kerosene',
        status: 'Rejected',
        price: 'N/A',
        description: 'Kerosene delivery service. Rejected due to policy change.',
        dateAdded: '2025-04-15'
    },
];

// --- Status Badge Helper ---
const StatusBadge = ({ status }) => {
    let colorClass = '';
    let icon = null;

    switch (status) {
        case 'Approved':
            colorClass = 'bg-green-100 text-green-800';
            icon = <FaCheckCircle className="mr-1" />;
            break;
        case 'Pending Approval':
            colorClass = 'bg-yellow-100 text-yellow-800';
            icon = <FaClock className="mr-1" />;
            break;
        case 'Rejected':
            colorClass = 'bg-red-100 text-red-800';
            icon = <FaTimesCircle className="mr-1" />;
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-800';
    }

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
        >
            {icon}
            {status}
        </span>
    );
};


const ServiceDetailModal = ({ service, onClose }) => {
    // Style for detail rows
    const DetailRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 font-semibold">{label}</span>
            <span className="font-medium text-gray-800 text-right">{value}</span>
        </div>
    );

    const handleApprove = () => {
        showSweetAlert(`Approving ${service.name}`, 'success');
        onClose(); // <-- ADDED: Close the modal after action
    };

    const handleReject = () => {
        showSweetAlert(`Rejecting ${service.name}`, 'warning');
        onClose(); // <-- ADDED: Close the modal after action
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaTag className="mr-2 text-blue-500" /> {service.name} Details
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600">
                        <FaWindowClose size={24} />
                    </button>
                </div>
                
                {/* Service Details */}
                <div className="p-5 space-y-4">
                    <div className="p-3 bg-blue-50 rounded-md">
                        <p className="font-bold text-lg text-blue-800">{service.name}</p>
                        <p className="text-sm text-blue-700">{service.description}</p>
                    </div>
                    
                    <DetailRow label="Service ID" value={service.serviceId} />
                    <DetailRow label="Category" value={service.category} />
                    <DetailRow label="Price" value={service.price} />
                    <DetailRow label="Status" value={<StatusBadge status={service.status} />} />
                    <DetailRow label="Date Added" value={service.dateAdded} />
                </div>
                
                {/* Modal Footer (Action buttons) */}
                <div className="p-4 border-t flex justify-end gap-2">
                    <button
                        onClick={handleApprove} // <-- CALLS function that includes onClose()
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleReject} // <-- CALLS function that includes onClose()
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component: Vendor Services Table ---
const PendingVendorServicesTable = ({ vendorId = 'VND-001' }) => {
    const [selectedService, setSelectedService] = useState(null);
    
    const handleViewService = (serviceId) => {
        const serviceData = VENDOR_SERVICES_MOCK_DATA.find(svc => svc.serviceId === serviceId);
        if (serviceData) {
            setSelectedService(serviceData);
        } else {
            showSweetAlert(`Error: Service ${serviceId} not found.`, 'error');
        }
    };

    return (
        <>
            <div className="max-w-full mx-auto mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                    
                    {/* Header */}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Services Offered by Vendor ({vendorId})
                        </h2>
                    </div>
                    
                    {/* Table */}
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-600 tracking-wider">
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Service ID</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Service Name</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Category</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Status</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                                {VENDOR_SERVICES_MOCK_DATA.map((service) => (
                                    <tr key={service.serviceId}>
                                        <td className="px-3 py-2 whitespace-nowrap">{service.serviceId}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{service.name}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{service.category}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <StatusBadge status={service.status} />
                                        </td>
                                        <td
                                            className="px-3 py-2 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleViewService(service.serviceId)}
                                        >
                                            <FaEye className="inline mr-1" />
                                            View Service
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Conditional Modal Rendering */}
            {selectedService && (
                <ServiceDetailModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </>
    );
};

export default PendingVendorServicesTable;