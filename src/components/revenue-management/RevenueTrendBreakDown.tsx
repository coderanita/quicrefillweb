import React, { useState, useMemo, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';

// --- Utility Functions ---

/**
 * Formats an ISO date string (YYYY-MM-DD) into a display format (e.g., 'Sep 27, 2025').
 */
const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    // Adjust for timezone to avoid off-by-one day errors
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
};

/**
 * Gets today's date in YYYY-MM-DD format.
 */
const getTodayDate = () => new Date().toISOString().slice(0, 10);

/**
 * Calculates the date N days ago in YYYY-MM-DD format.
 */
const getDateNDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
};

/**
 * Formats a number with commas (e.g., 1200000 -> 1,200,000).
 */
const formatNumber = (num) => new Intl.NumberFormat().format(num);


// --- Constants and Data Source ---

const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);
const DATE_MODES = ['No Filter', 'Today', 'Last 7 Days', 'Last 30 Days', 'Specific Date', 'Monthly'];
const REVENUE_FILTER_OPTIONS = ['Top-ups', 'Vendor Fees', 'VAT']; // Generic filter options

// Data Source for Revenue Trends (from the converted HTML table)
const revenueTrendData = [
    { month: 'January', serviceCharge: 1200000, vat: 250000, topUps: 800000, vendorFees: 500000, totalRevenue: 2750000 },
    { month: 'February', serviceCharge: 1350000, vat: 270000, topUps: 900000, vendorFees: 550000, totalRevenue: 3070000 },
    { month: 'March', serviceCharge: 1500000, vat: 300000, topUps: 1100000, vendorFees: 600000, totalRevenue: 3500000 },
    { month: 'April', serviceCharge: 1450000, vat: 290000, topUps: 1050000, vendorFees: 580000, totalRevenue: 3370000 },
    { month: 'May', serviceCharge: 1600000, vat: 320000, topUps: 1200000, vendorFees: 650000, totalRevenue: 3770000 },
    { month: 'June', serviceCharge: 1700000, vat: 340000, topUps: 1250000, vendorFees: 680000, totalRevenue: 3970000 },
    { month: 'July', serviceCharge: 1750000, vat: 350000, topUps: 1300000, vendorFees: 700000, totalRevenue: 4100000 },
    { month: 'August', serviceCharge: 1900000, vat: 380000, topUps: 1400000, vendorFees: 750000, totalRevenue: 4430000 },
    { month: 'September', serviceCharge: 1850000, vat: 370000, topUps: 1350000, vendorFees: 730000, totalRevenue: 4300000 },
    { month: 'October', serviceCharge: 2000000, vat: 400000, topUps: 1500000, vendorFees: 800000, totalRevenue: 4700000 },
    { month: 'November', serviceCharge: 2100000, vat: 420000, topUps: 1500000, vendorFees: 850000, totalRevenue: 4970000 },
    { month: 'December', serviceCharge: 2250000, vat: 450000, topUps: 1750000, vendorFees: 900000, totalRevenue: 5350000 },
];

