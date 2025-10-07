import React, { useState } from 'react';
import { FaCopy, FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import {PENDING_VENDOR_MOCK_DATA_LIST} from '../../MockData/VendorManagmentData';
import {showSweetAlert}  from  "../Includes/SweetAlert2";




// Helper function to simulate fetching pending vendor data
const getPendingVendorDetails  = (id) => {
    return PENDING_VENDOR_MOCK_DATA_LIST.find(vendor => vendor.vendorId === id);
};

// --- Pending Vendor Detail Card Component ---
const PendingVendorDetailCard = ({ vendorId = 'VND-001' }) => { 
    // State to hold the data for the vendor being reviewed
    const [vendor, setVendor] = useState(getPendingVendorDetails(vendorId));

    if (!vendor) {
        return (
            <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6 mb-6 text-red-500">
                Vendor ID **{vendorId}** not found or already processed.
            </div>
        );
    }
    
    // --- Action Handlers (Use your showSweetAlert here) ---
    const handleApprove = () => {
         showSweetAlert(`Vendor ${vendor.vendorId} Approved!`, 'success');
        
    };

    const handleReject = () => {
         showSweetAlert(`Vendor ${vendor.vendorId} Rejected.`, 'error');
        
    };

    const handleRequestEdits = () => {
         showSweetAlert(`Requesting edits for ${vendor.vendorId}.`, 'info');
        
    };


    return (
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
                
                <div className="text-sm divide-y text-gray-700">
                    
                    {/* Data Rows matched to your requested HTML structure */}
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Vendor ID</span>
                        <span>{vendor.vendorId}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Business Name</span>
                        <span>{vendor.businessName}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Vendor Name</span>
                        <span>{vendor.vendorName}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Phone Number</span>
                        <span>{vendor.phoneNumber}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Email Address</span>
                        <span>{vendor.emailAddress}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Business Address</span>
                        <span>{vendor.businessAddress}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Category</span>
                        <span>{vendor.category}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Date Applied</span>
                        <span>{vendor.dateApplied}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Website (if any)</span>
                        <span className="truncate">{vendor.website}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Social Media</span>
                        <span>{vendor.socialMedia}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons (Approve, Reject, Request Edits) */}
            <div className="mt-6 flex flex-wrap gap-4">
                <button 
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                    <FaCheckCircle className="mr-2" />Approve Vendor
                </button>
                <button 
                    onClick={handleReject}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                    <FaTimesCircle className="mr-2" />Reject Vendor
                </button>
                <button
                    onClick={handleRequestEdits}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                    <FaEdit className="mr-2" />Request Vendor Edits
                </button>
            </div>
        </div>
    );
};

export default PendingVendorDetailCard;