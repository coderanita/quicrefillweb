import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import UserStats from "./UserStats";
import {
  FaUserSlash,
  FaUserCheck,
  FaCommentDots,
  FaEnvelope,
} from "react-icons/fa";
import {UserData} from '../../MockData/UserManagmentData';
import ReusableTable from "../Includes/ReusableTable";
import ActionsCell from "./ActionsCell";
import {showSweetAlert,confirmDelete} from '../Includes/SweetAlert2';
import { useNavigate } from 'react-router-dom';

export const UserManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [userData,setUserData]=useState(UserData);
  const userTableColumns = [
   { header: "User ID", accessor: "userId" },
  { header: "Customer Name", accessor: "customerName" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  {
    header: "Acct Status",
    accessor: "status",
    render: (row) => {
      const color =
        row.status === "Active"
          ? "text-green-500"
          : row.status === "Suspended"
          ? "text-red-500"
          : "text-gray-500";
      return <span className={`${color} font-semibold`}>{row.status}</span>;
    },
  },
  { header: "Last Order Date", accessor: "lastOrderDate" },
  { header: "No of Orders", accessor: "orderCount" },
  { header: "Location", accessor: "location" },
  {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <ActionsCell
          row={row}
          onEdit={(row) => navigate(`/user-management-view-user/${row.userId}`)}
          onDelete={(row) => confirmDelete(setUserData, 'userId', row.userId,"User")}
          extraActions={[
            {
              label: "Suspend",
              icon: <FaUserSlash />,
              color: "text-red-500",
              onClick: (row) => showSweetAlert('User Suspended Successfully','success'),
            },
            {
              label: "Reactivate",
              icon: <FaUserCheck />,
              color: "text-green-500",
              onClick: (row) => showSweetAlert('User Reactivated Successfully','success'),
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
                        title="User Management"
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
                    <UserStats/>  
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={userTableColumns}
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

