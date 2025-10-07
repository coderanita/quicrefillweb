import React from 'react';

// === CUSTOM RENDER FUNCTIONS ===

// Custom render function for Status, applying conditional background and text colors
// Note: Adjusted classes for better visibility and design coherence
const renderStatus = (row) => {
    const status = row.status;
    let colorClass = "text-gray-700 bg-gray-200"; // Default
    
    switch (status) {
        case "Active":
        case "Paid":
            // Green for success/completion
            colorClass = "text-green-700 bg-green-100 border border-green-300";
            break;
        case "Pending":
            // Yellow/Orange for awaiting action
            colorClass = "text-yellow-800 bg-yellow-100 border border-yellow-300";
            break;
        case "Inactive":
        case "Processing":
            // Blue for in-progress or paused
            colorClass = "text-blue-700 bg-blue-100 border border-blue-300";
            break;
        default:
            // Fallback
            break;
    }
    
    return (
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

// Custom render function for Action buttons
const renderAction = () => (
    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors p-1 rounded-md hover:bg-blue-50">
        View
    </button>
);


// === DATA ARRAYS ===

// Vendors Data
const vendorData = [
    { id: 1, name: "GasPro Ltd", service: "Gas Refill", registration: "2023-01-15", status: "Active" },
    { id: 2, name: "ToolMasters", service: "Accessories", registration: "2023-05-20", status: "Active" },
    { id: 3, name: "EcoGas", service: "Gas Refill", registration: "2024-02-10", status: "Inactive" },
    { id: 4, name: "SpeedyGas", service: "Petroleum", registration: "2024-03-01", status: "Pending" },
    { id: 5, name: "GreenFlame", service: "Diesel", registration: "2024-06-12", status: "Active" },
    { id: 6, name: "QuickGas", service: "Gas Refill", registration: "2024-07-05", status: "Active" },
    { id: 7, name: "FastFill Gas", service: "Petroleum", registration: "2024-08-10", status: "Inactive" },
    { id: 8, name: "HydroGen Co", service: "Accessories", registration: "2023-11-25", status: "Pending" },
];

// Revenue Breakdown Data
const revenueData = [
  {
    "transactionId": "TXN-1001", "date": "2025-03-01", "serviceType": "Gas Refill", "userId": "U-3052",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)", "amount": "50,000", "vat": "3,750",
    "serviceCharge": "5,000", "topUpCharge": "500", "status": "Paid"
  },
  {
    "transactionId": "TXN-1002", "date": "2025-03-01", "serviceType": "Gas Refill", "userId": "U-4023",
    "vendorOrDeliveryRep": "V-1002 (ToolMasters)", "amount": "120,000", "vat": "9,000",
    "serviceCharge": "12,000", "topUpCharge": "1,200", "status": "Paid"
  },
  {
    "transactionId": "TXN-1003", "date": "2025-03-02", "serviceType": "Accessories", "userId": "U-4784",
    "vendorOrDeliveryRep": "V-1008 (EcoGas)", "amount": "30,000", "vat": "2,250",
    "serviceCharge": "3,000", "topUpCharge": "300", "status": "Pending"
  },
  {
    "transactionId": "TXN-1004", "date": "2025-03-02", "serviceType": "Electricity", "userId": "U-9320",
    "vendorOrDeliveryRep": "-", "amount": "22,500", "vat": "1,687",
    "serviceCharge": "2,250", "topUpCharge": "225", "status": "Paid"
  },
  {
    "transactionId": "TXN-1005", "date": "2025-03-03", "serviceType": "Petroleum", "userId": "U-1124",
    "vendorOrDeliveryRep": "V-1004 (SpeedyGas)", "amount": "85,000", "vat": "6,377",
    "serviceCharge": "8,500", "topUpCharge": "850", "status": "Processing"
  },
  {
    "transactionId": "TXN-1006", "date": "2025-03-03", "serviceType": "Petroleum", "userId": "U-7903",
    "vendorOrDeliveryRep": "V-1007 (GreenFlame)", "amount": "65,000", "vat": "4,875",
    "serviceCharge": "6,500", "topUpCharge": "650", "status": "Paid"
  },
  {
    "transactionId": "TXN-1007", "date": "2025-03-04", "serviceType": "Electricity", "userId": "U-4502",
    "vendorOrDeliveryRep": "-", "amount": "95,000", "vat": "7,125",
    "serviceCharge": "9,500", "topUpCharge": "950", "status": "Paid"
  },
  {
    "transactionId": "TXN-1008", "date": "2025-03-05", "serviceType": "Electricity", "userId": "U-1289",
    "vendorOrDeliveryRep": "-", "amount": "40,000", "vat": "3,000",
    "serviceCharge": "4,000", "topUpCharge": "400", "status": "Pending"
  },
  {
    "transactionId": "TXN-1009", "date": "2025-03-06", "serviceType": "Gas Refill", "userId": "U-3408",
    "vendorOrDeliveryRep": "V-1012 (QuickGas)", "amount": "150,000", "vat": "11,250",
    "serviceCharge": "15,000", "topUpCharge": "1,500", "status": "Paid"
  },
  {
    "transactionId": "TXN-1010", "date": "2025-03-07", "serviceType": "Diesel", "userId": "U-9230",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)", "amount": "25,000", "vat": "1,875",
    "serviceCharge": "2,500", "topUpCharge": "250", "status": "Processing"
  },
  {
    "transactionId": "TXN-1011", "date": "2025-03-07", "serviceType": "Petroleum", "userId": "U-5583",
    "vendorOrDeliveryRep": "V-1017 (FastFill Gas)", "amount": "55,000", "vat": "4,125",
    "serviceCharge": "5,500", "topUpCharge": "550", "status": "Paid"
  },
  {
    "transactionId": "TXN-1012", "date": "2025-03-09", "serviceType": "Gas Refill", "userId": "U-7832",
    "vendorOrDeliveryRep": "V-1006 (EcoGas)", "amount": "130,000", "vat": "9,750",
    "serviceCharge": "13,000", "topUpCharge": "1,300", "status": "Pending"
  },
  {
    "transactionId": "TXN-1013", "date": "2025-03-10", "serviceType": "Gas Refill", "userId": "U-2904",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)", "amount": "38,000", "vat": "2,850",
    "serviceCharge": "3,800", "topUpCharge": "380", "status": "Paid"
  },
  {
    "transactionId": "TXN-1014", "date": "2025-03-10", "serviceType": "Gas Refill", "userId": "U-9034",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)", "amount": "110,000", "vat": "8,250",
    "serviceCharge": "11,000", "topUpCharge": "1,100", "status": "Processing"
  }
];

