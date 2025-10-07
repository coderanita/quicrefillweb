import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import NumberCardsGrid from '../Includes/NumberCardsGrid';
import { FaPlus,FaEdit,FaTrash } from 'react-icons/fa';
import {confirmDelete} from '../Includes/SweetAlert2';
import numberCardsData,{orderData} from '../../MockData/AccessoriesData';


import ReusableTable from '../Includes/ReusableTable'; // Assuming ReusableTable is in the same directory

export const AccessoriesManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
   // table data (state-based)
  const [orders,setOrderData] = useState(orderData);

  const columns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Vendor Name", accessor: "vendorName" },
    { header: "Rider Name", accessor: "riderName" },
    { header: "Accessories", accessor: "accessories" },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <span
          className={`font-semibold ${row.status === "Completed"
              ? "text-green-500"
              : row.status === "In Progress"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
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
     render: (row)  => (
          <div className="flex space-x-2">
            <a href={"/accessories-management-manage/"+row.orderId} className="text-gray-500 hover:text-orange-500">
               <FaEdit />
            </a>
            <button className="text-gray-500 hover:text-red-500"  onClick={() => confirmDelete(setOrderData, 'orderId', row.orderId,"Accesory")}>
               <FaTrash />
            </button>
            {/* <a href="" className="text-gray-500 hover:text-gray-700">
               <FaEllipsisV />
            </a> */}
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
            title="Accessories Management"
            breadcrumbs={[]}
            showExportButton={false}
            showSearchBox={true}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            customButton={{
              label: "Add Accessories",
              href: "accessories-management-manage",
              icon: <FaPlus />,
            }}
          />
          <NumberCardsGrid cards={numberCardsData} discType="solid" defaultCardSize={4} />


          <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6 mt-6">
            <ReusableTable
              title="Order Details"
              columns={columns}
              data={orders}
              rowsPerPage={5}
              showPagination={true}
            />
          </div>

        </main>
      </div>
    </div>
  );
};