// --- Mock Calendar Picker Component ---
// This is a mock component based on the blueprint's usage for the Date Filter UI.
const CalendarPicker = ({ mode, selectedDate, selectedRange, onApplyFilter }) => {
    // State to manage input values
    const [dateInput, setDateInput] = useState(selectedDate);
    const [startMonth, setStartMonth] = useState(selectedRange.start.substring(0, 7) || new Date().toISOString().substring(0, 7));
    const [endMonth, setEndMonth] = useState(selectedRange.end.substring(0, 7) || new Date().toISOString().substring(0, 7));

    // Sync internal state when props change
    useEffect(() => {
        if (mode === 'Specific Date') {
            setDateInput(selectedDate);
        } else if (mode === 'Monthly' && selectedRange.start && selectedRange.end) {
            setStartMonth(selectedRange.start.substring(0, 7));
            setEndMonth(selectedRange.end.substring(0, 7));
        }
    }, [mode, selectedDate, selectedRange]);

    const handleApply = () => {
        if (mode === 'Specific Date') {
            onApplyFilter(dateInput);
        } else if (mode === 'Monthly') {
            // Calculate first day of start month and last day of end month
            const start = `${startMonth}-01`;
            const end = new Date(new Date(endMonth).getFullYear(), new Date(endMonth).getMonth() + 1, 0).toISOString().slice(0, 10);
            onApplyFilter(start, end);
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800">{mode} Selection</h3>
            {mode === 'Specific Date' && (
                <>
                    <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="p-2 border rounded w-full mb-3 text-gray-700"
                    />
                    <button
                        onClick={handleApply}
                        className="w-full bg-yellow-400 text-gray-800 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                    >
                        Apply Date
                    </button>
                </>
            )}
            {mode === 'Monthly' && (
                <>
                    <label className="block text-sm font-medium text-gray-700">Start Month</label>
                    <input
                        type="month"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        className="p-2 border rounded w-full mb-3 text-gray-700"
                    />
                    <label className="block text-sm font-medium text-gray-700">End Month</label>
                    <input
                        type="month"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        className="p-2 border rounded w-full mb-4 text-gray-700"
                    />
                    <button
                        onClick={handleApply}
                        className="w-full bg-yellow-400 text-gray-800 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                    >
                        Apply Monthly Range
                    </button>
                </>
            )}
        </div>
    );
};

// --- Main Component ---

const RevenueTrendBreakDown = () => {
    // State Management from blueprint
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [dateMode, setDateMode] = useState('No Filter');
    const [filterDate, setFilterDate] = useState('');
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
    
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    // Date Display Logic from blueprint
    const dateDisplayValue = useMemo(() => {
        switch (dateMode) {
            case 'No Filter': return 'All Transactions';
            case 'Today': return formatDateForDisplay(TODAY);
            case 'Last 7 Days': return `Since ${formatDateForDisplay(SEVEN_DAYS_AGO)}`;
            case 'Last 30 Days': return `Since ${formatDateForDisplay(THIRTY_DAYS_AGO)}`;
            case 'Specific Date': return filterDate ? formatDateForDisplay(filterDate) : 'Select Date';
            case 'Monthly':
                if (filterDateRange.start && filterDateRange.end) {
                    return `${formatDateForDisplay(filterDateRange.start)} - ${formatDateForDisplay(filterDateRange.end)}`;
                }
                return 'Select Range'; 
            default: return 'All Transactions';
        }
    }, [dateMode, filterDate, filterDateRange]);

    // Event Handlers
    const handleDateModeChange = (mode) => {
        setDateMode(mode);
        setCurrentPage(1); 
        if (mode !== 'Specific Date' && mode !== 'Monthly') {
            setDateDropdownOpen(false);
        }
    };

    const handleApplySpecificDateFilter = (date) => {
        setFilterDate(date);
        setDateDropdownOpen(false);
    };

    const handleApplyMonthlyFilter = (start, end) => {
        setFilterDateRange({ start, end });
        setDateDropdownOpen(false);
    };
    
    const handleFilterToggle = (filter) => {
        setSelectedFilters(prev => 
            prev.includes(filter) ? prev.filter(s => s !== filter) : [...prev, filter]
        );
    };

    const handleApplyFilters = () => {
        setFilterDropdownOpen(false);
        setCurrentPage(1);
    };

    // Filtering Logic (Simplified: returns all data since the source data is monthly aggregates)
    const filteredData = useMemo(() => {
        // In a real application, the date filters would pre-filter this data.
        // The selectedFilters state is available here for filtering by Revenue Type (e.g., hiding columns or rows).
        return revenueTrendData; 
    }, [selectedFilters, dateMode, filterDate, filterDateRange]);


    // Pagination Logic
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
    
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(firstPageIndex, firstPageIndex + itemsPerPage); 
    }, [currentPage, filteredData, itemsPerPage]);

    // Summary Totals Logic (Calculates totals for all columns on the *current page*)
    const totals = useMemo(() => {
        return currentTableData.reduce((sum, item) => ({
            serviceCharge: sum.serviceCharge + item.serviceCharge,
            vat: sum.vat + item.vat,
            topUps: sum.topUps + item.topUps,
            vendorFees: sum.vendorFees + item.vendorFees,
            totalRevenue: sum.totalRevenue + item.totalRevenue,
        }), { serviceCharge: 0, vat: 0, topUps: 0, vendorFees: 0, totalRevenue: 0 });
    }, [currentTableData]);


    // Component Render
    return (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
            <div className="container mx-auto">
                {/* Header and Controls */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Revenue Trends Over Time Table</h2>
                        <p className="text-sm text-gray-600">Monthly breakdown of key revenue streams.</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {/* Date Picker (Blueprint Style) */}
                        <div className="relative">
                            <div className="flex items-center border rounded-md overflow-hidden bg-white">
                                <div className="pl-3 pr-2 text-gray-500"><FaCalendarAlt /></div>
                                <input 
                                    type="text" 
                                    className="py-2 text-sm text-gray-700 focus:outline-none cursor-pointer w-auto min-w-[150px]" 
                                    value={dateDisplayValue} 
                                    readOnly 
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                                />
                                <button 
                                    type="button" 
                                    className="w-24 px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center gap-1 justify-center"
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                                >
                                    <span>{dateMode === 'No Filter' ? 'All' : dateMode.split(' ')[0]}</span>
                                    <FaChevronDown className="text-xs" />
                                </button>
                            </div>
                            
                            {dateDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl w-[450px] z-40 flex overflow-hidden border border-gray-200">
                                    <div className="w-1/3 p-2 border-r border-gray-200">
                                        {DATE_MODES.map(mode => (
                                            <button 
                                                key={mode} 
                                                type="button" 
                                                onClick={() => handleDateModeChange(mode)} 
                                                className={`w-full text-left px-3 py-3 rounded-lg text-sm transition ${dateMode === mode ? 'bg-yellow-100 font-semibold text-gray-800' : 'hover:bg-gray-50 text-gray-700'}`}
                                            >
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="w-2/3">
                                        {(dateMode === 'Specific Date' || dateMode === 'Monthly') ? (
                                            <CalendarPicker 
                                                mode={dateMode}
                                                selectedDate={filterDate}
                                                selectedRange={filterDateRange}
                                                onApplyFilter={dateMode === 'Specific Date' ? handleApplySpecificDateFilter : handleApplyMonthlyFilter}
                                            />
                                        ) : (
                                            <div className="p-8 text-center text-gray-500 flex flex-col justify-center items-center h-full">
                                                <FaCalendarAlt size="3em" className="mb-4"/>
                                                <p className="font-semibold text-gray-700">Displaying all monthly aggregates.</p>
                                                <p className="text-sm">Select 'Specific Date' or 'Monthly' to define a period.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Custom Filter Dropdown (Blueprint Style) */}
                        <div className="relative">
                            <button 
                                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)} 
                                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                <FaFilter /> Revenue Filter
                            </button>
                            
                            {filterDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white border rounded-lg shadow-lg p-4 z-30">
                                    <h3 className="text-gray-700 font-medium mb-3">Filter by Revenue Type</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {REVENUE_FILTER_OPTIONS.map(filter => (
                                            <button 
                                                key={filter}
                                                onClick={() => handleFilterToggle(filter)} 
                                                className={`px-3 py-2 rounded-lg text-sm transition ${
                                                    selectedFilters.includes(filter) ?
                                                    'bg-yellow-400 text-gray-800 font-semibold shadow-inner' : 'border text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button 
                                            onClick={handleApplyFilters} 
                                            className="w-full px-4 py-2 bg-yellow-400 rounded-lg text-gray-800 font-semibold hover:bg-yellow-500 transition"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-left text-gray-600 text-sm">
                            <tr>
                                <th className="p-3">Month</th>
                                <th className="p-3">Service Charge (₦)</th>
                                <th className="p-3">VAT (₦)</th>
                                <th className="p-3">Top-ups (₦)</th>
                                <th className="p-3">Vendor Fees (₦)</th>
                                <th className="p-3">Total Revenue (₦)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {currentTableData.length > 0 ? (
                                <>
                                    {currentTableData.map((row, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-100">
                                            <td className="p-3">{row.month}</td>
                                            <td className="p-3">{formatNumber(row.serviceCharge)}</td>
                                            <td className="p-3">{formatNumber(row.vat)}</td>
                                            <td className="p-3">{formatNumber(row.topUps)}</td>
                                            <td className="p-3">{formatNumber(row.vendorFees)}</td>
                                            <td className="p-3 font-bold">{formatNumber(row.totalRevenue)}</td>
                                        </tr>
                                    ))}
                                    {/* Summary Row (Blueprint Style) */}
                                    <tr className="border-t bg-gray-50">
                                        <td className="p-3 font-bold" colSpan="1">Total (Page)</td>
                                        <td className="p-3 font-bold">₦{formatNumber(totals.serviceCharge)}</td>
                                        <td className="p-3 font-bold">₦{formatNumber(totals.vat)}</td>
                                        <td className="p-3 font-bold">₦{formatNumber(totals.topUps)}</td>
                                        <td className="p-3 font-bold">₦{formatNumber(totals.vendorFees)}</td>
                                        <td className="p-3 font-bold text-lg text-green-700">₦{formatNumber(totals.totalRevenue)}</td>
                                    </tr>
                                </>
                            ) : (
                                <tr className="border-t">
                                    <td colSpan="6" className="text-center p-6 text-gray-500">No revenue data found for the selected filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Blueprint Style) */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-sm text-gray-600">Total entries: <span className="font-bold">{totalEntries}</span></span>
                    
                    <div className="flex items-center space-x-1">
                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm rounded-lg transition ${currentPage === 1 ?
                            'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`} 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            <FaChevronLeft /> <span>Previous</span>
                        </button>
                        
                        <div className="flex items-center space-x-1">
                            {/* Render pagination numbers for all pages */}
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button 
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 text-sm font-bold rounded-full min-w-[30px] transition ${
                                            pageNum === currentPage ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm rounded-lg transition ${currentPage === totalPages ?
                            'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`} 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        >
                            <span>Next</span> <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueTrendBreakDown;