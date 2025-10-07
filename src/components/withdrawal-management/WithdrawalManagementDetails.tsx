import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { TransactionData } from '../../MockData/WithdrawalData';
import WithdrawalDetails from './WithdrawalDetails';
import { FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";

export const WithdrawalManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(TransactionData);



  

  const TransactionColumns = [
  { header: "Transaction ID", accessor: "transactionId" },
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
    render: (row) => (
      <div className="flex items-center space-x-2">
        {/* Edit Button */}
        <button
          onClick={() => console.log("Edit", row.transactionId)}
          className="text-blue-500 hover:text-blue-700 p-1 rounded"
        >
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => console.log("Delete", row.transactionId)}
          className="text-red-500 hover:text-red-700 p-1 rounded"
        >
          <FaTrash />
        </button>

        {/* Ellipsis / More */}
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
          <FaEllipsisH />
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
              title=""
              breadcrumbs={[]}
              showExportButton={false}
              
              filterCategories={[{ name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}
              showBackButton={true}
              onBackClick={()=>{navigate('/withdrawal-management')}}

            />


          </div>
          
         
         
      <WithdrawalDetails/>
          
          <div className="max-w-3xl bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
            <ReusableTable
              title="Transaction history"
              columns={TransactionColumns}
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

