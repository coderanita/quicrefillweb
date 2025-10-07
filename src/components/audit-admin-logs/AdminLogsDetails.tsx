import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import {
  FaBookmark,
  FaFileAlt,
  FaHeadset,
  FaDownload,
  FaFlag,
} from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2"; // ✅ import

// 🔹 Mock JSON logs data
const MOCK_LOGS = [
  {
    logId: "L1001",
    dateTime: "25/01/27 02:45 PM",
    adminUser: "admin_john",
    activityDescription:
      "Updated order #ORD12345 status from Pending to Completed",
    moduleAffected: "Orders",
    ipAddress: "192.168.1.15",
    additionalNotes: "No additional note",
  },
  {
    logId: "L1002",
    dateTime: "25/01/27 05:20 PM",
    adminUser: "admin_sara",
    activityDescription: "Deleted user #U5001 due to policy violation",
    moduleAffected: "Users",
    ipAddress: "192.168.1.22",
    additionalNotes: "User reported multiple times.",
  },
  {
    logId: "L1003",
    dateTime: "26/01/27 09:10 AM",
    adminUser: "admin_alex",
    activityDescription: "Created new product SKU #PROD8877",
    moduleAffected: "Products",
    ipAddress: "10.0.0.1",
    additionalNotes: "New line item for summer catalog.",
  },
  {
    logId: "L1004",
    dateTime: "26/01/27 11:35 AM",
    adminUser: "admin_john",
    activityDescription: "Processed refund for transaction #TXN45601",
    moduleAffected: "Payments",
    ipAddress: "192.168.1.15",
    additionalNotes: "Customer requested full refund.",
  },
  {
    logId: "L1005",
    dateTime: "26/01/27 01:40 PM",
    adminUser: "admin_sara",
    activityDescription: "Granted 'SuperAdmin' role to user #U5005",
    moduleAffected: "Security",
    ipAddress: "192.168.1.22",
    additionalNotes: "Approved by management via email.",
  },
];

export const AdminlogsDetails = ({
  userId,
  sidebarCollapsed,
  toggleSidebar,
}) => {
  const { id } = useParams(); // get logId from URL
  const navigate = useNavigate();
  const [logs] = useState(MOCK_LOGS);

  // find log by id
  const log = logs.find((l) => l.logId === id);

  // ✅ handlers for buttons
  const handleOrderStatus = () =>
    showSweetAlert("This will open the order status details.", "info");

  const handleAddComments = () =>
    showSweetAlert("Here you can add admin comments/notes.", "warning");

  const handleContactSupport = () =>
    showSweetAlert( "Redirecting to support team...", "info");

  const handleDownloadLog = () =>
    showSweetAlert( "Log entry will be downloaded as file.", "success");

  const handleReportInvestigation = () =>
    showSweetAlert("This log is flagged for investigation.", "error");

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userId={userId}
      />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-hidden">
          <PageHeaderWithFilters
            title="Audit Log Entry Details"
            breadcrumbs={[
              {
                label:
                  "Review the details of this admin activity log entry below.",
              },
            ]}
            showExportButton={false}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showDateSelector={false}
            showBackButton={true}
            onBackClick={() => {
              navigate("/audit-admin-logs");
            }}
          />

          {/* If log not found */}
          {!log ? (
            <div className="p-6 text-red-500 font-semibold">Log ID not found</div>
          ) : (
            <div className="p-6">
              {/* Details Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Log ID: {log.logId}
                </h2>

                <div className="space-y-4">
                  {[
                    { label: "Date & Time:", value: log.dateTime },
                    { label: "Admin User:", value: log.adminUser },
                    {
                      label: "Activity Description:",
                      value: log.activityDescription,
                    },
                    { label: "Module Affected:", value: log.moduleAffected },
                    { label: "IP Address:", value: log.ipAddress },
                    { label: "Additional Notes:", value: log.additionalNotes },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-4"
                    >
                      <div className="text-gray-600">{item.label}</div>
                      <div className="text-gray-800">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-2 justify-start max-w-xl">
                <button
                  onClick={handleOrderStatus}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-200 transition-all duration-200"
                >
                  <FaBookmark /> <span>Order Status</span>
                </button>
                <button
                  onClick={handleAddComments}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 transition-all duration-200"
                >
                  <FaFileAlt /> <span>Add Comments/Notes</span>
                </button>
                <button
                  onClick={handleContactSupport}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 transition-all duration-200"
                >
                  <FaHeadset /> <span>Contact Support</span>
                </button>
                <button
                  onClick={handleDownloadLog}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 transition-all duration-200"
                >
                  <FaDownload /> <span>Download Log Entry</span>
                </button>
                <button
                  onClick={handleReportInvestigation}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium bg-gradient-to-b from-gray-100 to-gray-300 transition-all duration-200"
                >
                  <FaFlag /> <span>Report for Investigation</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
