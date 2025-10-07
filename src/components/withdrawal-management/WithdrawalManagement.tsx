import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { WithdrawalData } from '../../MockData/WithdrawalData';
import WithdrawalStatsCards from './WithdrawalStatsCards';
import UserWithdrawalSettings from './UserWithdrawalSettings';
import {
  FaCheck,
  FaTimes,
  FaEllipsisH,
} from "react-icons/fa";

export const WithdrawalManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(WithdrawalData);

  const [activeTab, setActiveTab] = useState("All");

  const updateStatus = (id, newStatus) => {
    setTransactions((prev) =>
      prev.map((row) =>
        row.transactionId === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const TransactionColumns = [
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "User Name", accessor: "userName" },
    { header: "User Group", accessor: "userGroup" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => {
        let colorClass = "";
        if (row.status === "Pending") {
          colorClass = "bg-yellow-100 text-yellow-500";
        } else if (row.status === "Approved") {
          colorClass = "bg-green-100 text-green-500";
        } else if (row.status === "Rejected") {
          colorClass = "bg-red-100 text-red-500";
        }

        return (
          <span
            className={`inline-block px-2 py-1 rounded-full ${colorClass} font-semibold text-xs`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (row) => (
        <span className="text-right block">
          ₦{row.amount.toLocaleString()}
        </span>
      ),
    },
    { header: "Date", accessor: "date" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => {
        const status = row.status;

        const renderApprove = () => {
          if (status === "Approved") {
            return (
              <div className="bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-sm">
                <FaCheck className="text-[0.7rem]" />
              </div>
            );
          } else if (status === "Pending") {
            return (
              <div
                onClick={() => updateStatus(row.transactionId, "Approved")}
                className="border border-green-500 text-green-500 w-4 h-4 flex items-center justify-center rounded-sm cursor-pointer hover:bg-green-50"
              >
                <FaCheck className="text-[0.7rem]" />
              </div>
            );
          }
          return (
            <div className="border border-gray-400 text-gray-400 w-4 h-4 flex items-center justify-center rounded-sm">
              <FaCheck className="text-[0.7rem]" />
            </div>
          );
        };

        const renderReject = () => {
          if (status === "Rejected") {
            return (
              <div className="bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-sm">
                <FaTimes className="text-[0.7rem]" />
              </div>
            );
          } else if (status === "Pending") {
            return (
              <div
                onClick={() => updateStatus(row.transactionId, "Rejected")}
                className="border border-red-500 text-red-500 w-4 h-4 flex items-center justify-center rounded-sm cursor-pointer hover:bg-red-50"
              >
                <FaTimes className="text-[0.7rem]" />
              </div>
            );
          }
          return (
            <div className="border border-gray-400 text-gray-400 w-4 h-4 flex items-center justify-center rounded-sm">
              <FaTimes className="text-[0.7rem]" />
            </div>
          );
        };

        return (
          <div className="flex items-center space-x-2">
            {renderApprove()}
            {renderReject()}
            <FaEllipsisH onClick={()=>{navigate('/withdrawal-management-details/'+row.transactionId)}} className="text-gray-400 text-[0.7rem] cursor-pointer" />
          </div>
        );
      },
    },
  ];
    const filteredTransactions =
    activeTab === "All"
      ? transactions
      : transactions.filter((t) => t.status === "Pending");

  // 1. Fetch your live data here
  const withdrawalData = {
    totalRevenue: '750,500',
    totalWithdrawalRequests: 22,
    totalAmountWithdrawn: 18,
    avgProcessingTime: '1 - 3 days',
  };

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
              title="Withdrawal Management"
              breadcrumbs={[]}
              showExportButton={false}
              filterCategories={[{ name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}

            />


          </div>
          
          <div className='flex justify-end mb-6'>
            <button onClick={()=>{navigate('/withdrawal-management-account-no-submission')}} className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2">
              <span>₦ Account Number Verification</span>
            </button>
          </div>
          <WithdrawalStatsCards data={withdrawalData} />
          <UserWithdrawalSettings />
        {/* Tabs */}
      <div className="flex justify-center mb-8 mt-8">
        <div className="inline-flex flex-wrap justify-center gap-2 bg-white rounded-lg shadow-md p-2">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap ${
              activeTab === "All"
                ? "bg-yellow-400 text-black"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            All Withdrawals
          </button>
          <button
            onClick={() => setActiveTab("Pending")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap ${
              activeTab === "Pending"
                ? "bg-yellow-400 text-black"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            Pending Withdrawals
          </button>
        </div>
      </div>
          
          <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
            <ReusableTable
              title=""
              columns={TransactionColumns}
              data={filteredTransactions} // ✅ use state, not static Data
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

