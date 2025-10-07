import React, { useState, useEffect } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { showSweetAlert } from "../Includes/SweetAlert2";

const rolesData = [
  {
    id: "RL-1001",
    title: "Finance Admin",
    description: "Handles all financial transactions and payment approvals.",
    status: "Active",
    createdAt: "15/02/2025 03:45 PM",
    lastModified: "22/02/2025 10:15 AM",
    permissions: [
      { name: "Revenue Management", checked: true },
      { name: "Order Management", checked: true },
      { name: "Dashboard Access", checked: true },
      { name: "User Management", checked: true },
      { name: "Reporting Access", checked: true },
    ],
  },
  {
    id: "RL-1002",
    title: "HR Admin",
    description: "Manages all HR-related processes.",
    status: "Inactive",
    createdAt: "01/01/2025 09:00 AM",
    lastModified: "15/03/2025 02:30 PM",
    permissions: [
      { name: "Employee Management", checked: true },
      { name: "Payroll Management", checked: false },
      { name: "Recruitment", checked: true },
    ],
  },
  {
    id: "RL-1003",
    title: "Super Admin",
    description: "Full system access and configuration capabilities.",
    status: "Active",
    createdAt: "05/01/2025 10:00 AM",
    lastModified: "04/04/2025 08:00 AM",
    permissions: [
      { name: "All Permissions", checked: true },
    ],
  },
  {
    id: "RL-1004",
    title: "Content Editor",
    description: "Manages and updates website content and media.",
    status: "Active",
    createdAt: "10/03/2025 11:30 AM",
    lastModified: "01/04/2025 05:00 PM",
    permissions: [
      { name: "Content Management", checked: true },
      { name: "Media Library Access", checked: true },
      { name: "User Management", checked: false },
      { name: "Reporting Access", checked: false },
    ],
  },
  {
    id: "RL-1005",
    title: "Support Agent",
    description: "Handles customer queries and provides technical assistance.",
    status: "Active",
    createdAt: "20/03/2025 01:15 PM",
    lastModified: "25/03/2025 09:30 AM",
    permissions: [
      { name: "Ticket Management", checked: true },
      { name: "Customer Data View", checked: true },
      { name: "Product Configuration", checked: false },
    ],
  },
  {
    id: "RL-1006",
    title: "Auditor",
    description: "Read-only access for compliance and system audits.",
    status: "Suspended",
    createdAt: "01/04/2025 07:00 AM",
    lastModified: "01/04/2025 07:00 AM",
    permissions: [
      { name: "Reporting Access", checked: true },
      { name: "Transaction Log View", checked: true },
      { name: "Data Modification", checked: false },
    ],
  },
  {
    id: "RL-1007",
    title: "Marketing Manager",
    description: "Oversees marketing campaigns and performance metrics.",
    status: "Active",
    createdAt: "10/04/2025 11:00 AM",
    lastModified: "12/04/2025 02:00 PM",
    permissions: [
      { name: "Campaign Management", checked: true },
      { name: "Analytics Dashboard", checked: true },
      { name: "Content Management", checked: true },
      { name: "Billing Access", checked: false },
    ],
  },
  {
    id: "RL-1008",
    title: "Developer",
    description: "System maintenance and code deployment.",
    status: "Active",
    createdAt: "05/02/2025 09:30 AM",
    lastModified: "10/04/2025 04:00 PM",
    permissions: [
      { name: "API Access", checked: true },
      { name: "System Configuration", checked: true },
      { name: "Database Access", checked: false },
      { name: "User Data View", checked: true },
    ],
  },
  {
    id: "RL-1009",
    title: "External Consultant",
    description: "Limited access for project-specific collaboration.",
    status: "Inactive",
    createdAt: "01/05/2025 01:00 PM",
    lastModified: "01/05/2025 01:00 PM",
    permissions: [
      { name: "Project View", checked: true },
      { name: "Data Export", checked: false },
      { name: "System Modification", checked: false },
    ],
  },
  {
    id: "RL-1010",
    title: "Sales Executive",
    description: "Manages leads, customer accounts, and sales reporting.",
    status: "Active",
    createdAt: "20/05/2025 08:45 AM",
    lastModified: "21/05/2025 10:00 AM",
    permissions: [
      { name: "CRM Access", checked: true },
      { name: "Sales Reporting", checked: true },
      { name: "Product Configuration", checked: false },
    ],
  }
];

const RoleDetailsCard = () => {
  const { id } = useParams(); // Get role ID from URL
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [lastModified, setLastModified] = useState("");

  const [originalData, setOriginalData] = useState({});

  // Fetch role by ID from mock JSON array
  useEffect(() => {
    const found = rolesData.find((r) => r.id === id);
    if (found) {
      setRole(found);
      setTitle(found.title);
      setDescription(found.description);
      setStatus(found.status);
      setPermissions(found.permissions);
      setLastModified(found.lastModified);
      setOriginalData(found);
    }
  }, [id]);

  if (!role) return <div className="text-center text-gray-500">Role not found</div>;

  const togglePermission = (index) => {
    const updated = [...permissions];
    updated[index].checked = !updated[index].checked;
    setPermissions(updated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(role.id);

    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `Role ID ${role.id} copied to clipboard.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleSave = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", { hour12: true });

    setLastModified(formattedDate);
    setIsEditing(false);
    showSweetAlert('Role details updated successfully.','success');
    
  };

  const handleCancel = () => {
    setTitle(originalData.title);
    setDescription(originalData.description);
    setStatus(originalData.status);
    setPermissions(originalData.permissions);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This role will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        showSweetAlert('Role has been deleted.','success');
        
        setTimeout(() => {
          navigate("/staff-management");
        }, 800);
      }
    });
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-800">{role.id}</h1>
        )}

        <button
          onClick={handleCopy}
          className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <FaCopy />
        </button>
      </div>

      {/* Role Info */}
      <div className="bg-gray-50 rounded-t-lg p-4 grid grid-cols-2 gap-4 text-gray-600 font-medium">
        <div>Field</div>
        <div>Value</div>
      </div>
      <div className="border-t border-gray-200 space-y-2">
        {/* Role Title */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Role Title</div>
          {!isEditing ? <div>{title}</div> : null}
        </div>
        {/* Description */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Description</div>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-1 text-sm"
            />
          ) : (
            <div>{description}</div>
          )}
        </div>
        {/* Status */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Status</div>
          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-1 text-sm w-full"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          ) : (
            <div className={status === "Active" ? "text-green-600" : "text-red-600"}>
              {status}
            </div>
          )}
        </div>
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Date & Time:</div>
          <div>2025-03-11 10:15 AM</div>
        </div>
        {/* Last Modified */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Last Modified</div>
          <div>{lastModified}</div>
        </div>
        {/* Created At */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 text-gray-800 text-sm border-b border-gray-200">
          <div>Date Created</div>
          <div>{role.createdAt}</div>
        </div>
      </div>

      {/* Permissions */}
      <div className="mt-8 flex items-start gap-10">
        <div className="text-gray-500 font-medium pt-1">Permissions Assignment</div>
        <div className="flex flex-col gap-4">
          {permissions.map((perm, index) => (
            <label
              key={index}
              className="flex items-center justify-between gap-4 cursor-pointer"
            >
              <span className="text-black">{perm.name}</span>
              <input
                type="checkbox"
                checked={perm.checked}
                onChange={() => togglePermission(index)}
                disabled={!isEditing}
                className={`w-5 h-5 rounded border border-yellow-400 bg-yellow-200 ${
                  isEditing ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-md shadow hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-yellow-600"
          >
            Edit Role
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 flex items-center gap-2"
        >
          <FaTrash /> Delete Role
        </button>
      </div>
    </div>
  );
};

export default RoleDetailsCard;
