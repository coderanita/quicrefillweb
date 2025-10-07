import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import AccountDeletionSummaryCards from './AccountDeletionSummaryCards';
import { useNavigate } from 'react-router-dom';
import AccountDeletionData from '../../MockData/AccountDeletionData';
export const AccountDeletion = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [Data,setData]=useState(AccountDeletionData);
  

const AccountDeletionColumns = [
  { header: "User ID", accessor: "userId" },
  { header: "Name", accessor: "name" },
  { header: "Email / Phone", accessor: "contact" },
  { header: "Request Date", accessor: "requestDate" },
  { header: "Scheduled Deletion Date", accessor: "scheduledDeletionDate" },
  { header: "Reason for Deletion", accessor: "reason" },
  {
    header: "Status",
    accessor: "status",
    // Custom render logic to apply colors/styles based on status
    render: (row) => {
      let colorClass = "";
      const statusText = row.status;
      
      // Map status text to Tailwind CSS classes based on your HTML structure
      if (statusText === "Pending") {
        colorClass = "bg-yellow-100 text-yellow-800"; // Matches HTML for 'Pending' [cite: 22, 42, 63, 85, 94]
      } else if (statusText === "Approved") {
        colorClass = "bg-green-100 text-green-800"; // Matches HTML for 'Approved' [cite: 25, 59, 66, 77, 80, 98, 102]
      } else if (statusText === "Rejected") {
        colorClass = "bg-red-100 text-red-800"; // Matches HTML for 'Rejected' [cite: 28, 35, 39, 49, 73, 90, 107, 111]
      } else if (statusText === "Under Review") {
        colorClass = "bg-orange-100 text-orange-800"; // Matches HTML for 'Under Review' [cite: 32, 46, 52, 56, 70, 100]
      }

      return (
        <span className={`inline-block px-2 py-1 rounded-full ${colorClass} font-semibold text-xs`}>
          {statusText}
        </span>
      );
    },
  },
  {
    header: "Actions",
    accessor: "actions",
    render: (row) => (
      // Assuming 'navigate' is accessible and the route uses 'userId'
      <button
        onClick={() => navigate(`/account-deletion-view-details/${row.userId}`)}
        className="text-blue-500 hover:text-blue-700 hover:underline text-sm font-medium"
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
                        title="Pending Account Deletion Requests"
                            breadcrumbs={[
                            { label: "View all user-initiated account deletion requests. Ensure compliance with data retention policies before approval."},
                            
                            ]}
                        showExportButton={true}
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
                    
                    <AccountDeletionSummaryCards/>
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={AccountDeletionColumns}
                            data={Data}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

