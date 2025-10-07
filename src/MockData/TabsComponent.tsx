import React, { useState, useEffect } from "react";
import { MOCK_LOCATIONS2 } from "./OperatingLocationsData";


const TabsComponent = ({ locationId }) => {
  const [activeTab, setActiveTab] = useState("vendorsRiders");
  const [vendorsRiders, setVendorsRiders] = useState([]);
  const [verificationCompliance, setVerificationCompliance] = useState([]);

  useEffect(() => {
    const location = MOCK_LOCATIONS2.find((loc) => loc.id === locationId);
    setVendorsRiders(location?.vendorsRiders || []);
    setVerificationCompliance(location?.verificationCompliance || []);
  }, [locationId]);

  const toggleStatus = (id) => {
    setVendorsRiders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div>
      {/* Tabs */}
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
        <div className="flex space-x-8 border-b border-gray-200 mb-2 text-xs">
          <button
            className={`tab-item pb-2 ${
              activeTab === "vendorsRiders"
                ? "active-tab text-yellow-500 font-semibold border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-yellow-500"
            }`}
            onClick={() => setActiveTab("vendorsRiders")}
          >
            Vendors & Riders
          </button>
          <button
            className={`tab-item pb-2 ${
              activeTab === "verificationCompliance"
                ? "active-tab text-yellow-500 font-semibold border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-yellow-500"
            }`}
            onClick={() => setActiveTab("verificationCompliance")}
          >
            Verification & Compliance
          </button>
        </div>

        <div className="container mx-auto overflow-x-auto">
          {activeTab === "vendorsRiders" && (
            <table className="w-full table-auto text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 text-xs">
                <tr>
                  <th className="px-6 py-3">Customer Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Registration Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {vendorsRiders.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3">{item.role}</td>
                    <td className="px-6 py-3">{item.registrationDate}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`status-label ${
                          item.isActive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex items-center space-x-4">
                      {item.role === "Vendor" && (
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isActive}
                            onChange={() => toggleStatus(item.id)}
                            className="sr-only toggle-input"
                          />
                          <div
                            className={`toggle-bg relative w-10 h-5 rounded-full transition-colors ${
                              item.isActive ? "bg-yellow-400" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition transform ${
                                item.isActive ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></div>
                          </div>
                        </label>
                      )}
                      <i className="fas fa-eye text-gray-500 cursor-pointer"></i>
                      <i className="fas fa-trash text-gray-500 cursor-pointer"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "verificationCompliance" && (
            <table className="w-full table-auto text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 text-xs">
                <tr>
                  <th className="px-6 py-3">Submission ID</th>
                  <th className="px-6 py-3">Customer Name</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Submission Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {verificationCompliance.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-3">{item.submissionId}</td>
                    <td className="px-6 py-3">{item.customerName}</td>
                    <td className="px-6 py-3">{item.type}</td>
                    <td className="px-6 py-3">{item.submissionDate}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`status-label ${
                          item.status === "Pending"
                            ? "text-yellow-500"
                            : item.status === "Approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <a href={"/verification-and-compliance-details/"+item.submissionId} className="text-blue-500">
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
