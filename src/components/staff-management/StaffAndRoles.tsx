import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReusableTable from "../Includes/ReusableTable";

const StaffAndRoles = () => {
  const [activeTab, setActiveTab] = useState("staff");

    const staffColumns = [
    { header: "Staff ID", accessor: "staffId" },
    { header: "Date & Time", accessor: "dateTime" },
    { header: "User Name", accessor: "username" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === "Active"
              ? " text-green-700"
              : " text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Last Login", accessor: "lastLogin" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Link
          to={`/staff-management-details/${row.staffId}`}
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          View Details
        </Link>
      ),
    },
  ];

   const roleData = [
    {
      roleId: "RL-1001",
      title: "Super Admin",
      description: "Full system access",
      assignedAdmins: 1,
      permissions: "All Permissions",
      status: "Active",
      actions: "View Details",
    },
    {
      roleId: "RL-1002",
      title: "Order Manager",
      description: "Manages customer orders",
      assignedAdmins: 2,
      permissions: "Orders, Refunds",
      status: "Active",
      actions: "View Details",
    },
    {
      roleId: "RL-1003",
      title: "Finance Admin",
      description: "Handles financial records",
      assignedAdmins: 3,
      permissions: "Transactions, Payments",
      status: "Active",
      actions: "View Details",
    },
    {
      roleId: "RL-1004",
      title: "Security Admin",
      description: "Monitors security logs",
      assignedAdmins: 1,
      permissions: "Audit Logs, Admin Management",
      status: "Inactive",
      actions: "View Details",
    },
    {
      roleId: "RL-1005",
      title: "Support Agent",
      description: "Responds to customer inquiries",
      assignedAdmins: 4,
      permissions: "Tickets, Orders",
      status: "Active",
      actions: "View Details",
    },
  ];

   const staffData = [
    {
      staffId: "S1001",
      dateTime: "25/01/27 02:45 PM",
      username: "admin_john",
      role: "Super Admin",
      status: "Active",
      lastLogin: "192.168.1.15",
      actions: "View Details",
    },
    {
      staffId: "S1002",
      dateTime: "25/01/27 03:05 PM",
      username: "admin_mary",
      role: "Finance Admin",
      status: "Active",
      lastLogin: "192.168.1.16",
      actions: "View Details",
    },
    {
      staffId: "S1003",
      dateTime: "25/01/27 03:20 PM",
      username: "admin_alex",
      role: "Service Admin",
      status: "Active",
      lastLogin: "192.168.1.17",
      actions: "View Details",
    },
    {
      staffId: "S1004",
      dateTime: "25/01/27 03:45 PM",
      username: "admin_mira",
      role: "Support Admin",
      status: "Active",
      lastLogin: "192.168.1.18",
      actions: "View Details",
    },
    {
      staffId: "S1005",
      dateTime: "25/01/27 04:00 PM",
      username: "admin_jane",
      role: "User Admin",
      status: "Active",
      lastLogin: "192.168.1.19",
      actions: "View Details",
    },
    {
      staffId: "S1006",
      dateTime: "25/01/27 04:15 PM",
      username: "admin_james",
      role: "Operations Admin",
      status: "Active",
      lastLogin: "192.168.1.20",
      actions: "View Details",
    },
  ];


  const roleColumns = [
    { header: "Role ID", accessor: "roleId" },
    { header: "Role Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Assigned Admins", accessor: "assignedAdmins" },
    { header: "Permissions", accessor: "permissions" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === "Active"
              ? "text-green-700"
              : " text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Link
          to={`/staff-management-role-details/${row.roleId}`}
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          View Details
        </Link>
      ),
    },
  ];

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto mt-6 bg-white rounded-lg shadow-md p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`text-xs py-2 px-4 text-base font-semibold focus:outline-none ${
            activeTab === "staff"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("staff")}
        >
          Staff List
        </button>
        <button
          className={`text-xs py-2 px-4 text-base font-semibold focus:outline-none ${
            activeTab === "roles"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          Roles
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {activeTab === "staff" ? (
          <ReusableTable title="" columns={staffColumns} data={staffData} />
        ) : (
          <ReusableTable title="" columns={roleColumns} data={roleData} />
        )}
      </div>
    </div>
  );
};

export default StaffAndRoles;
