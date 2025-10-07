import React from 'react';
import { 
    FaMoneyBillWave, 
    FaCheckDouble, 
    FaSpinner, 
    FaCalendar, 
    FaInfoCircle 
} from 'react-icons/fa';

// --- Reusable KPI Card Component ---
const KPICard = ({ title, value, icon: Icon, iconColor, infoIcon: InfoIcon }) => {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm relative">
            <div className="mb-2">
                <div className="flex items-center justify-between mb-1 overflow-hidden">
                    <div className="flex items-center gap-2 flex-nowrap">
                        {/* Icon */}
                        <Icon 
                            className={`text-sm sm:text-base ${iconColor} flex-shrink-0`}
                        />
                        {/* Title */}
                        <h2 className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-normal break-words">
                            {title}
                        </h2>
                    </div>
                    {/* Info Icon */}
                    <InfoIcon 
                        className="text-sm sm:text-base cursor-pointer text-gray-400 flex-shrink-0"
                    />
                </div>
            </div>
            {/* Value */}
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
};

// --- Main Payout Summary Component ---
const PayoutSummaryCards = ({ data = {} }) => {
    // Default/Mock data structure
    const defaultData = {
        pending: '₦8,000,000',
        processed: '₦67,450,000',
        inProgress: '₦3,045,000',
        lastPayoutDate: '25/01/26 11:20 AM'
    };

    const displayData = { ...defaultData, ...data };
    
    // Configuration for each card
    const cards = [
        {
            title: 'Total Pending Payouts',
            value: displayData.pending,
            icon: FaMoneyBillWave,
            iconColor: 'text-gray-500',
        },
        {
            title: 'Total Processed Payouts',
            value: displayData.processed,
            icon: FaCheckDouble,
            iconColor: 'text-green-500',
        },
        {
            title: 'Payouts in Progress',
            value: displayData.inProgress,
            icon: FaSpinner,
            iconColor: 'text-yellow-500',
        },
        {
            title: 'Last Payout Date',
            value: displayData.lastPayoutDate,
            icon: FaCalendar,
            iconColor: 'text-blue-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-4">
            {cards.map((card, index) => (
                <KPICard 
                    key={index}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    infoIcon={FaInfoCircle} // The info icon is the same for all cards
                />
            ))}
        </div>
    );
};

export default PayoutSummaryCards;