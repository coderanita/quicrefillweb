import React, { useState } from "react";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import ReusableTable from "../Includes/ReusableTable";
import { showSweetAlert } from "../Includes/SweetAlert2";

export const PushNotifications = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  // Table columns
  const NotificationColumns = [
    { header: "Notification ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Target Audience", accessor: "audience" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row) => {
        let colorClass = 'text-gray-700';
        if (row.status === 'Sent') colorClass = 'text-green-600';
        else if (row.status === 'Scheduled') colorClass = 'text-orange-500';
        return <span className={colorClass}>{row.status}</span>;
      }
    },
    { header: "Date Sent", accessor: "dateSent" },
    { 
      header: "Actions", 
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button className="text-yellow-600 hover:text-yellow-900 border border-yellow-600 px-3 py-1 rounded-md text-xs"
          onClick={()=>showSweetAlert('Notification Resend','success')}
          >
            Resend
          </button>
          <a href={"/system-push-notification-settings-details/"+row.id} className="text-blue-600 hover:text-blue-900 text-xs">
            View Details
          </a>
        </div>
      )
    }
  ];

// Initial table data extended to 10 records
const [NotificationData, setNotificationData] = useState([
  {
    id: "NOTI001",
    title: "Flash Sale Alert",
    audience: "All users in Abuja",
    status: "Sent",
    dateSent: "25/01/27 10:15 AM"
  },
  {
    id: "NOTI002",
    title: "Flash Sale Alert",
    audience: "All new vendors in Lagos",
    status: "Sent",
    dateSent: "25/01/27 02:45 PM"
  },
  {
    id: "NOTI003",
    title: "Vendor Commission Update",
    audience: "Vendors in Lagos",
    status: "Scheduled",
    dateSent: "25/02/01 09:00 AM" // Updated dateSent for a scheduled item
  },
  {
    id: "NOTI004",
    title: "System Maintenance Notice",
    audience: "All Users",
    status: "Sent",
    dateSent: "25/01/26 11:30 AM"
  },
  {
    id: "NOTI005",
    title: "New Feature Rollout",
    audience: "Pro users (Trial ended)",
    status: "Scheduled",
    dateSent: "-"
  },
  {
    id: "NOTI006",
    title: "Password Reset Instructions",
    audience: "User ID: ABC456",
    status: "Sent",
    dateSent: "25/01/27 03:00 PM"
  },
  {
    id: "NOTI007",
    title: "Product Listing Policy Change",
    audience: "All vendors",
    status: "Scheduled",
    dateSent: "25/02/05 01:00 PM"
  },
  {
    id: "NOTI008",
    title: "Welcome Bonus",
    audience: "New users in Kano",
    status: "Sent",
    dateSent: "25/01/25 09:00 AM"
  },
  {
    id: "NOTI009",
    title: "App Update Available",
    audience: "All Mobile App Users",
    status: "Scheduled",
    dateSent: "-"
  },
  {
    id: "NOTI010",
    title: "Payment Gateway Integration",
    audience: "Vendors in Port Harcourt",
    status: "Sent",
    dateSent: "25/01/24 04:20 PM"
  }
]);

  // Form states
  const [title, setTitle] = useState("Flash Sale Alert!");
  const [audience, setAudience] = useState("All users");
  const [message, setMessage] = useState("Get 20% off on all orders today only!");
  const [location, setLocation] = useState("Abuja, Nigeria");
  const [startHour, setStartHour] = useState("06");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endHour, setEndHour] = useState("06");
  const [endPeriod, setEndPeriod] = useState("PM");

  const formattedSchedule = `${startHour} ${startPeriod} – ${endHour} ${endPeriod}`;

  const handleCreateNotification = () => {
    const newNotification = {
      id: `NOTI${String(NotificationData.length + 1).padStart(3, "0")}`,
      title,
      audience,
      status: "Scheduled",
      dateSent: formattedSchedule
    };
    setNotificationData([newNotification, ...NotificationData]);
    showSweetAlert("Notification created successfully!", "success");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Push Notification Management"
            breadcrumbs={[]}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showExportButton={false}
            showSearchBox={true}
          />

          {/* --- Cards --- */}
          <div className="bg-gray-100 mb-6 flex flex-col md:flex-row gap-6 items-start max-w-full mx-auto">
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-base font-medium">Total Notification Sent</h3>
                  <i className="fas fa-info-circle text-gray-400"></i>
                </div>
                <p className="text-gray-500 text-sm mb-1">This month</p>
                <p className="text-4xl font-bold text-gray-800">{NotificationData.length}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-base font-medium">Open Rate</h3>
                  <i className="fas fa-info-circle text-gray-400"></i>
                </div>
                <p className="text-4xl font-bold text-green-500">70%</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-base font-medium">Most Active Group</h3>
                  <i className="fas fa-info-circle text-gray-400"></i>
                </div>
                <p className="text-4xl font-bold text-gray-800">Vendors</p>
              </div>
            </div>

            {/* --- Notification Form --- */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Notification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Notification Title</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold">Target Audience</label>
                  <select
                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  >
                    <option>All users</option>
                    <option>Subscribed users</option>
                    <option>New users</option>
                    <option>Inactive users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Notification Message</label>
                  <textarea
                    rows={3}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold">Location</label>
                  <select
                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option>Abuja, Nigeria</option>
                    <option>Lagos, Nigeria</option>
                    <option>Kano, Nigeria</option>
                    <option>Cape Town, South Africa</option>
                    <option>Johannesburg, South Africa</option>
                    <option>Durban, South Africa</option>
                  </select>
                </div>

                {/* --- Schedule Selector --- */}
                <div className="md:col-span-1 md:col-start-2">
                  <label className="block text-sm font-medium text-gray-700">Schedule</label>
                  <div className="flex gap-2">
                    <select
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {[...Array(12)].map((_, i) => {
                        const val = String(i + 1).padStart(2, "0");
                        return <option key={val}>{val}</option>;
                      })}
                    </select>
                    <select
                      value={startPeriod}
                      onChange={(e) => setStartPeriod(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                    <span className="self-center">–</span>
                    <select
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {[...Array(12)].map((_, i) => {
                        const val = String(i + 1).padStart(2, "0");
                        return <option key={val}>{val}</option>;
                      })}
                    </select>
                    <select
                      value={endPeriod}
                      onChange={(e) => setEndPeriod(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center mt-6">
                  <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-48"
                    onClick={handleCreateNotification}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- Reusable Table --- */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <ReusableTable
              title="Notifications"
              columns={NotificationColumns}
              data={NotificationData}
              rowsPerPage={5}
              showPagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
