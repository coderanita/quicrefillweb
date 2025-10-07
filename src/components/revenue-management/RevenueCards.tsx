import React from 'react';
import { FaBalanceScale, FaMoneyBillWave, FaCreditCard, FaReceipt, FaInfoCircle } from 'react-icons/fa';

// Define the structure for a single revenue card
const RevenueCard = ({ icon: Icon, title, value }) => (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
                {/* Dynamically render the icon component */}
                <Icon className="text-gray-600" /> 
                <h2 className="text-sm font-medium text-gray-700">{title}</h2>
            </div>
            {/* The info icon is static */}
            <FaInfoCircle className="text-gray-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
);

/**
 * Renders a grid of four key revenue statistics cards.
 * @param {object} props
 * @param {string} props.totalRevenue The value for Total Revenue.
 * @param {string} props.serviceCharge The value for Service Charge Income.
 * @param {string} props.topUpRevenue The value for Total Top-up Charge Revenue.
 * @param {string} props.vatRevenue The value for VAT Revenue Collected.
 */
const RevenueCards = ({ totalRevenue, serviceCharge, topUpRevenue, vatRevenue }) => {
    // Define the data array based on the received props
    const cardData = [
        {
            icon: FaBalanceScale,
            title: "Total Revenue",
            value: totalRevenue || "N/A"
        },
        {
            icon: FaMoneyBillWave,
            title: "Service Charge Income",
            value: serviceCharge || "N/A"
        },
        {
            icon: FaCreditCard,
            title: "Total Top-up Charge Revenue",
            value: topUpRevenue || "N/A"
        },
        {
            icon: FaReceipt,
            title: "VAT Revenue Collected",
            value: vatRevenue || "N/A"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {cardData.map((data, index) => (
                <RevenueCard
                    key={index}
                    icon={data.icon}
                    title={data.title}
                    value={data.value}
                />
            ))}
        </div>
    );
};

export default RevenueCards;