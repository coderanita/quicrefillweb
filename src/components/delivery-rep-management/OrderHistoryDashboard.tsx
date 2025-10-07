import React, { useState, useMemo, useCallback } from 'react';
import { FaFilter, FaCalendarAlt, FaChevronDown, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaUserCircle, FaMoneyBillWave } from 'react-icons/fa';

// --- Static Data and Configuration ---

const STATUS_OPTIONS = ['Completed', 'In Progress', 'Cancelled', 'Disputed', 'In Transit'];
const PAYMENT_OPTIONS = ['On delivery', 'Wallet', 'Flutterwave'];
const SERVICE_OPTIONS = ['Gas Refill', 'Petroleum', 'Diesel', 'Accessories', 'Electricity'];
const DATE_MODES = ['Today', 'Specific Date', 'Date Range'];

// Mock Order Data has been expanded for richer detail view
const MOCK_ORDERS = [
    { 
        id: 'ORD-04521', 
        customer: 'John Doe', 
        service: 'Gas Refill', 
        deliveryTime: '42 mins', 
        earnings: 2500, 
        status: 'Completed', 
        payment: 'Wallet', 
        date: '2024-09-25',
        details: { 
            deliveryAddress: '123, Adeniyi Jones, Ikeja, Lagos', 
            items: [{ name: '12.5kg Gas Cylinder', quantity: 1, price: 5500 }],
            subtotal: 5500,
            deliveryFee: 500,
            totalAmount: 6000,
            paymentId: 'PAY-7890',
        } 
    },
    { 
        id: 'ORD-04518', 
        customer: 'Jane Smith', 
        service: 'Gas Refill', 
        deliveryTime: '36 mins', 
        earnings: 3200, 
        status: 'In Progress', 
        payment: 'On delivery', 
        date: '2024-09-24',
        details: { 
            deliveryAddress: '45B, Admiralty Way, Lekki Phase 1', 
            items: [{ name: '6kg Gas Cylinder', quantity: 1, price: 3000 }],
            subtotal: 3000,
            deliveryFee: 200,
            totalAmount: 3200,
            paymentId: 'N/A',
        }
    },
    { 
        id: 'ORD-04490', 
        customer: 'Richard Obi', 
        service: 'Petroleum', 
        deliveryTime: '45 mins', 
        earnings: 1800, 
        status: 'Cancelled', 
        payment: 'Flutterwave', 
        date: '2024-09-23',
        details: { 
            deliveryAddress: '7, Awolowo Road, Ikoyi', 
            items: [{ name: '50 Litres Premium Petrol', quantity: 1, price: 10000 }],
            subtotal: 10000,
            deliveryFee: 0,
            totalAmount: 10000,
            paymentId: 'PAY-6543',
        }
    },
    { id: 'ORD-04465', customer: 'Sarah Johnson', service: 'Accessories', deliveryTime: '50 mins', earnings: 2700, status: 'Completed', payment: 'Wallet', date: '2024-09-22', details: { deliveryAddress: '19, Allen Avenue, Ikeja', items: [{ name: 'Lighter', quantity: 5, price: 500 }], subtotal: 2500, deliveryFee: 200, totalAmount: 2700, paymentId: 'PAY-4321' } },
    { id: 'ORD-04401', customer: 'Kwame Nkrumah', service: 'Diesel', deliveryTime: '30 mins', earnings: 5000, status: 'In Transit', payment: 'On delivery', date: '2024-09-25', details: { deliveryAddress: 'Block 2, Festac Town', items: [{ name: '100 Litres Diesel', quantity: 1, price: 40000 }], subtotal: 40000, deliveryFee: 0, totalAmount: 40000, paymentId: 'N/A' } },
    { id: 'ORD-04355', customer: 'Aisha Lawal', service: 'Electricity', deliveryTime: '60 mins', earnings: 1200, status: 'Disputed', payment: 'Flutterwave', date: '2024-09-21', details: { deliveryAddress: '33, Bode Thomas, Surulere', items: [{ name: 'N10,000 Electricity Token', quantity: 1, price: 10000 }], subtotal: 10000, deliveryFee: 0, totalAmount: 10000, paymentId: 'PAY-3456' } },
    { id: 'ORD-04300', customer: 'David Eze', service: 'Gas Refill', deliveryTime: '40 mins', earnings: 2900, status: 'Completed', payment: 'Wallet', date: '2024-09-20', details: { deliveryAddress: '88, Herbert Macaulay Way, Yaba', items: [{ name: '5kg Gas Cylinder', quantity: 1, price: 2700 }], subtotal: 2700, deliveryFee: 200, totalAmount: 2900, paymentId: 'PAY-1098' } },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'text-green-600 bg-green-100';
        case 'In Progress':
        case 'In Transit': return 'text-yellow-600 bg-yellow-100';
        case 'Cancelled':
        case 'Disputed': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
};

