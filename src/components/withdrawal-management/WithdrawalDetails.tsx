import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { TransactionData } from "../../MockData/WithdrawalData";
import { showSweetAlert } from "../Includes/SweetAlert2";

const WithdrawalDetails = () => {
    const { id } = useParams(); // Get transaction ID from URL
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        // Find the transaction based on the ID from the URL
        const tx = TransactionData.find((t) => t.transactionId === id);
        if (!tx) {
            showSweetAlert("Transaction not found", "error");
            navigate("/withdrawal-management"); // redirect if not found
            return;
        }
        setTransaction(tx);
        setStatus(tx.status);
    }, [id, navigate]);

    if (!transaction) return null; // loading or invalid ID

    const handleApprove = () => {
        if (status === "Approved") {
            showSweetAlert("Already approved!", "error");
            return;
        }
        setStatus("Approved");
        showSweetAlert("Withdrawal approved successfully!", "success");
    };

    const handleFlag = () => {
        showSweetAlert("Rider flagged for review", "success");
    };

    const handleReject = () => {
        if (!reason.trim()) {
            showSweetAlert("Please provide a reason for rejection", "error");
            return;
        }
        setStatus("Rejected");
        showSweetAlert(`Withdrawal rejected. Reason: ${reason}`, "success");
        setReason("");
        setShowPopup(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Left Card */}
            <div className="bg-white p-6 rounded-lg shadow w-full md:w-[440px]">
                <h2 className="text-lg font-semibold mb-4">Withdrawal details</h2>
                <div className="text-sm space-y-2">
                    <p>
                        <span className="font-semibold">Transaction ID:</span>{" "}
                        <span className="text-gray-500">{transaction.transactionId}</span>
                    </p>
                    <p>
                        <span className="font-semibold">User name:</span>{" "}
                        <span className="text-gray-500">{transaction.userName}</span>
                    </p>
                    <p>
                        <span className="font-semibold">User group:</span>{" "}
                        <span className="text-gray-500">{transaction.userGroup}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`${status === "Pending"
                                    ? "text-yellow-500"
                                    : status === "Approved"
                                        ? "text-green-500"
                                        : "text-red-500"
                                } font-semibold`}
                        >
                            {status}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold">Amount:</span>{" "}
                        <span className="text-gray-800">
                            ₦{transaction.amount.toLocaleString()}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold">Date and time:</span>{" "}
                        <span className="text-gray-500">{transaction.date}</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-3 mt-6">
                    <button
                        onClick={handleApprove}
                        className={`px-4 py-2 rounded-xl flex-1 font-semibold ${status === "Approved"
                                ? "bg-green-500 text-white cursor-not-allowed"
                                : status === "Rejected"
                                    ? "border border-gray-400 text-gray-400 cursor-not-allowed"
                                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                            }`}
                        disabled={status !== "Pending"}
                    >
                        Approve
                    </button>

                    <button
                        onClick={handleFlag}
                        className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-xl flex-1"
                    >
                        Flag rider
                    </button>

                    <button
                        onClick={() => setShowPopup(true)}
                        className={`px-4 py-2 rounded-xl flex-1 font-semibold ${status === "Rejected"
                                ? "bg-red-500 text-white cursor-not-allowed"
                                : status === "Approved"
                                    ? "border border-gray-400 text-gray-400 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                        disabled={status !== "Pending"}
                    >
                        Reject
                    </button>
                </div>

                {/* Reject Popup */}
                {showPopup && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setShowPopup(false);
                        }}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transition-all duration-300 transform">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Reject withdrawal
                            </h2>
                            <div className="mb-4">
                                <label
                                    htmlFor="reason"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Reason
                                </label>
                                <textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Detected fraudulent activities"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline h-24"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-md py-2 px-4 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-md py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-colors duration-300"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Alert Box */}
            <div className="bg-orange-50 border border-orange-500 rounded-lg p-4 w-full md:w-[400px] h-[150px] flex flex-col justify-between">
                <div className="flex items-start gap-3">
                    <FaExclamationCircle className="text-orange-600 text-xl mt-1" />
                    <p className="text-sm text-gray-800 font-medium">
                        This user has reached the daily withdrawal limit
                    </p>
                </div>
                <button
                    onClick={() =>
                        showSweetAlert(
                            "Withdrawal has been suspended successfully!",
                            "success"
                        )
                    }
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded w-full text-sm"
                >
                    Suspend withdrawal
                </button>
            </div>

        </div>
    );
};

export default WithdrawalDetails;
