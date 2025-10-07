import React, { useState, useMemo, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';

// --- Utility Functions ---
const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    // Adjust for timezone to avoid off-by-one day errors
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', options);
};

const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getDateNDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
};

// --- Constants ---
const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);
const DATE_MODES = ['No Filter', 'Today', 'Last 7 Days', 'Last 30 Days', 'Specific Date', 'Monthly'];
const SERVICE_TYPES = ['Gas Refill', 'Diesel', 'Petroleum', 'Accessories', 'Electricity'];
const formatNumber = (num) => new Intl.NumberFormat().format(num);

// --- New Data Source for Service Charges ---
const serviceChargeData = [
    { date: '2025-03-01', type: 'Gas Refill', txnId: 'TXN-1001', userId: 'U-3052', amount: 50000, charge: 5000, status: 'Paid' },
    { date: '2025-03-01', type: 'Diesel', txnId: 'TXN-1002', userId: 'U-3078', amount: 30000, charge: 3000, status: 'Pending' },
    { date: '2025-03-02', type: 'Diesel', txnId: 'TXN-1003', userId: 'U-3120', amount: 75000, charge: 7500, status: 'Paid' },
    { date: '2025-03-02', type: 'Petroleum', txnId: 'TXN-1004', userId: 'U-3155', amount: 40000, charge: 4000, status: 'Paid' },
    { date: '2025-03-03', type: 'Accessories', txnId: 'TXN-1005', userId: 'U-3190', amount: 25000, charge: 2500, status: 'Failed' },
    { date: '2025-03-03', type: 'Accessories', txnId: 'TXN-1006', userId: 'U-3218', amount: 100000, charge: 10000, status: 'Paid' },
    { date: '2025-03-04', type: 'Electricity', txnId: 'TXN-1007', userId: 'U-3255', amount: 45000, charge: 4500, status: 'Paid' },
    { date: '2025-03-05', type: 'Electricity', txnId: 'TXN-1008', userId: 'U-3301', amount: 60000, charge: 6000, status: 'Pending' },
    { date: '2025-03-05', type: 'Petroleum', txnId: 'TXN-1009', userId: 'U-3352', amount: 35000, charge: 3500, status: 'Paid' },
    { date: '2025-03-06', type: 'Gas Refill', txnId: 'TXN-1010', userId: 'U-3400', amount: 28000, charge: 2800, status: 'Paid' },
    // --- 10 New Data Entries Below ---
    { date: '2025-03-06', type: 'Diesel', txnId: 'TXN-1011', userId: 'U-3415', amount: 90000, charge: 9000, status: 'Paid' },
    { date: '2025-03-07', type: 'Petroleum', txnId: 'TXN-1012', userId: 'U-3430', amount: 55000, charge: 5500, status: 'Paid' },
    { date: '2025-03-07', type: 'Accessories', txnId: 'TXN-1013', userId: 'U-3450', amount: 15000, charge: 1500, status: 'Failed' },
    { date: '2025-03-08', type: 'Electricity', txnId: 'TXN-1014', userId: 'U-3475', amount: 70000, charge: 7000, status: 'Paid' },
    { date: '2025-03-08', type: 'Gas Refill', txnId: 'TXN-1015', userId: 'U-3490', amount: 32000, charge: 3200, status: 'Pending' },
    { date: '2025-03-09', type: 'Diesel', txnId: 'TXN-1016', userId: 'U-3505', amount: 85000, charge: 8500, status: 'Paid' },
    { date: '2025-03-09', type: 'Petroleum', txnId: 'TXN-1017', userId: 'U-3520', amount: 48000, charge: 4800, status: 'Paid' },
    { date: '2025-03-10', type: 'Accessories', txnId: 'TXN-1018', userId: 'U-3535', amount: 65000, charge: 6500, status: 'Paid' },
    { date: '2025-03-10', type: 'Electricity', txnId: 'TXN-1019', userId: 'U-3550', amount: 20000, charge: 2000, status: 'Pending' },
    { date: '2025-03-11', type: 'Gas Refill', txnId: 'TXN-1020', userId: 'U-3565', amount: 42000, charge: 4200, status: 'Paid' }
];


