import React from "react";
import {
  FaBan,
  FaExclamationTriangle,
  FaCheckSquare,
  FaSearch,
  FaExclamationCircle,
  FaCircle,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2";
import { vendorData } from "../../MockData/FraudWatchData";

const VendorWithdrawalOverview = ({ vendorId }) => {
  const vendor = vendorData.find((v) => v.id === vendorId);

  if (!vendor) {
    return (
      <div className="p-6 bg-red-100 text-red-600 rounded-md">
        Vendor not found
      </div>
    );
  }

  const details = [
    { label: "Vendor Name", value: vendor.name },
    { label: "Vendor ID", value: vendor.id },
    { label: "Business Type", value: vendor.businessType },
    { label: "Withdrawal Request Date", value: vendor.withdrawalDate },
    { label: "Withdrawal Amount", value: vendor.withdrawalAmount },
    { label: "Withdrawal Method", value: vendor.withdrawalMethod },
    { label: "Bank Name", value: vendor.bankName },
    { label: "Account Number", value: vendor.accountNumber },
    { label: "Receiving Country", value: vendor.country },
    { label: "IP Address of Request", value: vendor.ipAddress },
    { label: "Device & Browser", value: vendor.deviceBrowser },
  ];

  return (
    <>
      {/* Top Overview Section */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 items-start">
        {/* Left Section */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Vendor & Withdrawal Overview
            </h2>
            <button
              className="flex items-center bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-3 rounded text-sm font-medium"
              onClick={() =>
                showSweetAlert("Vendor has been blacklisted 🚫", "error")
              }
            >
              <FaBan className="mr-2" />
              Blacklist
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
            <div className="font-medium">Field</div>
            <div className="font-medium">Details</div>

            {details.map((item, index) => (
              <React.Fragment key={index}>
                <div>{item.label}:</div>
                <div>{item.value}</div>
              </React.Fragment>
            ))}
          </div>

          {/* Action Buttons Row 1 */}
          <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0">
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md w-full md:w-1/2 text-sm"
              onClick={() =>
                showSweetAlert("Withdrawal has been rejected ❌", "error")
              }
            >
              Reject Withdrawal
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full md:w-1/2 text-sm"
              onClick={() =>
                showSweetAlert("Withdrawal approved ✅", "success")
              }
            >
              Approve Withdrawal
            </button>
          </div>

          {/* Action Buttons Row 2 */}
          <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0">
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md w-full md:w-1/2 text-sm"
              onClick={() =>
                showSweetAlert("Funds have been frozen 🧊", "warning")
              }
            >
              Freeze Funds
            </button>
            <button
              className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded-md w-full md:w-1/2 text-sm"
              onClick={() =>
                showSweetAlert("Additional verification requested 🔍", "info")
              }
            >
              Request Additional Verification
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/4 space-y-3">
          <div className="bg-white rounded-md border border-gray-300 shadow-sm p-3 flex items-center text-sm text-gray-700">
            <span className="font-medium mr-1">Status Indicator:</span>
            <span className="text-yellow-500 font-semibold flex items-center">
              <FaExclamationTriangle className="mr-1" />
              {vendor.status}
            </span>
          </div>
          <div className="bg-white rounded-md border border-gray-300 shadow-sm p-3 text-sm text-gray-700">
            <span className="font-medium mr-1">Risk Score Badge:</span>
            <span className="font-semibold">{vendor.riskScore}</span>
          </div>
          <div className="bg-white rounded-md border border-gray-300 shadow-sm p-3 text-sm text-gray-700">
            <span className="font-medium mr-1">Timestamp:</span>
            <span className="font-semibold">{vendor.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section (Stacked Vertically) */}
      <div className="flex flex-col space-y-6 mt-6">
        {/* Flagged Reasons */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
          <div className="flex items-center text-lg font-semibold text-gray-800 mb-2">
            <FaCheckSquare className="text-green-500 mr-2" />
            Flagged Reason:
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-700 mt-2">
            {vendor.flaggedReasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>

        {/* Risk Analysis & Pattern Detection */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            Risk Analysis & Pattern Detection
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">
              Fraud Risk Score: {vendor.riskScore} (High)
            </span>
          </div>

          <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <FaSearch className="text-gray-500 mr-2" />
            Suspicious Indicators:
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-2">
            {vendor.suspiciousIndicators.map((item, i) => (
              <li key={i} className="flex items-center">
                <FaCheckSquare className="text-green-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <FaExclamationCircle className="text-red-500 mr-2" />
            Previous Vendor Fraud Alerts:
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {vendor.previousFraudAlerts.map((item, i) => (
              <li key={i} className="flex items-center">
                <FaCircle className="text-red-500 mr-2 text-xs" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Transaction History & Associated Withdrawals
          </h3>
          <p className="text-sm text-gray-600 mb-3">Related Withdrawals</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-2 pr-4 pl-2 font-semibold text-left">Date</th>
                  <th className="py-2 pr-4 pl-2 font-semibold text-left">Amount (₦)</th>
                  <th className="py-2 pr-4 pl-2 font-semibold text-left">Bank</th>
                  <th className="py-2 pr-4 pl-2 font-semibold text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {vendor.transactionHistory.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 pr-4 pl-2">{tx.date}</td>
                    <td className="py-2 pr-4 pl-2">{tx.amount}</td>
                    <td className="py-2 pr-4 pl-2">{tx.bank}</td>
                    <td
                      className={`py-2 pr-4 pl-2 font-medium flex items-center ${
                        tx.status === "Completed"
                          ? "text-green-500"
                          : tx.status === "Flagged"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {tx.status === "Completed" && (
                        <>
                          Completed <FaCheckSquare className="ml-1" />
                        </>
                      )}
                      {tx.status === "Flagged" && <>Flagged</>}
                      {tx.status === "Confirmed Fraud" && <>Confirmed Fraud</>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
          <h4 className="text-md font-semibold text-gray-800 mb-2">Admin Notes:</h4>
          <textarea
            className="w-full bg-gray-50 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            rows="2"
            defaultValue={vendor.adminNotes}
          ></textarea>
        </div>

        {/* Reviewer Info */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
          <table className="w-full text-sm text-gray-700">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 pr-4 pl-2">
                  <div className="flex items-center">
                    <FaUser className="text-gray-500 mr-2" />
                    <span className="font-semibold">Reviewer:</span>
                  </div>
                </td>
                <td className="py-2 pr-4 pl-2">{vendor.reviewer}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 pr-4 pl-2">
                  <div className="flex items-center">
                    <FaCalendar className="text-gray-500 mr-2" />
                    <span className="font-semibold">Last Update:</span>
                  </div>
                </td>
                <td className="py-2 pr-4 pl-2">{vendor.lastUpdate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VendorWithdrawalOverview;
