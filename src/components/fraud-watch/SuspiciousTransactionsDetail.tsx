import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import TransactionDetailCard from './TransactionDetailCard';
import FraudAnalysisDashboard from './FraudAnalysisDashboard';




export const SuspiciousTransactions = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const { id } = useParams();


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">


                    <PageHeaderWithFilters
                        title="Suspicious Order Details"
                        breadcrumbs={[
                            { label: "Dashboard", href: "/dashboard" },
                            { label: "Fraud Watch", href: "/fraud-watch" },
                            { label: "Suspicious Orders" },
                            { label: "" + id }
                        ]}
                        showExportButton={false}
                        filterCategories={[
                            { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
                            { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
                            { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
                        ]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={true}
                        showBackButton={true}
                        onBackClick={() => navigate('/fraud-watch')}
                    />

                        <TransactionDetailCard transactionId={id}/>
                        <FraudAnalysisDashboard  transactionId={id}/>

                </main>
            </div>
        </div>
    );
};