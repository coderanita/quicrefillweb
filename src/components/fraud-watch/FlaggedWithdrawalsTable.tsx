import React, { useState, useMemo, useEffect } from 'react';

import { FaSnowflake, FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter, FaSearch, FaBan } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';


const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
};

const formatNumber = (num) => new Intl.NumberFormat().format(num);

const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getDateNDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
};

// Date constants (reused)
const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);
const DATE_MODES = ['No Filter', 'Today', 'Last 7 Days', 'Last 30 Days', 'Specific Date', 'Monthly'];

// New Constants based on the HTML Table
const BANK_TYPES = ['UBA', 'Zenith Bank', 'First Bank', 'GTBank', 'Access Bank'];

const initialWithdrawalData = [
    { date: getDateNDaysAgo(1), vendorName: 'Emeka Logistics', amount: 3200000, bank: 'UBA', accountNo: '6758392101', method: 'Bank Transfer', status: 'Pending Review', riskScore: '75%', adminAction: 'View Details', vendorId: 'VND-482903' },
    { date: getDateNDaysAgo(3), vendorName: 'Elite Traders NG', amount: 4800000, bank: 'Zenith Bank', accountNo: '8749301265', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '92%', adminAction: 'Blacklist', vendorId: 'VND-482904' },
    { date: getDateNDaysAgo(5), vendorName: 'Jide Enterprises', amount: 2750000, bank: 'First Bank', accountNo: '1938754620', method: 'Bank Transfer', status: 'Under Investigation', riskScore: '80%', adminAction: 'Freeze Funds', vendorId: 'VND-482905' },
    { date: getDateNDaysAgo(5), vendorName: 'Maxwell Global Ltd', amount: 1150000, bank: 'GTBank', accountNo: '3987610245', method: 'Bank Transfer', status: 'Pending Review', riskScore: '72%', adminAction: 'View Details', vendorId: 'VND-482906' },
    { date: getDateNDaysAgo(6), vendorName: 'Alpha Merchants', amount: 3900000, bank: 'Access Bank', accountNo: '7654329871', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '96%', adminAction: 'Blacklist', vendorId: 'VND-482907' },
    { date: getDateNDaysAgo(7), vendorName: 'Oasis Ventures', amount: 850000, bank: 'UBA', accountNo: '1456789234', method: 'Bank Transfer', status: 'Under Investigation', riskScore: '74%', adminAction: 'Freeze Funds', vendorId: 'VND-482908' },
    { date: getDateNDaysAgo(8), vendorName: 'United Agro Services', amount: 1980000, bank: 'First Bank', accountNo: '2345678912', method: 'Bank Transfer', status: 'Pending Review', riskScore: '77%', adminAction: 'View Details', vendorId: 'VND-482909' },
    { date: getDateNDaysAgo(9), vendorName: 'Rapid Logistics Ltd', amount: 5250000, bank: 'Zenith Bank', accountNo: '6543210987', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '93%', adminAction: 'Blacklist', vendorId: 'VND-482910' },
    { date: getDateNDaysAgo(10), vendorName: 'Evergreen Stores', amount: 690000, bank: 'GTBank', accountNo: '6789345123', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '71%', adminAction: 'Freeze Funds', vendorId: 'VND-482911' },
    { date: getDateNDaysAgo(11), vendorName: 'Dynamic Exporters', amount: 3750000, bank: 'Access Bank', accountNo: '1234987650', method: 'Bank Transfer', status: 'Pending Review', riskScore: '79%', adminAction: 'View Details', vendorId: 'VND-482912' },
    { date: getDateNDaysAgo(12), vendorName: 'NextGen Dealers', amount: 2680000, bank: 'UBA', accountNo: '8901234567', method: 'Bank Transfer', status: 'Pending Review', riskScore: '97%', adminAction: 'Blacklist', vendorId: 'VND-482913' },
    { date: getDateNDaysAgo(13), vendorName: 'Fresh Food Distrib', amount: 720000, bank: 'First Bank', accountNo: '1098765432', method: 'Bank Transfer', status: 'Under Investigation', riskScore: '70%', adminAction: 'View Details', vendorId: 'VND-482914' },
    { date: getDateNDaysAgo(14), vendorName: 'GreenMart Ltd', amount: 5000000, bank: 'Zenith Bank', accountNo: '2109876543', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '82%', adminAction: 'Freeze Funds', vendorId: 'VND-482915' },
    { date: getDateNDaysAgo(15), vendorName: 'Smart Tech Ventures', amount: 1150000, bank: 'GTBank', accountNo: '7658493012', method: 'Bank Transfer', status: 'Confirmed Fraud', riskScore: '76%', adminAction: 'View Details', vendorId: 'VND-482916' },
    { date: getDateNDaysAgo(16), vendorName: 'Empire Solutions', amount: 2850000, bank: 'Access Bank', accountNo: '4509231678', method: 'Bank Transfer', status: 'Pending Review', riskScore: '85%', adminAction: 'View Details', vendorId: 'VND-482917' },
];
// --- Component for Status Pill (Unchanged) ---
const WithdrawalStatusPill = ({ status }) => {
    let colorClass = 'text-gray-600';
    let icon = '';

    switch (status) {
        case 'Pending Review':
            colorClass = 'text-yellow-500';
            icon = '🟡';
            break;
        case 'Confirmed Fraud':
            colorClass = 'text-red-600';
            icon = '🔴';
            break;
        case 'Under Investigation':
            colorClass = 'text-orange-500';
            icon = '🟠';
            break;
        default:
            colorClass = 'text-gray-600';
    }

    return <span className={`${colorClass} font-medium`}>{status} <span className="text-lg">{icon}</span></span>;
};

