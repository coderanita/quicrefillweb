import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import DeliveryStatusMap from './DeliveryStatusMap';
import DeliveryZoneConfig from './DeliveryZoneConfig';
import DeliveryRepLeaderboard from './DeliveryRepLeaderboard';
import ReusableTable from '../Includes/ReusableTable'; // Assuming ReusableTable is in the same directory
import { FaTrash, FaEye } from 'react-icons/fa';
import {confirmDelete} from '../Includes/SweetAlert2';
const markers = [
  {
    position: 'top-[20%] left-[30%]',
    color: 'bg-red-500',
    icon: '🛵',
    label: 'Busy',
  },
  {
    position: 'top-[40%] left-[50%]',
    color: 'bg-green-500',
    icon: '✅',
    label: 'Delivered',
  },
  {
    position: 'top-[60%] left-[70%]',
    color: 'bg-yellow-500',
    icon: '⌛',
    label: 'Pending',
  },
];
// Separate data sets for each tab
const pendingOrders = [
  { id: 'ORD1001', customerName: 'John Doe', riderName: 'Salami Ahmed', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Out for delivery', eta: '25/01/27 10:15 AM' },
  { id: 'ORD1003', customerName: 'Cynthia Micheal', riderName: 'Joseph Yemi', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Out for delivery', eta: '25/01/27 09:30 AM' },
  { id: 'ORD1004', customerName: 'Chinedu Kalu', riderName: 'Chinedu Kalu', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Out for delivery', eta: '25/01/26 11:10 AM' },
];

const assignedOrders = [
  { id: 'ORD1002', customerName: 'Salami Ahmed', riderName: 'Cynthia Micheal', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Delivered', eta: '25/01/27 02:45 PM' },
  { id: 'ORD1005', customerName: 'Priscilla Madu', riderName: 'Priscilla Madu', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Delivered', eta: '25/01/24 04:20 PM' },
  { id: 'ORD1006', customerName: 'Joseph Yemi', riderName: 'John Doe', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Delivered', eta: '25/01/24 04:20 PM' },
  { id: 'ORD1007', customerName: 'Joseph Yemi', riderName: 'John Doe', deliveryAddress: 'Third mainland avenue, Ikeja, Lagos', status: 'Out for delivery', eta: '25/01/24 04:20 PM' },
];



export const DeliveryManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const columns = [
  { header: 'Order ID', accessor: 'id' },
  { header: 'Customer Name', accessor: 'customerName' },
  { header: 'Rider Name', accessor: 'riderName' },
  { header: 'Delivery Address', accessor: 'deliveryAddress' },
  {
    header: 'Status',
    accessor: 'status',
    render: (row) => (
      <span
        className={`font-semibold ${
          row.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  { header: 'ETA', accessor: 'eta' },
  {
    header: 'Actions',
    accessor: 'actions',
    render: (row:any) => (
      <div className="flex space-x-2">
        <button className="text-red-500 hover:text-red-700" onClick={() => confirmDelete(setcurrentData, 'id', row.id,"Order")}>
          <FaTrash />
        </button>
        <a href="delivery-management-details.html" className="text-blue-500 hover:text-blue-700 underline">
          View Details
        </a>
      </div>
    ),
  },
];
   const [activeTab, setActiveTab] = useState('pending');

  // Determine which data to display based on the active tab state
  const [currentData,setcurrentData] = useState(activeTab === 'pending' ? pendingOrders : assignedOrders);
  const handleTabActive=(tab)=>{
    setActiveTab(tab);
    setcurrentData(tab === 'pending' ? pendingOrders : assignedOrders);
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
          <PageHeaderWithFilters
            title="Delivery Management"
            breadcrumbs={[]}
            showExportButton={false}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            showSearchBox={true}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
          />
           <DeliveryStatusMap markers={markers} />
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
              <DeliveryZoneConfig/>
              <DeliveryRepLeaderboard/>
           </div>
           <div className="container mx-auto p-4 md:p-6">
      {/* Tab Navigation Section */}
      <div className="flex justify-center items-center mt-6">
        <div className="inline-flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => handleTabActive('pending')}
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === 'pending'
                ? 'text-black bg-yellow-400 hover:bg-yellow-500'
                : 'text-gray-800 bg-white hover:bg-gray-100'
            }`}
          >
            Pending orders
          </button>
          <button
            onClick={() => handleTabActive('assigned')}
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === 'assigned'
                ? 'text-black bg-yellow-400 hover:bg-yellow-500'
                : 'text-gray-800 bg-white hover:bg-gray-100'
            }`}
          >
            Assigned orders
          </button>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6 mt-6">
        <ReusableTable
          title=""
          columns={columns}
          data={currentData} // This prop changes dynamically
          rowsPerPage={5}
          showPagination={true}
        />
      </div>
    </div>
        </main>
      </div>
    </div>
  );
};

 