// Helper function to format NGN currency
const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

// --- NEW Component: OrderDetailModal ---

const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;

    const { id, customer, service, status, payment, date, deliveryTime, earnings, details } = order;

    const StatusBadge = ({ status }) => (
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(status)}`}>
            {status}
        </span>
    );
    
    // Check if details is defined before trying to access its properties
    const items = details?.items || [];
    const deliveryAddress = details?.deliveryAddress || 'N/A';
    const subtotal = details?.subtotal || 0;
    const deliveryFee = details?.deliveryFee || 0;
    const totalAmount = details?.totalAmount || 0;
    const paymentId = details?.paymentId || 'N/A';


    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Order Details: {id}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {/* Status and Summary */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                        <StatusBadge status={status} />
                        <p className="text-sm font-medium text-gray-600">Order Date: <span className="text-gray-800 font-semibold">{date}</span></p>
                    </div>

                    {/* General Info */}
                    <div className="space-y-3 mb-6">
                        <DetailItem icon={<FaUserCircle className="text-yellow-500" />} label="Customer" value={customer} />
                        <DetailItem icon={<FaMapMarkerAlt className="text-yellow-500" />} label="Delivery Address" value={deliveryAddress} />
                        <DetailItem icon={<FaMoneyBillWave className="text-yellow-500" />} label="Payment Method" value={payment} />
                        <DetailItem icon={<FaTimes className="text-yellow-500 opacity-0" />} label="Payment ID" value={paymentId} />
                    </div>

                    {/* Items Section */}
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Items Ordered ({items.length})</h3>
                    <div className="space-y-2 mb-6">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                <span className="font-medium">{item.name} <span className="text-gray-500">({item.quantity} unit{item.quantity !== 1 ? 's' : ''})</span></span>
                                <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Totals Section */}
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                        <SummaryRow label="Delivery Fee" value={formatCurrency(deliveryFee)} />
                        <SummaryRow label="Total Paid by Customer" value={formatCurrency(totalAmount)} bold={true} />
                        <SummaryRow label="Your Earnings" value={formatCurrency(earnings)} bold={true} highlight="text-green-600" />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper component for detail rows
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start text-sm text-gray-700">
        <div className="mr-3 mt-1 text-lg">{icon}</div>
        <div>
            <span className="font-medium text-gray-500 block">{label}</span>
            <span className="font-semibold text-gray-800">{value}</span>
        </div>
    </div>
);

// Helper component for summary rows
const SummaryRow = ({ label, value, bold = false, highlight = 'text-gray-800' }) => (
    <div className={`flex justify-between ${bold ? 'font-bold text-base border-t pt-2 mt-2' : ''}`}>
        <span className={`${bold ? 'text-gray-700' : 'text-gray-600'}`}>{label}</span>
        <span className={`${highlight}`}>{value}</span>
    </div>
);


// --- Separate component for the Filter Dropdown contents (omitted for brevity, assume unchanged) ---
// ... (Your FilterDropdown component logic) ...

const FilterDropdown = ({ stagedFilters, setStagedFilters, applyFilters, setIsOpen, activeSection, setActiveSection }) => {
    const handleToggle = (type, value) => {
        setStagedFilters(prev => {
            const currentArray = prev[type];
            if (currentArray.includes(value)) {
                return { ...prev, [type]: currentArray.filter(v => v !== value) };
            } else {
                return { ...prev, [type]: [...currentArray, value] };
            }
        });
    };

    const handleApply = () => {
        applyFilters(stagedFilters);
        setIsOpen(false);
    };

    const FilterButton = ({ type, label }) => (
        <button
            onClick={() => setActiveSection(label)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors w-full ${
                activeSection === label ? 'bg-yellow-400 font-semibold' : 'border border-gray-300 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    );

    const FilterSection = ({ title, options, filterType }) => (
        <div className="mt-4 border-t pt-3">
            <h3 className="text-gray-700 font-medium mb-2">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleToggle(filterType, option)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors border ${
                            stagedFilters[filterType].includes(option)
                                ? 'bg-yellow-400 font-semibold border-yellow-500'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="absolute right-0 top-full mt-2 w-72 md:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-30 transform origin-top-right transition-all duration-200">
            <h3 className="text-lg text-gray-800 font-semibold mb-3 border-b pb-2">Select Filters</h3>

            <div className="grid grid-cols-3 gap-2 mb-3">
                <FilterButton label="Order Status" type="order" />
                <FilterButton label="Payment Type" type="payment" />
                <FilterButton label="Service Type" type="service" />
            </div>

            {/* Conditional Filter Sections */}
            {activeSection === 'Order Status' && (
                <FilterSection
                    title="Select Order Status"
                    options={STATUS_OPTIONS}
                    filterType="selectedStatuses"
                />
            )}
            {activeSection === 'Payment Type' && (
                <FilterSection
                    title="Select Payment Type"
                    options={PAYMENT_OPTIONS}
                    filterType="selectedPayments"
                />
            )}
            {activeSection === 'Service Type' && (
                <FilterSection
                    title="Select Service Type"
                    options={SERVICE_OPTIONS}
                    filterType="selectedServices"
                />
            )}

            {/* Apply Button */}
            <div className="mt-5 pt-3 border-t text-center">
                <button
                    onClick={handleApply}
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---

const OrderHistoryDashboard = () => {
    // ... (Existing states for filters, staged filters, and UI) ...
    
    // 1. Final Active Filters State
    const [filters, setFilters] = useState({
        dateMode: 'Specific Date',
        startDate: '',
        endDate: '',
        selectedStatuses: [],
        selectedPayments: [],
        selectedServices: [],
    });

    // 2. Staged Filters State (for live changes within the filter dropdown)
    const [stagedFilters, setStagedFilters] = useState(filters);

    // 3. UI States
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isDateModeDropdownOpen, setIsDateModeDropdownOpen] = useState(false);
    const [activeFilterSection, setActiveFilterSection] = useState('Order Status');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // --- NEW STATE FOR MODAL ---
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- NEW HANDLER FUNCTION ---
    const handleViewOrder = useCallback((order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }, []);


    // Sync staged filters when the main filter dropdown opens
    React.useEffect(() => {
        if (isFilterDropdownOpen) {
            setStagedFilters(filters);
        }
    }, [isFilterDropdownOpen]);

    // Function to apply filters from staged to active
    const applyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset pagination on filter change
    }, []);

    // Function to handle date mode selection
    const setDateMode = (mode) => {
        const today = new Date().toISOString().split('T')[0];
        let newStartDate = '';
        let newEndDate = '';

        if (mode === 'Today') {
            newStartDate = today;
            newEndDate = today;
        } else if (mode === 'Date Range') {
            // Leave blank for user input
        } else if (mode === 'Specific Date') {
            // Leave blank for user input (single date)
        }

        applyFilters({
            ...filters,
            dateMode: mode,
            startDate: newStartDate,
            endDate: newEndDate,
        });
        setIsDateModeDropdownOpen(false);
    };

    // Handler for date input changes
    const handleDateChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value,
        }));
    };

    // Formatted date display for the input field
    const dateInputDisplay = useMemo(() => {
        if (filters.dateMode === 'Today') {
            return `Today: ${filters.startDate}`;
        }
        if (filters.dateMode === 'Specific Date' && filters.startDate) {
            return `Date: ${filters.startDate}`;
        }
        if (filters.dateMode === 'Date Range' && filters.startDate && filters.endDate) {
            return `${filters.startDate} to ${filters.endDate}`;
        }
        return filters.dateMode;
    }, [filters.dateMode, filters.startDate, filters.endDate]);

    // --- Filtering Logic using useMemo (UNCHANGED) ---
    const filteredOrders = useMemo(() => {
        const { startDate, endDate, dateMode, selectedStatuses, selectedPayments, selectedServices } = filters;
        let result = MOCK_ORDERS;

        // 1. Apply Date Filter
        if (startDate && endDate && dateMode === 'Date Range') {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            result = result.filter(order => {
                const orderDate = new Date(order.date).getTime();
                return orderDate >= start && orderDate <= end;
            });
        } else if (startDate && dateMode === 'Specific Date') {
            result = result.filter(order => order.date === startDate);
        } else if (dateMode === 'Today' && startDate) {
            result = result.filter(order => order.date === startDate);
        }

        // 2. Apply Status Filter
        if (selectedStatuses.length > 0) {
            result = result.filter(order => selectedStatuses.includes(order.status));
        }

        // 3. Apply Payment Filter
        if (selectedPayments.length > 0) {
            result = result.filter(order => selectedPayments.includes(order.payment));
        }

        // 4. Apply Service Filter
        if (selectedServices.length > 0) {
            result = result.filter(order => selectedServices.includes(order.service));
        }

        return result;
    }, [filters]);

    // --- Pagination Logic (UNCHANGED) ---
    const totalEntries = filteredOrders.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage);
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredOrders.slice(start, end);
    }, [filteredOrders, currentPage, itemsPerPage]);

    // Handle showing up to 5 page numbers
    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pages.push(<span key="start-dots" className="text-gray-500 mx-1">..</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                        i === currentPage
                            ? 'bg-yellow-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(<span key="end-dots" className="text-gray-500 mx-1">..</span>);
        }
        return pages;
    };


    return (
        
        <div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-4">
                <div className="container mx-auto">
                    {/* Header and Filter Controls (UNCHANGED) */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Order History</h1>
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Date Picker Section */}
                            <div className="relative z-10">
                                <div className="flex items-center">
                                    {/* Date/Range Input Field */}
                                    {filters.dateMode !== 'Today' && (
                                        <div className="flex gap-2 mr-2">
                                            {filters.dateMode !== 'Date Range' && (
                                                <input
                                                    type="date"
                                                    value={filters.startDate}
                                                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                                                    className="w-36 pl-3 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                                                />
                                            )}
                                            {filters.dateMode === 'Date Range' && (
                                                <>
                                                    <input
                                                        type="date"
                                                        placeholder="Start Date"
                                                        value={filters.startDate}
                                                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                                                        className="w-36 pl-3 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                                                    />
                                                    <input
                                                        type="date"
                                                        placeholder="End Date"
                                                        value={filters.endDate}
                                                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                                                        className="w-36 pl-3 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Date Mode Dropdown Button */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDateModeDropdownOpen(prev => !prev)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm flex items-center gap-2 hover:bg-gray-50 transition"
                                        >
                                            <FaCalendarAlt className="w-4 h-4" />
                                            {filters.dateMode}
                                            <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDateModeDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Date Mode Dropdown Menu */}
                                        {isDateModeDropdownOpen && (
                                            <div className="absolute w-40 mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                                                {DATE_MODES.map(mode => (
                                                    <button
                                                        key={mode}
                                                        onClick={() => setDateMode(mode)}
                                                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                                            filters.dateMode === mode ? 'bg-yellow-500 text-white font-medium' : 'hover:bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {mode}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Filter Dropdown Section */}
                            <div className="relative inline-block z-20">
                                {/* Filter Button */}
                                <button
                                    onClick={() => setIsFilterDropdownOpen(prev => !prev)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    <FaFilter className="w-4 h-4" />
                                    Filter
                                    { (filters.selectedStatuses.length > 0 || filters.selectedPayments.length > 0 || filters.selectedServices.length > 0) && (
                                        <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {filters.selectedStatuses.length + filters.selectedPayments.length + filters.selectedServices.length}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isFilterDropdownOpen && (
                                    <FilterDropdown
                                        stagedFilters={stagedFilters}
                                        setStagedFilters={setStagedFilters}
                                        applyFilters={applyFilters}
                                        setIsOpen={setIsFilterDropdownOpen}
                                        activeSection={activeFilterSection}
                                        setActiveSection={setActiveFilterSection}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display (UNCHANGED) */}
                    {(filters.selectedStatuses.length > 0 || filters.selectedPayments.length > 0 || filters.selectedServices.length > 0) && (
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-700">Active Filters:</span>
                            {[
                                ...filters.selectedStatuses.map(s => ({ type: 'selectedStatuses', label: s })),
                                ...filters.selectedPayments.map(p => ({ type: 'selectedPayments', label: p })),
                                ...filters.selectedServices.map(v => ({ type: 'selectedServices', label: v })),
                            ].map((item, index) => (
                                <span key={index} className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium shadow-sm">
                                    {item.label}
                                    <button
                                        onClick={() => {
                                            // Create a new filters object for removal
                                            const newFilters = { ...filters };
                                            newFilters[item.type] = newFilters[item.type].filter(val => val !== item.label);
                                            applyFilters(newFilters);
                                        }}
                                        className="ml-2 text-yellow-700 hover:text-red-500"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}


                    {/* Order History Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full border-collapse bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="p-4 whitespace-nowrap">Order ID</th>
                                    <th className="p-4 whitespace-nowrap">Customer Name</th>
                                    <th className="p-4 whitespace-nowrap">Service</th>
                                    <th className="p-4 whitespace-nowrap">Delivery Time</th>
                                    <th className="p-4 whitespace-nowrap">Earnings (₦)</th>
                                    <th className="p-4 whitespace-nowrap">Status</th>
                                    <th className="p-4 whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOrders.length > 0 ? (
                                    paginatedOrders.map((order, index) => (
                                        <tr
                                            key={order.id}
                                            className={`text-gray-700 hover:bg-gray-50 transition-colors ${index < paginatedOrders.length - 1 ? 'border-b border-gray-100' : ''}`}
                                        >
                                            <td className="p-4 font-semibold text-sm">{order.id}</td>
                                            <td className="p-4 text-sm">{order.customer}</td>
                                            <td className="p-4 text-sm">{order.service}</td>
                                            <td className="p-4 text-sm">{order.deliveryTime}</td>
                                            <td className="p-4 font-bold text-green-700 text-sm">{formatCurrency(order.earnings)}</td>
                                            <td className="p-4">
                                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {/* MODIFIED onClick HANDLER */}
                                                <button 
                                                    onClick={() => handleViewOrder(order)} 
                                                    className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                                                >
                                                    View Order
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={parseInt(7)} className="p-6 text-center text-gray-500">
                                            No orders match the current filter criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (UNCHANGED) */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 border-t border-gray-200">
                        {/* Left Section: Total Entries & Previous Button */}
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <span className="text-gray-600 text-sm">
                                Showing {Math.min(totalEntries, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(totalEntries, currentPage * itemsPerPage)} of <span className="font-bold">{totalEntries}</span> entries
                            </span>
                        </div>

                        {/* Centered Page Numbers */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 text-sm flex items-center space-x-1 rounded-lg transition-colors ${
                                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <FaChevronLeft className="w-3 h-3" /> <span>Previous</span>
                            </button>

                            <div className="flex space-x-1">
                                {renderPageNumbers()}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className={`px-3 py-1 text-sm flex items-center space-x-1 rounded-lg transition-colors ${
                                    currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span>Next</span> <FaChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* NEW MODAL RENDER SECTION */}
            {isModalOpen && <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />}
        </div>
        
    );
};

export default OrderHistoryDashboard;