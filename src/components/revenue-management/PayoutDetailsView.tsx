// src/components/PayoutDetailsView.jsx
import React, { useState, useEffect } from 'react';
// Import the mock data array
import { mockPayouts } from '../../MockData/PayoutData'; 
import { showSweetAlert } from '../Includes/SweetAlert2';




// Functional component for a single detail row
const DetailRow = ({ field, detail, valueColor = 'text-gray-800' }) => (
  <div className="grid grid-cols-2 px-4 py-3">
    <div className="text-gray-500">{field}</div>
    <div className={valueColor}>{detail}</div>
  </div>
);

// Helper function to determine status text color
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500 font-medium';
    case 'Approved':
      return 'text-green-600 font-medium';
    case 'Rejected':
      return 'text-red-600 font-medium';
    default:
      return 'text-gray-800';
  }
};

// Component now accepts 'payoutId' as a prop
const PayoutDetailsView = ({ payoutId }) => { 
  const [payoutData, setPayoutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  

  
  useEffect(() => {
    setIsLoading(true);

    const normalizedId = payoutId.replace(/[\u2013\u2014]/g, '-');
    
    const data = mockPayouts.find(
      payout => payout.id.replace(/[\u2013\u2014]/g, '-') === normalizedId
    );
    
    
    setTimeout(() => {
        if (data) {
          
          setPayoutData(data);
        } else {
          setPayoutData(null);
          console.error(`Payout ID ${payoutId} not found in array!`);
        }
        setIsLoading(false);
    }, 300); 

    // --- 🎯 CORE CHANGE END ---
    
  }, [payoutId]); // Dependency array ensures data refetches if the ID prop changes

  if (isLoading) {
    return <div className="text-center p-8">Loading payout details...</div>;
  }
  
  if (!payoutData) {
    return <div className="text-center p-8 text-red-500">Error: Payout details not found for ID: {payoutId}</div>;
  }

  // Destructure the data once we know it exists. 
  // NOTE: 'payoutData' itself is the main object, so we rename it to 'payout' 
  // for readability and keep the 'vendor' object separate.
  const payout = payoutData;
  const vendor = payoutData.vendor;

  // Handler for the Copy button (copies the Payout ID)
  const handleCopy = () => {
    navigator.clipboard.writeText(payout.id);
    showSweetAlert(`Copied Payout ID: ${payout.id}`,'success');
  };

  // Handler for action buttons (placeholder)
  const handleAction = (action) => {

    showSweetAlert(`Payout ${action} clicked!`,action=="Approve"?"success":"error");
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      
      {/* Payout Details Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{payout.id}</h2> 
          
          {/* Action Icons/Buttons Container */}
          <div className="flex gap-2"> 
            
            
            
            {/* Copy Icon Button */}
            <button className="text-gray-500 hover:text-gray-700 p-2" onClick={handleCopy}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-t-lg text-sm text-gray-500 font-medium">
          <div className="px-4 py-2">Field</div>
          <div className="px-4 py-2">Details</div>
        </div>

        {/* Table Body - Payout Details */}
        <div className="border-t border-gray-100 divide-y divide-gray-100 text-sm">
          <DetailRow field="Payout ID" detail={payout.id} />
          <DetailRow 
            field="Status" 
            detail={payout.status} 
            valueColor={getStatusColor(payout.status)} 
          />
          <DetailRow field="Vendor/Delivery Rep Name" detail={payout.vendorName} />
          <DetailRow field="Service Type" detail={payout.serviceType} />
          <DetailRow field="Total Amount" detail={payout.totalAmount} />
          <DetailRow field="Payment Date" detail={payout.paymentDate} />
          <DetailRow field="Payment Method" detail={payout.paymentMethod} />
          <DetailRow field="Processing Admin" detail={payout.processingAdmin} />
          <DetailRow field="Reference ID" detail={payout.referenceId} />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
            onClick={() => handleAction('Approve')}
          >
            Approve Payout
          </button>
          <button 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg"
            onClick={() => handleAction('Reject')}
          >
            Reject Payout
          </button>
        </div>
      </div>

      {/* Vendor/Delivery Rep Details Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Vendor/Delivery Rep Details</h2>

        {/* Table Header */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-t-lg text-sm text-gray-500 font-medium">
          <div className="px-4 py-2">Field</div>
          <div className="px-4 py-2">Details</div>
        </div>

        {/* Table Body - Vendor Details */}
        <div className="border-t border-gray-100 divide-y divide-gray-100 text-sm">
          <DetailRow field="Vendor/Rep Name" detail={vendor.name} />
          <DetailRow field="Business Name" detail={vendor.businessName} />
          <DetailRow field="Contact Email" detail={vendor.contactEmail} />
          <DetailRow field="Phone Number" detail={vendor.phoneNumber} />
          <DetailRow field="Bank Name" detail={vendor.bankName} />
          <DetailRow field="Bank Account Number" detail={vendor.bankAccountNumber} />
          <DetailRow field="Payment Method" detail={payout.paymentMethod} />
        </div>
      </div>
      
    </div>
  );
};

export default PayoutDetailsView;