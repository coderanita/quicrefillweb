
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";

import { useNavigate, useParams } from "react-router-dom";
import AdminCard from "./AdminCard";
import RolesTable from "./RolesTable";
import ActivitySection from "./ActivitySection";
import RoleDetails from "./RoleDetailsCard";
import AssignedAdmins from "./AssignedAdmins";

export const StaffManagementRoleDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const {id} = useParams();
  const navigate=useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Role Details"
            breadcrumbs={[{label:"Dasboard",href:"/dashboard"},
              {label:"Staff Management",href:"/staff-management"},
              {label:"Role Management"},
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
          <RoleDetails/>
          <AssignedAdmins/>
        </main>
      </div>
    </div>
  );
};
