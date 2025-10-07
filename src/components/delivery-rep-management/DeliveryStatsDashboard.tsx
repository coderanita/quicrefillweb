import React from 'react';
import { 
  FaMotorcycle, 
  FaCheckCircle, 
  FaClock, 
  FaFlag, 
  FaInfoCircle 
} from 'react-icons/fa';

// Reusable component for a single statistic card
const StatCard = ({ icon: Icon, iconColor, title, description, value }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm relative">
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1 overflow-hidden">
          <div className="flex items-center gap-2 flex-nowrap">
            {/* The main icon uses the passed Icon component and color */}
            <Icon className={`text-sm sm:text-base ${iconColor} flex-shrink-0`} />
            <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
              {title}
            </h2>
          </div>
          {/* The info icon is consistent across all cards */}
          <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />
        </div>
        <p className="text-xxs sm:text-xs text-gray-500 break-words">{description}</p>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

// Main component to display the dashboard stats
const DeliveryStatsDashboard = () => {
  const statsData = [
    {
      id: 1,
      icon: FaMotorcycle, // Replaces fa fa-motorcycle
      iconColor: 'text-gray-500',
      title: 'Total Active Delivery Rep',
      description: 'Displays the total number of active riders',
      value: '1,000',
    },
    {
      id: 2,
      icon: FaCheckCircle, // Replaces fa fa-check-circle
      iconColor: 'text-green-500',
      title: 'Orders Completed Today',
      description: 'Total orders completed by the riders today',
      value: '400',
    },
    {
      id: 3,
      // FaClock replaces fa fa-clock-o (which is fa-clock-o in older Font Awesome, FaClock is the modern equivalent for a clock icon in react-icons/fa)
      icon: FaClock, 
      iconColor: 'text-blue-500',
      title: 'Average Delivery Time',
      description: 'Calculated average delivery time',
      value: '35 min',
    },
    {
      id: 4,
      icon: FaFlag, // Replaces fa fa-flag
      iconColor: 'text-red-500',
      title: 'Flagged Delivery Rep',
      description: 'Count of riders flagged for frequent complaints',
      value: '12',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {statsData.map((stat) => (
        <StatCard 
          key={stat.id}
          icon={stat.icon}
          iconColor={stat.iconColor}
          title={stat.title}
          description={stat.description}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default DeliveryStatsDashboard;