// Service Charge Breakdown Data
const serviceChargeData = [
    { id: 1, date: "2025-03-01", service: "Gas Refill", userId: "U-3052", totalCharge: "5,000", totalTxn: 2, status: "Paid" },
    { id: 2, date: "2025-03-01", service: "Gas Refill", userId: "U-4023", totalCharge: "12,000", totalTxn: 1, status: "Paid" },
    { id: 3, date: "2025-03-02", service: "Accessories", userId: "U-4784", totalCharge: "3,000", totalTxn: 1, status: "Pending" },
    { id: 4, date: "2025-03-02", service: "Electricity", userId: "U-9320", totalCharge: "2,250", totalTxn: 3, status: "Paid" },
    { id: 5, date: "2025-03-03", service: "Petroleum", userId: "U-1124", totalCharge: "8,500", totalTxn: 2, status: "Processing" },
    { id: 6, date: "2025-03-04", service: "Electricity", userId: "U-4502", totalCharge: "9,500", totalTxn: 1, status: "Paid" },
    { id: 7, date: "2025-03-06", service: "Gas Refill", userId: "U-3408", totalCharge: "15,000", totalTxn: 1, status: "Paid" },
    { id: 8, date: "2025-03-07", service: "Diesel", userId: "U-9230", totalCharge: "2,500", totalTxn: 1, status: "Processing" },
];

// === COLUMN CONFIGURATIONS ===

// Vendors Columns Configuration
const vendorColumns = [
    { header: "Vendor Name", accessor: "name" },
    { header: "Service Type", accessor: "service" },
    { header: "Registration Date", accessor: "registration" },
    { header: "Status", accessor: "status", render: renderStatus },
    { header: "Action", accessor: "action", render: renderAction },
];

// Revenue Breakdown Columns Configuration
const revenueColumns = [
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Date", accessor: "date" },
    { header: "Service Type", accessor: "serviceType" },
    { header: "User ID", accessor: "userId" },
    { header: "Vendor / Delivery Rep", accessor: "vendorOrDeliveryRep" },
    { header: "Amount (₦)", accessor: "amount" },
    { header: "VAT (₦)", accessor: "vat" },
    { header: "Service Charge", accessor: "serviceCharge" },
    { header: "Top-up Charge", accessor: "topUpCharge" },
    { header: "Status", accessor: "status", render: renderStatus }
];

// Service Charge Breakdown Columns Configuration
const serviceChargeColumns = [
    { header: "Date", accessor: "date" },
    { header: "Service Type", accessor: "service" },
    { header: "User ID", accessor: "userId" },
    { header: "Total Service Charge (₦)", accessor: "totalCharge" },
    { header: "Total Transactions", accessor: "totalTxn" },
    { header: "Status", accessor: "status", render: renderStatus },
    { header: "Action", accessor: "action", render: renderAction },
];

export { 
    vendorData, revenueData, serviceChargeData,
    vendorColumns, revenueColumns, serviceChargeColumns
};
