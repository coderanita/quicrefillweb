import React from 'react';
import { FaClock, FaSyncAlt } from 'react-icons/fa';

const locationStats = [
  { label: 'Lagos', value: '42%' },
  { label: 'Abuja', value: '28%' },
  { label: 'Port Harcourt', value: '18%' },
  { label: 'Kano', value: '12%' },
];

const serviceStats = [
  { label: 'Active', value: '65%' },
  { label: 'Inactive', value: '20%' },
  { label: 'Suspended', value: '10%' },
  { label: 'Discontinued', value: '5%' },
];

const BreakdownCard = ({ icon, title, subtitle, stats }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2"
        className="w-6 h-6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="8.5" />
        <line x1="12" y1="11" x2="12" y2="16" />
      </svg>
    </div>
    <p className="text-gray-500 text-sm">{subtitle}</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center">
      {stats.map(({ label, value }) => (
        <div key={label}>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

const DashboardBreakdown = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <BreakdownCard
          icon={<span className="text-red-500 text-xl">📍</span>}
          title="Location Breakdown"
          subtitle="Location breakdown for all orders"
          stats={locationStats}
        />

        <BreakdownCard
          icon={
            <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-b from-gray-300 to-blue-500 text-white rounded-lg shadow-md">
              <FaSyncAlt className="text-sm" />
            </div>
          }
          title="Service Status Breakdown"
          subtitle="Percentage breakdown for all services"
          stats={serviceStats}
        />
      </div>

      <div className="mt-6 mb-6 flex justify-end">
        <a
          href="service-management-pending"
          className="text-white px-6 py-2 rounded-lg shadow-md flex items-center"
          style={{ background: 'linear-gradient(to bottom, #FFB732, #FF9C12)' }}
        >
          <FaClock className="mr-2" />
          View Pending Services
        </a>
      </div>
    </div>
  );
};

export default DashboardBreakdown;
