import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { ApprovalData } from '../../MockData/WithdrawalData';
import VerificationStats from './VerificationStats';

import { FaCheck, FaTimes,FaEye } from 'react-icons/fa'; // Assuming you'd use React Icons for actions
export const AccountNumberSubmission = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(ApprovalData);

 // Function to handle the status update
  const handleStatusChange = (submissionId, newStatus) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.submissionId === submissionId
          ? { ...transaction, status: newStatus } // Update the status of the matching row
          : transaction // Keep all other rows unchanged
      )
    );
  };


 const ApprovalColumns = [
  { header: "Submission ID", accessor: "submissionId" },
  { header: "User Name", accessor: "userName" },
  { header: "User Type", accessor: "userType" },
  { header: "Bank Name", accessor: "bankName" },
  { header: "Account Number", accessor: "accountNumber" },
  { header: "Account Holder Name", accessor: "accountHolderName" },
  { header: "Date Submitted", accessor: "dateSubmitted" },
  {
    header: "Status",
    accessor: "status",
    render: (row) => {
      let colorClass = "text-gray-700"; // Default
      let bgClass = "";

      if (row.status === "Pending") {
          colorClass = "text-yellow-600";
          bgClass = "bg-yellow-100";
        } else if (row.status === "Under Review") {
          colorClass = "text-blue-600";
          bgClass = "bg-blue-100";
        } else if (row.status === "Approved") {
          colorClass = "text-green-600";
          bgClass = "bg-green-100"; // Added Approved styles
        } else if (row.status === "Rejected") {
          colorClass = "text-red-600";
          bgClass = "bg-red-100"; // Added Rejected styles
        }
      return (
        <span
          className={`inline-block px-2 py-1 rounded-full ${bgClass} ${colorClass} font-semibold text-xs`}
        >
          {row.status}
        </span>
      );
    },
  },
   {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex space-x-1">
            {/* 1. VIEW Button (New) */}
          <button
            onClick={() => navigate("/withdrawal-management-account-no-submission-detail/"+row.submissionId)}
            className="text-indigo-600 hover:text-indigo-900 font-semibold py-1 px-2 flex items-center"
            title="View Details"
          >
            <FaEye className="mr-1" /> View
          </button>
          {/* Approve Button -> Calls handler with "Approved" status */}
          <button
            onClick={() => handleStatusChange(row.submissionId, "Approved")}
            className="text-green-700 hover:text-green-900 font-semibold py-1 px-2 flex items-center"
            title="Approve"
          >
            <FaCheck className="mr-1" /> Approve
          </button>

          {/* Reject Button -> Calls handler with "Rejected" status */}
          <button
            onClick={() => handleStatusChange(row.submissionId, "Rejected")}
            className="text-red-700 hover:text-red-900 font-semibold py-1 px-2 flex items-center"
            title="Reject"
          >
            <FaTimes className="mr-1" /> Reject
          </button>
        </div>
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
          <div className="">

            <PageHeaderWithFilters
              title="Account Number Submission Requests"
              filterTitle='Service Type'
              breadcrumbs={[{"label":"Withdrawal Management",href:"/withdrawal-management"},{"label":"Account Number Submission Requests"}]}
              showExportButton={false}
              filterCategories={[
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}
              showBackButton={true}
              onBackClick={()=>{navigate('/withdrawal-management')}}

            />


          </div>
          
         
         
      <VerificationStats/>
          
          <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
            <ReusableTable
              title="Submission Requests"
              columns={ApprovalColumns}
              data={transactions} // ✅ use state, not static Data
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

