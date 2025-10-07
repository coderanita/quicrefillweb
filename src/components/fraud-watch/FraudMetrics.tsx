import React from "react";
import {
  FaFlag,
  FaClock,
  FaCheckCircle,
  FaBan,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

const statsData = [
  {
    title: "Flagged Withdrawals Today",
    value: "5",
    icon: <FaFlag />,
    bgColor: "bg-red-100",
    textColor: "text-red-500",
  },
  {
    title: "Pending Admin Review",
    value: "12",
    icon: <FaClock />,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-500",
  },
  {
    title: "Approved Withdrawals (Last 30 Days)",
    value: "210",
    icon: <FaCheckCircle />,
    bgColor: "bg-green-100",
    textColor: "text-green-500",
  },
  {
    title: "Blocked Withdrawals (Fraudulent Activity)",
    value: "6",
    icon: <FaBan />,
    bgColor: "bg-red-100",
    textColor: "text-red-500",
  },
  {
    title: "Total Flagged Amount",
    value: "₦12,500,000",
    icon: <FaMoneyBillWave />,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-500",
  },
];

const FraudMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
        >
          <div className={`${item.bgColor} ${item.textColor} rounded-full p-2`}>
            {item.icon}
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="font-semibold">{item.title}</span>
              <span className="text-xs">
                <FaInfoCircle />
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FraudMetrics;
