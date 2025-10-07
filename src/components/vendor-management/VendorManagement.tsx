import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import {VendorStats} from "./VendorStats";
import {FaEye} from "react-icons/fa";
import {VendorData} from '../../MockData/VendorManagmentData';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';

export const VendorManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [userData,setUserData]=useState(VendorData);
  

const vendorTableColumns = [
  { header: "Vendor ID", accessor: "vendorId" },
  { header: "Vendor Name", accessor: "vendorName" },
  { header: "Total Orders Today", accessor: "ordersToday" },
  { header: "Avg. Delivery Time", accessor: "avgDeliveryTime",  },
  { 
    header: "Flagged?", 
    accessor: "isFlagged",
    render: (row) => {
      const isFlagged = row.isFlagged === true || row.isFlagged === "Yes";
      const color = isFlagged ? "text-red-500" : "text-green-500";
      const text = isFlagged ? "Yes" : "No";
      return <span className={`${color} font-semibold`}>{text}</span>;
    },
  },
  { 
    header: "Suspended?", 
    accessor: "isSuspended",
    render: (row) => {
      const isSuspended = row.isSuspended === true || row.isSuspended === "Yes";
      const color = isSuspended ? "text-red-500" : "text-green-500";
      const text = isSuspended ? "Yes" : "No";
      return <span className={`${color} font-semibold`}>{text}</span>;
    },
  },
  { 
    header: "Wallet Balance", 
    accessor: "walletBalance",
    render: (row) => (
      <span>{row.walletBalance ? `$${parseFloat(row.walletBalance).toFixed(2)}` : '$0.00'}</span>
    )
  },
  { header: "Location", accessor: "location" },
  {
    header: "Actions",
    accessor: "actions",
    // NOTE: 'navigate' must be accessible in this scope (e.g., passed from the parent component)
    render: (row) => (
      <button
        onClick={() => navigate(`/vendor-management-view-vendor/${row.vendorId}`)}
        className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
      >
        View Details
      </button>
    ),
  },
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
                        title="Vendor Management"
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
                    <VendorStats/>
                    <div className="flex justify-end mt-4 mb-4 ">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">View all vendors pending approval</p>
                        <div className="flex justify-end">
                          <a
                            href="/vendor-management-pending"
                            className="text-white px-6 py-2 rounded-lg shadow-md flex items-center"
                            style={{ background: 'linear-gradient(to bottom, #FFB732, #FF9C12)' }}
                          >
                            <FaEye className="mr-2" />
                            View Pending Vendors (50)
                          </a>
                        </div>
                      </div>
                    </div>
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={vendorTableColumns}
                            data={userData}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

