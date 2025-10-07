import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle, // Replaces fa fa-user-circle
  FaCheckSquare, // Replaces fa fa-check-square
  FaClock, // Replaces fa fa-clock
  FaFlag, // Replaces fa fa-flag
  FaExclamationTriangle, // Replaces fa fa-exclamation-triangle
  FaInfoCircle, // Replaces fa fa-info-circle (from your original code)
} from "react-icons/fa";

// 1. Define the data structure for vendor statistics
const vendorStatsData = [
  {
    title: "Total Active Vendors",
    description: "Total number of active vendors on the platform",
    value: "1,245",
    icon: <FaUserCircle className="text-gray-600" />,
  },
  {
    title: "Orders Completed Today",
    description: "Total vendor orders fulfilled today.",
    value: "8,934",
    icon: <FaCheckSquare className="text-gray-600" />,
  },
  {
    title: "Average Delivery Time",
    description: "Platform-wide average delivery time per vendor.",
    value: "32 mins",
    icon: <FaClock className="text-gray-600" />,
  },
  {
    title: "Flagged Vendors / Delivery Reps",
    description: "Vendors and delivery reps flagged on the platform.",
    value: "138",
    icon: <FaFlag className="text-gray-600" />,
    // Example of a stat with an action link (optional, based on your original component logic)
    // action: "Review",
    // path: "/vendor-management-flagged",
  },
  {
    title: "Suspended / Blocked Vendors",
    description: "3 temporary, 2 permanent Suspended / Blocked Vendors",
    value: "30",
    icon: <FaExclamationTriangle className="text-gray-600" />,
    // Example of a stat with an action link (optional, based on your original component logic)
    // action: "View list",
    // path: "/vendor-management-suspended",
  },
];

// 2. Create the VendorStats React component
export const VendorStats = () => {
  const navigate = useNavigate();

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
      {vendorStatsData.map((stat, index) => (
        
        <div
          key={index}
          className="border rounded-lg p-3 bg-white shadow-sm relative"
        >
          <div className="mb-2">
            
            <div className="flex items-center justify-between text-gray-600 text-sm mb-1 overflow-hidden">
            
              <div className="flex items-center gap-1 flex-nowrap">
                <span className="flex-shrink-0 text-xs">{stat.icon}</span>
                <h3 className="text-sm font-semibold text-gray-700 whitespace-normal break-words">
                  {stat.title}
                </h3>
              </div>
              
              <FaInfoCircle className="text-sm cursor-pointer text-gray-400 flex-shrink-0" />
            </div>

            {/* Matches the description: text-xs text-gray-400 mb-1 */}
            <p className="text-xs text-gray-400 mb-1 break-words">
              {stat.description}
            </p>
          </div>
          
          <div className="flex items-baseline justify-between">
            {/* Matches the value: text-2xl font-semibold text-gray-900 */}
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            {/* Optional action button logic from your original UserStats component */}
            {stat.action && stat.path && (
              <button
                onClick={() => navigate(stat.path)}
                className="text-xs text-blue-500 font-medium hover:underline"
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

