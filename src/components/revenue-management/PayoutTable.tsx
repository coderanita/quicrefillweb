import React, { useState, useMemo, useCallback } from 'react';

// --- Data Definitions (Extracted from provided HTML) ---

const PENDING_PAYOUTS_DATA = [
    { id: 'PAY-1001', name: 'Vendor A', service: 'Gas Refill', amount: 50000, date: '2025-03-10', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1002', name: 'Rep B', service: 'Gas Refill', amount: 75000, date: '2025-03-11', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1003', name: 'Vendor C', service: 'Diesel', amount: 40000, date: '2025-03-12', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1004', name: 'Rep D', service: 'Petroleum', amount: 60000, date: '2025-03-13', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1005', name: 'Vendor E', service: 'Accessories', amount: 25000, date: '2025-03-14', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1006', name: 'Rep F', service: 'Petroleum', amount: 35000, date: '2025-03-14', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1007', name: 'Vendor G', service: 'Petroleum', amount: 90000, date: '2025-03-14', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1008', name: 'Rep H', service: 'Petroleum', amount: 120000, date: '2025-03-15', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1009', name: 'Vendor I', service: 'Accessories', amount: 55000, date: '2025-03-15', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1010', name: 'Rep J', service: 'Accessories', amount: 80000, date: '2025-03-15', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1011', name: 'Vendor K', service: 'Accessories', amount: 45000, date: '2025-03-16', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1012', name: 'Rep L', service: 'Diesel', amount: 100000, date: '2025-03-16', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1013', name: 'Vendor M', service: 'Gas Refill', amount: 30000, date: '2025-03-16', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1014', name: 'Rep N', service: 'Gas Refill', amount: 75000, date: '2025-03-17', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1015', name: 'Vendor O', service: 'Gas Refill', amount: 85000, date: '2025-03-17', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1016', name: 'Rep P', service: 'Diesel', amount: 55500, date: '2025-03-17', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1017', name: 'Vendor Q', service: 'Diesel', amount: 110000, date: '2025-03-17', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1018', name: 'Rep R', service: 'Accessories', amount: 40000, date: '2025-03-18', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
    { id: 'PAY-1019', name: 'Vendor S', service: 'Accessories', amount: 95000, date: '2025-03-18', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1020', name: 'Rep T', service: 'Accessories', amount: 85000, date: '2025-03-19', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1021', name: 'Vendor U', service: 'Petroleum', amount: 65000, date: '2025-03-20', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1022', name: 'Rep U', service: 'Petroleum', amount: 84000, date: '2025-03-21', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1023', name: 'Vendor V', service: 'Gas Refill', amount: 43000, date: '2025-03-21', method: 'Bank Transfer', status: 'Pending', action: 'Process' },
    { id: 'PAY-1024', name: 'Rep W', service: 'Diesel', amount: 78000, date: '2025-03-22', method: 'Mobile Wallet', status: 'Pending', action: 'Process' },
];

const COMPLETED_PAYOUTS_DATA = [
    { id: 'PAY-2001', name: 'Vendor A', service: 'Gas Refill', amount: 50000, date: '2025-03-01', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982301' },
    { id: 'PAY-2002', name: 'Vendor B', service: 'Diesel', amount: 75000, date: '2025-03-02', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982302' },
    { id: 'PAY-2003', name: 'Rep C', service: 'Diesel', amount: 40000, date: '2025-03-02', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982303' },
    { id: 'PAY-2004', name: 'Vendor D', service: 'Petroleum', amount: 60000, date: '2025-03-03', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982304' },
    { id: 'PAY-2005', name: 'Rep E', service: 'Diesel', amount: 25000, date: '2025-03-03', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982305' },
    { id: 'PAY-2006', name: 'Vendor F', service: 'Gas Refill', amount: 35000, date: '2025-03-04', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982306' },
    { id: 'PAY-2007', name: 'Rep G', service: 'Gas Refill', amount: 90000, date: '2025-03-04', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982307' },
    { id: 'PAY-2008', name: 'Vendor H', service: 'Petroleum', amount: 120000, date: '2025-03-04', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982308' },
    { id: 'PAY-2009', name: 'Rep I', service: 'Petroleum', amount: 55000, date: '2025-03-05', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982309' },
    { id: 'PAY-2010', name: 'Vendor J', service: 'Petroleum', amount: 80000, date: '2025-03-05', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982310' },
    { id: 'PAY-2011', name: 'Rep K', service: 'Diesel', amount: 43000, date: '2025-03-05', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982311' },
    { id: 'PAY-2012', name: 'Vendor L', service: 'Diesel', amount: 53000, date: '2025-03-06', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982312' },
    { id: 'PAY-2013', name: 'Rep M', service: 'Gas Refill', amount: 21000, date: '2025-03-07', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982313' },
    { id: 'PAY-2014', name: 'Vendor N', service: 'Gas Refill', amount: 23000, date: '2025-03-07', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982314' },
    // Adding extra items to make pagination functional (Total 25 entries for demonstration)
    { id: 'PAY-2015', name: 'Rep O', service: 'Gas Refill', amount: 87000, date: '2025-03-08', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982315' },
    { id: 'PAY-2016', name: 'Vendor P', service: 'Petroleum', amount: 96000, date: '2025-03-08', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982316' },
    { id: 'PAY-2017', name: 'Rep Q', service: 'Petroleum', amount: 122000, date: '2025-03-09', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982317' },
    { id: 'PAY-2018', name: 'Vendor R', service: 'Accessories', amount: 234000, date: '2025-03-09', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982318' },
    { id: 'PAY-2019', name: 'Rep S', service: 'Accessories', amount: 455000, date: '2025-03-10', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982319' },
    { id: 'PAY-2020', name: 'Vendor T', service: 'Accessories', amount: 223000, date: '2025-03-11', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982320' },
    { id: 'PAY-2021', name: 'Rep U', service: 'Petroleum', amount: 434000, date: '2025-03-11', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982321' },
    { id: 'PAY-2022', name: 'Vendor V', service: 'Diesel', amount: 87000, date: '2025-03-12', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982322' },
    { id: 'PAY-2023', name: 'Rep W', service: 'Diesel', amount: 543000, date: '2025-03-12', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982323' },
    { id: 'PAY-2024', name: 'Vendor X', service: 'Gas Refill', amount: 50000, date: '2025-03-13', method: 'Bank Transfer', status: 'Completed', reference: 'REF-982324' },
    { id: 'PAY-2025', name: 'Rep Y', service: 'Accessories', amount: 115000, date: '2025-03-13', method: 'Mobile Wallet', status: 'Completed', reference: 'REF-982325' },
];

// Configuration for table headers based on the active tab
const HEADERS = {
    Pending: [
        'Payout ID', 'Vendor/Rep Name', 'Service Type', 'Amount (₦)', 'Due Date', 'Payment Method', 'Status', '',
    ],
    Completed: [
        'Payout ID', 'Vendor/Rep Name', 'Service Type', 'Amount (₦)', 'Payment Date', 'Payment Method', 'Status', 'Reference ID',
    ],
};

const ITEMS_PER_PAGE = 10;

// Utility function to format amount to ₦, based on the HTML provided
const formatAmount = (num) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(num).replace('NGN', '');

// PayoutTable Component
const PayoutTable = () => {

    // State to manage the active tab: 'Pending' or 'Completed'
    const [activeTab, setActiveTab] = useState('Pending');
    // State to manage the current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page to 1 whenever the tab changes
    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    }, []);

    // Memoize the data based on the active tab
    const currentData = useMemo(() => {
        return activeTab === 'Pending' ? PENDING_PAYOUTS_DATA : COMPLETED_PAYOUTS_DATA;
    }, [activeTab]);

    // Calculate pagination details
    const totalEntries = currentData.length;
    const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);

    // Memoize the data slice for the current page
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return currentData.slice(startIndex, endIndex);
    }, [currentData, currentPage]);

    // Function to change the current page
    const goToPage = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // Function to render table rows based on data structure
    const renderTableRows = (item) => {
        if (activeTab === 'Pending') {
            return (
                <>
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.service}</td>
                    <td className="p-3 text-right">{formatAmount(item.amount)}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.method}</td>
                    <td className={`p-3 text-yellow-600`}>{item.status}</td>
                    <td className="p-3 text-blue-600"><a href={`/payout-management-details/${item.id}`}  >[{item.action}]</a></td>
                </>
            );
        } else { // Completed
            return (
                <>
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.service}</td>
                    <td className="p-3 text-right">{formatAmount(item.amount)}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.method}</td>
                    <td className={`p-3 text-green-600`}>{item.status}</td>
                    <td className="p-3 text-blue-600"><a href="#" onClick={(e) => { e.preventDefault(); console.log(`Viewing reference ${item.reference}`); }}>{item.reference}</a></td>
                </>
            );
        }
    };

    // Function to render pagination buttons
    const renderPaginationButtons = () => {
        const pages = [];
        // Show current page, and a couple of pages around it, plus dots if needed
        const maxButtons = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (totalPages > maxButtons) {
            if (currentPage < 3) {
                end = maxButtons;
            } else if (currentPage > totalPages - 2) {
                start = totalPages - maxButtons + 1;
            }
        }

        // Render page numbers
        for (let i = start; i <= end; i++) {
            const isCurrent = i === currentPage;
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition duration-150 ease-in-out
                        ${isCurrent ? 'bg-yellow-500 text-white font-bold' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                >
                    {i}
                </button>
            );
        }

        // Add dots if necessary
        if (start > 1) {
            pages.unshift(<span key="dots-start" className="text-gray-500 px-1">...</span>);
        }
        if (end < totalPages) {
            pages.push(<span key="dots-end" className="text-gray-500 px-1">...</span>);
        }

        return pages;
    };


    return (
        <div className='mt-8'>
            

            
            <div className="flex justify-center mb-8">
                <div className="inline-flex flex-wrap justify-center gap-2 bg-white rounded-xl shadow-lg p-2">
                    {['Pending', 'Completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold focus:outline-none transition duration-200 ease-in-out whitespace-nowrap
                                ${activeTab === tab
                                    ? 'bg-yellow-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Payouts Table Section --- */}
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        {activeTab} Payouts 
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                            {/* Table Headers */}
                            <thead className="bg-gray-100 text-left text-gray-600 text-sm ">
                                <tr>
                                    {HEADERS[activeTab].map((header, index) => (
                                        <th key={index} className={`p-3 font-semibold ${header.includes('Amount') ? 'text-right' : ''}`}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            
                            {/* Table Body */}
                            <tbody className="text-gray-700 text-sm">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((item, index) => (
                                        <tr key={item.id} className="border-t hover:bg-yellow-50/50 transition-colors duration-150">
                                            {renderTableRows(item)}
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="border-t">
                                        <td colSpan={HEADERS[activeTab].length} className="p-4 text-center text-gray-500">
                                            No {activeTab.toLowerCase()} payouts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Pagination Controls --- */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-3 border-t border-gray-100">
                        {/* Summary */}
                        <div className="text-gray-600 mb-4 sm:mb-0">
                            Showing <span className="font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, totalEntries)}</span> of <span className="font-bold">{totalEntries}</span> entries
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 flex items-center space-x-1 rounded-lg text-sm font-medium transition duration-150 
                                    ${currentPage === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                <span>Previous</span>
                            </button>
                            
                            {/* Page Number Buttons */}
                            <div className="flex items-center space-x-1">
                                {renderPaginationButtons()}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className={`px-4 py-2 flex items-center space-x-1 rounded-lg text-sm font-medium transition duration-150 
                                    ${currentPage === totalPages || totalPages === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                <span>Next</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayoutTable;
