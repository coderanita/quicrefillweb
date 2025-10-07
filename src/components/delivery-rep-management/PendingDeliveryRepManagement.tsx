import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import getcountries from '../../MockData/PendingServiceData';
import {PendingDeliveryRepData} from '../../MockData/DeliveryRepData';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import { showSweetAlert } from '../Includes/SweetAlert2'; 
import ApplicationStatsDashboard from './ApplicationStatsDashboard';
export const PendingDeliveryRepManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {

    const [region, setRegion] = useState('');
    const [filter, setFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(PendingDeliveryRepData);
    
 

 const PendingDeliveryRepColumns = [
  { header: "ID", accessor: "deliveryRepId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phoneNumber" },
  { header: "Email", accessor: "email" },
  { header: "Region", accessor: "region" },
  { header: "Vehicle Type", accessor: "vehicleType" },
  { 
    header: "License Status", 
    accessor: "licenseStatus",
    render: (row: any) => {
      const isVerified = row.licenseStatus === "Verified";
      const colorClass = isVerified ? "text-green-600" : "text-red-600";
      const Icon = isVerified ? FaCheckCircle : FaTimesCircle;
      
      return (
        <span className={`${colorClass} font-medium flex items-center gap-1`}>
          <Icon className="inline" /> 
          {row.licenseStatus}
        </span>
      );
    }
  },
  { header: "Submitted Date", accessor: "submittedDate" },
  {
    header: "Actions",
    accessor: "actions",
    render: (row: any) => {
      // NOTE: You would typically define the handleStatusChange/navigation logic here
      // I'm keeping the original 'View Details' link action.
      
      // The logic below is a placeholder for demonstration, 
      // replace with your actual navigation logic (e.g., using `Maps` from react-router).
      const linkPath = `/delivery-rep-management-pending-delivery-rep-details/${row.deliveryRepId}`;

      return (
        <a 
          href={linkPath} // Use this if you are doing a standard HTML navigation
          // onClick={() => navigate(linkPath)} // Use this with react-router
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
        >
          View Details
        </a>
      );
    }
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
                        title="Pending Delivery Rep Management"
                        breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Delivery Rep Management", "href": "/delivery-rep-management" }, { "label": "Pending Delivery Rep" }]}
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
                    <div className="flex ">
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="border border-gray-300 text-xs px-1 py-1 rounded-md bg-white text-black"
                        >
                            <option value="">Region Selector</option>
                            {getcountries.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 px-1 py-1 rounded-md bg-white text-xs"
                        >
                            <option>All</option>
                            {/* Add more filter options here if needed */}
                        </select>
                    </div>

                    <ApplicationStatsDashboard/>
                  
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable
                            title=""
                            columns={PendingDeliveryRepColumns}
                            data={filteredData}
                            rowsPerPage={10}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

