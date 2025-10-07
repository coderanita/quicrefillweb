import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaFilter, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// --- INTERFACE DEFINITIONS ---
interface Withdrawal {
    id: string;
    amount: number;
    date: string; // YYYY-MM-DD format
    returned: 'Yes' | 'No';
    balance: number;
    bank: string; // e.g., 'Zenith Bank (1234567890)'
    status: 'Completed' | 'Pending' | 'Returned';
}

interface AppliedFilters {
    statuses: Withdrawal['status'][];
    payments: string[]; // Bank names
    services: string[]; // Withdrawal IDs
    dateMode: 'Select Date' | 'Today' | 'Monthly' | 'Specific Date'; // Explicit modes
    startDate: string | null; // YYYY-MM-DD
    endDate: string | null; // YYYY-MM-DD
}

// --- MOCK DATA ---
const initialWithdrawals: Withdrawal[] = [
    { id: 'WD-001', amount: 150000, date: '2025-03-15', returned: 'No', balance: 200000, bank: 'Zenith Bank (1234567890)', status: 'Completed' },
    { id: 'WD-002', amount: 75000, date: '2025-03-14', returned: 'No', balance: 50000, bank: 'GTBank (0987654321)', status: 'Completed' },
    { id: 'WD-003', amount: 200000, date: '2025-03-13', returned: 'Yes', balance: 500000, bank: 'Access Bank (1223344555)', status: 'Returned' },
    { id: 'WD-004', amount: 320000, date: '2025-03-12', returned: 'No', balance: 1000000, bank: 'UBA (2233445566)', status: 'Pending' },
    { id: 'WD-005', amount: 500000, date: '2025-03-11', returned: 'No', balance: 700000, bank: 'First Bank (3344556677)', status: 'Completed' },
    { id: 'WD-006', amount: 90000, date: '2025-03-10', returned: 'Yes', balance: 50000, bank: 'Fidelity Bank (4455667788)', status: 'Returned' },
    { id: 'WD-007', amount: 250000, date: '2025-03-09', returned: 'No', balance: 300000, bank: 'Fidelity Bank (4455667788)', status: 'Completed' },
    { id: 'WD-008', amount: 10000, date: '2025-03-08', returned: 'No', balance: 400000, bank: 'Access Bank (1223344555)', status: 'Pending' },
    { id: 'WD-009', amount: 80000, date: '2025-03-07', returned: 'No', balance: 320000, bank: 'Zenith Bank (1234567890)', status: 'Completed' },
    { id: 'WD-010', amount: 120000, date: '2025-03-06', returned: 'No', balance: 180000, bank: 'GTBank (0987654321)', status: 'Completed' },
    { id: 'WD-011', amount: 180000, date: '2025-03-05', returned: 'Yes', balance: 600000, bank: 'Access Bank (1223344555)', status: 'Returned' },
    { id: 'WD-012', amount: 250000, date: '2025-03-04', returned: 'No', balance: 800000, bank: 'UBA (2233445566)', status: 'Completed' },
    { id: 'WD-013', amount: 400000, date: '2025-03-03', returned: 'No', balance: 500000, bank: 'First Bank (3344556677)', status: 'Pending' },
    { id: 'WD-014', amount: 60000, date: '2025-03-02', returned: 'Yes', balance: 120000, bank: 'Fidelity Bank (4455667788)', status: 'Returned' },
    { id: 'WD-015', amount: 300000, date: '2025-03-01', returned: 'No', balance: 250000, bank: 'Fidelity Bank (4455667788)', status: 'Completed' },
    { id: 'WD-016', amount: 100000, date: '2025-02-28', returned: 'No', balance: 200000, bank: 'Zenith Bank (1234567890)', status: 'Pending' },
    { id: 'WD-017', amount: 50000, date: '2025-02-27', returned: 'No', balance: 150000, bank: 'GTBank (0987654321)', status: 'Completed' },
    { id: 'WD-018', amount: 220000, date: '2025-02-26', returned: 'Yes', balance: 300000, bank: 'Access Bank (1223344555)', status: 'Returned' },
    { id: 'WD-019', amount: 15000, date: '2025-02-25', returned: 'No', balance: 90000, bank: 'UBA (2233445566)', status: 'Completed' },
    { id: 'WD-020', amount: 95000, date: '2025-02-24', returned: 'No', balance: 100000, bank: 'First Bank (3344556677)', status: 'Completed' },
    { id: 'WD-021', amount: 180000, date: '2025-02-23', returned: 'No', balance: 250000, bank: 'Fidelity Bank (4455667788)', status: 'Pending' },
    { id: 'WD-022', amount: 400000, date: '2025-02-22', returned: 'Yes', balance: 75000, bank: 'Fidelity Bank (4455667788)', status: 'Returned' },
];

