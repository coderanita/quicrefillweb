import React, { useState } from "react";
import { FaCheckSquare, FaTimesCircle, FaMinus,FaPlus } from "react-icons/fa";

// Initial assigned roles
const initialRoles = [
  {
    roleId: "RL-1001",
    title: "Super Admin",
    description: "Full system access",
    assignedSince: "10/03/2025",
    permissions: ["All Permissions"],
  },
  {
    roleId: "RL-1003",
    title: "Finance Admin",
    description: "Manages transactions & refunds",
    assignedSince: "11/03/2025",
    permissions: ["Payments", "Reports"],
  },
];

// Available roles to assign
const availableRoles = [
  { roleId: "RL-1002", title: "Support Admin", description: "Handles support queries", permissions: ["Support"] },
  { roleId: "RL-1004", title: "Marketing Admin", description: "Manages campaigns", permissions: ["Campaigns"] },
  { roleId: "RL-1005", title: "HR Admin", description: "Manages HR tasks", permissions: ["Employee Management"] },
  { roleId: "RL-1006", title: "IT Admin", description: "Manages IT infrastructure", permissions: ["IT Support"] },
  { roleId: "RL-1007", title: "Logistics Admin", description: "Handles shipping & deliveries", permissions: ["Orders", "Shipping"] },
];

const RolesTable = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveMode, setShowRemoveMode] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState("");

  // Toggle checkbox for removing roles
  const handleRemoveCheckbox = (roleId) => {
    setSelectedToRemove((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]
    );
  };

  // Remove selected roles
  const handleRemoveRoles = () => {
    setRoles(roles.filter((r) => !selectedToRemove.includes(r.roleId)));
    setSelectedToRemove([]);
    setShowRemoveMode(false);
  };

  // Add selected role from dropdown
  const handleAddRole = () => {
    if (!selectedRoleToAdd) return;

    const roleToAdd = availableRoles.find((r) => r.roleId === selectedRoleToAdd);

    // Prevent adding duplicate roles
    if (roles.some((r) => r.roleId === roleToAdd.roleId)) {
      alert("Role already assigned!");
      return;
    }

    const newRole = { ...roleToAdd, assignedSince: new Date().toLocaleDateString() };
    setRoles([...roles, newRole]);
    setSelectedRoleToAdd("");
    setShowAddModal(false);
  };

  return (
    <div>
      {/* Card Container */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Role & Permissions Section</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs">
              <tr>
                {showRemoveMode && <th className="px-4 py-3">Select</th>}
                <th className="px-4 py-3">Role ID</th>
                <th className="px-4 py-3">Role Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Assigned Since</th>
                <th className="px-4 py-3">Permissions Overview</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.roleId} className="border-b">
                  {showRemoveMode && (
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedToRemove.includes(role.roleId)}
                        onChange={() => handleRemoveCheckbox(role.roleId)}
                      />
                    </td>
                  )}
                  <td className="px-4 py-2">{role.roleId}</td>
                  <td className="px-4 py-2">{role.title}</td>
                  <td className="px-4 py-2">{role.description}</td>
                  <td className="px-4 py-2">{role.assignedSince}</td>
                  <td className="px-4 py-2">
                    {role.permissions.map((perm, idx) =>
                      perm.toLowerCase() === "refunds" ? (
                        <span key={idx} className="flex items-center gap-1">
                          <FaTimesCircle className="text-red-600" /> {perm}
                        </span>
                      ) : (
                        <span key={idx} className="flex items-center gap-1">
                          <FaCheckSquare className="text-green-600" /> {perm}
                        </span>
                      )
                    )}
                  </td>
                  <td className="px-4 py-2 text-blue-600 underline cursor-pointer"><a href={"/staff-management-role-details/"+role.roleId}>View Details</a> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        >
          <FaPlus className="border border-black rounded-full w-5 h-5 flex items-center justify-center text-sm" />
          Assign New Role
        </button>

        <button
          onClick={() => setShowRemoveMode(!showRemoveMode)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        >
          <FaMinus className="border border-black rounded-full w-5 h-5 flex items-center justify-center text-sm" />
          Remove Role
        </button>

        {showRemoveMode && (
          <button
            onClick={handleRemoveRoles}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Confirm Remove
          </button>
        )}
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Assign New Role</h3>
            <div className="flex flex-col gap-3">
              <select
                value={selectedRoleToAdd}
                onChange={(e) => setSelectedRoleToAdd(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              >
                <option value="">-- Select Role --</option>
                {availableRoles.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.title} - {role.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesTable;
