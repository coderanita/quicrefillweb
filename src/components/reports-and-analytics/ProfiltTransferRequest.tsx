import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import TransferHistoryStatus from './TransferHistoryStatus';
import TransferRequestForm from './TransferRequestForm';
import { useNavigate } from 'react-router-dom';

const convertDateForFiltering = (dateStr) => {
    // Converts DD/MM/YYYY to YYYY-MM-DD for filtering/sorting
    if (!dateStr || dateStr.length !== 10) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

// Initial Data with correct numeric amounts and dateFilter
const initialTransferData = [
    { txnId:"TXN20250215", date: '15/02/2025', dateFilter: convertDateForFiltering('15/02/2025'), amount: 1000000, bank: 'GTBank', accountNo: '1234567890', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250216", date: '10/03/2025', dateFilter: convertDateForFiltering('10/03/2025'), amount: 500000, bank: 'Zenith Bank', accountNo: '9876543210', status: 'Pending', action: 'Cancel Request' },
    { txnId:"TXN20250217", date: '05/03/2025', dateFilter: convertDateForFiltering('05/03/2025'), amount: 750000, bank: 'UBA', accountNo: '1122334455', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250218", date: '02/03/2025', dateFilter: convertDateForFiltering('02/03/2025'), amount: 1200000, bank: 'Access Bank', accountNo: '5566778899', status: 'Failed', action: 'Retry Transfer' },
    { txnId:"TXN20250219", date: '28/02/2025', dateFilter: convertDateForFiltering('28/02/2025'), amount: 900000, bank: 'First Bank', accountNo: '6677889900', status: 'Pending', action: 'Cancel Request' },
    { txnId:"TXN20250220", date: '25/02/2025', dateFilter: convertDateForFiltering('25/02/2025'), amount: 650000, bank: 'EcoBank', accountNo: '2233445566', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250221", date: '20/02/2025', dateFilter: convertDateForFiltering('20/02/2025'), amount: 820000, bank: 'Fidelity', accountNo: '7788990011', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250222", date: '18/02/2025', dateFilter: convertDateForFiltering('18/02/2025'), amount: 300000, bank: 'Polaris Bank', accountNo: '9988776655', status: 'Failed', action: 'Retry Transfer' },
    { txnId:"TXN20250223", date: '16/02/2025', dateFilter: convertDateForFiltering('16/02/2025'), amount: 1500000, bank: 'Stanbic IBTC', accountNo: '3344556677', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250224", date: '14/02/2025', dateFilter: convertDateForFiltering('14/02/2025'), amount: 1100000, bank: 'Keystone', accountNo: '5566889900', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250225", date: '12/02/2025', dateFilter: convertDateForFiltering('12/02/2025'), amount: 950000, bank: 'Union Bank', accountNo: '8877665544', status: 'Pending', action: 'Cancel Request' },
    { txnId:"TXN20250226", date: '10/02/2025', dateFilter: convertDateForFiltering('10/02/2025'), amount: 400000, bank: 'Wema Bank', accountNo: '6655443322', status: 'Completed', action: 'View Details' },
    { txnId:"TXN20250227", date: '08/02/2025', dateFilter: convertDateForFiltering('08/02/2025'), amount: 2500000, bank: 'GTBank', accountNo: '1234567890', status: 'Failed', action: 'Retry Transfer' },
];


export const ProfiltTransferRequest = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    const navigate=useNavigate();
    const [transactionDetails, setTransactionDetails] = useState(initialTransferData);
    
    const handleAddTransaction = (newTransactionData) => {
        // 1. Calculate the YYYY-MM-DD date filter string
        const dateForFilter = convertDateForFiltering(newTransactionData.date);

        const newEntry = {
            ...newTransactionData,
            dateFilter: dateForFilter, // Add the necessary date filter property
            // The amount is already a number from TransferRequestForm
        };

        // Add the new entry to the state (prepending it to show recent request first)
        setTransactionDetails((prev) => [newEntry, ...prev]);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <div className="">
                        <PageHeaderWithFilters
                            title="Profit Transfer Request"
                            breadcrumbs={[
                                {label:"Dashboard",href:"/dashboard"},
                                {label:"Reports and Analytics",href:"/reports-and-analytics"},
                                {label:" Profit Transfer Request"}
                            ]}
                            showExportButton={false}
                            filterTitle="Service Type"
                            filterCategories={[
                            { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
                            onDateChange={() => { }}
                            onFilterChange={() => { }}
                            onExportClick={() => { }}
                            showSearchBox={true}
                            showBackButton={true}
                            onBackClick={()=>{navigate('/reports-and-analytics')}}
                        />
                    </div>
                    
                    {/* TransferRequestForm calls handleAddTransaction */}
                    <TransferRequestForm onAddTransaction={handleAddTransaction} />

                    {/* TransferHistoryStatus receives the updated state */}
                    <TransferHistoryStatus transactionDetails={transactionDetails}/>
                </main>
            </div>
        </div>
    );
};