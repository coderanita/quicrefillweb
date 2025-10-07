import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";
import { showSweetAlert } from "../Includes/SweetAlert2";

const TransactionDetails = ({ transaction }) => {
  if (!transaction) {
    return <div className="text-gray-500">No transaction data available.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Steps Section */}
      <div className="relative flex items-center justify-between w-[50%]">
        {/* Horizontal line */}
        <div className="absolute top-[20px] left-[42px] right-[42px] h-1 bg-yellow-400 z-0"></div>

        {["Transfer Request Initiated", "Processing", "Transfer Completed"].map(
          (label, index) => (
            <div key={index} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  transaction.currentStep >= index + 1
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-center text-sm font-semibold leading-tight">
                {label.includes(" ")
                  ? label.split(" ").map((part, i) => (
                      <span key={i}>
                        {part} <br />
                      </span>
                    ))
                  : label}
              </p>
            </div>
          )
        )}
      </div>

      {/* Transaction Card */}
      <div className="max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-gray-900">
              {transaction.txnId}
            </h3>
            <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
              <FaRegCopy className="text-lg" />
            </button>
          </div>

          {/* Details */}
          <div className="divide-y divide-gray-100">
            <div className="grid grid-cols-2 py-3 bg-gray-100">
              <div className="text-sm font-semibold text-gray-500 pl-4">
                Field
              </div>
              <div className="text-sm font-semibold text-gray-500">Details</div>
            </div>

            {Object.entries(transaction.details).map(([field, value], idx) => (
              <div key={idx} className="grid grid-cols-2 py-3 pl-4 items-center">
                <div className="text-sm text-gray-600">{field}</div>
                <div className="text-sm text-gray-900">
                  {field === "Transaction Status" ? (
                    <div className="flex items-center gap-2">
                      <FaSquareCheck className="text-green-500" />
                      <span className="text-green-600 font-medium">{value}</span>
                    </div>
                  ) : (
                    value
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <button className="bg-gray-500 text-white py-2.5 px-4 rounded-md hover:bg-gray-600 text-sm font-medium shadow-sm"
            onClick={()=>{showSweetAlert('Retrying.. Transfer for '+transaction.txnId,'info')}}
            >
              Retry Transfer
            </button>
            <button className="bg-gray-500 text-white py-2.5 px-4 rounded-md hover:bg-gray-600 text-sm font-medium shadow-sm"
            onClick={()=>{showSweetAlert('Cancelling.. Pending for '+transaction.txnId,'info')}}
            >
              Cancel Pending
            </button>

            <button className="bg-gradient-to-b from-white to-gray-200 text-black py-2.5 px-4 rounded-md border border-gray-300 hover:from-gray-100 text-sm font-medium shadow-sm"
            onClick={()=>{showSweetAlert('Exporting.. Transaction Log for '+transaction.txnId,'info')}}
            >
              Export Transaction Log
            </button>
            <button className="bg-gradient-to-b from-white to-gray-200 text-black py-2.5 px-4 rounded-md border border-gray-300 hover:from-gray-100 text-sm font-medium shadow-sm"
            onClick={()=>{showSweetAlert('Sending.. Confirmation Email for '+transaction.txnId,'info')}}
            >
              Send Confirmation Email
            </button>
          </div>
        </div>
      </div>

      {/* Admin Notes */}
      <div className="bg-white rounded-lg shadow-sm p-4 max-w-3xl">
        <div className="mb-4">
          <label
            htmlFor="adminNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Admin Notes:
          </label>
          <div className="mt-1">
            <textarea
              id="adminNotes"
              rows="3"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder={transaction.adminNotes}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Logs & Audit Trail */}
      <div className="max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Logs & Audit Trail Section
        </h2>

        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["Date & Time", "Action Taken", "Admin/User", "Actions"].map(
                  (heading, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-4 py-4 text-left text-sm font-semibold text-gray-600"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transaction.logs.map((log, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    {log.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    {log.action}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    {log.user}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
