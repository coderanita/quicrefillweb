import React from 'react';
import {
  FaFlag,
  FaMapMarkerAlt,
  FaChartBar,
  FaCheckCircle,
  FaCreditCard,
} from 'react-icons/fa';

import { transactionData } from "../../MockData/FraudWatchData";








const FraudAnalysisDashboard=({ transactionId }) => {
    // 1. Find the main transaction details based on the ID
    const transaction = transactionData.find(txn => txn.id === transactionId);
    console.log(transaction);
      if(!transaction)   return (<></>);
    // Derived properties for display
    const riskColor = transaction.riskLevel === 'High Risk' 
        ? 'text-red-500' 
        : transaction.riskLevel === 'Medium Risk' 
        ? 'text-yellow-500' 
        : 'text-green-500';
    
    const riskDisplay = (
        <span className={`${riskColor} text-xl font-semibold`}>
            {transaction.fraudRiskScore}% <span className="text-xs font-normal text-gray-500">({transaction.riskLevel})</span>
        </span>
    );
    
    const isHighRisk = transaction.riskLevel === 'High Risk';

    return (
        <div className="container mx-auto p-4">
            
            {/* Risk Analysis and Spending Pattern Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                
                {/* Fraud Risk Analysis Card (Using transactionData) */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col max-w-full w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Fraud Risk Analysis</h2>
                    
                    <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600 mb-4 border-b border-gray-200 w-full">
                        Breakdown of why the transaction was flagged: **{transaction.flagReason}**
                    </div>
                    
                    <div className="flex justify-between mb-4 pt-4 w-full">
                        <span className="text-gray-700 text-sm font-medium">Fraud Score</span>
                        {riskDisplay}
                    </div>
                    
                    <div className="pt-2">
                        <div className="flex items-center mb-2">
                            <FaFlag className={isHighRisk ? "text-red-500 mr-2 text-sm" : "text-green-500 mr-2 text-sm"} />
                            <span className="font-semibold text-gray-700 text-sm">Flagged Indicators:</span>
                        </div>
                        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                            {isHighRisk && (
                                <li>
                                    Flagged Reason: {transaction.flagReason}
                                    <FaFlag className="text-red-500 ml-1 text-xs inline" />
                                </li>
                            )}
                            <li>
                                Transaction IP: {transaction.ipAddress} 
                                <FaMapMarkerAlt className="text-red-500 ml-1 text-xs inline" /> 
                                <span className="ml-1 text-xs text-gray-500">
                                    (Location: {transaction.receivingCountry} - potentially unusual)
                                </span>
                            </li>
                            <li>
                                Withdrawal Method: {transaction.withdrawalMethod} 
                                <FaCreditCard className="text-gray-500 ml-1 text-xs inline" />  
                                <span className="ml-1 text-xs text-gray-500">({transaction.bankName})</span>
                            </li>
                            <li>
                                Transaction amount: {transaction.withdrawalAmount} 
                                <FaChartBar className="text-green-500 ml-1 text-xs inline" />
                                <span className="ml-1 text-xs text-gray-500">({transaction.businessType})</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* User's Normal Spending Pattern Card (Static Data) */}
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">User's Normal Spending Pattern</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-gray-600 font-semibold">Spending Pattern</th>
                                    <th className="px-3 py-2 text-left text-gray-600 font-semibold">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="px-3 py-2 text-gray-700">Average Order Value:</td>
                                    <td className="px-3 py-2 font-semibold text-gray-800">₦120,000</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-gray-700">Largest Previous Transaction:</td>
                                    <td className="px-3 py-2 font-semibold text-gray-800">₦350,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Order & Payment History Section (Using nested transactionHistory) */}
            <div className="max-w-full mx-auto bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1e2a4d] mb-1">Order &amp; Payment History</h2>
                <p className="text-sm text-[#64748b] mb-6">User’s Last {transaction.transactionHistory.length} Transactions</p>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-5 font-semibold text-gray-700">Transaction ID</th>
                                <th className="py-3 px-5 font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-5 font-semibold text-gray-700">Amount (₦)</th>
                                <th className="py-3 px-5 font-semibold text-gray-700">Payment Method</th>
                                <th className="py-3 px-5 font-semibold text-gray-700">Location</th>
                                <th className="py-3 px-5 font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white rounded-md">
                            {/* READ FROM NESTED DATA */}
                            {transaction.transactionHistory.map((txn) => (
                                <tr 
                                    key={txn.id} 
                                    className={`border-b border-gray-200 ${txn.id === transaction.id ? 'bg-red-50/70 border-red-200' : ''}`}
                                >
                                    <td className="py-4 px-5 font-medium text-gray-800">{txn.id}</td>
                                    <td className="py-4 px-5">{txn.date}</td>
                                    <td className="py-4 px-5">{txn.amount}</td>
                                    <td className="py-4 px-5">{txn.method}</td>
                                    <td className="py-4 px-5 ">{txn.location}</td>
                                    <td className={`py-4 px-5 font-semibold ${txn.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                                        {txn.status} 
                                        {txn.status === 'Completed' ? (
                                            <FaCheckCircle className="inline ml-1 mb-0.5" />
                                        ) : (
                                            <FaFlag className="inline ml-1 mb-0.5" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Device & IP and Related Activities Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* Device & IP Information Card (Using transactionData) */}
                <div className="bg-white rounded-lg p-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-[#1e2a4d] mb-2 text-left">Device &amp; IP Information</h2>
                    <p className="text-sm text-[#64748b] mb-4 text-left">Helps identify unauthorized device usage.</p>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-5 font-semibold text-gray-700 text-left">Field</th>
                                    <th className="py-3 px-5 font-semibold text-gray-700 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-5 text-gray-800 text-left">Device Used</td>
                                    <td className="py-4 px-5 text-gray-800 text-left">{transaction.deviceBrowser}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-5 text-gray-800 text-left">IP Address</td>
                                    <td className="py-4 px-5 text-gray-800 text-left">{transaction.ipAddress}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-5 text-gray-800 text-left">IP Location</td>
                                    <td className="py-4 px-5 text-gray-800 text-left">{transaction.receivingCountry}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-5 text-gray-800 text-left">User's Last Known IP</td>
                                    <td className="py-4 px-5 text-gray-800 text-left">154.67.89.101 (Lagos, Nigeria 🇳🇬)</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-5 text-gray-800 text-left">VPN Detected</td>
                                    <td className="py-4 px-5 text-gray-800 text-left">{isHighRisk ? 'Yes (Unusual Location)' : 'No'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Related Suspicious Activities Card (Using nested relatedActivities) */}
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-left">Related Suspicious Activities</h3>
                    <p className="text-sm text-gray-500 mb-4 text-left">Show if this user or vendor has been flagged before.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 md:px-4 py-3 font-semibold text-gray-700 text-left">Date</th>
                                    <th className="px-2 md:px-4 py-3 font-semibold text-gray-700 text-left">Activity</th>
                                    <th className="px-2 md:px-4 py-3 font-semibold text-gray-700 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* READ FROM NESTED DATA */}
                                {transaction.relatedActivities.map((activity, index) => (
                                    <tr key={index}>
                                        <td className="px-2 md:px-4 py-3 text-gray-900 text-left">{activity.date}</td>
                                        <td className="px-2 md:px-4 py-3 text-gray-700 text-left">{activity.activity}</td>
                                        <td className="px-2 md:px-4 py-3 text-green-500 font-semibold flex items-center gap-1 text-left">
                                            {activity.status}
                                            <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Admin Notes Section */}
            <div className="max-w-full bg-white rounded-lg shadow-md mt-6 p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-left">Admin Notes:</h3>
                <textarea 
                    className="border rounded-md p-4 text-gray-700 w-full min-h-[100px] resize-y focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Add admin notes here..."
                    defaultValue={transaction.status === 'Under Investigation' ? `Transaction flagged on ${transaction.withdrawalRequestDate} due to ${transaction.flagReason}. Status: ${transaction.status}. Assigned to ${transaction.adminAssigned}.` : "Transfer processed successfully without delay."}
                />
            </div>
        </div>
    );
};

export default FraudAnalysisDashboard;