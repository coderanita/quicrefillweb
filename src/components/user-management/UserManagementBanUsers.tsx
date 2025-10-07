import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';

import {banUserDetails} from '../../MockData/UserManagmentData';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";
import { showSweetAlert } from '../Includes/SweetAlert2';
export const UserManagementBanUsers = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [BanUserDetails]=useState(banUserDetails);
const userBanColumns = [
  {
    header: "Account ID",
    accessor: "accountId",
  },
  {
    header: "Customer Name",
    accessor: "customerName",
  },
  {
    header: "Device ID",
    accessor: "deviceId",
  },
  {
    header: "Ban Reason",
    accessor: "banReason",
  },
  {
    header: "Date Banned",
    accessor: "dateBanned",
  },
  {
    header: "Action",
    accessor: "action",
    render: (row) => (
      <div className="flex space-x-2">
      
        <button
          onClick={() => showSweetAlert("Account unbanned successfully","success") }
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md text-xs"
        >
          Unban
        </button>
          <button
          onClick={() => navigate(`/user-management-ban-user-details/${row.accountId}`)}
          className="text-blue-500 hover:underline"
        >
          View Details
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
                    <PageHeaderWithFilters
                        title=""
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
                        showBackButton={true}
                        onBackClick={()=>{navigate('/user-management')}}


                    />  
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                          <div className="border rounded-lg p-4 bg-white shadow-sm relative">
                              <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1 overflow-hidden">
                                      <div className="flex items-center gap-2 flex-nowrap">
                                          <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                                              Total Banned Acoounts</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">50</p>
                          </div>
                      
                          <div className="border rounded-lg p-4 bg-white shadow-sm relative">
                              <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1 overflow-hidden">
                                      <div className="flex items-center gap-2 flex-nowrap">
                                          <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                                              Total Banned Devices</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">20</p>
                          </div>
                      
                          <div className="border rounded-lg p-4 bg-white shadow-sm relative">
                              <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1 overflow-hidden">
                                      <div className="flex items-center gap-2 flex-nowrap">
                                          <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                                              Most Common Reason</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                                   <p className="text-sm text-gray-500">Fraud</p>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">60%</p>
                          </div>
                      </div>
                    
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={userBanColumns}
                            data={BanUserDetails}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div> 
                </main>
            </div>
        </div>
    );
};

