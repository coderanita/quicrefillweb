import React, { useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import ReusableTable from "../Includes/ReusableTable"; // adjust import path

const ComplianceDocuments = () => {
  // Sample data
  const [documents] = useState([
    {
      id: "VER786393",
      vendor: "N/A",
      business: "Safety Certification",
      region: "N/A",
      status: "Pending",
    },
    {
      id: "VER7860173",
      vendor: "N/A",
      business: "Quality Assurance Report",
      region: "N/A",
      status: "Pending",
    },
    {
      id: "VER7860328",
      vendor: "N/A",
      business: "Vendor Business Registration",
      region: "N/A",
      status: "Pending",
    },
    {
      id: "VER7860749",
      vendor: "N/A",
      business: "State Registration Certification",
      region: "N/A",
      status: "Pending",
    },
  ]);

  // Columns config for ReusableTable
  const PendingServicecolumns = [
    { accessor: "id", header: "Vendor ID" },
    { accessor: "vendor", header: "Vendor Name" },
    { accessor: "business", header: "Business Name" },
    { accessor: "region", header: "Region" },
    {
      accessor: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`font-semibold ${
            row.status === "Pending" ? "text-green-500" : "text-red-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      accessor: "actions",
      header: "Actions",
      render: (row) => (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: "Preview Documents",
              text: `Showing compliance documents for ${row.business}`,
              icon: "info",
              confirmButtonText: "Close",
            });
          }}
          className="text-blue-500 hover:underline"
        >
          Preview Documents
        </a>
      ),
    },
  ];

  const handleDownload = () => {
    Swal.fire({
      title: "Download Documents",
      text: "All compliance documents are being prepared for download.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleRequestDocs = () => {
    Swal.fire({
      title: "Request Additional Documents",
      text: "Your request for additional compliance documents has been sent.",
      icon: "info",
      confirmButtonText: "Got it",
    });
  };

  return (
    <div>
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Compliance Documents Submitted
            </h1>
          </div>

          {/* Reusable Table */}
          <ReusableTable
            title=""
            columns={PendingServicecolumns}
            data={documents}
            rowsPerPage={5}
            showPagination={true}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleDownload}
          className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center gap-2"
        >
          <FaDownload /> Download Documents
        </button>

        <button
          onClick={handleRequestDocs}
          className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-5 h-5 border border-black rounded-lg">
            <FaPlus size={12} />
          </div>
          Request Additional Compliance Documents
        </button>
      </div>
    </div>
  );
};

export default ComplianceDocuments;
