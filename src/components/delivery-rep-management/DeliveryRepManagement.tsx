import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import DeliveryStatsDashboard from './DeliveryStatsDashboard';
import {DeliveryRepData} from '../../MockData/DeliveryRepData';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';

export const DeliveryRepManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [deliveryRepData,setdeliveryRepData]=useState(DeliveryRepData);
  

const deliveryRepTableColumns = [
  { header: "Rider ID", accessor: "riderId" },
  { header: "Name", accessor: "name" },
  { header: "Contact", accessor: "contact" },
  { header: "Services Offered", accessor: "servicesOffered" },
  { header: "Rating", accessor: "rating" },
  { header: "Orders Comp.", accessor: "ordersCompleted" },
  { header: "Avg. Deli Time", accessor: "avgDeliveryTime" },
   { 
    header: "Revenue", 
    accessor: "revenue",
    render: (row) => {
      // Assuming row.revenue is a string like "15,000,000" without the '₦'
      const revenueValue = typeof row.revenue === 'string' 
        ? parseFloat(row.revenue.replace(/,/g, '')) 
        : parseFloat(row.revenue);

      return (
        <span>
          {/* FIX: Use Intl.NumberFormat for proper comma separation with the Naira symbol */}
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN', 
            minimumFractionDigits: 0, // Removes the .00 if needed, but keeps commas
          }).format(revenueValue)}
        </span>
      );
    },
  },
  { 
    header: "Status", 
    accessor: "status",
    render: (row) => {
      let color = "text-gray-700"; // Default
      if (row.status === "Active") {
        color = "text-green-500";
      } else if (row.status === "Suspended") {
        color = "text-yellow-500";
      } else if (row.status === "Inactive") {
        color = "text-red-500";
      }
      return <span className={`${color} font-semibold`}>{row.status}</span>;
    },
  },
  { header: "Location", accessor: "location" },
  {
    header: "Actions",
    accessor: "actions",
    render: (row) => (
      <button
        onClick={() => navigate(`/delivery-rep-management-view/${row.riderId}`)}
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
                        title="Delivery Rep Management"
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
                    <DeliveryStatsDashboard/>
                    <div className="flex justify-start mt-4 mb-4 ">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-2">View all Delivery Rep pending approval!</p>
                        <div className="flex justify-end">
                          <a
                            href="/delivery-rep-management-pending"
                            className="text-white px-6 py-2 rounded-lg shadow-md flex items-center"
                            style={{ background: 'linear-gradient(to bottom, #FFB732, #FF9C12)' }}
                          >                            
                            View Pending Delivery Rep (22)
                          </a>
                        </div>
                      </div>
                    </div>
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={deliveryRepTableColumns}
                            data={deliveryRepData }

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

