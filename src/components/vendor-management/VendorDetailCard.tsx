import React, { useState } from 'react';

import { FaCopy, FaEdit, FaBan, FaFlag, FaExclamationTriangle } from 'react-icons/fa';

import { vendorDetailsData } from '../../MockData/VendorManagmentData'; 
 import {showSweetAlert} from '../Includes/SweetAlert2';

// Define possible status options for the dropdown
const STATUS_OPTIONS = ["Active", "Pending", "More Info Needed", "Flagged", "Suspended"];

// Helper function to safely find vendor data
const getVendorDetails = (id) => {
    return vendorDetailsData.find(vendor => vendor.vendorId === id);
};

// Helper function to safely split the contact info string (e.g., "email | phone")
const splitContactInfo = (contactString) => {
    // Expected format: "email | phone"
    const parts = contactString ? contactString.split(' | ').map(p => p.trim()) : ['', ''];
    return {
        email: parts[0] || '',
        phone: parts[1] || ''
    };
};

// --- Edit Vendor Modal Component ---
const EditVendorModal = ({ vendor, onClose, onSave }) => {
    // Initialize state for non-contact fields
    const [name, setName] = useState(vendor.vendorName);
    const [balance, setBalance] = useState(vendor.walletBalance);
    const [status, setStatus] = useState(vendor.status);

    // Initialize state for contact info using the helper function
    const initialContact = splitContactInfo(vendor.contactInfo);
    const [email, setEmail] = useState(initialContact.email);
    const [phone, setPhone] = useState(initialContact.phone);

    const handleSave = () => {
        // 1. Combine Email and Phone back into the original string format
        const newContactInfo = `${email.trim()} | ${phone.trim()}`;

        // 2. Collect all updated data
        const updatedData = {
            ...vendor,
            vendorName: name,
            walletBalance: balance,
            status: status,
            contactInfo: newContactInfo, // Save the combined format
        };
        onSave(updatedData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Edit Details for {vendor.vendorId}</h3>
                
                {/* Scrollable Form Fields */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    
                    {/* Vendor Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    {/* Status Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                        >
                            {STATUS_OPTIONS.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Wallet Balance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Wallet Balance</label>
                        <input 
                            type="text" 
                            value={balance} 
                            onChange={(e) => setBalance(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    
                    {/* Vendor Contact Info - Grouped Inputs (New Logic) */}
                    <div className="space-y-2 border p-3 rounded-md">
                        <label className="block text-sm font-bold text-gray-800">Vendor Contact Info</label>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., vendor@example.com"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                            <input 
                                type="tel" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="e.g., +234 800 123 4567"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                        <p className="text-xs text-gray-500 pt-1">Saved format: **{`${email.trim()} | ${phone.trim()}`}**</p>
                    </div>

                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Vendor Detail Card Component ---
const VendorDetailCard = ({ vendorId }) => {
    const [localVendorData, setLocalVendorData] = useState(getVendorDetails(vendorId));
    const [showEditModal, setShowEditModal] = useState(false);
    
    const vendor = localVendorData; 

    if (!vendor) {
        return (
            <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6 mb-6 text-red-500">
                Vendor ID **{vendorId}** not found.
            </div>
        );
    }

    const handleSave = (updatedData) => {
        // This simulates updating the local state with the new data from the modal
        setLocalVendorData(updatedData); 
        setShowEditModal(false);
        // In a real application, you would also call an API endpoint here
        console.log("Data saved:", updatedData);
    };

    // Styling logic for Infractions
    const warningText = vendor.warnings > 0 
        ? <span className="text-yellow-600 flex items-center">
            <FaExclamationTriangle className="mr-1" />{vendor.warnings} Warnings
          </span>
        : null;

    const suspensionText = vendor.suspensions && vendor.suspensions !== "0 Suspensions"
        ? <span className="text-red-600 ml-2">
            | {vendor.suspensions}
          </span>
        : null;

    const statusColor = vendor.status === "Active" ? "text-green-600" : "text-red-600";
    
    return (
        <>
            <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6 mb-6">
                
                {/* Title & Copy Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{vendor.vendorId}</h2>
                    <button 
                        className="text-gray-500 hover:text-black"
                        onClick={() => navigator.clipboard.writeText(vendor.vendorId)}
                        title="Copy Vendor ID"
                    >
                        <FaCopy />
                    </button>
                </div>

                {/* Table-Like Info */}
                <div className="border rounded overflow-hidden">
                    <div className="bg-gray-50 font-semibold text-sm grid grid-cols-2 px-4 py-2 border-b">
                        <span>Field</span>
                        <span>Details</span>
                    </div>
                    
                    <div className="text-sm divide-y">
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Vendor Name</span>
                            <span>{vendor.vendorName}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Vendor ID</span>
                            <span>{vendor.vendorId}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Status</span>
                            <span className={`${statusColor} font-medium`}>{vendor.status}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Wallet Balance</span>
                            <span>{vendor.walletBalance}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Total Orders Fulfilled</span>
                            <span>{vendor.totalOrdersFulfilled}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Avg. Delivery Time</span>
                            <span>{vendor.avgDeliveryTime}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Vendor Infractions</span>
                            <span className="flex items-center">
                                {warningText}
                                {suspensionText}
                                {vendor.warnings === 0 && vendor.suspensions === "0 Suspensions" && 'None'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Registration Date</span>
                            <span>{vendor.registrationDate}</span>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-2">
                            <span>Vendor Contact Info</span>
                            <span>{vendor.contactInfo}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-4">
                    {/* Edit button opens the modal */}
                    <button 
                        onClick={() => setShowEditModal(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
                    >
                        <FaEdit className="mr-2" />Edit Vendor Details
                    </button>
                    <button 
                        onClick={() => showSweetAlert(`Suspending ${vendor.vendorId}`,'success') }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                    >
                        <FaBan className="mr-2" />Suspend / Block Vendor
                    </button>
                    <button
                        onClick={() => showSweetAlert(`Flagging  ${vendor.vendorId}`,'success')}
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm"
                    >
                        <div className="flex items-center space-x-2">
                            <FaFlag /> 
                            <span>Flag Vendor</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Conditional Modal Rendering */}
            {showEditModal && (
                <EditVendorModal 
                    vendor={vendor} 
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default VendorDetailCard;