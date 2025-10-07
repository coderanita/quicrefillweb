import React, { useState } from 'react';
import { 
    FaUser, 
    FaCheckCircle, 
    FaExclamationCircle, 
    FaTimesCircle,
    FaWindowClose 
} from 'react-icons/fa';

// USE THE REQUIRED SWEETALERT IMPORT PATH
import { showSweetAlert } from "../Includes/SweetAlert2";

// --- MOCK DATA FOR DELIVERY REPRESENTATIVES ---
const DELIVERY_REPS_MOCK_DATA = [
    {
        repId: 'REP-101',
        fullName: 'James Okoro',
        phoneNumber: '+234 802 345 6789',
        email: 'james.okoro@vendor.com',
        status: 'Pending',
        hireDate: '2024-01-15',
        completedOrders: 15,
        rating: 4.2
    },
    {
        repId: 'REP-102',
        fullName: 'Mary Uche',
        phoneNumber: '+234 815 901 2345',
        email: 'mary.uche@vendor.com',
        status: 'Pending',
        hireDate: '2024-02-20',
        completedOrders: 8,
        rating: 0.0
    },
    {
        repId: 'REP-103',
        fullName: 'Ahmed Musa',
        phoneNumber: '+234 907 888 7777',
        email: 'ahmed.musa@vendor.com',
        status: 'Active',
        hireDate: '2023-11-01',
        completedOrders: 112,
        rating: 4.8
    },
    {
        repId: 'REP-104',
        fullName: 'Grace Adebayo',
        phoneNumber: '+234 703 111 2222',
        email: 'grace.adebayo@vendor.com',
        status: 'Rejected',
        hireDate: '2024-03-01',
        completedOrders: 0,
        rating: 0.0
    },
];

// --- Status Badge Helper ---
const StatusBadge = ({ status }) => {
    let colorClass = '';
    let icon = null;

    switch (status) {
        case 'Active':
            colorClass = 'bg-green-100 text-green-800';
            icon = <FaCheckCircle className="mr-1" />;
            break;
        case 'Pending':
            colorClass = 'bg-yellow-100 text-yellow-800';
            icon = <FaExclamationCircle className="mr-1" />;
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

// --- View Profile Modal Component ---
const ViewProfileModal = ({ rep, onClose }) => {
    // Style for detail rows
    const DetailRow = ({ label, value }) => (
        <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaUser className="mr-2 text-blue-500" /> {rep.fullName} Profile
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600">
                        <FaWindowClose size={24} />
                    </button>
                </div>
                
                {/* Profile Details */}
                <div className="p-5 space-y-3">
                    <DetailRow label="ID" value={rep.repId} />
                    <DetailRow label="Status" value={<StatusBadge status={rep.status} />} />
                    <DetailRow label="Phone" value={rep.phoneNumber} />
                    <DetailRow label="Email" value={rep.email} />
                    <DetailRow label="Hire Date" value={rep.hireDate} />
                    <DetailRow label="Completed Orders" value={rep.completedOrders} />
                    <DetailRow label="Rating" value={`${rep.rating} / 5.0`} />
                </div>
                
                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component: Delivery Representative Table ---
const DeliveryRepTable = ({ vendorId }) => {
    const [selectedRep, setSelectedRep] = useState(null); // State to hold the rep data for the modal
    
    const handleViewProfile = (repId) => {
        const repData = DELIVERY_REPS_MOCK_DATA.find(rep => rep.repId === repId);
        if (repData) {
            setSelectedRep(repData);
        } else {
            showSweetAlert(`Error: Representative ${repId} not found.`, 'error');
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                    
                    {/* Header */}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Delivery Representatives Assigned {vendorId ? `(Vendor: ${vendorId})` : ''}
                        </h2>
                    </div>
                    
                    {/* Table */}
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-600 tracking-wider">
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Rep ID</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Full Name</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Phone Number</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Status</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                                {DELIVERY_REPS_MOCK_DATA.map((rep) => (
                                    <tr key={rep.repId}>
                                        <td className="px-3 py-2 whitespace-nowrap">{rep.repId}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{rep.fullName}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{rep.phoneNumber}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <StatusBadge status={rep.status} />
                                        </td>
                                        <td
                                            className="px-3 py-2 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleViewProfile(rep.repId)}
                                        >
                                            <FaUser className="inline mr-1" />
                                            View Profile
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Conditional Modal Rendering */}
            {selectedRep && (
                <ViewProfileModal
                    rep={selectedRep}
                    onClose={() => setSelectedRep(null)}
                />
            )}
        </>
    );
};

export default DeliveryRepTable;