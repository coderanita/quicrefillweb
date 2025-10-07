import React, { useState } from "react";
import { FaPlus, FaMinus, FaSync } from "react-icons/fa";
import Swal from "sweetalert2";
import {showSweetAlert} from "../Includes/SweetAlert2";
const AssignedReps = () => {
  const [reps, setReps] = useState([
    {
      id: 1,
      name: "John Doe",
      contact: "+234 701 234 5678",
      date: "11/03/2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "+234 802 765 4321",
      date: "11/03/2025",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRep, setNewRep] = useState({ name: "", contact: "" });
  const [selected, setSelected] = useState([]); // selected row IDs

  // Validate Name & Contact
  const validateRep = () => {
    if (!newRep.name.trim()) {
      showSweetAlert("Name is required", "error");

      return false;
    }
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/; // basic phone validation
    if (!phoneRegex.test(newRep.contact)) {
      showSweetAlert("Enter a valid phone number", "error");
      return false;
    }
    return true;
  };

  // Add Rep
  const handleAddRep = () => {
    if (!validateRep()) return;
    const repToAdd = {
      id: reps.length + 1,
      name: newRep.name.trim(),
      contact: newRep.contact.trim(),
      date: new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
      status: "Active",
    };
    setReps([...reps, repToAdd]);
    setShowModal(false);
    setNewRep({ name: "", contact: "" });
    showSweetAlert("Rep added successfully!", "success");
  };

  // Delete Selected Reps
  const handleDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Selected reps will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove them!",
    }).then((result) => {
      if (result.isConfirmed) {
        setReps(reps.filter((rep) => !selected.includes(rep.id)));
        setSelected([]);
        showSweetAlert("Selected reps removed.", "success");
      }
    });
  };

  // Toggle Status of selected
  const handleToggleStatusSelected = () => {
    setReps(
      reps.map((rep) =>
        selected.includes(rep.id)
          ? { ...rep, status: rep.status === "Active" ? "Inactive" : "Active" }
          : rep
      )
    );
   showSweetAlert("Status updated for selected reps.", "success");
  };

  // Handle row checkbox change
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className=" overflow-hidden">
        {/* Card Header */}
        <div className="">
          <h2 className="text-lg font-semibold text-gray-800">
            Assigned Service Representatives (Riders / Delivery Reps)
          </h2>
        </div>

        <div className="p-2 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                <th className="p-3"></th>
                <th className="p-3">Rep Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Assigned Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reps.map((rep) => (
                <tr
                  key={rep.id}
                  className="border-t text-gray-700 hover:bg-gray-100"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(rep.id)}
                      onChange={() => toggleSelect(rep.id)}
                    />
                  </td>
                  <td className="p-3">{rep.name}</td>
                  <td className="p-3">{rep.contact}</td>
                  <td className="p-3">{rep.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      rep.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {rep.status}
                  </td>
                  <td className="p-3">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-blue-500 hover:underline"
                    >
                      View Profile
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-5 h-5 border border-black rounded-lg">
            <FaPlus size={12} />
          </div>
          Assign a New Rep
        </button>

        {selected.length > 0 && (
          <>
            <button
              onClick={handleDeleteSelected}
              className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-5 h-5 border border-black rounded-lg">
                <FaMinus size={12} />
              </div>
              Remove Selected Reps
            </button>

            <button
              onClick={handleToggleStatusSelected}
              className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-lg">
                <FaSync size={12} />
              </div>
              Change Status of Selected
            </button>
          </>
        )}
      </div>

      {/* Modal for Adding Rep */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Rep</h3>
            <input
              type="text"
              placeholder="Enter name"
              value={newRep.name}
              onChange={(e) => setNewRep({ ...newRep, name: e.target.value })}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="text"
              placeholder="Enter contact number"
              value={newRep.contact}
              onChange={(e) => setNewRep({ ...newRep, contact: e.target.value })}
              className="border p-2 rounded w-full mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRep}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
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

export default AssignedReps;
