import React, { useMemo } from 'react';

// --- MOCK DATA ---
// NOTE: In a real app, this data would come from component props or an API call.
const mockTransactions = [
  {
    id: "TXN-1001",
    date: "2025-03-10",
    userId: "U-20201",
    amount: 10000, // Raw number for calculation
    vat: 750,
    serviceCharge: 250,
  },
  {
    id: "TXN-1002",
    date: "2025-03-11",
    userId: "U-20202",
    amount: 15000,
    vat: 1125,
    serviceCharge: 375,
  },
  {
    id: "TXN-1003",
    date: "2025-03-12",
    userId: "U-20203",
    amount: 25000,
    vat: 1875,
    serviceCharge: 625,
  },
];

// Reusable function to format currency
const formatNaira = (value) => value.toLocaleString('en-NG');

// --- MAIN COMPONENT ---
const PayoutTransactionBreakdown = ({ 
  transactions = mockTransactions,
  confirmationDetails = {
    paymentDate: "2025-03-16",
    processedBy: "Admin Name",
    confirmationId: "CONF-908765",
    timestamp: "2025-03-16 14:25:30",
  }
}) => {
  
  // Calculate running totals for the table footer using useMemo for performance
  const totals = useMemo(() => {
    return transactions.reduce((acc, txn) => {
      const totalTxn = txn.amount + txn.vat + txn.serviceCharge;
      acc.amount += txn.amount;
      acc.vat += txn.vat;
      acc.serviceCharge += txn.serviceCharge;
      acc.total += totalTxn;
      return acc;
    }, { amount: 0, vat: 0, serviceCharge: 0, total: 0 });
  }, [transactions]);
  
  // Helper to render a confirmation detail row
  const ConfirmationDetail = ({ label, value }) => (
    <div className="py-2 grid grid-cols-2 gap-y-2 text-sm">
      <div><span className="font-medium text-gray-700">{label}</span></div>
      <div className="text-gray-600">{value}</div>
    </div>
  );

  return (
    // Outer container for the whole section (table + confirmation details)
    <div> 
      {/* Breakdown of Transactions Table */}
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
        <div className="container mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Breakdown of Transactions in this Payout
            </h1>
          </div>
          
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="p-3 font-medium">Transaction ID</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">User ID</th>
                  <th className="p-3 font-medium text-right">Amount (₦)</th>
                  <th className="p-3 font-medium text-right">VAT (₦)</th>
                  <th className="p-3 font-medium text-right">Service Charge (₦)</th>
                  <th className="p-3 font-medium text-right">Total (₦)</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {transactions.map(txn => {
                  const total = txn.amount + txn.vat + txn.serviceCharge;
                  return (
                    <tr key={txn.id}>
                      <td className="p-3 text-gray-700 font-semibold">{txn.id}</td>
                      <td className="p-3 text-gray-700">{txn.date}</td>
                      <td className="p-3 text-gray-700">{txn.userId}</td>
                      <td className="p-3 text-gray-700 text-right">{formatNaira(txn.amount)}</td>
                      <td className="p-3 text-gray-700 text-right">{formatNaira(txn.vat)}</td>
                      <td className="p-3 text-gray-700 text-right">{formatNaira(txn.serviceCharge)}</td>
                      <td className="p-3 text-gray-700 font-bold text-right">{formatNaira(total)}</td>
                    </tr>
                  );
                })}
              </tbody>

            
              
            </table>
          </div>
          
        </div>
      </div>
      
      {/* Payment Confirmation Details */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md md:w-auto md:mr-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Confirmation Details</h2>
        <div className="divide-y divide-gray-200">
          <ConfirmationDetail label="Payment Date" value={confirmationDetails.paymentDate} />
          <ConfirmationDetail label="Processed By" value={confirmationDetails.processedBy} />
          <ConfirmationDetail label="Payment Confirmation ID" value={confirmationDetails.confirmationId} />
          <ConfirmationDetail label="Timestamp" value={confirmationDetails.timestamp} />
        </div>
      </div>
      
    </div>
  );
};

export default PayoutTransactionBreakdown;