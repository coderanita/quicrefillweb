import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import { showSweetAlert } from "../Includes/SweetAlert2";

export const StaffManagementAddRole = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const [roleTitle, setRoleTitle] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissions, setPermissions] = useState({
    dashboard: true,
    riderManagement: false,
    notifications: true,
    verification: false,
    orderManagement: false,
    revenueManagement: false,
    serviceManagement: false,
    operatingLocations: false,
    userManagement: false,
    feedback: false,
    reportsAnalytics: false,
    auditLogs: false,
    adminManagement: false,
    systemSettings: false,
  });

  const [errors, setErrors] = useState({});

  const permissionList = [
    { key: "dashboard", label: "Dashboard Access" },
    { key: "riderManagement", label: "Rider Management" },
    { key: "notifications", label: "Notifications Panel" },
    { key: "verification", label: "Verification & Compliance" },
    { key: "orderManagement", label: "Order Management" },
    { key: "revenueManagement", label: "Revenue Management" },
    { key: "serviceManagement", label: "Service Management" },
    { key: "operatingLocations", label: "Operating Locations" },
    { key: "userManagement", label: "User Management" },
    { key: "feedback", label: "Feedback" },
    { key: "reportsAnalytics", label: "Reports and Analytics" },
    { key: "auditLogs", label: "Audit Logs & Security" },
    { key: "adminManagement", label: "Admin Management" },
    { key: "systemSettings", label: "System Settings" },
  ];

  const handleCheckboxChange = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!roleTitle.trim()) tempErrors.roleTitle = "Role title is required";
    if (!roleDescription.trim()) tempErrors.roleDescription = "Role description is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // You can call API here
      console.log("Role Data:", { roleTitle, roleDescription, permissions });
      showSweetAlert("Role created successfully", "success");
      navigate("/staff-management");
    }
  };

  const handleCancel = () => {
    navigate("/staff-management");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Add New Role"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Staff Management", href: "/staff-management" },
              { label: "Add New Role" },
            ]}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showExportButton={false}
            showSearchBox={false}
            showBackButton={true}
            showDateSelector={false}
          />

          {/* --- Add Role Form --- */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-6">
            <h2 className="text-2xl font-bold mb-1">Create a New Admin Role</h2>
            <p className="text-gray-600 mb-6">
              Provide all the required information to add a new role
            </p>

            <form onSubmit={handleSave}>
              {/* Role Title */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Role Title<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Enter role title"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
                />
                {errors.roleTitle && <p className="text-red-500 text-xs mt-1">{errors.roleTitle}</p>}
              </div>

              {/* Role Description */}
              <div className="mb-6">
                <label className="block font-semibold mb-1">Role Description<span className="text-red-500">*</span></label>
                <textarea
                  rows="4"
                  placeholder="Provide a description on the role responsibilities"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
                ></textarea>
                {errors.roleDescription && <p className="text-red-500 text-xs mt-1">{errors.roleDescription}</p>}
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Permissions Assignment<span className="text-orange-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {permissionList.map((perm) => (
                    <label key={perm.key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="accent-yellow-400 w-4 h-4"
                        checked={permissions[perm.key]}
                        onChange={() => handleCheckboxChange(perm.key)}
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 rounded-md font-semibold"
                >
                  Save Role
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-md font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
