import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";

/* ---------- Helpers ---------- */
const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getDateNDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};
const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);
const DATE_MODES = [
  "No Filter",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Specific Date",
  "Monthly",
];
const formatNumber = (num) => new Intl.NumberFormat().format(num);
const parseDateToISO = (raw) => {
  if (!raw) return "";
  const d1 = new Date(raw);
  if (!isNaN(d1)) return d1.toISOString().slice(0, 10);
  const m = raw.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (m) {
    const [, day, month, year] = m;
    return `${year}-${month}-${day}`;
  }
  return "";
};

/* ---------- Status & Visuals ---------- */
const StatusPill = ({ status }) => {
  let color = "text-gray-600";
  if (/Pending|Investigation/i.test(status)) color = "text-yellow-500";
  if (/Urgent|Action Required/i.test(status)) color = "text-red-500";
  if (/Reviewing|Disputed/i.test(status)) color = "text-blue-500";
  return <span className={color}>{status}</span>;
};

const FraudBubble = ({ score }) => {
  let color = "bg-green-500";
  if (score >= 85) color = "bg-red-500";
  else if (score >= 65) color = "bg-yellow-500";
  return (
    <span className="flex items-center gap-1">
      <span className={`inline-block w-2 h-2 rounded-full ${color}`}></span>
      {score}%
    </span>
  );
};

