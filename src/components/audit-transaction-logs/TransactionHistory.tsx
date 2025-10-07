import React, { useState } from "react";
import {
  FaSyncAlt,
  FaSearch,
  FaFileAlt,
  FaEdit,
} from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2";

const INITIAL_AUDIT_TRAIL = [
  {
    id: 1,
    date: "2025-03-11 10:15 AM",
    action: "Transaction Initiated",
    by: "System",
    notes: "-",
  },
  {
    id: 2,
    date: "2025-03-11 10:16 AM",
    action: "Payment Confirmed",
    by: "System",
    notes: "Auto-processing successful",
  },
  {
    id: 3,
    date: "2025-03-11 10:17 AM",
    action: "Commission Deducted",
    by: "System",
    notes: "₦50,000 deducted as commission",
  },
  {
    id: 4,
    date: "2025-03-11 10:18 AM",
    action: "Transaction Completed",
    by: "System",
    notes: "Final confirmation",
  },
];

const TransactionHistory: React.FC = () => {
  const [auditTrail, setAuditTrail] = useState(INITIAL_AUDIT_TRAIL);
  const [selected, setSelected] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Toggle checkbox selection
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Start editing notes
  const handleEditClick = () => {
    if (selected.length !== 1) {
      showSweetAlert("Please select exactly one record to edit.",'error');
      return;
    }
    const record = auditTrail.find((r) => r.id === selected[0]);
    if (record) {
      setEditValue(record.notes);
      setIsEditing(true);
    }
  };

  // Save edited note
  const handleSaveNote = () => {
    setAuditTrail((prev) =>
      prev.map((record) =>
        selected.includes(record.id)
          ? { ...record, notes: editValue }
          : record
      )
    );
    setIsEditing(false);
    showSweetAlert('Notes Saved','success');
    setSelected([]);
  };

  return (
    <div className="w-full">
      {/* Transaction History Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Transaction History (Audit Trail)
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left text-gray-600 text-sm">
              <tr>
                <th className="p-3 font-semibold">Select</th>
                <th className="p-3 font-semibold">Date & Time</th>
                <th className="p-3 font-semibold">Action Performed</th>
                <th className="p-3 font-semibold">Performed By</th>
                <th className="p-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {auditTrail.map((log) => (
                <tr
                  key={log.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(log.id)}
                      onChange={() => toggleSelect(log.id)}
                    />
                  </td>
                  <td className="p-3">{log.date}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.by}</td>
                  <td className="p-3">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-start gap-4 mt-6">
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-400 font-medium bg-gray-200 cursor-not-allowed"
          disabled
        >
          <FaSyncAlt />
          <span>Retry Transaction</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 transition-all duration-200">
          <FaSearch />
          <span>Investigate Dispute</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 transition-all duration-200">
          <FaFileAlt />
          <span>Generate Report</span>
        </button>

        <button
          onClick={handleEditClick}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 transition-all duration-200"
        >
          <FaEdit />
          <span>Edit Notes</span>
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Notes</h3>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={4}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
