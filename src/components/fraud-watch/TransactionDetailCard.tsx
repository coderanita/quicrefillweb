import React from "react";
import { FaRegCopy, FaHeadphones, FaCheck } from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2";
import { transactionData } from "../../MockData/FraudWatchData";

const TransactionDetailCard = ({ transactionId }) => {
  const transaction = transactionData.find((tx) => tx.id === transactionId);

  if (!transaction) {
    return (
      <div className="p-6 bg-red-100 text-red-600 rounded-md">
        Transaction not found
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transaction.id);
    showSweetAlert("Transaction ID copied!", "success");
  };
  const handleContact = () =>
    showSweetAlert("Contacting user for verification...", "info");
  const handleFreeze = () => showSweetAlert("Freezing account...", "info");
  const handleClear = () => showSweetAlert("Clearing transaction...", "info");
  const handleFlagFraud = () => showSweetAlert("Flagging as Fraud...", "info");
  const handleRequestDoc = () =>
    showSweetAlert("Requesting documentation...", "info");

  const DetailRow = ({ label, value }) => (
    <>
      <div className="font-normal">{label}</div>
      <div className="text-gray-700 font-medium">{value}</div>
    </>
  );

  // Convert transaction fields into label/value pairs (excluding some handled separately)
  const transactionDetails = [
    { label: "Vendor Name", value: transaction.vendorName },
    { label: "Vendor ID", value: transaction.vendorId },
    { label: "Business Type", value: transaction.businessType },
    { label: "Withdrawal Request Date", value: transaction.withdrawalRequestDate },
    { label: "Withdrawal Amount", value: transaction.withdrawalAmount },
    { label: "Withdrawal Method", value: transaction.withdrawalMethod },
    { label: "Bank Name", value: transaction.bankName },
    { label: "Account Number", value: transaction.accountNumber },
    { label: "Receiving Country", value: transaction.receivingCountry },
    { label: "IP Address", value: transaction.ipAddress },
    { label: "Device & Browser", value: transaction.deviceBrowser },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 items-start p-4 min-h-screen">
      {/* Left Column */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{transaction.id}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
              title="Copy Transaction ID"
            >
              <FaRegCopy className="w-5 h-5" />
            </button>

            <button
              onClick={handleContact}
              className="flex items-center bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-3 rounded text-sm font-medium shadow-sm"
            >
              <FaHeadphones className="w-4 h-4 mr-2" />
              Contact User for Verification
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <div>
            <span className="font-medium">Field</span>
          </div>
          <div>
            <span className="font-medium">Details</span>
          </div>

          {transactionDetails.map((item) => (
            <DetailRow key={item.label} label={item.label} value={item.value} />
          ))}

          <DetailRow
            label="Payment Status"
            value={
              <div className="text-green-500 font-medium flex items-center">
                {transaction.paymentStatus} <FaCheck className="w-4 h-4 ml-1" />
              </div>
            }
          />

          <DetailRow
            label="Fraud Risk Score"
            value={
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-1 ${
                    transaction.fraudRiskScore >= 80 ? "bg-red-500" : "bg-green-500"
                  }`}
                ></span>
                {transaction.fraudRiskScore}%{" "}
                <span className="text-gray-600 ml-1">{transaction.riskLevel}</span>
              </div>
            }
          />

          <DetailRow label="Flagged By" value={transaction.flaggedBy} />
          <DetailRow label="Flag Reason" value={transaction.flagReason} />
          <DetailRow label="Admin Assigned" value={transaction.adminAssigned} />
        </div>

        <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0">
          <button
            onClick={handleFreeze}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 w-full md:w-1/2 text-sm transition duration-150"
          >
            Freeze User Account
          </button>
          <button
            onClick={handleClear}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 w-full md:w-1/2 text-sm transition duration-150"
          >
            Clear Transaction
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0">
          <button
            onClick={handleFlagFraud}
            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-0.5 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 w-full md:w-1/2 text-sm transition duration-150"
          >
            Flag as Fraud
          </button>
          <button
            onClick={handleRequestDoc}
            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-0.5 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 w-full md:w-1/2 text-sm transition duration-150"
          >
            Request Additional Documentation
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-white rounded-md border border-gray-300 shadow-sm p-4 w-full md:w-2/4 h-fit">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Status Badge:{" "}
          <span className="font-medium text-yellow-500">{transaction.status}</span>
        </h3>
      </div>
    </div>
  );
};

export default TransactionDetailCard;
