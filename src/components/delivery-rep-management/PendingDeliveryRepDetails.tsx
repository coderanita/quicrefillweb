import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
// Import Swal (SweetAlert2) for confirmation dialogs
import Swal from 'sweetalert2'; 
import { showSweetAlert } from '../Includes/SweetAlert2'; // Your single-message utility
import { FaFlag } from 'react-icons/fa';
import {
    FiCopy,
    FiCheckCircle,
    FiClock,
    FiXCircle,
    FiMail,
    FiPlus,
    FiEdit2,
    FiSave
} from 'react-icons/fi';

// --- Mock Data Setup (Array) ---
// ... (mockRiderData remains the same as your last request) ...
const mockRiderData = [
    {
        "id": "DRP-001",
        "fullName": "Uche Nwachukwu",
        "phone": "+234 803 123 4567",
        "email": "uche.nwa@email.com",
        "region": "Lagos",
        "vehicleType": "Bike",
        "licenseStatus": "Pending",
        "licenseNumber": "BNL-0011223344",
        "submittedDate": "2025-03-01"
    },
    // ... DRP-002 through DRP-016 data here ...
    {
        "id": "DRP-002",
        "fullName": "Zainab Abubakar",
        "phone": "+234 905 987 6543",
        "email": "zainab.abubakar@email.com",
        "region": "Abuja",
        "vehicleType": "Car",
        "licenseStatus": "Verified",
        "licenseNumber": "CNL-5566778899",
        "submittedDate": "2025-03-05"
    },
    {
        "id": "DRP-003",
        "fullName": "Emmanuel Okoro",
        "phone": "+234 809 333 2222",
        "email": "emmanuel.okoro@email.com",
        "region": "Port Harcourt",
        "vehicleType": "Car",
        "licenseStatus": "Verified",
        "licenseNumber": "DLN-1234567890",
        "submittedDate": "2025-03-13"
    },
    {
        "id": "DRP-004",
        "fullName": "Aisha Lawal",
        "phone": "+234 700 111 4444",
        "email": "aisha.lawal@email.com",
        "region": "Lagos",
        "vehicleType": "Bike",
        "licenseStatus": "Pending",
        "licenseNumber": "BLN-0987654321",
        "submittedDate": "2025-03-15"
    },
    {
        "id": "DRP-005",
        "fullName": "Chukwudi Eze",
        "phone": "+234 810 555 6666",
        "email": "chukwudi.eze@email.com",
        "region": "Abuja",
        "vehicleType": "Van",
        "licenseStatus": "Missing",
        "licenseNumber": "VLN-5432109876",
        "submittedDate": "2025-03-16"
    },
    {
        "id": "DRP-006",
        "fullName": "Funke Adebayo",
        "phone": "+234 901 222 3333",
        "email": "funke.adebayo@email.com",
        "region": "Ibadan",
        "vehicleType": "Car",
        "licenseStatus": "Verified",
        "licenseNumber": "CLT-1122334455",
        "submittedDate": "2025-03-17"
    },
    {
        "id": "DRP-007",
        "fullName": "Ahmed Bello",
        "phone": "+234 812 444 5555",
        "email": "ahmed.bello@email.com",
        "region": "Kano",
        "vehicleType": "Bike",
        "licenseStatus": "Missing",
        "licenseNumber": "KNL-9988776655",
        "submittedDate": "2025-03-18"
    },
    {
        "id": "DRP-008",
        "fullName": "Chioma Ekeh",
        "phone": "+234 703 666 7777",
        "email": "chioma.ekeh@email.com",
        "region": "Enugu",
        "vehicleType": "Van",
        "licenseStatus": "Verified",
        "licenseNumber": "ENL-0102030405",
        "submittedDate": "2025-03-19"
    },
    {
        "id": "DRP-009",
        "fullName": "Tunde Salami",
        "phone": "+234 805 102 0304",
        "email": "tunde.salami@email.com",
        "region": "Ogun",
        "vehicleType": "Car",
        "licenseStatus": "Pending",
        "licenseNumber": "OGN-6789012345",
        "submittedDate": "2025-03-20"
    },
    {
        "id": "DRP-010",
        "fullName": "Nkechi Obi",
        "phone": "+234 909 304 0506",
        "email": "nkechi.obi@email.com",
        "region": "Lagos",
        "vehicleType": "Bike",
        "licenseStatus": "Verified",
        "licenseNumber": "LGS-1357924680",
        "submittedDate": "2025-03-21"
    },
    {
        "id": "DRP-011",
        "fullName": "Musa Ibrahim",
        "phone": "+234 815 708 0901",
        "email": "musa.ibrahim@email.com",
        "region": "Abuja",
        "vehicleType": "Car",
        "licenseStatus": "Pending",
        "licenseNumber": "AJB-2468013579",
        "submittedDate": "2025-03-22"
    },
    {
        "id": "DRP-012",
        "fullName": "Ifeanyi Dike",
        "phone": "+234 706 912 3456",
        "email": "ifeanyi.dike@email.com",
        "region": "Port Harcourt",
        "vehicleType": "Van",
        "licenseStatus": "Verified",
        "licenseNumber": "PHC-9753108642",
        "submittedDate": "2025-03-23"
    },
    {
        "id": "DRP-013",
        "fullName": "Hauwa Garba",
        "phone": "+234 808 214 7890",
        "email": "hauwa.garba@email.com",
        "region": "Kaduna",
        "vehicleType": "Bike",
        "licenseStatus": "Missing",
        "licenseNumber": "KDN-1111222233",
        "submittedDate": "2025-03-24"
    },
    {
        "id": "DRP-014",
        "fullName": "Bisi Alabi",
        "phone": "+234 902 543 2109",
        "email": "bisi.alabi@email.com",
        "region": "Ibadan",
        "vehicleType": "Car",
        "licenseStatus": "Pending",
        "licenseNumber": "IBD-4455667788",
        "submittedDate": "2025-03-25"
    },
    {
        "id": "DRP-015",
        "fullName": "Obinna Okeke",
        "phone": "+234 807 654 3210",
        "email": "obinna.okeke@email.com",
        "region": "Enugu",
        "vehicleType": "Van",
        "licenseStatus": "Verified",
        "licenseNumber": "ENW-9900112233",
        "submittedDate": "2025-03-26"
    },
    {
        "id": "DRP-016",
        "fullName": "Amaka Ezenwa",
        "phone": "+234 708 765 4321",
        "email": "amaka.ezenwa@email.com",
        "region": "Lagos",
        "vehicleType": "Bike",
        "licenseStatus": "Verified",
        "licenseNumber": "LST-3344556677",
        "submittedDate": "2025-03-27"
    },
    {
        "id": "DRP-017",
        "fullName": "Godwin Audu",
        "phone": "+234 816 876 5432",
        "email": "godwin.audu@email.com",
        "region": "Abuja",
        "vehicleType": "Car",
        "licenseStatus": "Missing",
        "licenseNumber": "ABJ-7788990011",
        "submittedDate": "2025-03-28"
    }
];

