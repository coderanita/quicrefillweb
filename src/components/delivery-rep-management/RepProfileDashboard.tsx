import { useState, useMemo } from 'react';
// You MUST install sweetalert2 (npm install sweetalert2) for this to work
import Swal from 'sweetalert2'; 
import {
    FaRegCopy, FaPencilAlt, FaTrash, FaPhone, FaPlus, FaInfoCircle, 
    FaTimes, FaWallet, FaLock, FaClipboardList, FaCoins, FaStar
} from 'react-icons/fa';
import {FaStarHalfStroke} from  'react-icons/fa6';
import {repProfiles} from '../../MockData/DeliveryRepData' 

// Mock Order List for 'Assign New Orders'
const mockOrderList = [
    { orderId: 'O5001', destination: 'Ikeja City Mall', items: 'Groceries', priority: 'High' },
    { orderId: 'O5002', destination: 'VGC, Lekki', items: 'Document', priority: 'Medium' },
    { orderId: 'O5003', destination: 'Ajah, Lagos', items: 'Gas Cylinder', priority: 'High' },
];

// --- SWEETALERT2 WRAPPER FOR CONFIRMATION (ONLY USED FOR DELETE) ---
const showConfirmationAlert = (title, text, icon, confirmText) => {
    return Swal.fire({ 
        title, 
        text, 
        icon, 
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        customClass: {
            confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2',
            cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
        },
        buttonsStyling: false,
    });
};

// --- MODAL COMPONENTS ---

/** Reusable generic modal structure */
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
                {children}
            </div>
        </div>
    );
};

// --- Edit Details Modal ---
const EditDetailsModal = ({ isOpen, onClose, formData, onChange, onSubmit, fields }) => {
    // ... (Modal structure is omitted for brevity, but remains the same)
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Details for ${formData.fullName || ''}`}>
            <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.key} className="flex flex-col">
                        <label htmlFor={field.key} className="text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>
                        {field.type === 'select' ? (
                            <select
                                id={field.key}
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                {field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.key}
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        )}
                    </div>
                ))}

                <div className="md:col-span-2 flex justify-end space-x-3 pt-4 border-t mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-md transition duration-150"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- FEATURE 2: Reset Password Modal (NO CONFIRMATION) ---
const ResetPasswordModal = ({ isOpen, onClose, repId, showMessage }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword.length < 6) {
            Swal.fire('Error', 'Password must be at least 6 characters.', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'New password and confirmation do not match.', 'error');
            return;
        }

        // --- Mock API Call ---
        // **Confirmation removed as requested.** Directly show success message.
        Swal.fire('Success', `Password for ${repId} has been successfully reset.`, 'success');
        // --- End Mock API Call ---

        onClose();
        setNewPassword('');
        setConfirmPassword('');
        showMessage(`Password for ${repId} was reset.`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Reset Representative Password">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="newPass">New Password</label>
                    <input
                        type="password" id="newPass" required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password" id="confirmPass" required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-md transition duration-150"
                    >
                        Save New Password
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- FEATURE 3: Update Wallet Balance Modal (NO CONFIRMATION) ---
const UpdateWalletModal = ({ isOpen, onClose, repId, currentBalance, onUpdate, showMessage }) => {
    const numericBalance = parseFloat(currentBalance.replace(/[^\d.]/g, ''));
    const [newBalance, setNewBalance] = useState(numericBalance);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedNewBalance = `₦${parseFloat(newBalance).toLocaleString('en-US')}`;

        // **Confirmation removed as requested.** Directly update and show success message.
        onUpdate(formattedNewBalance); 
        Swal.fire('Success', `Wallet balance updated to ${formattedNewBalance} for ${repId}.`, 'success');
        
        onClose();
        showMessage(`Wallet balance updated.`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Wallet Balance">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Current Balance</label>
                    <p className="text-2xl font-bold text-gray-900 border-b pb-2">{currentBalance}</p>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="newBalance">Set New Balance (₦)</label>
                    <input
                        type="number" id="newBalance" required
                        value={newBalance}
                        min="0"
                        step="100"
                        onChange={(e) => setNewBalance(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-lg focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-md transition duration-150 flex items-center"
                    >
                        <FaCoins className="mr-2"/> Save New Balance
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- FEATURE 4: Contact Rider Modal ---
const ContactRiderModal = ({ isOpen, onClose, phoneNumber, fullName, showMessage }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber);
        // Using SweetAlert2 toast for a non-intrusive copy notification
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: `Copied ${phoneNumber}!`,
            showConfirmButton: false,
            timer: 3000
        });
        
    };
    
    // ... (Modal structure is omitted for brevity, but remains the same)
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Contact ${fullName}`}>
            <div className="p-6 text-center">
                <p className="text-lg text-gray-600 mb-3">
                    The contact number for **{fullName}** is:
                </p>
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <span className="text-3xl font-extrabold text-indigo-600 tracking-wider">
                        {phoneNumber}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center mx-auto shadow-md"
                >
                    <FaRegCopy className="mr-2" /> Copy Number
                </button>
            </div>
        </Modal>
    );
};

