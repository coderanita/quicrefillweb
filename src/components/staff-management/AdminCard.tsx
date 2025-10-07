import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2";

const adminsData = [
  {
    adminId: "S1001",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 812 345 6789",
    username: "johndoe_admin",
    status: "Active",
    dateCreated: "10/03/2025 12:30 PM",
    lastLogin: "12/03/2025 09:45 AM",
    tfaEnabled: false,
  },
  {
    adminId: "S1002",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+234 812 987 6543",
    username: "janesmith_admin",
    status: "Inactive",
    dateCreated: "11/03/2025 10:15 AM",
    lastLogin: "13/03/2025 08:20 AM",
    tfaEnabled: true,
  },
  {
    adminId: "S1003",
    fullName: "Peter Jones",
    email: "peter.jones@example.com",
    phone: "+234 803 111 2222",
    username: "peterj_admin",
    status: "Active",
    dateCreated: "15/03/2025 03:00 PM",
    lastLogin: "16/03/2025 11:10 AM",
    tfaEnabled: true,
  },
  {
    adminId: "S1004",
    fullName: "Sarah Connor",
    email: "sarah.connor@example.com",
    phone: "+234 705 333 4444",
    username: "sarahc_admin",
    status: "Suspended",
    dateCreated: "20/03/2025 09:00 AM",
    lastLogin: "20/03/2025 09:00 AM",
    tfaEnabled: false,
  },
  {
    adminId: "S1005",
    fullName: "Michael B. Jordan",
    email: "michael.jordan@example.com",
    phone: "+234 908 555 6666",
    username: "michaelj_admin",
    status: "Active",
    dateCreated: "25/03/2025 02:45 PM",
    lastLogin: "27/03/2025 04:30 PM",
    tfaEnabled: true,
  },
  {
    adminId: "S1006",
    fullName: "Lisa Rodriguez",
    email: "lisa.rodriguez@example.com",
    phone: "+234 810 777 8888",
    username: "lisar_admin",
    status: "Active",
    dateCreated: "01/04/2025 11:00 AM",
    lastLogin: "01/04/2025 11:00 AM",
    tfaEnabled: false,
  }
];

const AdminCard = () => {
  const { id } = useParams(); // get adminId from URL
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Find admin by ID when component mounts
  useEffect(() => {
    const admin = adminsData.find((item) => item.adminId === id);
    setAdminData(admin);
  }, [id]);

  if (!adminData) {
    return <div className="text-gray-700">Admin not found.</div>;
  }

  const handleTfaToggle = () => {
    setAdminData({ ...adminData, tfaEnabled: !adminData.tfaEnabled });
  };

  const handleInputChange = (field, value) => {
    setAdminData({ ...adminData, [field]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save logic here (e.g., API call)
    setIsEditing(false);
    console.log("Saved data:", adminData);
  };

  const handleCancel = () => {
    // Reset to original data from mock array
    const originalAdmin = adminsData.find((item) => item.adminId === id);
    setAdminData(originalAdmin);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{adminData.adminId}</h1>
        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
          <FaCopy className="text-md" />
        </button>
      </div>

      {/* Details Table */}
      <div className="rounded-lg overflow-hidden mb-8">
        <div className="grid grid-cols-2 text-sm bg-gray-100 border-b py-3 px-4 font-semibold text-gray-700">
          <div>Field</div>
          <div>Details</div>
        </div>

        {[
          { label: "Admin ID", field: "adminId" },
          { label: "Full Name", field: "fullName" },
          { label: "Email", field: "email" },
          { label: "Phone Number", field: "phone" },
          { label: "Username", field: "username" },
          { label: "Status", field: "status", textColor: "text-green-500" },
          { label: "Date Created", field: "dateCreated" },
          { label: "Last Login", field: "lastLogin" },
        ].map((item, index) => (
          <div key={index} className={`grid grid-cols-2 border-b py-3 px-4`}>
            <div className="text-gray-700">{item.label}</div>
            <div className={`font-medium ${item.textColor || "text-gray-900"}`}>
              {isEditing && item.field !== "adminId" && item.field !== "status" ? (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={adminData[item.field]}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                />
              ) : (
                adminData[item.field]
              )}
            </div>
          </div>
        ))}

        {/* Two-Factor Authentication */}
        <div className="grid grid-cols-2 py-3 px-4 items-center">
          <div className="text-gray-700">Two-Factor Authentication</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-medium text-sm" id="tfa-status">
              {adminData.tfaEnabled ? "Yes" : "No"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adminData.tfaEnabled}
                onChange={handleTfaToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition w-full"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition w-full"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={handleEditToggle}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition w-full"
          >
            Edit Admin
          </button>
          <button onClick={()=>{showSweetAlert('Staff Deleted..','success'); navigate('/staff-management'); }} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition w-full">
            Delete Admin
          </button>
          <button className="bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 text-gray-800 font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition w-full"
          onClick={()=>showSweetAlert("Sending Reset Password link","info")}
          >
            Reset Password
          </button>
        </div>
      )}

      {!isEditing && (
        <div className="flex justify-start mt-4">
          <button className="bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 text-gray-800 font-bold py-3 px-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition w-full max-w-[calc(33.33%-0.66rem)]"
          onClick={()=>showSweetAlert("Deactivating the admin..","info")}
          >
            Deactivate Admin
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