/* ---------- CalendarPicker ---------- */
const CalendarPicker = ({ mode, onApplyFilter, selectedDate, selectedRange }) => {
  const [tempDate, setTempDate] = useState(selectedDate || "");
  const [tempRange, setTempRange] = useState(selectedRange || { start: "", end: "" });

  const isMonthlyMode = mode === "Monthly";
  const viewDate = new Date();
  const monthName = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const getDateString = (day) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return d.toISOString().slice(0, 10);
  };

  const handleDayClick = (day) => {
    const ds = getDateString(day);
    if (isMonthlyMode) {
      if (!tempRange.start || tempRange.end) {
        setTempRange({ start: ds, end: "" });
      } else if (ds > tempRange.start) {
        setTempRange({ start: tempRange.start, end: ds });
      } else {
        setTempRange({ start: ds, end: "" });
      }
    } else {
      setTempDate(ds); // ✅ only highlight, not apply
    }
  };

  const applyFilter = () => {
    if (isMonthlyMode) onApplyFilter(tempRange.start, tempRange.end);
    else onApplyFilter(tempDate);
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold">
        <FaChevronLeft className="cursor-pointer" />
        <span>{monthName}</span>
        <FaChevronRight className="cursor-pointer" />
      </div>

      <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm text-center">
        {days.map((day) => {
          const ds = getDateString(day);
          const isSelected = !isMonthlyMode && ds === tempDate;
          const isRangeStart = isMonthlyMode && ds === tempRange.start;
          const isRangeEnd = isMonthlyMode && ds === tempRange.end;
          const isInRange =
            isMonthlyMode && tempRange.start && tempRange.end && ds > tempRange.start && ds < tempRange.end;

          const classes = `h-8 w-full flex items-center justify-center rounded-full cursor-pointer transition
            ${isSelected || isRangeEnd ? "bg-yellow-500 text-gray-800 font-bold" : ""}
            ${isRangeStart ? "bg-yellow-400 font-bold text-gray-800" : ""}
            ${isInRange ? "bg-yellow-200 text-gray-800" : ""}
            ${!isSelected && !isRangeStart && !isRangeEnd && !isInRange ? "hover:bg-gray-100 text-gray-700" : ""}`;

          return (
            <div key={day} className="py-1">
              <span className={classes} onClick={() => handleDayClick(day)}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={applyFilter}
          disabled={isMonthlyMode && (!tempRange.start || !tempRange.end)}
          className="px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-lg shadow-md hover:bg-yellow-600"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

/* ---------- Mock Data ---------- */
const suspiciousData = [
  { txnId: "TXN-20250314", user: "John Doe", amount: 500000, date: "2025-03-14T10:00:00", reason: "Multiple Failed Payments", fraud: 90, status: "Pending Review" },
  { txnId: "TXN-20250313", user: "Alpha Enterprises (V)", amount: 3500000, date: "2025-03-13T16:15:00", reason: "Large Order After Dormancy", fraud: 85, status: "Under Investigation" },
  { txnId: "TXN-20250312", user: "ABC Ltd (Vendor)", amount: 2000000, date: "2025-03-12T13:30:00", reason: "Unusual Transaction Size", fraud: 65, status: "Reviewing" },
  // --- 17 Added Records Below ---
  { txnId: "TXN-20250311", user: "Jane Smith", amount: 120000, date: "2025-03-11T09:45:00", reason: "First-time High-Value Purchase", fraud: 78, status: "Pending Review" },
  { txnId: "TXN-20250310", user: "Global Tech Solutions", amount: 4500000, date: "2025-03-10T11:20:00", reason: "Geo-location Mismatch", fraud: 95, status: "Blocked" },
  { txnId: "TXN-20250309", user: "Michael Brown", amount: 75000, date: "2025-03-09T17:05:00", reason: "Rapid Small-Amount Transactions", fraud: 62, status: "Reviewing" },
  { txnId: "TXN-20250308", user: "Beta Corp (Vendor)", amount: 800000, date: "2025-03-08T14:50:00", reason: "Change in Payment Method", fraud: 55, status: "Approved (Flagged)" },
  { txnId: "TXN-20250307", user: "Sarah Lee", amount: 250000, date: "2025-03-07T10:10:00", reason: "Purchase of Digital Goods (High Risk)", fraud: 88, status: "Under Investigation" },
  { txnId: "TXN-20250306", user: "XYZ Logistics (V)", amount: 1500000, date: "2025-03-06T19:35:00", reason: "Weekend Transaction Spike", fraud: 70, status: "Pending Review" },
  { txnId: "TXN-20250305", user: "David Wilson", amount: 30000, date: "2025-03-05T08:00:00", reason: "Excessive Returns History", fraud: 58, status: "Reviewing" },
  { txnId: "TXN-20250304", user: "Omega Industries", amount: 6000000, date: "2025-03-04T12:00:00", reason: "Multiple Cards Used", fraud: 92, status: "Blocked" },
  { txnId: "TXN-20250303", user: "Emily Clark", amount: 95000, date: "2025-03-03T21:40:00", reason: "Out-of-Hours Activity", fraud: 68, status: "Under Investigation" },
  { txnId: "TXN-20250302", user: "TechNova Systems (V)", amount: 2200000, date: "2025-03-02T15:25:00", reason: "IP Address Change", fraud: 81, status: "Pending Review" },
  { txnId: "TXN-20250301", user: "Chris Evans", amount: 45000, date: "2025-03-01T13:10:00", reason: "Attempted Coupon Abuse", fraud: 52, status: "Approved (Flagged)" },
  { txnId: "TXN-20250229", user: "PQR Solutions", amount: 1800000, date: "2025-02-29T09:05:00", reason: "Bulk Purchase of Limited Items", fraud: 74, status: "Reviewing" },
  { txnId: "TXN-20250228", user: "Amanda Green", amount: 80000, date: "2025-02-28T18:55:00", reason: "Transaction Velocity Too High", fraud: 89, status: "Blocked" },
  { txnId: "TXN-20250227", user: "Global Supply Co (V)", amount: 3200000, date: "2025-02-27T11:15:00", reason: "Sudden Country Code Change", fraud: 94, status: "Under Investigation" },
  { txnId: "TXN-20250226", user: "Robert King", amount: 150000, date: "2025-02-26T16:30:00", reason: "Account Takeover Indicators", fraud: 98, status: "Pending Review" },
  { txnId: "TXN-20250225", user: "Innovation Hub", amount: 1000000, date: "2025-02-25T14:45:00", reason: "High-Risk Merchant Category", fraud: 60, status: "Approved (Flagged)" },
  // --- New additions to reach 20 entries ---
  { txnId: "TXN-20250224", user: "Susan Miller", amount: 400000, date: "2025-02-24T12:00:00", reason: "Inconsistent Delivery Address", fraud: 72, status: "Reviewing" },
  { txnId: "TXN-20250223", user: "NextGen Systems (V)", amount: 5500000, date: "2025-02-23T17:00:00", reason: "Velocity Limit Exceeded", fraud: 86, status: "Blocked" }
];

/* ---------- Main Component ---------- */
const SuspiciousTransactions = () => {
  // Date filter
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [dateMode, setDateMode] = useState("No Filter");
  const [filterDate, setFilterDate] = useState(TODAY);
  const [filterDateRange, setFilterDateRange] = useState({ start: "", end: "" });
  const [dateDropUp, setDateDropUp] = useState(false);

  // Amount filter - Updated to single exact amount
  const [amountFilterOpen, setAmountFilterOpen] = useState(false);
  const [amountDropUp, setAmountDropUp] = useState(false);
  
  // ➡️ NEW STATES for Exact Amount Filter (null means no filter applied)
  const [filterExactAmount, setFilterExactAmount] = useState(null); 
  const [tempExactAmount, setTempExactAmount] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dateWrapperRef = useRef(null);
  const amountWrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) setDateDropdownOpen(false);
      if (amountWrapperRef.current && !amountWrapperRef.current.contains(e.target)) setAmountFilterOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Sync temp state with applied state when dropdown is opened
  useEffect(() => {
    if (amountFilterOpen) {
      // Set temporary input value based on currently applied filter
      setTempExactAmount(filterExactAmount !== null ? String(filterExactAmount) : "");
    }
  }, [amountFilterOpen, filterExactAmount]);

  // Flip dropdowns if near bottom
  useEffect(() => {
    if (dateDropdownOpen && dateWrapperRef.current) {
      const rect = dateWrapperRef.current.getBoundingClientRect();
      setDateDropUp(rect.bottom + 420 > window.innerHeight);
    }
    if (amountFilterOpen && amountWrapperRef.current) {
      const rect = amountWrapperRef.current.getBoundingClientRect();
      setAmountDropUp(rect.bottom + 200 > window.innerHeight);
    }
  }, [dateDropdownOpen, amountFilterOpen]);

  /* ----- Filtering ----- */
  const dateDisplayValue = useMemo(() => {
    switch (dateMode) {
      case "No Filter": return "All Transactions";
      case "Today": return formatDateForDisplay(TODAY);
      case "Last 7 Days": return `Since ${formatDateForDisplay(SEVEN_DAYS_AGO)}`;
      case "Last 30 Days": return `Since ${formatDateForDisplay(THIRTY_DAYS_AGO)}`;
      case "Specific Date": return formatDateForDisplay(filterDate);
      case "Monthly":
        return filterDateRange.start && filterDateRange.end
          ? `${formatDateForDisplay(filterDateRange.start)} - ${formatDateForDisplay(filterDateRange.end)}`
          : "Select Range";
      default: return "All Transactions";
    }
  }, [dateMode, filterDate, filterDateRange]);

  const handleApplySpecificDateFilter = (date) => {
    setFilterDate(date);
    setDateMode("Specific Date");
    setDateDropdownOpen(false);
    setCurrentPage(1);
  };
  const handleApplyMonthlyFilter = (start, end) => {
    setFilterDateRange({ start, end });
    setDateMode("Monthly");
    setDateDropdownOpen(false);
    setCurrentPage(1);
  };
  const handleDateModeChange = (mode) => {
    setDateMode(mode);
    setCurrentPage(1);
    if (mode === "Specific Date" || mode === "Monthly") setDateDropdownOpen(true);
    else setDateDropdownOpen(false);
  };

  const filteredData = useMemo(() => {
    return suspiciousData.filter((row) => {
      // ➡️ AMOUNT FILTER LOGIC: Filter only if filterExactAmount is not null
      if (filterExactAmount !== null) {
        // Use a loose comparison for potential number/string issues, or enforce types.
        // Assuming row.amount is a number based on mock data.
        if (row.amount !== filterExactAmount) return false;
      }
      
      // DATE FILTER
      const rowISO = parseDateToISO(row.date);
      if (!rowISO) return true;
      switch (dateMode) {
        case "No Filter": return true;
        case "Today": return rowISO === TODAY;
        case "Last 7 Days": return rowISO >= SEVEN_DAYS_AGO;
        case "Last 30 Days": return rowISO >= THIRTY_DAYS_AGO;
        case "Specific Date": return rowISO === filterDate;
        case "Monthly":
          if (!filterDateRange.start || !filterDateRange.end) return true;
          return rowISO >= filterDateRange.start && rowISO <= filterDateRange.end;
        default: return true;
      }
    });
  }, [dateMode, filterDate, filterDateRange, filterExactAmount]); // Updated dependency

  const totalEntries = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  /* ---------- JSX ---------- */
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Suspicious Transactions (Flagged)
            </h2>
            <p className="text-sm text-gray-600">
              A detailed table listing all suspicious transactions.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            {/* Date filter */}
            <div ref={dateWrapperRef} className="relative w-full max-w-xs">
              <div className="flex items-center border rounded-md overflow-hidden bg-white">
                <div className="pl-3 pr-2 text-gray-500"><FaCalendarAlt /></div>
                <input
                  type="text"
                  className="datePicker w-40 py-2 text-sm text-gray-700 focus:outline-none cursor-pointer"
                  value={dateDisplayValue}
                  readOnly
                  onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                />
                <button
                  type="button"
                  className="dropdownBtn w-28 px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white flex items-center gap-1"
                  onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                >
                  <span className="mode-label">{dateMode === "No Filter" ? "All" : dateMode.split(" ")[0]}</span>
                  <FaChevronDown className="text-xs" />
                </button>
              </div>

              {dateDropdownOpen && (
                <div
                  className={`absolute right-0 ${dateDropUp ? "bottom-full mb-2" : "mt-2"} 
                  bg-white rounded-lg shadow-xl w-[450px] z-50 flex overflow-hidden`}
                >
                  <div className="w-1/3 p-2 border-r border-gray-200">
                    {DATE_MODES.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleDateModeChange(mode)}
                        className={`w-full text-left px-3 py-3 rounded-lg text-sm transition ${
                          dateMode === mode
                            ? "bg-yellow-100 font-semibold text-gray-800"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="w-2/3">
                    {(dateMode === "Specific Date" || dateMode === "Monthly") ? (
                      <CalendarPicker
                        mode={dateMode}
                        selectedDate={filterDate}
                        selectedRange={filterDateRange}
                        onApplyFilter={
                          dateMode === "Specific Date"
                            ? handleApplySpecificDateFilter
                            : handleApplyMonthlyFilter
                        }
                      />
                    ) : (
                      <div className="p-8 text-center text-gray-500 flex flex-col justify-center items-center h-full">
                        <FaCalendarAlt size="3em" className="mb-4" />
                        <p className="font-semibold text-gray-700">Date Filter</p>
                        <p className="text-sm">Choose a mode from the left to filter by date.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Amount filter */}
            <div ref={amountWrapperRef} className="relative">
              <button
                onClick={() => setAmountFilterOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
              >
                <FaFilter /> Amount
              </button>
              {amountFilterOpen && (
                <div
                  className={`absolute right-0 ${amountDropUp ? "bottom-full mb-2" : "mt-2"}
                  w-64 bg-white border rounded-lg shadow-lg p-4 z-50`}
                >
                  <h3 className="text-gray-700 font-medium mb-3">Enter Exact Amount (₦)</h3>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Amount</label>
                    <input
                      type="number"
                      placeholder="e.g., 500000"
                      value={tempExactAmount}
                      onChange={(e) => setTempExactAmount(e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-yellow-200"
                      min={0}
                    />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        const amount = Number(tempExactAmount);
                        // ➡️ Set filterExactAmount to number or null if empty/invalid
                        setFilterExactAmount(amount > 0 ? amount : null);
                        
                        setAmountFilterOpen(false);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 bg-yellow-400 rounded-lg text-gray-800 font-semibold hover:bg-yellow-500"
                    >
                      Apply
                    </button>
                    {/* Optional: Clear Filter Button */}
                    <button
                      onClick={() => {
                        setFilterExactAmount(null);
                        setTempExactAmount("");
                        setAmountFilterOpen(false);
                        setCurrentPage(1);
                      }}
                      className="ml-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 text-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-left text-gray-600 text-sm">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">User/Vendor</th>
                <th className="p-3">Amount (₦)</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Flag Reason</th>
                <th className="p-3">Fraud Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {currentTableData.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500 italic">
                    No suspicious transactions found
                  </td>
                </tr>
              )}
              {currentTableData.map((row) => (
                <tr key={row.txnId} className="border-t hover:bg-gray-100">
                  <td className="p-3">{row.txnId}</td>
                  <td className="p-3">{row.user}</td>
                  <td className="p-3">{formatNumber(row.amount)}</td>
                  <td className="p-3">{new Date(row.date).toLocaleString()}</td>
                  <td className="p-3">{row.reason}</td>
                  <td className="p-3"><FraudBubble score={row.fraud} /></td>
                  <td className="p-3"><StatusPill status={row.status} /></td>
                  <td className="p-3"><a href={"/fraud-watch-suspicious-order-detail/"+row.txnId} className="text-blue-500 hover:underline">View Details</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-4 border-t">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Total: <b>{totalEntries}</b></span>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-1 ${currentPage === 1 ? "text-gray-400" : "text-gray-700 hover:text-gray-900"}`}
            >
              <FaChevronLeft /> Previous
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-yellow-500 text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={`flex items-center gap-1 ${currentPage === totalPages ? "text-gray-400" : "text-gray-700 hover:text-gray-900"}`}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspiciousTransactions;