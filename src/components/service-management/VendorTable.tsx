import { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import ReusableTable from "../Includes/ReusableTable";
import {confirmSuspend} from "../Includes/SweetAlert2";
// Dummy Vendor Data
const vendorData = [
  {
    id: "VND-00123",
    vendor: "John Doe",
    businessName: "Supreme Gas Ltd",
    region: "Lagos",
    status: "Active",
  },
  {
    id: "VND-00456",
    vendor: "Jane Smith",
    businessName: "Power Energy Co",
    region: "Abuja",
    status: "Suspended",
  },
  {
    id: "VND-00789",
    vendor: "Michael Brown",
    businessName: "QuickFuel Services",
    region: "Kano",
    status: "Inactive",
  },
];

export default function VendorTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Toggle row selection
  const toggleSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const columns = [
    {
      header: "",
      accessor: "checkbox",
      render: (row: any) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleSelection(row.id)}
        />
      ),
    },
    { header: "Vendor ID", accessor: "id" },
    { header: "Vendor Name", accessor: "vendor" },
    { header: "Business Name", accessor: "businessName" },
    { header: "Region", accessor: "region" },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <span
          className={`font-semibold ${row.status === "Active"
              ? "text-green-500"
              : row.status === "Suspended"
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row: any) => (
        <a
          href={`/vendor/${row.id}`}
          className="text-blue-500 hover:underline"
        >
          View Vendor Profile
        </a>
      ),
    },
  ];

  return (
    <div >
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Vendor Associated with This Service
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <ReusableTable
              title=""
              columns={columns}
              data={vendorData}
              rowsPerPage={5}
              showPagination={true}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons (only show if at least one row is selected) */}
      {selectedRows.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 mb-6">
          <button className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2" onClick={()=>{confirmSuspend(()=>{},"Venodor ")}}>
            <FaTimes /> Suspend Vendor
          </button>
          <button className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2">
            <FaEdit /> Update Vendor
          </button>
        </div>
      )}
    </div>

  );
}
