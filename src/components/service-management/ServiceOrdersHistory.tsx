import React, { useMemo, useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaFilter, FaCalendar } from "react-icons/fa";
import ServiceOrdersHistoryData from '../../MockData/ServiceData';

// ---- Mock Data ----
const mockData = [
  { id: "ORD-00112", name: "John Doe",  qty: "2 Units", price: 10000, date: "2025-03-10", status: "Completed",   payment: "Wallet",       service: "Gas Refill" },
  { id: "ORD-00113", name: "Jane Smith", qty: "1 Unit",  price:  5000, date: "2025-03-11", status: "In Progress", payment: "On delivery",  service: "Diesel" },
  { id: "ORD-00114", name: "Mike Ross",  qty: "3 Units", price: 15000, date: "2025-03-12", status: "Cancelled",   payment: "Flutterwave",  service: "Accessories" },
];
// Helpers
const toYMD = (d) => format(d, "yyyy-MM-dd");
const parseYMD = (s) => new Date(`${s}T00:00:00`); // avoids TZ issues
const isInRangeInclusive = (d, start, end) => d >= new Date(start.setHours(0,0,0,0)) && d <= new Date(end.setHours(23,59,59,999));

export default function ServiceOrders() {
  const [orders] = useState(mockData);

  // --- Filter state ---
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [services, setServices] = useState([]);

  // --- Date filter state ---
  // modes: "", "Today", "Specific Date", "Monthly"
  const [mode, setMode] = useState(""); // empty = no date filter
  const [showPicker, setShowPicker] = useState(false);

  // Specific Date (single calendar)
  const [specificDate, setSpecificDate] = useState(null); // Date | null

  // Monthly (date range)
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  // Toggle / clear when selecting same option
  const handleModeChange = (newMode) => {
    if (newMode === mode) {
      // Clear date filter
      setMode("");
      setSpecificDate(null);
      setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
      setShowPicker(false);
    } else {
      setMode(newMode);
      // Open picker for modes that require it
      if (newMode === "Specific Date" || newMode === "Monthly") {
        setShowPicker(true);
      } else {
        setShowPicker(false);
      }
    }
  };

  const dateLabel = useMemo(() => {
    if (mode === "Today") return toYMD(new Date());
    if (mode === "Specific Date" && specificDate) return format(specificDate, "dd MMM yyyy");
    if (mode === "Monthly") {
      const s = range[0].startDate, e = range[0].endDate;
      return `${format(s, "dd MMM")} - ${format(e, "dd MMM")}`;
    }
    return "No Date Selected";
  }, [mode, specificDate, range]);

  // Multi-select toggler
  const toggleSelection = (value, list, setList) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  // ---- Filtering logic ----
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statuses.length && !statuses.includes(o.status)) return false;
      if (payments.length && !payments.includes(o.payment)) return false;
      if (services.length && !services.includes(o.service)) return false;

      // Date filter
      if (!mode) return true;

      const od = parseYMD(o.date);

      if (mode === "Today") {
        return o.date === toYMD(new Date());
      }
      if (mode === "Specific Date" && specificDate) {
        return o.date === toYMD(specificDate);
      }
      if (mode === "Monthly") {
        const { startDate, endDate } = range[0];
        return isInRangeInclusive(od, new Date(startDate), new Date(endDate));
      }
      return true;
    });
  }, [orders, statuses, payments, services, mode, specificDate, range]);

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-xl  font-bold text-gray-800 mb-4 md:mb-0">
            Service Orders History
          </h2>

          {/* Date + Mode side-by-side */}
          <div className="flex items-center gap-4">
            {/* Read-only date textbox */}
            <button
              type="button"
              onClick={() => setShowPicker((v) => !v)}
              className="flex items-center gap-2 px-2 py-1 border rounded-md bg-white text-sm"
              title="Open date picker"
            >
              <FaCalendar />
              <span className="text-gray-700">
                {dateLabel}
              </span>
            </button>

            {/* Mode dropdown */}
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              className="px-2 py-1 border rounded-md bg-white text-sm"
            >
              <option value="">Select</option>
              <option value="Today">Today</option>
              <option value="Specific Date">Specific Date</option>
              <option value="Monthly">Monthly</option>
            </select>

            {/* Optional clear button */}
            {mode && (
              <button
                onClick={() => handleModeChange(mode)}
                className="px-3 py-2 border rounded-md text-gray-600"
                title="Clear date filter"
              >
                Clear
              </button>
            )}
            
        {/* Floating picker */}
        {showPicker && (
  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50">
    <div className="bg-white border rounded-lg shadow-lg p-3">
      {mode === "Specific Date" && (
        <Calendar
          date={specificDate || new Date()}
          onChange={(d) => setSpecificDate(d)}
        />
      )}
      {mode === "Monthly" && (
        <DateRange
          editableDateInputs
          moveRangeOnFirstSelection={false}
          ranges={range}
          onChange={(item) => setRange([item.selection])}
        />
      )}
      <div className="text-right mt-2">
        <button
          onClick={() => setShowPicker(false)}
          className="px-3 py-1 border rounded-md"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}


        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className="flex items-center gap-2 px-2 py-1 bg-white border rounded-lg text-sm"
            >
              <FaFilter /> Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg p-4 z-30">
                <h3 className="text-gray-700 font-medium mb-3">Select Filter</h3>

                {/* main options */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveFilter("status")}
                    className={`px-3 py-2 rounded-lg text-sm ${activeFilter === "status" ? "bg-yellow-400" : "border"}`}
                  >
                    Order Status
                  </button>
                  <button
                    onClick={() => setActiveFilter("payment")}
                    className={`px-3 py-2 rounded-lg text-sm ${activeFilter === "payment" ? "bg-yellow-400" : "border"}`}
                  >
                    Payment Type
                  </button>
                  <button
                    onClick={() => setActiveFilter("service")}
                    className={`px-3 py-2 rounded-lg text-sm ${activeFilter === "service" ? "bg-yellow-400" : "border"}`}
                  >
                    Service Type
                  </button>
                </div>

                {/* Status */}
                {activeFilter === "status" && (
                  <div className="mt-3">
                    <h4 className="text-gray-700 font-medium mb-2">Select Order Status</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["Completed", "In Progress", "Cancelled"].map((st) => (
                        <button
                          key={st}
                          onClick={() => toggleSelection(st, statuses, setStatuses)}
                          className={`px-3 py-2 rounded-lg text-sm ${statuses.includes(st) ? "bg-yellow-400" : "border"}`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment */}
                {activeFilter === "payment" && (
                  <div className="mt-3">
                    <h4 className="text-gray-700 font-medium mb-2">Select Payment Type</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["On delivery", "Wallet", "Flutterwave"].map((pm) => (
                        <button
                          key={pm}
                          onClick={() => toggleSelection(pm, payments, setPayments)}
                          className={`px-3 py-2 rounded-lg text-sm ${payments.includes(pm) ? "bg-yellow-400" : "border"}`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service */}
                {activeFilter === "service" && (
                  <div className="mt-3">
                    <h4 className="text-gray-700 font-medium mb-2">Select Service Type</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["Gas Refill", "Diesel", "Accessories"].map((sv) => (
                        <button
                          key={sv}
                          onClick={() => toggleSelection(sv, services, setServices)}
                          className={`px-3 py-2 rounded-lg text-sm ${services.includes(sv) ? "bg-yellow-400" : "border"}`}
                        >
                          {sv}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setStatuses([]);
                      setPayments([]);
                      setServices([]);
                    }}
                    className="px-3 py-2 border rounded-lg"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="px-4 py-2 bg-yellow-400 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total Price(₦)</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} className="border-t text-gray-700 hover:bg-gray-100">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">{o.name}</td>
                  <td className="p-3">{o.qty}</td>
                  <td className="p-3">₦{o.price.toLocaleString()}</td>
                  <td className="p-3">{o.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      o.status === "Completed"
                        ? "text-green-500"
                        : o.status === "In Progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {o.status}
                  </td>
                  <td className="p-3">
                    <button className="text-blue-500 underline">View Order</button>
                  </td>
                </tr>
              ))}
              {!filteredOrders.length && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No matching orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
