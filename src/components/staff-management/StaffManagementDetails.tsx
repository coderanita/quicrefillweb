
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";

import { useNavigate, useParams } from "react-router-dom";
import AdminCard from "./AdminCard";
import RolesTable from "./RolesTable";
import ActivitySection from "./ActivitySection";

export const StaffManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const {id} = useParams();
  const navigate=useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Staff Details"
            breadcrumbs={[{label:"Dasboard",href:"/dashboard"},
              {label:"Staff Management",href:"/staff-management"},
              {label:""+id},

            ]}
            filterCategories={[
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            showExportButton={false}
            showDateSelector={false}
            showBackButton={true}
            onBackClick={()=>{navigate('/staff-management')}}
          />
          <AdminCard/>
          <RolesTable/>
          <ActivitySection/>
        </main>
      </div>
    </div>
  );
};
