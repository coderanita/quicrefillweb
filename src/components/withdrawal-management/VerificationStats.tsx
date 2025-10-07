import React from 'react';
// Import specific icons from react-icons/fa
import { FaClock, FaCheckCircle, FaTimesCircle, FaFlag } from 'react-icons/fa';

// Reusable Stat Card component
// It now accepts the Icon component directly as a prop
const StatCard = ({ IconComponent, iconColor, title, value }) => (
  <div className="bg-white rounded-md shadow-md p-6 flex items-center justify-between">
    <div>
      <div className="flex items-center mb-2">
        {/* Use the React Icon Component */}
        <IconComponent className={`${iconColor} mr-2`} />
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span
          className="text-gray-400 ml-1 cursor-pointer"
          title="More Information"
        >
          ⓘ
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Main Component
const VerificationStats = () => {
  // Use the actual React Icon Component and color class
  const statsData = [
    {
      id: 1,
      IconComponent: FaClock, // Pass the component
      iconColor: 'text-yellow-500',
      title: 'Pending Verifications',
      value: 12,
    },
    {
      id: 2,
      IconComponent: FaCheckCircle, // Pass the component
      iconColor: 'text-green-500',
      title: 'Approved Accounts',
      value: 135,
    },
    {
      id: 3,
      IconComponent: FaTimesCircle, // Pass the component
      iconColor: 'text-red-500',
      title: 'Rejected Accounts',
      value: 8,
    },
    {
      id: 4,
      IconComponent: FaFlag, // Pass the component
      iconColor: 'text-red-600',
      title: 'Flagged for Review',
      value: 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          IconComponent={stat.IconComponent}
          iconColor={stat.iconColor}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default VerificationStats;