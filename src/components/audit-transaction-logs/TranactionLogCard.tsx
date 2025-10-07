import React from 'react';
// Import specific icons you want to use
import { FaMoneyBillWave, FaExchangeAlt, FaClock, FaUndo } from 'react-icons/fa';

const StatCard = ({ title, subtitle, value, IconComponent }) => (
  <div className="bg-white shadow rounded-lg px-2 py-5 flex items-start">
    <div className="mr-4">
      {/* The IconComponent is rendered here */}
      <IconComponent className="text-gray-500 text-xl" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <p className="text-[10px] text-gray-500">{subtitle}</p>
      <p className="text-2xl font-semibold text-gray-900 ">{value}</p>
    </div>
  </div>
);

const TransactionLogCard = () => {
  const stats = [
    {
      title: "Total Transaction Volume",
      subtitle: "Cumulative transaction value",
      value: "₦75,000,000",
      IconComponent: FaMoneyBillWave, // Using FaMoneyBillWave for coins/money
    },
    {
      title: "Transactions Processed",
      subtitle: "Total number of transactions",
      value: "1,250",
      IconComponent: FaExchangeAlt,
    },
    {
      title: "Pending Transactions",
      subtitle: "Transactions awaiting confirmation",
      value: "1,250",
      IconComponent: FaClock,
    },
    {
      title: "Refunds Issued",
      subtitle: "Total refund amount",
      value: "₦2,000,000",
      IconComponent: FaUndo, // Using FaUndo for refunds/reversals
    },
  ];

  return (
    <div className="max-w-full mx-auto mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            subtitle={stat.subtitle}
            value={stat.value}
            IconComponent={stat.IconComponent}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionLogCard;