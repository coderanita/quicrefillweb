import React, { useState, useMemo, useCallback } from 'react';
import { FaFilter,FaChevronLeft ,FaChevronRight  } from 'react-icons/fa';
// Import required components/utilities
import DateFilterComponent from '../Includes/DateFilterComponent'; 
import { showSweetAlert } from "../Includes/SweetAlert2"; // Assuming this path based on TransferRequestForm
import { useNavigate } from 'react-router-dom';

const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getDateNDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
};
const TODAY = getTodayDate();
const SEVEN_DAYS_AGO = getDateNDaysAgo(7);
const THIRTY_DAYS_AGO = getDateNDaysAgo(30);

const ALL_STATUSES = ['Completed', 'Pending', 'Failed'];
const formatNumber = (num) => new Intl.NumberFormat().format(num);

// --- Status Pill Component ---
const StatusPill = ({ status }) => {
    let colorClass = '';
    switch (status) {
        case 'Completed': colorClass = 'text-green-600'; break;
        case 'Pending': colorClass = 'text-yellow-600'; break;
        case 'Failed': colorClass = 'text-red-600'; break;
        default: colorClass = 'text-gray-600';
    }
    return <span className={`inline-flex text-xs leading-5 font-semibold ${colorClass}`}>{status}</span>;
};

// --- TransferHistoryStatus Component (Main) ---
const TransferHistoryStatus = ({transactionDetails}) => {
    const navigate=useNavigate();
    
    // 1. Date Filter States received from DateFilterComponent
    const [dateMode, setDateMode] = useState('No Filter');
    const [filterDate, setFilterDate] = useState(TODAY);
    const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
    
    // Handler to receive date filter updates from the child component
    const handleDateFilterUpdate = useCallback((newMode, newDate, newRange) => {
        setDateMode(newMode);
        setFilterDate(newDate);
        setFilterDateRange(newRange);
        setCurrentPage(1); // Always reset pagination on filter change
    }, []);
    
    // 2. Status Filter State
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    
    // 3. Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleStatusToggle = (status) => {
        setSelectedStatuses(prev => 
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const handleApplyStatusFilters = () => {
        setStatusFilterOpen(false);
        setCurrentPage(1);
    };

    // --- NEW: Action Click Handler ---
    const handleActionClick = useCallback((action, item) => {
        const amountDisplay = `₦${formatNumber(item.amount)}`;
        
        if (action.includes('View Details')) {
           
            navigate(`/reports-and-analytics-profit-transafer-request-view-detail/${item.txnId}`);
        } else if (action.includes('Cancel Request')) {
            showSweetAlert(
                ` cancelling the transfer request of ${amountDisplay}`,
                'warning'
            );
        } else if (action.includes('Retry Transfer')) {
            showSweetAlert(
                `Retrying failed transfer of ${amountDisplay} to ${item.bank}...`,
                'success'
            );
        }
    }, []);


    // --- Combined Filtering Logic (Date + Status) ---
    const filteredData = useMemo(() => {
        const startDate = filterDateRange.start;
        const endDate = filterDateRange.end;

        return transactionDetails.filter(item => {
            // 1. Status Filter
            const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
            if (!statusMatch) return false;

            // 2. Date Filter
            const itemDate = item.dateFilter;

            switch (dateMode) {
                case 'No Filter':
                    return true;
                case 'Today':
                    return itemDate === TODAY;
                case 'Last 7 Days':
                    return itemDate >= SEVEN_DAYS_AGO;
                case 'Last 30 Days':
                    return itemDate >= THIRTY_DAYS_AGO;
                case 'Specific Date':
                    return itemDate === filterDate;
                case 'Monthly':
                    if (!startDate || !endDate) return true;
                    return itemDate >= startDate && itemDate <= endDate;
                default:
                    return true;
            }
        });
    }, [transactionDetails, selectedStatuses, dateMode, filterDate, filterDateRange]);

    // --- Pagination Logic ---
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage);
    
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredData, itemsPerPage]);

    // --- Component Render ---
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
                {/* Header and Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Transfer History & Status</h2>
                        <p className="text-gray-600 text-xs mt-1">Display the history of profit transfers, including pending and completed requests.</p>
                    </div>
                
                    <div className="flex items-center space-x-2">
                        
                        {/* Date Picker/Dropdown */}
                        <DateFilterComponent onDateFilterChange={handleDateFilterUpdate} />
        
                        {/* Status Filter (Unchanged) */}
                        <div className="relative">
                            <div className="relative inline-block">
                                <button 
                                    onClick={() => setStatusFilterOpen(!statusFilterOpen)} 
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm"
                                >
                                    <FaFilter /> Status
                                </button>
                                
                                {statusFilterOpen && (
                                    <div 
                                        className="dropdown-menu absolute left-auto right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-30"
                                    >
                                        <h3 className="text-gray-700 font-medium mb-3">Select Status</h3>
                                        
                                        <div className="grid grid-cols-2 gap-2">
                                            {ALL_STATUSES.map(status => (
                                                <button 
                                                    key={status}
                                                    onClick={() => handleStatusToggle(status)} 
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        selectedStatuses.includes(status) ?
                                                        'bg-yellow-400 text-gray-800 font-semibold' : 'border text-gray-700'
                                                    }`}
                                                >
                                                    <span>{status}</span>
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-4 text-center">
                                            <button 
                                                onClick={handleApplyStatusFilters} 
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
                
                {/* Table Breakdown */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap rounded-tl-lg">Date</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap">Amount (₦)</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap">Bank</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap">Account No.</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap">Status</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-normal text-gray-700 tracking-normal whitespace-nowrap rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentTableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatNumber(row.amount)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.bank}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.accountNo}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <StatusPill status={row.status} />
                                    </td>
                                    {/* Action Cell with onClick Handler */}
                                    <td 
                                        className={`px-4 py-3 whitespace-nowrap text-sm ${row.action.includes('View') ? 'text-blue-600' : 'text-red-600'} hover:underline cursor-pointer`}
                                        onClick={() => handleActionClick(row.action, row)}
                                    >
                                        {row.action}
                                    </td>
                                </tr>
                            ))}
                
                            {currentTableData.length === 0 && (
                                <tr className="border-t">
                                    <td colSpan="6" className="text-center p-4 text-gray-500">No transfers found for the selected filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Unchanged) */}
                <div className="flex justify-between items-center mt-4 p-4 border-t">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Total entries: <span className="font-bold">{totalEntries}</span></span>
                        <button 
                            className={`px-3 py-1 flex items-center space-x-1 ${currentPage === 1 ?
                            'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`} 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            <FaChevronLeft /> <span>Previous</span>
                        </button>
                    </div>
                
                    <div className="flex items-center space-x-2">
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (totalPages > 5 && (pageNum > 3 && pageNum < totalPages - 1 && pageNum !== currentPage)) {
                                if (pageNum === 4 && currentPage <= 3) return <span key="ellipsis-start" className="text-gray-500">...</span>;
                                if (pageNum === totalPages - 2 && currentPage >= totalPages - 2) return <span key="ellipsis-end" className="text-gray-500">...</span>;
                                if (pageNum !== currentPage) return null;
                            }

                            return (
                                <button 
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 font-bold rounded-full ${
                                        pageNum === currentPage ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                    
                    <button 
                        className={`px-3 py-1 flex items-center space-x-1 ${currentPage === totalPages ?
                        'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`} 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                        <span>Next</span>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferHistoryStatus;