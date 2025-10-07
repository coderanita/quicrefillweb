import React from "react";
import { FaMotorcycle, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaBan, FaStore } from "react-icons/fa";

const ComplianceCards = () => {
  const cards = [
    {
      title: "Rider Compliance",
      icon: <FaMotorcycle className="text-gray-600 mr-2" />,
      total: 1450,
      pending: 1450,
      rejected: 35,
    },
    {
      title: "Vendor Compliance",
      icon: <FaStore className="text-gray-600 mr-2" />,
      total: 980,
      pending: 87,
      rejected: 15,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-4 col-span-1 hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold flex items-center">
              {card.icon} {card.title}
            </div>
            <FaInfoCircle className="text-gray-400 text-sm" />
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm mt-2">
            <div className="text-green-600">
              <FaCheckCircle className="inline mr-1" /> Total <br />
              <span className="text-xl font-bold text-black">{card.total}</span>
            </div>
            <div className="text-red-600">
              <FaTimesCircle className="inline mr-1" /> Pending <br />
              <span className="text-xl font-bold text-black">{card.pending}</span>
            </div>
            <div className="text-orange-500">
              <FaBan className="inline mr-1" /> Rejected <br />
              <span className="text-xl font-bold text-black">{card.rejected}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceCards;
