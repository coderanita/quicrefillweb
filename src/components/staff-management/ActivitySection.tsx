import { useState, useCallback } from "react";
import { FaFilter, FaCheckCircle, FaSignOutAlt, FaSync } from "react-icons/fa";
import DateFilterComponent from '../Includes/DateFilterComponent'; 
import { showSweetAlert } from "../Includes/SweetAlert2";

// Mock activity log data
const initialActivities = [
  { date: "2025-10-04 09:45", activity: "Logged in", status: "Success" },
  { date: "2025-10-03 17:30", activity: "Approved refund request #4321", status: "Completed" },
  { date: "2025-10-02 15:15", activity: "Edited order #8975 details", status: "Completed" },
  { date: "2025-10-01 12:30", activity: "Admin account created", status: "Active" },
];

// Mock security & access data
const initialAccessLogs = [
  { device: "Windows Chrome", location: "Lagos", ip: "192.168.1.20", lastUsed: "2025-10-04 09:45" },
  { device: "iPhone Safari", location: "Abuja", ip: "192.168.1.18", lastUsed: "2025-10-03 17:30" },
  { device: "MacBook Safari", location: "Kano", ip: "192.168.1.25", lastUsed: "2025-10-02 11:15" },
];

const locations = ["Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Enugu", "Kaduna"];

const ActivitySection = () => {
  // ----- Activity Log Filters -----
  const [activityDateMode, setActivityDateMode] = useState("No Filter");
  const [activityFilterDate, setActivityFilterDate] = useState("");
  const [activityFilterDateRange, setActivityFilterDateRange] = useState({ start: "", end: "" });

  const handleActivityDateFilter = useCallback((newMode, newDate, newRange) => {
    setActivityDateMode(newMode);
    setActivityFilterDate(newDate);
    setActivityFilterDateRange(newRange);
  }, []);

  const [activities] = useState(initialActivities);
  const [tempActivityType, setTempActivityType] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState("");
  const [activityFilterOpen, setActivityFilterOpen] = useState(false);

  // ----- Security & Access Filters -----
  const [accessDateMode, setAccessDateMode] = useState("No Filter");
  const [accessFilterDate, setAccessFilterDate] = useState("");
  const [accessFilterDateRange, setAccessFilterDateRange] = useState({ start: "", end: "" });

  const handleAccessDateFilter = useCallback((newMode, newDate, newRange) => {
    setAccessDateMode(newMode);
    setAccessFilterDate(newDate);
    setAccessFilterDateRange(newRange);
  }, []);

  const [accessLogs] = useState(initialAccessLogs);
  const [tempSelectedLocations, setTempSelectedLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationFilterOpen, setLocationFilterOpen] = useState(false);

  const toggleLocationSelection = (loc) => {
    setTempSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };
  const clearLocationFilter = () => {
    setTempSelectedLocations([]);
    setSelectedLocations([]);
  };

  // ----- Date Filtering Helpers -----
  const isWithinDate = (itemDateStr, mode, date, range) => {
    if (mode === "No Filter") return true;
    const itemDate = new Date(itemDateStr.split(" ")[0]);
    if (mode === "Specific Date") return itemDate.toISOString().slice(0, 10) === date;
    if (mode === "Date Range") {
      const start = new Date(range.start);
      const end = new Date(range.end);
      return itemDate >= start && itemDate <= end;
    }
    return true;
  };

  const filteredActivities = activities
    .filter(act => act.activity.toLowerCase().includes(activityTypeFilter.toLowerCase()))
    .filter(act => isWithinDate(act.date, activityDateMode, activityFilterDate, activityFilterDateRange));

  const filteredAccessLogs = accessLogs
    .filter(log => selectedLocations.length === 0 || selectedLocations.includes(log.location))
    .filter(log => isWithinDate(log.lastUsed, accessDateMode, accessFilterDate, accessFilterDateRange));

  return (
    <div className="space-y-6 mt-6">
      {/* Activity Log Section */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Activity Log Section</h2>
          <div className="flex space-x-2">
            <DateFilterComponent onDateFilterChange={handleActivityDateFilter} />

            <div className="relative">
              <button
                onClick={() => setActivityFilterOpen(!activityFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border rounded-lg shadow-sm"
              >
                <FaFilter /> Activity Type
              </button>
              {activityFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-30">
                  <input
                    type="text"
                    value={tempActivityType}
                    onChange={(e) => setTempActivityType(e.target.value)}
                    placeholder="e.g. Login, Update Profile, Checkout"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => { setActivityTypeFilter(tempActivityType); setActivityFilterOpen(false); }}
                      className="px-4 py-2 bg-yellow-400 rounded-lg"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => { setTempActivityType(""); setActivityTypeFilter(""); }}
                      className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="px-5 py-3 font-semibold text-sm">Date & Time</th>
                <th className="px-5 py-3 font-semibold text-sm">Activity</th>
                <th className="px-5 py-3 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((act, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-5 py-3 text-sm text-gray-800">{act.date}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{act.activity}</td>
                  <td className="px-5 py-3 text-sm text-gray-800"><FaCheckCircle className="text-green-500 mr-1" /> {act.status}</td>
                </tr>
              ))}
              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-3 text-center text-gray-500">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security & Access Controls Section */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Security & Access Controls</h2>
          <div className="flex space-x-2">
            <DateFilterComponent onDateFilterChange={handleAccessDateFilter} />

            <div className="relative">
              <button
                onClick={() => setLocationFilterOpen(!locationFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border rounded-lg shadow-sm"
              >
                <FaFilter /> Location
              </button>
              {locationFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-30">
                  <h3 className="text-gray-700 font-medium mb-3">Select Location</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => toggleLocationSelection(loc)}
                        className={`px-3 py-2 rounded-lg text-sm ${tempSelectedLocations.includes(loc) ? "bg-yellow-400" : "border"}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => { setSelectedLocations(tempSelectedLocations); setLocationFilterOpen(false); }}
                      className="px-4 py-2 bg-yellow-400 rounded-lg"
                    >
                      Apply
                    </button>
                    <button onClick={clearLocationFilter} className="px-4 py-2 bg-gray-300 rounded-lg">
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Access Logs Table */}
        <div className="bg-gray-100 rounded-t-lg p-4 grid grid-cols-4 gap-4 text-gray-600 font-medium">
          <div>Device</div>
          <div>Location</div>
          <div>IP Address</div>
          <div>Last Used</div>
        </div>
        <div className="border-t border-gray-200">
          {filteredAccessLogs.map((log, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 py-3 px-4 text-gray-800 text-sm hover:bg-gray-50">
              <div>{log.device}</div>
              <div>{log.location}</div>
              <div>{log.ip}</div>
              <div>{log.lastUsed}</div>
            </div>
          ))}
          {filteredAccessLogs.length === 0 && (
            <div className="px-4 py-3 text-center text-gray-500">No access logs found</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        onClick={()=>showSweetAlert("Forcing to Logout...","info")} >
          <FaSignOutAlt className="w-5 h-5" /> Force Logout
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-semibold bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm hover:shadow-md transition"
        onClick={()=>showSweetAlert("Refershing Login","info")} >
          <FaSync className="w-5 h-5" /> Refresh Login
        </button>
      </div>
    </div>
  );
};

export default ActivitySection;