// --- Custom Calendar Sub-Component (Unchanged) ---
const CalendarPicker = ({ mode, onApplyFilter, selectedDate, selectedRange }) => {
    // Mock states to replicate the specific UI/UX of the blueprint
    const [viewDate] = useState(new Date('2025-09-01'));
    const [tempDate, setTempDate] = useState(selectedDate);
    const [tempRange, setTempRange] = useState(selectedRange);

    const isMonthlyMode = mode === 'Monthly';
    const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Mock ranges to align with the blueprint's calendar example
    const mockSpecificDate = 27;
    const mockRangeStart = 1;
    const mockRangeEnd = 10;

    const getDateString = (day) => `2025-09-${String(day).padStart(2, '0')}`;

    useEffect(() => {
        if (mode === 'Specific Date') {
            setTempDate(getDateString(mockSpecificDate));
        } else if (mode === 'Monthly') {
            setTempRange({ start: getDateString(mockRangeStart), end: getDateString(mockRangeEnd) });
        }
    }, [mode, selectedDate, selectedRange]);

    const handleDayClick = (day) => {
        const dateString = getDateString(day);
        if (isMonthlyMode) {
            if (!tempRange.start || tempRange.end) {
                setTempRange({ start: dateString, end: '' });
            } else if (dateString > tempRange.start) {
                setTempRange(prev => ({ ...prev, end: dateString }));
            } else {
                setTempRange({ start: dateString, end: '' });
            }
        } else {
            setTempDate(dateString);
        }
    };

    const applyFilter = () => {
        if (isMonthlyMode) {
            // Apply range (start, end)
            onApplyFilter(tempRange.start, tempRange.end);
        } else {
            // Apply specific date (date)
            onApplyFilter(tempDate);
        }
    };

    return (
        <div className="p-4 w-full">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold">
                <FaChevronLeft className="cursor-pointer hover:text-gray-900" />
                <span>{monthName}</span>
                <FaChevronRight className="cursor-pointer hover:text-gray-900" />
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
                {DAYS_OF_WEEK.map(day => <span key={day}>{day}</span>)}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-sm text-center">
                {/* Mock empty cells for alignment (Sept 2025 starts on a Monday) */}
                <span className="h-8"></span>
                {days.map(day => {
                    const dateString = getDateString(day);
                    const isSelectedSpecific = !isMonthlyMode && dateString === tempDate;
                    const isRangeStart = isMonthlyMode && dateString === tempRange.start;
                    const isRangeEnd = isMonthlyMode && dateString === tempRange.end;
                    const isInRange = isMonthlyMode && dateString > tempRange.start && dateString < tempRange.end;

                    const dayClasses = `h-8 w-full flex items-center justify-center rounded-full cursor-pointer transition 
                        ${isSelectedSpecific || isRangeEnd ? 'bg-yellow-500 text-gray-800 font-bold' : ''}
                        ${isRangeStart ? 'bg-yellow-400 font-bold text-gray-800 rounded-r-none' : ''}
                        ${isInRange ? 'bg-yellow-200 text-gray-800 rounded-none' : ''}
                        ${!isSelectedSpecific && !isRangeStart && !isRangeEnd && !isInRange ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `;
                    return (
                        <div key={day} className="py-1">
                            <span
                                className={dayClasses}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Apply Filter Button */}
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button
                    className="px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-lg shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
                    onClick={applyFilter}
                    disabled={isMonthlyMode && (!tempRange.start || !tempRange.end)}
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

// =================================================================================================
// --- MAIN COMPONENT: FlaggedWithdrawalsTable (Conversion of HTML to React Blueprint) ---
// =================================================================================================

const FlaggedWithdrawalsTable = () => {
    // --- State (Copied from Blueprint) ---
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [dateMode, setDateMode] = useState('No Filter');
    const [filterDate, setFilterDate] = useState(TODAY);
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });


    const [bankFilterOpen, setBankFilterOpen] = useState(false);
    const [selectedBanks, setSelectedBanks] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const dateDisplayValue = useMemo(() => {
        switch (dateMode) {
            case 'No Filter': return 'All Transactions';
            case 'Today': return formatDateForDisplay(TODAY);
            case 'Last 7 Days': return `Since ${formatDateForDisplay(SEVEN_DAYS_AGO)}`;
            case 'Last 30 Days': return `Since ${formatDateForDisplay(THIRTY_DAYS_AGO)}`;
            case 'Specific Date': return formatDateForDisplay(filterDate);
            case 'Monthly':
                if (filterDateRange.start && filterDateRange.end) {
                    return `${formatDateForDisplay(filterDateRange.start)} - ${formatDateForDisplay(filterDateRange.end)}`;
                }
                return 'Select Range';
            default: return 'All Transactions';
        }
    }, [dateMode, filterDate, filterDateRange]);

    // --- Handlers (Adapted from Blueprint) ---
    const handleDateModeChange = (mode) => {
        setDateMode(mode);
        setCurrentPage(1);
        if (mode === 'Specific Date' || mode === 'Monthly') {
            setDateDropdownOpen(true);
        } else {
            setDateDropdownOpen(false);
        }
    };

    const handleApplySpecificDateFilter = (date) => {
        setFilterDate(date);
        setDateMode('Specific Date');
        setDateDropdownOpen(false);
    };

    const handleApplyMonthlyFilter = (start, end) => {
        setFilterDateRange({ start, end });
        setDateMode('Monthly');
        setDateDropdownOpen(false);
    };

    const handleBankToggle = (bank) => {
        setSelectedBanks(prev =>
            prev.includes(bank) ? prev.filter(s => s !== bank) : [...prev, bank]
        );
    };

    const handleApplyBankFilters = () => {
        setBankFilterOpen(false);
        setCurrentPage(1);
    };

    // --- Combined Filtering Logic (Date + Bank Type + Search) ---
    const filteredData = useMemo(() => {
        const startDate = filterDateRange.start;
        const endDate = filterDateRange.end;

        return initialWithdrawalData.filter(item => {
            // 1. Bank Type Filter (Adapted from Service Type)
            const bankMatch = selectedBanks.length === 0 || selectedBanks.includes(item.bank);
            if (!bankMatch) return false;

            // 2. Date Filter (Reused from Blueprint)
            let dateMatch = false;
            switch (dateMode) {
                case 'No Filter':
                    dateMatch = true;
                    break;
                case 'Today':
                    dateMatch = item.date === TODAY;
                    break;
                case 'Last 7 Days':
                    dateMatch = item.date >= SEVEN_DAYS_AGO;
                    break;
                case 'Last 30 Days':
                    dateMatch = item.date >= THIRTY_DAYS_AGO;
                    break;
                case 'Specific Date':
                    dateMatch = item.date === filterDate;
                    break;
                case 'Monthly':
                    // Only filter if a range is set from the calendar
                    if (!startDate || !endDate) {
                        dateMatch = true;
                    } else {
                        dateMatch = item.date >= startDate && item.date <= endDate;
                    }
                    break;
                default:
                    dateMatch = true;
            }
            if (!dateMatch) return false;

            return true;
        });
    }, [selectedBanks, dateMode, filterDate, filterDateRange]);

    // --- Pagination Logic (Reused) ---
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredData, itemsPerPage]);

    // --- Component Render ---
    return (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
            <div className="container mx-auto">
                {/* Header and Controls */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Flagged Withdrawals Table</h2>
                        <p className="text-sm text-gray-600">List of all withdrawals flagged by the system for further review.</p>
                    </div>

                    <div className="flex items-center space-x-2">

                        {/* Date Picker/Dropdown (Reused from Blueprint) */}
                        <div className="date-picker-wrapper relative">
                            <div className="flex items-center border rounded-md overflow-hidden bg-white">
                                <div className="pl-3 pr-2 text-gray-500">
                                    <FaCalendarAlt />
                                </div>
                                <input
                                    type="text"
                                    className="datePicker py-2 text-sm text-gray-700 focus:outline-none cursor-pointer w-auto min-w-[150px]"
                                    value={dateDisplayValue}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="w-24 px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center gap-1 justify-center"
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                                >
                                    <span className="mode-label">{dateMode === 'No Filter' ? 'All' : dateMode.split(' ')[0]}</span>
                                    <FaChevronDown className="text-xs" />
                                </button>
                            </div>

                            {/* Full Date Picker/Filter Container */}
                            {dateDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl w-[450px] z-40 flex overflow-hidden">
                                    {/* Left Panel: Mode Selection */}
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
                                    {/* Right Panel: Calendar/Instructions */}
                                    <div className="w-2/3">
                                        {(dateMode === 'Specific Date' || dateMode === 'Monthly') ?
                                            (
                                                <CalendarPicker
                                                    mode={dateMode}
                                                    selectedDate={filterDate}
                                                    selectedRange={filterDateRange}
                                                    onApplyFilter={dateMode === 'Specific Date' ? handleApplySpecificDateFilter : handleApplyMonthlyFilter}
                                                />
                                            ) : (
                                                <div className="p-8 text-center text-gray-500 flex flex-col justify-center items-center h-full">
                                                    <FaCalendarAlt size="3em" className="mb-4" />
                                                    <p className="font-semibold text-gray-700">Displaying all transactions.</p>
                                                    <p className="text-sm">Select 'Specific Date' or 'Monthly' to view the calendar.</p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bank Filter (Adapted from Service Type Filter) */}
                        <div className="relative">
                            <div className="relative inline-block">
                                <button
                                    onClick={() => setBankFilterOpen(!bankFilterOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
                                >
                                    <FaFilter /> Bank
                                </button>

                                {bankFilterOpen && (
                                    <div
                                        className="dropdown-menu absolute left-auto right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-30"
                                    >
                                        <h3 className="text-gray-700 font-medium mb-3">Select Bank</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {BANK_TYPES.map(bank => (
                                                <button
                                                    key={bank}
                                                    onClick={() => handleBankToggle(bank)}
                                                    className={`px-3 py-2 rounded-lg text-sm ${selectedBanks.includes(bank) ?
                                                            'bg-yellow-400 text-gray-800 font-semibold' : 'border text-gray-700'
                                                        }`}
                                                >
                                                    <span>{bank}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <button
                                                onClick={handleApplyBankFilters}
                                                className="px-4 py-2 bg-yellow-400 rounded-lg text-gray-800 font-semibold hover:bg-yellow-500 transition"
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

                {/* Table Breakdown (HTML Structure Implemented) */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-left text-gray-600 text-sm">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Date</th>
                                <th className="px-4 py-3 whitespace-nowrap">Vendor Name</th>
                                <th className="px-4 py-3 whitespace-nowrap">Amount (₦)</th>
                                <th className="px-4 py-3 whitespace-nowrap">Bank</th>
                                <th className="px-4 py-3 whitespace-nowrap">Account No.</th>
                                <th className="px-4 py-3 whitespace-nowrap">Withdrawal Method</th>
                                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                                <th className="px-4 py-3 whitespace-nowrap">Risk Score</th>
                                <th className="px-4 py-3 whitespace-nowrap">Admin Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                            {currentTableData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-3">{row.date}</td>
                                    <td className="px-4 py-3">{row.vendorName}</td>
                                    <td className="px-4 py-3 font-medium">₦{formatNumber(row.amount)}</td>
                                    <td className="px-4 py-3">{row.bank}</td>
                                    <td className="px-4 py-3">{row.accountNo}</td>
                                    <td className="px-4 py-3">{row.method}</td>
                                    <td className="px-4 py-3">
                                        <WithdrawalStatusPill status={row.status} />
                                    </td>
                                    <td className="px-4 py-3">{row.riskScore}</td>
                                    <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                                        {/* --- Wrap text + icon with one onClick --- */}
                                        {row.adminAction === "Blacklist" && (
                                            <div
                                                className="flex items-center gap-1 text-red-500"
                                                onClick={() =>showSweetAlert(row.vendorName+" is Now BlackListed","info") }
                                            >
                                                <span>{row.adminAction}</span>
                                                <FaBan className="text-red-500 text-xs" />
                                            </div>
                                        )}

                                        {row.adminAction === "Freeze Funds" && (
                                            <div
                                                className="flex items-center gap-1"
                                                onClick={() => showSweetAlert(row.accountNo+" is Now Freeze Funded","info")}
                                            >
                                                <span>{row.adminAction}</span>
                                                <FaSnowflake className="text-blue-500 text-xs" />
                                            </div>
                                        )}

                                        {row.adminAction === "View Details" && (
                                            <a
                                                className="flex items-center gap-1"
                                               href={"/fraud-watch-suspicious-vendor-withdrawal-details/"+row.vendorId}
                                            >
                                                <span>{row.adminAction}</span>
                                                <FaSearch className="text-gray-500 text-xs" />
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {/* No data message */}
                            {currentTableData.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center p-4 text-gray-500">No withdrawals found for the selected filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Reused from Blueprint) */}
                <div className="flex justify-between items-center mt-4 p-4 border-t">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Total entries: <span className="font-bold">{totalEntries}</span></span>
                        <button
                            className={`px-3 py-1 flex items-center space-x-1 ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            <FaChevronLeft /> <span>Previous</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            // Logic to show max 5 pages (first 3, ellipsis, last 2)
                            const shouldRender = totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                            if (!shouldRender) {
                                // Add ellipsis
                                if (pageNum === 2 && currentPage > 3) return <span key="ellipsis-start" className="text-gray-500">...</span>;
                                if (pageNum === totalPages - 1 && currentPage < totalPages - 2) return <span key="ellipsis-end" className="text-gray-500">...</span>;
                                return null;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 font-bold rounded-full text-sm ${pageNum === currentPage ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className={`px-3 py-1 flex items-center space-x-1 ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                        <span>Next</span> <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlaggedWithdrawalsTable;