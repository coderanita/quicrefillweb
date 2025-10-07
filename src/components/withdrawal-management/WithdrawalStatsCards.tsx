import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; 

// -------------------------------------------------------------------
// UPDATED Reusable StatCard Component
// -------------------------------------------------------------------
const StatCard = ({ title, value, footerIcon, footerText, footerLink = '#', valueCurrency = '' }) => {
    
    let footerElement;
    if (footerIcon) {
        // Renders the info icon
        footerElement = <FaInfoCircle className="text-gray-400 text-xs" />;
    } else if (footerText) {
        // 🔥 Renders a clickable link (<a>) when footerText is present
        footerElement = (
            <a 
                href={footerLink} 
                className="text-xs text-yellow-500 hover:text-yellow-600 cursor-pointer"
            >
                {footerText}
            </a>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{title}</span>
                {footerElement}
            </div>
            <span className="text-2xl font-bold text-gray-800 block">
                {valueCurrency}{value}
            </span>
        </div>
    );
};

// -------------------------------------------------------------------
// WithdrawalStatsCards Component
// -------------------------------------------------------------------
const WithdrawalStatsCards = ({ data }) => {
    
    const defaultData = data || {
        totalRevenue: '500,000',
        totalWithdrawalRequests: 15,
        totalAmountWithdrawn: 10,
        avgProcessingTime: '2 - 5 days',
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Card 1: Total Revenue - Now uses a link */}
            <StatCard
                title="Total Revenue"
                value={defaultData.totalRevenue}
                valueCurrency="₦"
                footerText="View all"
                footerLink="/revenue-management" 
            />
          
            {/* Card 2: Total Withdrawal Request */}
            <StatCard
                title="Total Withdrawal Request"
                value={defaultData.totalWithdrawalRequests}
                footerIcon={true}
            />
          
            {/* Card 3: Total Amount Withdrawn */}
            <StatCard
                title="Total Amount Withdrawn"
                value={defaultData.totalAmountWithdrawn}
                footerIcon={true}
            />
          
            {/* Card 4: Avg. Processing Time */}
            <StatCard
                title="Avg. Processing Time"
                value={defaultData.avgProcessingTime}
                footerIcon={true}
            />
        </div>
    );
};

export default WithdrawalStatsCards;