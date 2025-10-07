
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';

import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import {OrderDetailsCard} from './';
import {allOrderDetails } from "../../MockData/orderData";
export const OrderDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const order = allOrderDetails.find(order => order.id === id);

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
            showBackButton={true}
            showDateSelector={false}
            onBackClick={()=>{navigate('/order-management');} }
          />
           
           {/* 🔁 Conditional Rendering */}
        {order ? (
          <OrderDetailsCard data={order} />
        ) : (
          <div className="text-center mt-10 text-red-600 font-semibold">
            Order not found for ID: {id}
          </div>
        )}
          
        </main>
      </div>
    </div>
  );
};

 