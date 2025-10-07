import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
// You'll need to import the React Icons you want to use
import { FaCog, FaDownload } from 'react-icons/fa';
import RevenueCards from './RevenueCards';
import RevenueCharts from './RevenueCharts';
import RevenueBarChart from './RevenueBarChart';
import ReusableTable from '../Includes/ReusableTable';

export const RevenueManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {


    const { id } = useParams();
    const navigate = useNavigate();
    // Example state or data fetched from an API
    const currentRevenueData = {
        total: '₦50,000,000',
        service: '₦12,000,000',
        topUp: '₦38,000,000',
        vat: '₦8,000,000'
    };
    const revenueTableColumns = [
  { "header": "Transaction ID", "accessor": "transactionId" },
  { "header": "Date", "accessor": "date" },
  { "header": "Service Type", "accessor": "serviceType" },
  { "header": "User ID", "accessor": "userId" },
  { "header": "Vendor / Delivery Rep", "accessor": "vendorOrDeliveryRep" },
  { "header": "Amount (₦)", "accessor": "amount" },
  { "header": "VAT (₦)", "accessor": "vat" },
  { "header": "Service Charge", "accessor": "serviceCharge" },
  { "header": "Top-up Charge", "accessor": "topUpCharge" },
  {
  "header": "Status",
  "accessor": "status",
  "render": (row) => {
    const status = row.status;
    let colorClass = "text-gray-700"; // Default
    
    switch (status) {
      case "Paid":
        colorClass = "text-green-500";
        break;
      case "Pending":
        colorClass = "text-yellow-500";
        break;
      case "Processing":
        colorClass = "text-blue-500";
        break;
      default:
        // Handle any unexpected status gracefully
        colorClass = "text-gray-500";
    }
    
    return <span className={`${colorClass} font-semibold`}>{status}</span>;
  }
}
];
const revenueData = [
  {
    "transactionId": "TXN-1001",
    "date": "2025-03-01",
    "serviceType": "Gas Refill",
    "userId": "U-3052",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)",
    "amount": "50,000",
    "vat": "3,750",
    "serviceCharge": "5,000",
    "topUpCharge": "500",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1002",
    "date": "2025-03-01",
    "serviceType": "Gas Refill",
    "userId": "U-4023",
    "vendorOrDeliveryRep": "V-1002 (ToolMasters)",
    "amount": "120,000",
    "vat": "9,000",
    "serviceCharge": "12,000",
    "topUpCharge": "1,200",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1003",
    "date": "2025-03-02",
    "serviceType": "Accessories",
    "userId": "U-4784",
    "vendorOrDeliveryRep": "V-1008 (EcoGas)",
    "amount": "30,000",
    "vat": "2,250",
    "serviceCharge": "3,000",
    "topUpCharge": "300",
    "status": "Pending"
  },
  {
    "transactionId": "TXN-1004",
    "date": "2025-03-02",
    "serviceType": "Electricity",
    "userId": "U-9320",
    "vendorOrDeliveryRep": "-",
    "amount": "22,500",
    "vat": "1,687",
    "serviceCharge": "2,250",
    "topUpCharge": "225",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1005",
    "date": "2025-03-03",
    "serviceType": "Petroleum",
    "userId": "U-1124",
    "vendorOrDeliveryRep": "V-1004 (SpeedyGas)",
    "amount": "85,000",
    "vat": "6,377",
    "serviceCharge": "8,500",
    "topUpCharge": "850",
    "status": "Processing"
  },
  {
    "transactionId": "TXN-1006",
    "date": "2025-03-03",
    "serviceType": "Petroleum",
    "userId": "U-7903",
    "vendorOrDeliveryRep": "V-1007 (GreenFlame)",
    "amount": "65,000",
    "vat": "4,875",
    "serviceCharge": "6,500",
    "topUpCharge": "650",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1007",
    "date": "2025-03-04",
    "serviceType": "Electricity",
    "userId": "U-4502",
    "vendorOrDeliveryRep": "-",
    "amount": "95,000",
    "vat": "7,125",
    "serviceCharge": "9,500",
    "topUpCharge": "950",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1008",
    "date": "2025-03-05",
    "serviceType": "Electricity",
    "userId": "U-1289",
    "vendorOrDeliveryRep": "-",
    "amount": "40,000",
    "vat": "3,000",
    "serviceCharge": "4,000",
    "topUpCharge": "400",
    "status": "Pending"
  },
  {
    "transactionId": "TXN-1009",
    "date": "2025-03-06",
    "serviceType": "Gas Refill",
    "userId": "U-3408",
    "vendorOrDeliveryRep": "V-1012 (QuickGas)",
    "amount": "150,000",
    "vat": "11,250",
    "serviceCharge": "15,000",
    "topUpCharge": "1,500",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1010",
    "date": "2025-03-07",
    "serviceType": "Diesel",
    "userId": "U-9230",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)",
    "amount": "25,000",
    "vat": "1,875",
    "serviceCharge": "2,500",
    "topUpCharge": "250",
    "status": "Processing"
  },
  {
    "transactionId": "TXN-1011",
    "date": "2025-03-07",
    "serviceType": "Petroleum",
    "userId": "U-5583",
    "vendorOrDeliveryRep": "V-1017 (FastFill Gas)",
    "amount": "55,000",
    "vat": "4,125",
    "serviceCharge": "5,500",
    "topUpCharge": "550",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1012",
    "date": "2025-03-09",
    "serviceType": "Gas Refill",
    "userId": "U-7832",
    "vendorOrDeliveryRep": "V-1006 (EcoGas)",
    "amount": "130,000",
    "vat": "9,750",
    "serviceCharge": "13,000",
    "topUpCharge": "1,300",
    "status": "Pending"
  },
  {
    "transactionId": "TXN-1013",
    "date": "2025-03-10",
    "serviceType": "Gas Refill",
    "userId": "U-2904",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)",
    "amount": "38,000",
    "vat": "2,850",
    "serviceCharge": "3,800",
    "topUpCharge": "380",
    "status": "Paid"
  },
  {
    "transactionId": "TXN-1014",
    "date": "2025-03-10",
    "serviceType": "Gas Refill",
    "userId": "U-9034",
    "vendorOrDeliveryRep": "V-1001 (GasPro Ltd)",
    "amount": "110,000",
    "vat": "8,250",
    "serviceCharge": "11,000",
    "topUpCharge": "1,100",
    "status": "Processing"
  }
];
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
                        title="Revenue Breakdown"
                        breadcrumbs={[]}
                        showExportButton={false}
                        filterCategories={[
                            { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
                            { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
                            { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
                        ]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={true}
                    />
                    {/* Top Action Buttons */}
                    <div className="flex justify-end gap-4 mb-6">
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2"
                            onClick={() => console.log('Revenue Settings clicked')} // Replace with your handler
                        >
                            <FaCog />
                            Revenue Settings
                        </button>
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2"
                            onClick={() => console.log('Export as PDF clicked')} // Replace with your handler
                        >
                            <FaDownload />
                            Export as PDF
                        </button>
                    </div>
                    <RevenueCards
                        totalRevenue={currentRevenueData.total}
                        serviceCharge={currentRevenueData.service}
                        topUpRevenue={currentRevenueData.topUp}
                        vatRevenue={currentRevenueData.vat}
                    />
                    <RevenueCharts />
                    <RevenueBarChart/>
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={revenueTableColumns}
                            data={revenueData}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div>

                </main>
            </div>
        </div>
    );
};