// --- Component for Status Pill ---
const StatusPill = ({ status }) => {
    let colorClass = '';
    switch (status) {
        case 'Paid': colorClass = 'text-green-600'; break;
        case 'Pending': colorClass = 'text-yellow-500'; break;
        case 'Failed': colorClass = 'text-red-600'; break;
        default: colorClass = 'text-gray-600';
    }
    return <span className={colorClass}>{status}</span>;
};

// --- Custom Calendar Sub-Component ---
const CalendarPicker = ({ mode, onApplyFilter, selectedDate, selectedRange }) => {
    const [viewDate] = useState(new Date('2025-09-01'));
    const [tempDate, setTempDate] = useState(selectedDate);
    const [tempRange, setTempRange] = useState(selectedRange);

    const isMonthlyMode = mode === 'Monthly';
    const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDateString = (day) => `2025-09-${String(day).padStart(2, '0')}`;
    
    useEffect(() => {
        // Remembering your preference for the date of Sept 27th for specific date selection.
        if (mode === 'Specific Date' && !selectedDate) {
            setTempDate(getDateString(27));
        }
    }, [mode, selectedDate]);

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
            onApplyFilter(tempRange.start, tempRange.end);
        } else {
            onApplyFilter(tempDate);
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold">
                <FaChevronLeft className="cursor-pointer hover:text-gray-900" />
                <span>{monthName}</span>
                <FaChevronRight className="cursor-pointer hover:text-gray-900" />
            </div>
            
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
                {DAYS_OF_WEEK.map(day => <span key={day}>{day}</span>)}
            </div>

            <div className="grid grid-cols-7 text-sm text-center">
                <span className="h-8"></span> 
                {days.map(day => {
                    const dateString = getDateString(day);
                    const isSelectedSpecific = !isMonthlyMode && dateString === tempDate;
                    const isRangeStart = isMonthlyMode && dateString === tempRange.start;
                    const isRangeEnd = isMonthlyMode && dateString === tempRange.end;
                    const isInRange = isMonthlyMode && tempRange.start && tempRange.end && dateString > tempRange.start && dateString < tempRange.end;

                    const dayClasses = `h-8 w-full flex items-center justify-center rounded-full cursor-pointer transition 
                        ${isSelectedSpecific || isRangeEnd ? 'bg-yellow-500 text-gray-800 font-bold' : ''}
                        ${isRangeStart ? 'bg-yellow-400 font-bold text-gray-800 rounded-r-none' : ''}
                        ${isInRange ? 'bg-yellow-200 text-gray-800 rounded-none' : ''}
                        ${!isSelectedSpecific && !isRangeStart && !isRangeEnd && !isInRange ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `;
                    return (
                        <div key={day} className="py-1">
                            <span className={dayClasses} onClick={() => handleDayClick(day)}>{day}</span>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button 
                    className="px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-lg shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
                    onClick={applyFilter}
                    disabled={(isMonthlyMode && (!tempRange.start || !tempRange.end)) || (!isMonthlyMode && !tempDate)}
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

// --- Main ServiceChargeBreakDown Component ---
const ServiceChargeBreakDown = () => {
    // --- State Management ---
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [dateMode, setDateMode] = useState('No Filter');
    const [filterDate, setFilterDate] = useState('');
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
    const [serviceFilterOpen, setServiceFilterOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // --- Display Logic ---
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

    // --- Event Handlers ---
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
    
    const handleServiceToggle = (service) => {
        setSelectedServices(prev => 
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const handleApplyServiceFilters = () => {
        setServiceFilterOpen(false);
        setCurrentPage(1);
    };

    // --- Filtering Logic ---
    const filteredData = useMemo(() => {
        return serviceChargeData.filter(item => {
            const serviceMatch = selectedServices.length === 0 || selectedServices.includes(item.type);
            if (!serviceMatch) return false;

            switch (dateMode) {
                case 'No Filter': return true;
                case 'Today': return item.date === TODAY;
                case 'Last 7 Days': return item.date >= SEVEN_DAYS_AGO;
                case 'Last 30 Days': return item.date >= THIRTY_DAYS_AGO;
                case 'Specific Date': return filterDate && item.date === filterDate;
                case 'Monthly':
                    if (!filterDateRange.start || !filterDateRange.end) return true; 
                    return item.date >= filterDateRange.start && item.date <= filterDateRange.end;
                default: return true;
            }
        });
    }, [selectedServices, dateMode, filterDate, filterDateRange]);

    // --- Pagination & Summary Logic ---
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
    
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(firstPageIndex, firstPageIndex + itemsPerPage);
    }, [currentPage, filteredData, itemsPerPage]);

    const totalCharges = useMemo(() => {
        // FIXED: Calculates total charges only from the data on the current page (currentTableData).
        return currentTableData
            .filter(item => item.status !== 'Failed') 
            .reduce((sum, item) => sum + item.charge, 0);
    }, [currentTableData]); 
    
    // --- Component Render ---
    return (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
            <div className="container mx-auto">
                {/* Header and Controls */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Service Charge Breakdown</h2>
                        <p className="text-sm text-gray-600">Detailed report of all service charges applied, including frequency and revenue impact.</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {/* Date Picker */}
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
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl w-[450px] z-40 flex overflow-hidden">
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
                                                <p className="font-semibold text-gray-700">Displaying transactions.</p>
                                                <p className="text-sm">Select 'Specific Date' or 'Monthly' to view the calendar.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Service Type Filter */}
                        <div className="relative">
                            <button 
                                onClick={() => setServiceFilterOpen(!serviceFilterOpen)} 
                                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
                            >
                                <FaFilter /> Service Type
                            </button>
                            
                            {serviceFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-30">
                                    <h3 className="text-gray-700 font-medium mb-3">Select Service Type</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {SERVICE_TYPES.map(service => (
                                            <button 
                                                key={service}
                                                onClick={() => handleServiceToggle(service)} 
                                                className={`px-3 py-2 rounded-lg text-sm ${
                                                    selectedServices.includes(service) ? 'bg-yellow-400 text-gray-800 font-semibold' : 'border text-gray-700'
                                                }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button 
                                            onClick={handleApplyServiceFilters} 
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
                
                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-left text-gray-600 text-sm">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Service Type</th>
                                <th className="p-3">Transaction ID</th>
                                <th className="p-3">User ID</th>
                                <th className="p-3">Amount (₦)</th>
                                <th className="p-3">Service Charge (10%) (₦)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {currentTableData.length > 0 ? (
                                <>
                                    {currentTableData.map((row, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-100">
                                            <td className="p-3">{formatDateForDisplay(row.date)}</td>
                                            <td className="p-3">{row.type}</td>
                                            <td className="p-3">{row.txnId}</td>
                                            <td className="p-3">{row.userId}</td>
                                            <td className="p-3">{formatNumber(row.amount)}</td>
                                            <td className="p-3">{formatNumber(row.charge)}</td>
                                            <td className="p-3"><StatusPill status={row.status} /></td>
                                        </tr>
                                    ))}
                                    <tr className="border-t bg-gray-50">
                                        <td className="p-3 font-bold" colSpan="5">Total Service Charges Collected (from this page)</td>
                                        <td className="p-3 font-bold">₦{formatNumber(totalCharges)}</td>
                                        <td className="p-3"></td>
                                    </tr>
                                </>
                            ) : (
                                <tr className="border-t">
                                    <td colSpan="7" className="text-center p-6 text-gray-500">No transactions found for the selected filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-sm text-gray-600">Total entries: <span className="font-bold">{totalEntries}</span></span>
                    
                    <div className="flex items-center space-x-1">
                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`} 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            <FaChevronLeft /> <span>Previous</span>
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex items-center space-x-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button 
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 text-sm font-bold rounded-full ${
                                            pageNum === currentPage ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`} 
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

export default ServiceChargeBreakDown;
