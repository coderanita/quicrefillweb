import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import { FaInfoCircle } from "react-icons/fa";
import { showSweetAlert } from "../Includes/SweetAlert2";

export const PushNotificationsDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [NotificationData] = useState([
  {
    id: "NOTI001",
    title: "Flash Sale Alert",
    message: "50% Off on all electronics!",
    audience: "All users in Abuja",
    location: "Abuja",
    status: "Sent",
    schedule: "2025-10-04 6 PM - 6 AM",
    openRate: "70%",
    clickThroughRate: "30%",
  },
  {
    id: "NOTI002",
    title: "Vendor Commission Update",
    message: "Your Q3 commission structure has been updated.",
    audience: "Vendors in Lagos",
    location: "Lagos",
    status: "Scheduled",
    schedule: "2025-10-05 8 AM - 12 PM",
    openRate: "85%",
    clickThroughRate: "45%",
  },
  {
    id: "NOTI003",
    title: "New Feature Launch",
    message: "Try our new dark mode feature!",
    audience: "Beta Testers",
    location: "Global",
    status: "Sent",
    schedule: "2025-10-03 10 AM",
    openRate: "92%",
    clickThroughRate: "60%",
  },
  {
    id: "NOTI004",
    title: "Account Security Check",
    message: "Please verify your recent login activity.",
    audience: "Users with suspicious login",
    location: "Port Harcourt",
    status: "Sent",
    schedule: "2025-10-04 1 PM",
    openRate: "55%",
    clickThroughRate: "15%",
  },
  {
    id: "NOTI005",
    title: "Order Delivery Delayed",
    message: "Your order #12345 is experiencing a slight delay.",
    audience: "Customers with pending orders",
    location: "Kano",
    status: "Sent",
    schedule: "2025-10-04 3 PM",
    openRate: "78%",
    clickThroughRate: "40%",
  },
  {
    id: "NOTI006",
    title: "Abandoned Cart Reminder",
    message: "Did you forget something? Complete your purchase now!",
    audience: "Users with items in cart",
    location: "Ibadan",
    status: "Scheduled",
    schedule: "2025-10-06 7 PM",
    openRate: "65%",
    clickThroughRate: "25%",
  },
  {
    id: "NOTI007",
    title: "System Maintenance",
    message: "Scheduled maintenance tonight from 1 AM to 3 AM.",
    audience: "All users",
    location: "Global",
    status: "Draft",
    schedule: "2025-10-07 1 AM - 3 AM",
    openRate: "N/A", // Draft notifications don't have rates yet
    clickThroughRate: "N/A", // Draft notifications don't have rates yet
  },
  {
    id: "NOTI008",
    title: "Customer Survey Request",
    message: "Help us improve! Share your feedback.",
    audience: "Active users (last 7 days)",
    location: "Abuja",
    status: "Sent",
    schedule: "2025-10-04 11 AM",
    openRate: "48%",
    clickThroughRate: "18%",
  },
  {
    id: "NOTI009",
    title: "Subscription Renewal Notice",
    message: "Your premium subscription renews in 3 days.",
    audience: "Premium subscribers",
    location: "Lagos",
    status: "Scheduled",
    schedule: "2025-10-08 9 AM",
    openRate: "75%",
    clickThroughRate: "35%",
  },
  {
    id: "NOTI010",
    title: "Holiday Greetings",
    message: "Happy Independence Day! Enjoy a special discount.",
    audience: "All users",
    location: "Global",
    status: "Sent",
    schedule: "2025-10-01 12 PM",
    openRate: "88%",
    clickThroughRate: "50%",
  },
]);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const selected = NotificationData.find((n) => n.id === id);
    setNotification(selected || null);
  }, [id, NotificationData]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title=""
            breadcrumbs={[]}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showExportButton={false}
            showSearchBox={false}
            showFilterDropdown={false}
            showDateSelector={false}
            showBackButton={true}
            onBackClick={() => navigate("/system-push-notification-settings")}
          />

          {!notification ? (
            <div className="p-4">
              <p>Notification not found</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => navigate("/system-push-notification-settings")}
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 w-full max-w-xl p-4">
              {/* Performance Metrics */}
              <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Performance Metrics</h2>
                  <FaInfoCircle className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">Performance breakdown of all interactions</p>
                <div className="flex space-x-8">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{notification.openRate}</p>
                    <p className="text-sm text-gray-500">Open rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{notification.clickThroughRate}</p>
                    <p className="text-sm text-gray-500">Click-through rate</p>
                  </div>
                </div>
              </div>

              {/* Notification Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification details</h2>

                <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                  <div className="text-gray-500">Notification ID:</div>
                  <div className="font-medium">{notification.id}</div>

                  <div className="text-gray-500">Title:</div>
                  <div className="font-medium">{notification.title}</div>

                  <div className="text-gray-500">Message:</div>
                  <div className="font-medium">{notification.message}</div>

                  <div className="text-gray-500">Target audience:</div>
                  <div className="font-medium">{notification.audience}</div>

                  <div className="text-gray-500">Location:</div>
                  <div className="font-medium">{notification.location}</div>

                  <div className="text-gray-500">Status:</div>
                  <div
                    className={`font-medium ${
                      notification.status === "Sent" ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {notification.status}
                  </div>

                  <div className="text-gray-500">Schedule:</div>
                  <div className="font-medium">{notification.schedule}</div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition duration-300"
                    onClick={() => showSweetAlert("Resend notification",'success')}
                  >
                    Resend
                  </button>
                  <button
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                    onClick={() => showSweetAlert("Delete notification ",'success')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
