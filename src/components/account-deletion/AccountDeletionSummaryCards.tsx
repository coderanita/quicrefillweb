import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Importing the specific icon

// Data structure for the summary cards
const deletionSummaryData = [
  {
    id: 1,
    title: "Pending",
    count: 50,
    colorClass: "bg-yellow-500", // Tailwind class for the color indicator
  },
  {
    id: 2,
    title: "Under Review",
    count: 23,
    colorClass: "bg-orange-500",
  },
  {
    id: 3,
    title: "Approved",
    count: 25,
    colorClass: "bg-green-500",
  },
  {
    id: 4,
    title: "Submitted Today",
    count: 10,
    colorClass: "bg-blue-500",
  },
  {
    id: 5,
    title: "Rejected",
    count: 20,
    colorClass: "bg-red-500",
  },
];

// Reusable Card Component
const SummaryCard = ({ title, count, colorClass }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex-1 min-w-[180px]">
    <div className="flex items-center space-x-2 mb-2">
      {/* Color indicator box */}
      <div className={`w-4 h-4 rounded-sm ${colorClass}`}></div> 
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {/* Replaced <i> tag with the FaInfoCircle component */}
        <FaInfoCircle className="text-gray-400 text-xs" />
      </div>
    </div>
    <span className="text-2xl font-bold text-gray-800 block">{count}</span>
  </div>
);

// Main Component
export const AccountDeletionSummaryCards = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {deletionSummaryData.map((data) => (
        <SummaryCard
          key={data.id}
          title={data.title}
          count={data.count}
          colorClass={data.colorClass}
        />
      ))}
    </div>
  );
};

export default AccountDeletionSummaryCards;