const initialDocuments = [
    { name: "Driver's License", status: 'Verified', icon: FiCheckCircle, color: 'text-green-600' },
    { name: 'National ID / Passport', status: 'Verified', icon: FiCheckCircle, color: 'text-green-600' },
    { name: 'Proof of Address', status: 'Pending', icon: FiClock, color: 'text-yellow-600' },
    { name: 'Vehicle Registration Document', status: 'Missing', icon: FiXCircle, color: 'text-gray-500' },
];

const detailFields = [
    { key: 'id', label: 'User ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email' },
    { key: 'region', label: 'Region' },
    { key: 'vehicleType', label: 'Vehicle Type' },
    { key: 'licenseStatus', label: 'License Status', isStatus: true, statusMap: {
        'Verified': { color: 'text-green-600', icon: FiCheckCircle },
        'Pending': { color: 'text-yellow-600', icon: FiClock },
        'Missing': { color: 'text-red-600', icon: FiXCircle }
    }},
    { key: 'licenseNumber', label: 'License Number' },
    { key: 'submittedDate', label: 'Submitted Date' },
];


export const PendingDeliveryRepDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const currentRiderId = id ? id.toUpperCase() : null;

    const [details, setDetails] = useState(null); 
    const [documents, setDocuments] = useState(initialDocuments);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newDocumentName, setNewDocumentName] = useState('');
    const [editForm, setEditForm] = useState({});
    const [isRiderFound, setIsRiderFound] = useState(true); 

    // --- Data Fetching/Loading Effect ---
    useEffect(() => {
        if (!currentRiderId) {
            setDetails({}); 
            setIsRiderFound(false);
            return;
        }

        const rider = mockRiderData.find(r => r.id === currentRiderId);
        
        if (rider) {
            setDetails(rider);
            setEditForm(rider); 
            setIsRiderFound(true);
        } else {
            setDetails({});
            setIsRiderFound(false);
            // Use your utility for simple error message since the logic is outside the confirmation flow
            showSweetAlert(`Rider ID ${currentRiderId} not found.`, 'error');
        }
    }, [currentRiderId]); 

    // --- Loading State Check ---
    if (details === null) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-lg font-medium">Loading delivery rep details...</p>
            </div>
        );
    }
    
    // --- Not Found Check ---
    if (!isRiderFound) {
         return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500 text-lg font-bold">Rider ID **{currentRiderId || 'N/A'}** not found.</p>
            </div>
        );
    }

    // --- Utility Handlers ---

    const handleCopyId = () => {
        const idToCopy = details.id;
        navigator.clipboard.writeText(idToCopy).then(() => {
            // Use your utility for simple success message
            showSweetAlert(`ID "${idToCopy}" copied to clipboard.`, 'success');
        }).catch(err => {
            
            showSweetAlert('Failed to copy ID.', 'error');
        });
    };

    // --- Action Handlers (Approve/Reject) ---

    const handleApprove = () => {
        // FIX: Use native SweetAlert2 (Swal) for confirmation dialog
        Swal.fire({
            title: 'Confirm Approval',
            text: `Are you sure you want to approve ${details.fullName}?`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Use your utility for simple success message
                showSweetAlert(`${details.fullName} has been approved.`, 'success');
            }
        });
    };

    const handleReject = () => {
        // FIX: Use native SweetAlert2 (Swal) for confirmation dialog with input
        Swal.fire({
            title: 'Reject Applicant',
            text: `Enter a reason for rejecting ${details.fullName}.`,
            icon: 'warning',
            input: 'textarea',
            inputPlaceholder: 'Reason for rejection...',
            showCancelButton: true,
            confirmButtonColor: '#ffc107',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, Reject!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    // Use your utility for simple error message
                    showSweetAlert(`Applicant rejected. Reason: "${result.value}"`, 'error');
                } else {
                    showSweetAlert('Rejection requires a reason.', 'error');
                }
            }
        });
    };
    
    // --- Request Edits Modal Handlers ---
    
    const handleRequestEdits = () => {
        setEditForm(details); 
        setIsEditModalOpen(true);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdits = () => {
        setDetails(editForm); 
        setIsEditModalOpen(false);
        showSweetAlert(`Details for ${details.fullName} updated and edit request sent.`, 'success');
    };

    // --- Missing Document Modal Handlers ---
    
    const handleAddDocument = () => {
        if (newDocumentName.trim()) {
            const newDoc = {
                name: newDocumentName.trim(),
                status: 'Missing',
                icon: FiXCircle,
                color: 'text-gray-500',
            };
            setDocuments([...documents, newDoc]);
            setNewDocumentName('');
            setIsDocumentModalOpen(false);
            showSweetAlert(`"${newDocumentName.trim()}" has been added to the document list and is currently missing.`, 'info');
        }
    };
    
    // --- Main Layout Render ---
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    
                    {/* Top Row: Header and Flag Button */}
                    <div className="flex items-start md:items-center justify-between mb-6 flex-col md:flex-row gap-4">
                        <PageHeaderWithFilters
                            title="Pending Delivery Rep Detail Page"
                            breadcrumbs={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Delivery Rep Management", href: "/delivery-rep-management" }, 
                                { label: "Pending Delivery Rep Management", href: "/delivery-rep-management-pending" },
                                { label: details.id }
                            ]}
                            showExportButton={false}
                            filterCategories={[]}
                            onDateChange={() => { }}
                            onFilterChange={() => { }}
                            onExportClick={() => { }}
                            showDateSelector={false}
                            showBackButton={true}
                            onBackClick={() => navigate('/delivery-rep-management-pending')} 
                        />
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2 shadow-md transition border border-gray-300"
                            onClick={() => { showSweetAlert(`Flagging ${details.fullName} for internal review.`, 'info'); }}
                        >
                            <FaFlag className="" />
                            <span>Flag Delivery Rep</span>
                        </button>
                    </div>
                    
                    {/* --- Delivery Rep Detail Content --- */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* 1. Main Personal Details Card */}
                        <div className="bg-white rounded-lg shadow-sm p-4 md:w-7/12 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-800">{details.id} - {details.fullName}</h2>
                                <button className="text-gray-500 hover:text-blue-500 transition" onClick={handleCopyId}>
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="overflow-x-auto p-4">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="text-left px-4 py-2 font-medium text-gray-600">Field</th>
                                            <th className="text-left px-4 py-2 font-medium text-gray-600">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {/* Using JSON Array to render details */}
                                        {detailFields.map((field, index) => {
                                            const value = details[field.key];
                                            let content = value;
                                            
                                            if (field.isStatus) {
                                                const statusInfo = field.statusMap[value] || { color: 'text-gray-500', icon: FiClock };
                                                const StatusIcon = statusInfo.icon;
                                                content = (
                                                    <span className={statusInfo.color}>
                                                        <StatusIcon className="inline mr-1" />
                                                        {value}
                                                    </span>
                                                );
                                            }
                                            
                                            return (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 text-gray-500">{field.label}</td>
                                                    <td className="px-4 py-2 font-medium text-gray-800">
                                                        {content}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-center gap-2">
                                <button
                                    onClick={handleApprove}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm transition duration-150 shadow-md"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm transition duration-150 shadow-md"
                                >
                                    Reject Applicant
                                </button>
                                <button
                                    onClick={handleRequestEdits}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded text-sm transition duration-150 shadow-md"
                                >
                                    Request Edits
                                </button>
                            </div>
                        </div>

                         {/* 2. Documents & Status Sidebar */}
                        <div className="flex flex-col gap-6 md:w-5/12">
                            
                            {/* REQUEST MISSING DOCUMENT BUTTON */}
                            <div className="w-full flex">
                                <button
                                    onClick={() => setIsDocumentModalOpen(true)}
                                    className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2 border border-gray-300 shadow-sm hover:bg-gray-100 transition"
                                >
                                    <FiMail className="h-4 w-4" /> Request Missing Documents
                                </button>
                            </div>

                            {/* Document Verification Section (Dynamic list) */}
                            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Verification</h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    {documents.map((doc, index) => (
                                        <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                            <span>{doc.name}</span>
                                            <span className={`${doc.color} flex items-center gap-1`}>
                                                <doc.icon className="h-4 w-4" />
                                                {doc.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Background Check & Status (Static) */}
                            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Background Check & Status</h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <span>Background Check Status</span>
                                        <span className="text-green-600 flex items-center gap-1"><FiCheckCircle className="h-4 w-4" /> Passed</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <span>Document Review Status</span>
                                        <span className="text-yellow-600 flex items-center gap-1"><FiClock className="h-4 w-4" /> Pending</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Final Approval Status</span>
                                        <span className="text-red-600 flex items-center gap-1"><FiXCircle className="h-4 w-4" /> Not Yet Approved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* --- Modals --- */}
            
            {/* 1. Missing Document Request Modal */}
            {isDocumentModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiPlus className="mr-2 text-blue-600" /> Add Missing Document
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter the name of the document. It will be marked as **Missing** and the user will be notified.
                        </p>
                        <input
                            type="text"
                            placeholder="e.g., Vehicle Insurance Policy"
                            value={newDocumentName}
                            onChange={(e) => setNewDocumentName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setIsDocumentModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddDocument}
                                disabled={!newDocumentName.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                Add & Notify
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Request Edits Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <FiEdit2 className="mr-2 text-yellow-600" /> Request & Edit Applicant Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Form fields mapped from the editForm state */}
                            {detailFields
                                .filter(f => f.key !== 'id' && f.key !== 'licenseStatus' && f.key !== 'submittedDate')
                                .map(field => (
                                <div key={field.key} className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.key.includes('email') ? 'email' : 'text'}
                                        name={field.key}
                                        value={editForm[field.key] || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-yellow-500 focus:border-yellow-500"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdits}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition flex items-center gap-1"
                            >
                                <FiSave /> Save Edits & Notify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};