import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSweetAlert } from "../Includes/SweetAlert2";
const BannedUserDetailsCard = ({ user }) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return <div>User details not found.</div>;
  }

  const handleSaveNote = () => {
    if (!note.trim()) {
      alert("Please enter a note before saving.");
      return;
    }

    // Here you can call API to save note if needed
    
    showSweetAlert("Note added successfully!","success");
    setIsNoteModalOpen(false);
    navigate('/user-management-ban-users');
  };

  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold mb-4">Banned user details</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold text-gray-600">Name:</span>
          <span className="text-gray-800"> {user.name}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Email:</span>
          <span className="text-gray-800"> {user.email}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Phone number:</span>
          <span className="text-gray-800"> {user.phoneNumber}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Device:</span>
          <span className="text-gray-800"> {user.device}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Device ID:</span>
          <span className="text-gray-800"> {user.deviceId}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">IP address:</span>
          <span className="text-gray-800"> {user.ipAddress}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Ban reason:</span>
          <span className="text-gray-800"> {user.banReason}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Internal note:</span>
          <span className="text-gray-800"> {user.internalNote}</span>
        </p>
      </div>

      <div className="mt-6 flex">
        <button
          onClick={() => setIsNoteModalOpen(true)}
          className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
        >
          Add note
        </button>
        <button
          onClick={() =>{showSweetAlert("Account unbanned successfully","success");navigate('/user-management-ban-users');} }
          className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ml-2"
        >
          Unban
        </button>
      </div>

      {/* ✅ Modal for Add Note */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Add Internal Note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={4}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannedUserDetailsCard;
