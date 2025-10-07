import React from "react";
import { FaUsers, FaUserCheck, FaUserSlash, FaUserTag } from "react-icons/fa";

const StaffSummaryCards = () => {
  const cardsData = [
    {
      icon: <FaUsers className="text-gray-500 text-xl mr-3" />,
      title: "Total Staff",
      subtitle: "Cumulative transaction value",
      value: 120,
    },
    {
      icon: <FaUserCheck className="text-gray-500 text-xl mr-3" />,
      title: "Active Staff",
      subtitle: "Total number of transactions",
      value: 105,
    },
    {
      icon: <FaUserSlash className="text-gray-500 text-xl mr-3" />,
      title: "Suspended Staff",
      subtitle: "Transactions awaiting confirmation",
      value: 5,
    },
    {
      icon: <FaUserTag className="text-gray-500 text-xl mr-3" />,
      title: "Roles Defined",
      subtitle: "Total refund amount",
      value: 8,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-1">
              {card.icon}
              <h3 className="text-base font-semibold text-gray-800">{card.title}</h3>
            </div>
            <p className="text-xs text-gray-500 mb-1">{card.subtitle}</p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffSummaryCards;
