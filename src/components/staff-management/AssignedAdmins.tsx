import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import { showSweetAlert } from "../Includes/SweetAlert2";

// Mock staff list (for adding)
const staffList = [
  { id: "S1001", name: "John Doe", email: "john@example.com" },
  { id: "S1002", name: "Jane Smith", email: "jane@example.com" },
  { id: "S1003", name: "Michael Brown", email: "michael@example.com" },
  { id: "S1004", name: "Alice Green", email: "alice@example.com" },
];

const AssignedAdmins = () => {
  const [admins, setAdmins] = useState(staffList.slice(0, 3)); // Initial assigned admins
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedStaffToAdd, setSelectedStaffToAdd] = useState("");

  const toggleSelectAdmin = (id) => {
    if (selectedAdmins.includes(id)) {
      setSelectedAdmins(selectedAdmins.filter((a) => a !== id));
    } else {
      setSelectedAdmins([...selectedAdmins, id]);
    }
  };

  const handleAddAdmin = () => {
    if (!selectedStaffToAdd) {
        showSweetAlert("Please select a staff to assign.", "warning");
      
      return;
    }
    const staff = staffList.find((s) => s.id === selectedStaffToAdd);
    if (admins.find((a) => a.id === staff.id)) {
          showSweetAlert("This staff is already assigned.", "info");
       
      return;
    }
    setAdmins([...admins, staff]);
    setShowAddPopup(false);
    setSelectedStaffToAdd("");
    showSweetAlert(`${staff.name} has been assigned.`, "success");
    
  };

  const handleRemoveAdmins = () => {
    if (selectedAdmins.length === 0) {
        showSweetAlert("Please select admins to remove.", "warning");
      
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are removing ${selectedAdmins.length} admin(s).`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmins(admins.filter((a) => !selectedAdmins.includes(a.id)));
        setSelectedAdmins([]);
          showSweetAlert("Selected admins have been removed.", "success");
        
      }
    });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col space-y-6">
      {/* Table */}
      <div className="w-full max-w-full bg-white border rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Admins Section</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-500 text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">Select</th>
                <th scope="col" className="px-6 py-3">Admin ID</th>
                <th scope="col" className="px-6 py-3">Admin Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAdmins.includes(admin.id)}
                      onChange={() => toggleSelectAdmin(admin.id)}
                      className="w-4 h-4 text-yellow-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{admin.id}</td>
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Active</td>
                  <td className="px-6 py-4">
                    <a href={"/staff-management-details/"+admin.id} className="text-blue-600 hover:underline">View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowAddPopup(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        >
          <FaPlus className="w-5 h-5 border border-black rounded-lg p-1" /> Assign Admins
        </button>

        <button
          onClick={handleRemoveAdmins}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        >
          <FaMinus className="w-5 h-5 border border-black rounded-lg p-1" /> Remove Admins
        </button>
      </div>

      {/* Add Admin Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold">Assign Admin</h3>
            <select
              className="w-full border rounded p-2"
              value={selectedStaffToAdd}
              onChange={(e) => setSelectedStaffToAdd(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.id} - {staff.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAdmin}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedAdmins;
