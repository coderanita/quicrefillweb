
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import { useNavigate } from "react-router-dom";
import CouponDetails from "./CouponDetails";

export const CouponManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {

  const navigate=useNavigate();


  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Coupon Details"
            breadcrumbs={[]}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            showExportButton={false}
            showSearchBox={true}
            showBackButton={true}
            onBackClick={()=> navigate('/system-coupon-settings')}
          />

      <CouponDetails />
        
        </main>
      </div>
    </div>
  );
};
