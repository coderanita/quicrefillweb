import React from 'react';

// --- Data for the Table Component ---
const deletionData = [
  { month: 'Jan', totalDeletions: 120, poorSupport: '35 (29%)', highFees: '25 (21%)', paymentIssues: '20 (17%)', serviceDelays: '30 (25%)', other: '10 (8%)' },
  { month: 'Feb', totalDeletions: 105, poorSupport: '30 (29%)', highFees: '20 (19%)', paymentIssues: '25 (24%)', serviceDelays: '20 (19%)', other: '10 (9%)' },
  { month: 'Mar', totalDeletions: 150, poorSupport: '50 (33%)', highFees: '30 (20%)', paymentIssues: '25 (17%)', serviceDelays: '30 (20%)', other: '15 (10%)' },
  { month: 'Apr', totalDeletions: 170, poorSupport: '60 (35%)', highFees: '35 (21%)', paymentIssues: '30 (18%)', serviceDelays: '25 (15%)', other: '20 (11%)' },
  { month: 'May', totalDeletions: 200, poorSupport: '70 (35%)', highFees: '40 (20%)', paymentIssues: '40 (20%)', serviceDelays: '30 (15%)', other: '20 (10%)' },
  { month: 'Jun', totalDeletions: 180, poorSupport: '65 (36%)', highFees: '35 (19%)', paymentIssues: '30 (17%)', serviceDelays: '35 (19%)', other: '15 (9%)' },
  { month: 'Jul', totalDeletions: 140, poorSupport: '45 (32%)', highFees: '30 (21%)', paymentIssues: '30 (21%)', serviceDelays: '25 (18%)', other: '10 (8%)' },
  { month: 'Aug', totalDeletions: 160, poorSupport: '55 (34%)', highFees: '40 (25%)', paymentIssues: '25 (16%)', serviceDelays: '25 (16%)', other: '15 (9%)' },
  { month: 'Sep', totalDeletions: 190, poorSupport: '70 (37%)', highFees: '45 (24%)', paymentIssues: '30 (16%)', serviceDelays: '25 (13%)', other: '20 (10%)' },
  { month: 'Oct', totalDeletions: 210, poorSupport: '80 (38%)', highFees: '50 (24%)', paymentIssues: '35 (17%)', serviceDelays: '30 (14%)', other: '15 (7%)' },
  { month: 'Nov', totalDeletions: 230, poorSupport: '90 (39%)', highFees: '55 (24%)', paymentIssues: '35 (15%)', serviceDelays: '30 (13%)', other: '20 (9%)' },
  { month: 'Dec', totalDeletions: 250, poorSupport: '100 (40%)', highFees: '60 (24%)', paymentIssues: '40 (16%)', serviceDelays: '30 (12%)', other: '20 (8%)' },
];

// Reusable Tailwind classes for headers and cells
const headerClass = "py-3 px-4 text-xs font-semibold tracking-wider text-gray-600  text-left border-b border-gray-200";
const cellClass = "py-3 px-4 whitespace-nowrap text-sm text-gray-700 text-left border-b border-gray-100";


export default function MonthlyAccountDeletionTable() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-full mx-auto p-4 md:p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Monthly Breakdown of Account Deletions & Reasons
      </h2>
      
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={headerClass}>Month</th>
              <th className={headerClass}>Total Deletions</th>
              <th className={headerClass}>Poor Support (%)</th>
              <th className={headerClass}>High Fees (%)</th>
              <th className={headerClass}>Payment Issues (%)</th>
              <th className={headerClass}>Service Delays (%)</th>
              <th className={headerClass}>Other (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {/* Map through the data to create rows */}
            {deletionData.map((row) => (
              <tr key={row.month} className="hover:bg-gray-50 transition duration-150">
                <td className={`${cellClass} font-medium text-gray-900`}>{row.month}</td>
                <td className={cellClass}>{row.totalDeletions}</td>
                <td className={cellClass}>{row.poorSupport}</td>
                <td className={cellClass}>{row.highFees}</td>
                <td className={cellClass}>{row.paymentIssues}</td>
                <td className={cellClass}>{row.serviceDelays}</td>
                <td className={cellClass}>{row.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}