// --- FEATURE 5: Assign New Order Modal (NO CONFIRMATION) ---
const AssignOrderModal = ({ isOpen, onClose, repId, showMessage }) => {
    const [selectedOrder, setSelectedOrder] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOrder) {
            Swal.fire('Warning', 'Please select an order to assign.', 'warning');
            return;
        }

        const orderDetails = mockOrderList.find(order => order.orderId === selectedOrder);

        // **Confirmation removed as requested.** Directly show success message.
        Swal.fire('Success', `Order ${selectedOrder} has been successfully assigned to ${repId}.`, 'success');
        // --- End Mock API Call ---
        
        onClose();
        setSelectedOrder('');
        showMessage(`Order ${selectedOrder} assigned.`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Assign New Order to ${repId}`}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <p className="text-sm text-gray-600">Select an unassigned order from the list below to assign it to this representative.</p>
                
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="orderSelect">Available Orders</label>
                    <select
                        id="orderSelect" required
                        value={selectedOrder}
                        onChange={(e) => setSelectedOrder(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="" disabled>-- Select an Order --</option>
                        {mockOrderList.map(order => (
                            <option key={order.orderId} value={order.orderId}>
                                {order.orderId}: {order.items} to {order.destination} ({order.priority})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-md transition duration-150 flex items-center"
                    >
                        <FaClipboardList className="mr-2"/> Confirm and Assign
                    </button>
                </div>
            </form>
        </Modal>
    );
};


// --- MAIN DASHBOARD COMPONENT ---
export const RepProfileDashboard = ({ repId: initialRepId }) => {
    const [profiles, setProfiles] = useState(repProfiles);
    const [selectedRepId, setSelectedRepId] = useState(initialRepId || repProfiles[0].repId);
    const [message, setMessage] = useState('');
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isAssignOrderModalOpen, setIsAssignOrderModalOpen] = useState(false);

    const currentRep = useMemo(() => {
        return profiles.find(rep => rep.repId === selectedRepId) || profiles[0];
    }, [selectedRepId, profiles]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const editableFields = [
        { key: 'fullName', label: 'Full Name', type: 'text' },
        { key: 'phoneNumber', label: 'Phone Number', type: 'tel' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'location', label: 'Location', type: 'text' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending'] },
        { key: 'servicesOffered', label: 'Services Offered', type: 'text' },
        { key: 'vehicleType', label: 'Vehicle Type', type: 'text' },
        { key: 'licenseNumber', label: 'License Number', type: 'text' },
        { key: 'vehiclePlateNo', label: 'Vehicle Plate No.', type: 'text' },
        { key: 'payoutAccount', label: 'Payout Account', type: 'text' },
    ];

    // --- Edit Details Logic (NO CONFIRMATION) ---
    const handleEditDetails = () => {
        const initialData = {};
        editableFields.forEach(field => {
            initialData[field.key] = currentRep[field.key];
        });
        setEditFormData(initialData);
        setIsEditModalOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // **Confirmation removed as requested.** Directly save and show success message.
        setProfiles(prevProfiles =>
            prevProfiles.map(rep =>
                rep.repId === currentRep.repId
                    ? { ...rep, ...editFormData }
                    : rep
            )
        );
        setIsEditModalOpen(false);
        Swal.fire('Success', 'Representative details updated successfully!', 'success');
        showMessage('Details updated.');
    };
    // ------------------------------------

    // --- FEATURE 1: Delete Logic (CONFIRMATION REQUIRED) ---
    const handleDeleteProfile = async () => {
        const result = await showConfirmationAlert(
            'Are you absolutely sure?',
            `You are about to permanently delete the profile for ${currentRep.fullName} (${currentRep.repId}). This action cannot be undone.`,
            'warning',
            'Yes, Delete It' // Confirmation text
        );

        if (result.isConfirmed) {
            setProfiles(prevProfiles =>
                prevProfiles.filter(rep => rep.repId !== currentRep.repId)
            );
            
            const remainingProfiles = profiles.filter(rep => rep.repId !== currentRep.repId);
            if (remainingProfiles.length > 0) {
                setSelectedRepId(remainingProfiles[0].repId);
            } else {
                setSelectedRepId(null); 
            }

            Swal.fire('Deleted!', `Profile for ${currentRep.fullName} has been deleted.`, 'success');
            showMessage('Profile deleted successfully! 🗑️');
        }
    };
    // --------------------------------------------------
    
    // --- Update Wallet State Logic ---
    const handleWalletUpdate = (newBalance) => {
        setProfiles(prevProfiles =>
            prevProfiles.map(rep =>
                rep.repId === currentRep.repId
                    ? { ...rep, walletBalance: newBalance }
                    : rep
            )
        );
    };

    // Prepare data for the details table for mapping
    const detailsTableData = [
        { label: 'Rep ID', value: currentRep?.repId || 'N/A' },
        { label: 'Full Name', value: currentRep?.fullName || 'N/A' },
        { label: 'Phone Number', value: currentRep?.phoneNumber || 'N/A' },
        { label: 'Email Address', value: currentRep?.email || 'N/A' },
        {
            label: 'Status',
            value: currentRep?.status || 'N/A',
            className: currentRep?.status === 'Active' ? 'text-green-600 font-bold' : (currentRep?.status === 'Inactive' ? 'text-red-600 font-bold' : 'text-yellow-600 font-bold')
        },
        { label: 'Location', value: currentRep?.location || 'N/A' },
        { label: 'Registered Date', value: currentRep?.registeredDate || 'N/A' },
        { label: 'Last Active', value: currentRep?.lastActive || 'N/A' },
        { label: 'Services Offered', value: currentRep?.servicesOffered || 'N/A' },
        { label: 'Vehicle Type', value: currentRep?.vehicleType || 'N/A' },
        { label: 'License Number', value: currentRep?.licenseNumber || 'N/A' },
        { label: 'Vehicle Plate No.', value: currentRep?.vehiclePlateNo || 'N/A' },
        { label: 'Average Delivery Time', value: currentRep?.averageDeliveryTime || 'N/A' },
        { label: 'Wallet Balance', value: currentRep?.walletBalance || 'N/A' },
        { label: 'Earnings (Total Revenue)', value: currentRep?.totalEarnings || 'N/A' },
        { label: 'Payout Account', value: currentRep?.payoutAccount || 'N/A' },
    ];

    // Reusable component for the action buttons
    const ActionButton = ({ icon: Icon, label, className, onClick = () => showMessage(label) }) => (
        <button
            onClick={onClick}
            className={`py-2 px-4 rounded-lg text-sm flex items-center shadow-md transition duration-150 ease-in-out hover:shadow-lg hover:scale-[1.02] ${className}`}
            disabled={!currentRep}
        >
            <Icon className="mr-2 h-4 w-4" /> {label}
        </button>
    );
   /**
     * Renders star icons based on a rating value (e.g., 4.6)
     */
    const renderStars = (rating) => {
        const parsedRating = parseFloat(rating);
        const fullStars = Math.floor(parsedRating);
        const hasHalfStar = parsedRating % 1 >= 0.25 && parsedRating % 1 < 0.75;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 h-5 w-5" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfStroke key="half" className="text-yellow-500 h-5 w-5" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 h-5 w-5" />);
        }

        return stars;
    };

    const StatCard = ({ title, value, isRating = false }) => (
        // ... (StatCard implementation is omitted for brevity)
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
                <button
                    onClick={() => showMessage(`Viewing info for ${title}`)}
                    className="text-gray-400 hover:text-indigo-600 transition duration-150 p-1"
                    aria-label={`Info about ${title}`}
                    title={`Info about ${title}`}
                >
                    <FaInfoCircle className="w-5 h-5" />
                </button>
            </div>
            
            {isRating ? (
                <div className="flex items-center mt-2">
                    <div className="flex gap-1">
                        {renderStars(value)}
                    </div>
                    <span className="ml-3 text-3xl font-extrabold text-gray-900">
                        ({value})
                    </span>
                </div>
            ) : (
                <div className="text-4xl font-extrabold text-gray-900 mt-1">
                    {value}
                </div>
            )}
        </div>
    );

    // The main render function
    return (
        <div>
            <div 
                className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white font-semibold transition-opacity duration-300 ${message ? 'opacity-100 bg-indigo-600' : 'opacity-0 pointer-events-none'}`}
            >
                {message}
            </div>

           

            {currentRep ? (
            <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left section - Service details */}
                <div className="bg-white rounded-xl shadow-md p-6 md:w-7/12 border border-gray-100 h-fit">
                    
                    {/* Header and Table */}
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            {currentRep.fullName} ({currentRep.repId})
                        </h2>
                        <button
                            onClick={() => showMessage('Copy Rep ID')}
                            className="p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full hover:bg-indigo-50"
                            aria-label="Copy ID"
                            title="Copy ID"
                        >
                            <FaRegCopy className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="overflow-x-auto shadow-inner rounded-xl border border-gray-200">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Field</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {detailsTableData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition duration-100">
                                        <td className="px-4 py-3 text-gray-500 font-medium whitespace-nowrap">{item.label}</td>
                                        <td className={`px-4 py-3 font-semibold text-gray-800 ${item.className || ''}`}>{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8">                        
                        <div className="flex flex-wrap gap-3">
                            <ActionButton
                                icon={FaPencilAlt}
                                label="Edit Details"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                onClick={handleEditDetails}
                            />
                            {/* FEATURE 1: Delete Profile Button - Uses Confirmation */}
                            <ActionButton
                                icon={FaTrash}
                                label="Delete Profile"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={handleDeleteProfile} 
                            />
                            {/* FEATURE 2: Reset Password Button - Uses Notification */}
                            <ActionButton
                                icon={FaLock}
                                label="Reset Password"
                                className="bg-gradient-to-br from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 border border-gray-300"
                                onClick={() => setIsPasswordModalOpen(true)}
                            />
                            {/* FEATURE 3: Update Wallet Balance Button - Uses Notification */}
                            <ActionButton
                                icon={FaWallet}
                                label="Update Wallet Balance"
                                className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                onClick={() => setIsWalletModalOpen(true)}
                            />
                            {/* FEATURE 4: Contact Rider Button - Uses Toast Notification */}
                            <ActionButton
                                icon={FaPhone}
                                label="Contact Rider"
                                className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                                onClick={() => setIsContactModalOpen(true)}
                            />
                            {/* FEATURE 5: Assign New Orders Button - Uses Notification */}
                            <ActionButton
                                icon={FaPlus}
                                label="Assign New Orders"
                                className="bg-gradient-to-br from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 border border-gray-300"
                                onClick={() => setIsAssignOrderModalOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right section - Stats cards */}
                <div className="md:w-5/12 space-y-4">
                    <StatCard title="Total Orders Completed" value={currentRep.totalOrders} />
                    <StatCard title="Pending Deliveries" value={currentRep.pendingOrders} />
                    <StatCard title="Cancelled Deliveries" value={currentRep.cancelledOrders} />
                    <StatCard title="Customer Rating" value={currentRep.rating} isRating={true} />
                    <StatCard title="Total Distance Covered" value={currentRep.distance} />
                    <StatCard title="Last 30 Days Earnings" value={currentRep.earnings30d} />
                </div>
            </div>
            ) : (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                    <p className="text-xl text-gray-600">No representative profiles available.</p>
                </div>
            )}
            
            {/* The Modals */}
            <EditDetailsModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                formData={editFormData}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                fields={editableFields}
            />

            <ResetPasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                repId={currentRep?.repId}
                showMessage={showMessage}
            />

            <UpdateWalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
                repId={currentRep?.repId}
                currentBalance={currentRep?.walletBalance}
                onUpdate={handleWalletUpdate}
                showMessage={showMessage}
            />
            
            <ContactRiderModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                phoneNumber={currentRep?.phoneNumber}
                fullName={currentRep?.fullName}
                showMessage={showMessage}
            />

            <AssignOrderModal
                isOpen={isAssignOrderModalOpen}
                onClose={() => setIsAssignOrderModalOpen(false)}
                repId={currentRep?.repId}
                showMessage={showMessage}
            />
        </div>
    );
};