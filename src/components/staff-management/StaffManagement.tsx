
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import StaffSummaryCards from "./StaffSummaryCards";

import { FaUserPlus, FaUserCog } from "react-icons/fa";
import StaffAndRoles from "./StaffAndRoles";
export const StaffManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Staff Management"
            breadcrumbs={[]}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            showExportButton={false}
            showSearchBox={true}
          />
          <StaffSummaryCards />
          <div className="container mx-auto mt-6 text-xs">
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mb-2">
              <a href="/staff-management-add" className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-semibold py-3 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                <FaUserPlus className="mr-2 text-gray-600" />
                Add Staff Account
              </a>

              <a href="/staff-management-add-role" className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-semibold py-3 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                <FaUserCog className="mr-2 text-gray-600" />
                Create New Role
              </a>
            </div>
          </div>
          <StaffAndRoles />
        </main>
      </div>
    </div>
  );
};