const statusOptions: Withdrawal['status'][] = ['Completed', 'Pending', 'Returned'];
const paymentOptions: string[] = ['Zenith Bank', 'GTBank', 'Access Bank', 'UBA', 'First Bank', 'Fidelity Bank'];
const serviceOptions: string[] = ['WD-001', 'WD-005', 'WD-010', 'WD-015', 'WD-020'];

// Helper to format currency
const formatCurrency = (amount: number): string => amount.toLocaleString('en-NG', { minimumFractionDigits: 0 });

// Helper for status badge styling
const getStatusClasses = (status: Withdrawal['status']): string => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Returned': return 'bg-yellow-100 text-yellow-800';
        case 'Pending': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- Date Mode Dropdown Button Component ---
interface DateModeDropdownButtonProps {
    dateMode: AppliedFilters['dateMode'];
    handleApplyDateFilter: (mode: AppliedFilters['dateMode'], startDate?: string | null, endDate?: string | null) => void;
}

const DateModeDropdownButton: React.FC<DateModeDropdownButtonProps> = ({ dateMode, handleApplyDateFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    
    const handleModeSelect = (mode: AppliedFilters['dateMode']) => {
        handleApplyDateFilter(mode); 
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}> 
            <button 
                type="button"
                onClick={toggleDropdown}
                className="min-w-[90px] px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center justify-between gap-1"
            >
                <span className="mode-label">
                    {dateMode === 'Select Date' ? 'Filter Mode' : dateMode}
                </span>
                <FaChevronDown className="text-xs" />
            </button>

            {isDropdownOpen && (
                <div
                    className="dropdownMenu absolute right-0 mt-2 bg-white border rounded-lg shadow-xl w-40 z-40"
                >
                    {['Today', 'Monthly', 'Specific Date'].map(mode => (
                        <button 
                            key={mode}
                            type="button" 
                            onClick={() => handleModeSelect(mode as AppliedFilters['dateMode'])}
                            className={`w-full text-left px-4 py-2 text-sm transition duration-150 ${dateMode === mode ? 'bg-yellow-400 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            {mode}
                        </button>
                    ))}
                    {/* Clear Date Button */}
                    <button
                        type="button"
                        onClick={() => handleModeSelect('Select Date')} 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 border-t border-gray-200"
                    >
                        Clear Date
                    </button>
                </div>
            )}
        </div>
    );
}

// --- Custom Date Picker Component with open options ---
interface DatePickerDropdownProps {
    dateMode: AppliedFilters['dateMode'];
    startDate: string | null;
    endDate: string | null;
    handleApplyDateFilter: (mode: AppliedFilters['dateMode'], startDate?: string | null, endDate?: string | null) => void;
}

const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ 
    dateMode, 
    startDate, 
    endDate, 
    handleApplyDateFilter 
}) => {
    const isRangeMode = dateMode === 'Monthly';
    const isSingleDateMode = dateMode === 'Specific Date';
    
    // Internal state for date inputs (Only used for Monthly Range mode)
    const [internalStartDate, setInternalStartDate] = useState(startDate);
    const [internalEndDate, setInternalEndDate] = useState(endDate);

    // Sync internal state when external props change for Monthly mode only.
    useEffect(() => {
        if (isRangeMode) {
            setInternalStartDate(startDate);
            setInternalEndDate(endDate);
        }
    }, [startDate, endDate, isRangeMode]);

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        if (isSingleDateMode) {
            
            if (type === 'start' && value) {
                 handleApplyDateFilter('Specific Date', value, value);
            }
        } else if (isRangeMode) {
            // Range mode still uses internal state until 'Apply' is clicked
            if (type === 'start') {
                setInternalStartDate(value);
            } else {
                setInternalEndDate(value);
            }
        }
    };
    
    const handleApplyRangeDate = () => {
        if (isRangeMode && internalStartDate && internalEndDate) {
            handleApplyDateFilter('Monthly', internalStartDate, internalEndDate);
        }
    };
    
    const getDateInputLabel = () => {
        if (dateMode === 'Today') return 'Today';
        if (dateMode === 'Monthly' && startDate && endDate) return `${startDate} to ${endDate}`;
        if (dateMode === 'Specific Date' && startDate) return startDate;
        return 'Select a date or range';
    }

    // Determine the value to show in the input
    const displayStartDate = isSingleDateMode ? startDate : (isRangeMode ? internalStartDate : startDate);
    const displayEndDate = isRangeMode ? internalEndDate : endDate;


    return (
        <div className="date-picker-wrapper relative w-full min-w-[280px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-wrap items-center border rounded-lg bg-white relative">
                
                {/* Calendar Icon */}
                <div className="pl-3 pr-2 py-2 text-gray-500">
                    <FaCalendarAlt />
                </div>
                
                {/* Date Inputs / Display */}
                <div className={`py-2 text-sm ${dateMode === 'Select Date' ? 'text-gray-400' : 'text-gray-700 font-medium'} flex-grow min-w-0`}>
                    
                    {dateMode !== 'Monthly' && dateMode !== 'Specific Date' ? (
                        // Label Display (Select Date / Today)
                        <span className="px-1">{getDateInputLabel()}</span>
                    ) : (
                        // Inputs Display (Monthly / Specific Date)
                        <div className="flex flex-wrap gap-2 p-1 items-center">
                            
                            {/* Start Date Input (Always present in range/specific modes) */}
                            <input
                                type="date"
                                value={displayStartDate || ''} 
                                onChange={(e) => handleDateChange('start', e.target.value)}
                                className={`py-1 text-sm text-gray-700 focus:outline-none bg-white ${isRangeMode ? 'w-24' : 'w-32'}`}
                                title={isSingleDateMode ? "Specific Date" : "Start Date"}
                            />
                            
                            {/* End Date Input (Only for Monthly Range Mode) */}
                            {isRangeMode && (
                                <>
                                    <span className="text-gray-400 self-center">-</span>
                                    <input
                                        type="date"
                                        value={displayEndDate || ''}
                                        onChange={(e) => handleDateChange('end', e.target.value)}
                                        className="w-24 py-1 text-sm text-gray-700 focus:outline-none bg-white"
                                        title="End Date"
                                    />
                                    {/* Apply Button (Only for Monthly Range Mode) */}
                                    <button
                                        type="button"
                                        onClick={handleApplyRangeDate}
                                        disabled={!displayStartDate || !displayEndDate}
                                        className="px-2 py-1 bg-yellow-400 text-gray-800 rounded-md text-xs font-semibold hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-500 transition duration-150"
                                    >
                                        Apply
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Date Mode Dropdown Toggle */}
                <DateModeDropdownButton dateMode={dateMode} handleApplyDateFilter={handleApplyDateFilter} />
            </div>
        </div>
    );
};


// ----------------------------------------------------------------------
// --- MAIN COMPONENT ---
// ----------------------------------------------------------------------

const VendorWithdrawHistory: React.FC = () => {
    // --- Filter Dropdown State ---
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('');

    // --- Temporary Filter Selections (Before Apply) ---
    const [tempSelectedStatuses, setTempSelectedStatuses] = useState<Withdrawal['status'][]>([]);
    const [tempSelectedPayments, setTempSelectedPayments] = useState<string[]>([]);
    const [tempSelectedServices, setTempSelectedServices] = useState<string[]>([]);
    
    // --- Applied Filter State ---
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
        statuses: [],
        payments: [],
        services: [],
        dateMode: 'Select Date', 
        startDate: null,
        endDate: null,
    });
    
    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5; 

// ----------------------------------------------------------------------
// --- HANDLERS ---
// ----------------------------------------------------------------------

    const handleApplyFilters = (): void => {
        setAppliedFilters(prev => ({
            ...prev,
            statuses: tempSelectedStatuses,
            payments: tempSelectedPayments,
            services: tempSelectedServices,
        }));
        setIsFilterOpen(false); 
        setCurrentPage(1); 
    };

    const handleClearFilters = (): void => {
        setTempSelectedStatuses([]);
        setTempSelectedPayments([]);
        setTempSelectedServices([]);
        
        setAppliedFilters({ 
            statuses: [], 
            payments: [], 
            services: [], 
            dateMode: 'Select Date', 
            startDate: null, 
            endDate: null,
        });
        
        setIsFilterOpen(false);
        setCurrentPage(1);
    }
    
    const handleToggleSelection = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string): void => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };
    
    const handleApplyDateFilter = useCallback((mode: AppliedFilters['dateMode'], startDate?: string | null, endDate?: string | null) => {
        const today: string = new Date().toISOString().split('T')[0];

        if (mode === 'Today') {
            setAppliedFilters(prev => ({
                ...prev,
                dateMode: mode,
                startDate: today,
                endDate: today,
            }));
        } else if (mode === 'Monthly') {
            setAppliedFilters(prev => ({
                ...prev,
                dateMode: mode,
                startDate: startDate === undefined ? prev.startDate : startDate,
                endDate: endDate === undefined ? prev.endDate : endDate,
            }));
        } else if (mode === 'Specific Date' && startDate) {
            setAppliedFilters(prev => ({
                ...prev,
                dateMode: mode,
                startDate,
                endDate: startDate, 
            }));
        } else {
            setAppliedFilters(prev => ({
                 ...prev,
                dateMode: 'Select Date',
                startDate: null,
                endDate: null,
            }));
        }
        setCurrentPage(1);
    }, []);

// ----------------------------------------------------------------------
// --- FILTERING & PAGINATION LOGIC ---
// ----------------------------------------------------------------------

    const filteredWithdrawals: Withdrawal[] = useMemo(() => {
        let data = initialWithdrawals;
        const { statuses, payments, services, startDate, endDate } = appliedFilters;
        
        if (statuses.length > 0) {
            data = data.filter(item => statuses.includes(item.status));
        }
        if (payments.length > 0) {
            data = data.filter(item => {
                const bankName = item.bank.split(' ')[0]; 
                return payments.includes(bankName);
            });
        }
        if (services.length > 0) {
            data = data.filter(item => services.includes(item.id));
        }
        
        if (startDate && endDate && appliedFilters.dateMode !== 'Select Date') {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1); // Make end date inclusive for the filter check
            
            data = data.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= start && itemDate < end;
            });
        }

        return data;
    }, [appliedFilters]);

    const totalItems: number = filteredWithdrawals.length;
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);
    
    const currentTableData: Withdrawal[] = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return filteredWithdrawals.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredWithdrawals, itemsPerPage]);

    const goToPage = (page: number): void => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationRange = (maxPages = 5): (number | string)[] => {
        const pages: (number | string)[] = [];
        const start = Math.max(1, currentPage - Math.floor(maxPages / 2));
        const end = Math.min(totalPages, start + maxPages - 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (start > 1) { pages.unshift(1); if (start > 2) pages.splice(1, 0, '...'); }
        if (end < totalPages) { if (end < totalPages - 1) pages.push('...'); pages.push(totalPages); }
        
        return Array.from(new Set(pages));
    };


    return (
        <div className="max-w-full mx-auto font-sans">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Vendor Withdraw History</h2>
                    
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        
                        <div className="mb-2 md:mb-0">
                            <div className="flex gap-0">
                                {/* Date Picker Section */}
                                <DatePickerDropdown
                                    dateMode={appliedFilters.dateMode}
                                    startDate={appliedFilters.startDate}
                                    endDate={appliedFilters.endDate}
                                    handleApplyDateFilter={handleApplyDateFilter}
                                />
                            </div>
                        </div>

                        {/* --- Filter Dropdown Section --- */}
                        <div className="relative inline-block w-full sm:w-auto">
                            <button 
                                onClick={() => setIsFilterOpen(prev => !prev)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm transition duration-150"
                            >
                                <FaFilter /> Filter
                            </button>

                            {isFilterOpen && (
                                <div className="dropdown-menu absolute right-0 top-full mt-2 w-96 bg-white border rounded-lg shadow-lg p-4 z-30" 
                                    onClick={(e) => e.stopPropagation()}>

                                    <h3 className="text-gray-700 font-medium mb-3">Select Filter</h3>

                                    {/* Main Filter Categories */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {['Status', 'Payment', 'Service'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedFilterCategory(cat)}
                                                className={`px-3 py-2 rounded-lg text-sm transition duration-150 ${selectedFilterCategory === cat ? 'bg-yellow-400 font-semibold' : 'border hover:bg-gray-50'}`}
                                            >
                                                {cat === 'Payment' ? 'Payment (Bank)' : cat === 'Service' ? 'Service (WD ID)' : cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Sub-Filter Dropdowns (Status, Payment, Service options) */}
                                    {selectedFilterCategory === 'Status' && (
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            {statusOptions.map(status => (
                                                <button key={status} onClick={() => handleToggleSelection(tempSelectedStatuses as string[], setTempSelectedStatuses as React.Dispatch<React.SetStateAction<string[]>>, status)}
                                                    className={`px-3 py-2 rounded-lg text-sm ${tempSelectedStatuses.includes(status) ? 'bg-yellow-400 font-semibold' : 'border hover:bg-gray-50'}`}>
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {selectedFilterCategory === 'Payment' && (
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            {paymentOptions.map(payment => (
                                                <button key={payment} onClick={() => handleToggleSelection(tempSelectedPayments, setTempSelectedPayments, payment)}
                                                    className={`px-3 py-2 rounded-lg text-sm ${tempSelectedPayments.includes(payment) ? 'bg-yellow-400 font-semibold' : 'border hover:bg-gray-50'}`}>
                                                    {payment}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {selectedFilterCategory === 'Service' && (
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            {serviceOptions.map(service => (
                                                <button key={service} onClick={() => handleToggleSelection(tempSelectedServices, setTempSelectedServices, service)}
                                                    className={`px-3 py-2 rounded-lg text-sm ${tempSelectedServices.includes(service) ? 'bg-yellow-400 font-semibold' : 'border hover:bg-gray-50'}`}>
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Apply & Clear Buttons */}
                                    <div className="mt-4 flex justify-between border-t pt-3">
                                        <button 
                                            onClick={handleClearFilters}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition duration-150"
                                        >
                                            Clear Filters
                                        </button>
                                        <button 
                                            onClick={handleApplyFilters}
                                            className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition duration-150"
                                        >
                                            Apply ({tempSelectedStatuses.length + tempSelectedPayments.length + tempSelectedServices.length})
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ----------------------------------------------------------------------
                --- TABLE SECTION ---
                ---------------------------------------------------------------------- */}
                <div className="overflow-auto p-4">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-600 tracking-wider">
                            <tr>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Withdrawal ID</th>
                                <th scope="col" className="px-3 py-2 text-right font-medium">Amount Withdrawn (₦)</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Transaction Date</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Returned?</th>
                                <th scope="col" className="px-3 py-2 text-right font-medium">Wallet Balance After Withdrawal (₦)</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Bank & Account Number</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Status</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                            {currentTableData.length > 0 ? (
                                currentTableData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-3 py-2 whitespace-nowrap">{item.id}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-right">{formatCurrency(item.amount)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{item.date}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{item.returned}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-right">{formatCurrency(item.balance)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{item.bank}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer">
                                            View Details
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-3 py-4 text-center text-gray-500">
                                        No withdrawal history matches the applied filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ----------------------------------------------------------------------
                --- PAGINATION SECTION ---
                ---------------------------------------------------------------------- */}
                <div className="flex justify-between items-center mt-4 p-4 border-t">
                    {/* Left Section: Total Entries & Previous Button */}
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Total entries: <span className="font-bold">{totalItems}</span></span>
                        <button 
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 flex items-center space-x-1 transition duration-150 ${currentPage === 1 ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:text-blue-500'}`}
                        >
                            <FaArrowLeft /> <span>Previous</span>
                        </button>
                    </div>

                    {/* Centered Page Numbers */}
                    <div className="flex items-center space-x-2">
                        {getPaginationRange().map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="px-3 py-1 text-gray-500 text-sm">..</span>
                                ) : (
                                    <button 
                                        onClick={() => goToPage(page as number)}
                                        className={`px-3 py-1 text-sm rounded-full transition duration-150 ${(page as number) === currentPage ? 'bg-yellow-500 text-white font-bold' : 'text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    
                    {/* Right Section: Next Button */}
                    <button 
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`px-3 py-1 flex items-center space-x-1 transition duration-150 ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:text-blue-500'}`}
                    >
                        <span>Next</span> <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorWithdrawHistory;