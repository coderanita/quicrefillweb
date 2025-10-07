import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';

import {complaintData} from '../../MockData/UserManagmentData';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";
export const UserManagementComplaint = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
    const [ComplaintData,setComplaintData]=useState(complaintData);
  const orderTableColumns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Issue Type", accessor: "issueType" },
    { header: "Status", accessor: "status" },
    { header: "Priority", accessor: "priority" },
    { header: "Date Created", accessor: "dateCreated" },
    {
      header: "Action",
      accessor: "actions",
      render: (row) => (
        <button
          onClick={() => navigate(`/user-management-complaint-details/${row.orderId}`)}
          className="text-blue-500 hover:underline"
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
                                              Total Pending Complaints</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">15</p>
                          </div>
                      
                          <div className="border rounded-lg p-4 bg-white shadow-sm relative">
                              <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1 overflow-hidden">
                                      <div className="flex items-center gap-2 flex-nowrap">
                                          <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                                              Total Unresolved Complaints</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">10</p>
                          </div>
                      
                          <div className="border rounded-lg p-4 bg-white shadow-sm relative">
                              <div className="mb-2">
                                  <div className="flex items-center justify-between mb-1 overflow-hidden">
                                      <div className="flex items-center gap-2 flex-nowrap">
                                          <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                                              Avg. Resolution Time</h2>
                                      </div>
                                      <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />

                                  </div>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">2-5 days</p>
                          </div>
                      </div>
                    
                     <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={orderTableColumns}
                            data={ComplaintData}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div> 
                </main>
            </div>
        </div>
    );
};

