import { useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaCheckCircle,
  FaBan,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const statsData = [
  {
    title: "Total Users",
    description: "All registered users",
    value: "1,200",
    icon: <FaUsers className="text-gray-500" />,
  },
  {
    title: "Active Users",
    description: "Users with recent activity",
    value: "1,100",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    title: "Suspended Accounts",
    description: "Users currently suspended",
    value: "100",
    icon: <FaBan className="text-yellow-500" />,
    action: "View all",
    path: "/user-management-ban-users",   // 👈 navigation target
  },
  {
    title: "Total Complaints",
    description: "Feedback and issues raised",
    value: "1,200",
    icon: <FaExclamationTriangle className="text-red-500" />,
    action: "View all",
    path: "/user-management-complaint",        // 👈 navigation target
  },
  {
    title: "Banned Accounts",
    description: "Users currently banned",
    value: "14",
    icon: <FaTimesCircle className="text-gray-800" />,
  },
];


const UserStats = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white shadow-sm relative"
        >
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1 overflow-hidden">
              <div className="flex items-center gap-2 flex-nowrap">
                <span className="text-sm sm:text-base flex-shrink-0">
                  {stat.icon}
                </span>
                <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                  {stat.title}
                </h2>
              </div>
              <FaInfoCircle className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0" />
            </div>
            <p className="text-xxs sm:text-xs text-gray-500 break-words">
              {stat.description}
            </p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            {stat.action && stat.path && (
              <button
                onClick={() => navigate(stat.path)}
                className="text-xxs sm:text-xs text-blue-500 font-medium hover:underline"
              >
                {stat.action}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;