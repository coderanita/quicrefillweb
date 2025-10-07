import React from 'react';

// Data structure for the payment methods
const PAYMENT_DATA = [
    {
        method: 'Bank Transfer',
        transactions: 120,
        amount: 6000000,
        percentage: 75,
    },
    {
        method: 'Mobile Wallet',
        transactions: 40,
        amount: 2000000,
        percentage: 25,
    },
];

// Utility function to format amount to ₦, based on the assumption of Nigerian Naira
const formatAmount = (num) => new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
}).format(num).replace('NGN', '');

/**
 * A reusable card component to display payment method tracking metrics.
 */
const PaymentMethodTrackingCard = () => {

    return (

        <div className="w-full max-w-full bg-white shadow-xl rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Method Tracking</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-gray-700  table-auto" style={{ borderSpacing: '0 8px' }}>

                    {/* Table Header */}
                    <thead>
                        <tr className="text-sm text-gray-600  bg-gray-100 border-b border-gray-200">
                            <th className="py-3 px-4 font-semibold rounded-tl-lg">Payment Method</th>
                            <th className="py-3 px-4 font-semibold">Total Transactions</th>
                            <th className="py-3 px-4 font-semibold text-right">Total Amount (₦)</th>
                            <th className="py-3 px-4 font-semibold rounded-tr-lg text-right">% of Total Payouts</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {PAYMENT_DATA.map((item, index) => (
                            <tr key={item.method} className="bg-white hover:bg-yellow-50/50 shadow-md rounded-lg transition-all duration-200">
                                <td className={`py-3 px-4 text-gray-800 font-bold ${index === 0 ? 'rounded-l-lg' : ''}`}>
                                    {item.method}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {item.transactions}
                                </td>
                                <td className="py-3 px-4 text-gray-600 text-right">
                                    {formatAmount(item.amount)}
                                </td>
                                <td className={`py-3 px-4 text-gray-800 font-bold text-right ${index === 0 ? 'rounded-r-lg' : ''}`}>
                                    {item.percentage}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Insights Section */}
            <div className="mt-8 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Insights:</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                    <li>
                        The vast majority of payout value is processed via <span className="font-semibold text-gray-800">Bank Transfers ({PAYMENT_DATA[0].percentage}%)</span>.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-800">Mobile Wallets</span> account for <span className='font-semibold'>{PAYMENT_DATA[1].transactions}</span> total transactions, representing <span className='font-semibold'>{PAYMENT_DATA[1].percentage}%</span> of the total payout count.
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default PaymentMethodTrackingCard;
