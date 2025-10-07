

import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
import {TransactionData} from '../../MockData/UserManagmentData';
import ReusableTable from "../Includes/ReusableTable";
import UserProfile from "./UserProfile";
import ActionsCell from "./ActionsCell";
import {
  FaUserSlash,
  FaUserCheck,
  FaCommentDots,
  FaEnvelope,
} from "react-icons/fa";
import {showSweetAlert,confirmDelete} from '../Includes/SweetAlert2';

export const ViewUser = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const [transactionData,setTransactionData]=useState(TransactionData);
  const navigate = useNavigate();
const transactionTableColumns = [
  { header: "Transaction ID", accessor: "transactionId" },
  { header: "Type", accessor: "type" },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <span
        className={`${
          row.status === "Completed"
            ? "text-green-500"
            : row.status === "In Progress"
            ? "text-yellow-500"
            : "text-red-500"
        } font-semibold`}
      >
        {row.status}
      </span>
    ),
  },
  { header: "Payment", accessor: "payment" },
  { header: "Amount", accessor: "amount" },
  { header: "Date", accessor: "date" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <ActionsCell
          row={row}
          onEdit={(row) => {
            if (row.transactionId.startsWith("ORD")) {
              navigate(`/order-management-details/${row.transactionId}`);
            } else if (row.transactionId.startsWith("WAL")) {
              navigate(`/withdrawal-management-details/${row.transactionId}`);
            } 
          }}
          onDelete={(row) => confirmDelete(setTransactionData, 'transactionId', row.transactionId,"Tranaction")}
          extraActions={[
            {
              label: "Suspend",
              icon: <FaUserSlash />,
              color: "text-red-500",
              onClick: (row) => showSweetAlert('Tranaction Suspended Successfully','success'),
            },
            {
              label: "Reactivate",
              icon: <FaUserCheck />,
              color: "text-green-500",
              onClick: (row) => showSweetAlert('Tranaction Reactivated Successfully','success'),
            },
            {
              label: "Message",
              icon: <FaCommentDots />,
              color: "text-blue-500",
              onClick: (row) => showSweetAlert('Message Send Sucessfully','success'),
            },
            {
              label: "Send Email",
              icon: <FaEnvelope />,
              color: "text-amber-500",
              onClick: (row) => showSweetAlert('Email Send Sucessfully','success'),
            },
          ]}
        />
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
                        title=""
                        breadcrumbs={[]}
                        showExportButton={false}
                        
                        filterCategories={[]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={false}
                          showDateSelector={false}
                          showFilterDropdown={false}                          
                          showBackButton={true}
                          onBackClick={() => navigate('/user-management')}

                    />
                    <UserProfile/>
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                          <ReusableTable
  
                              title=""
                              columns={transactionTableColumns}
                              data={transactionData}
  
                              rowsPerPage={8}
                              showPagination={true}
                          />
                      </div>
                </main>
            </div>
        </div>
    );
};

