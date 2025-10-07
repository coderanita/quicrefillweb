import React, { useState, useEffect } from 'react';
import Header from './Includes/Header'; // Assuming Header component path
import Sidebar from './Includes/Sidebar'; // Assuming Sidebar component path
import { FaEnvelope, FaShoppingCart, FaUser, FaExclamationTriangle } from 'react-icons/fa'; // Importing icons for notifications

const NotificationsCenter = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    // Dummy data for notifications - replace with actual data fetching in a real application
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            icon: '📦',
            title: 'New Order Received',
            message: 'A new service order has been placed by [Customer Name]. Order ID: #ORD56789.',
            time: 'Jan 30, 2025 - 12:45 PM',
            color: 'bg-green-500'
        },
        {
            id: 2,
            type: 'vendor',
            icon: '🔧',
            title: 'New Vendor Registration',
            message: 'A new vendor, [Vendor Name], has signed up and is awaiting verification. Review their profile and documents.',
            time: 'Jan 30, 2025 - 11:30 AM',
            color: 'bg-blue-500'
        },
        {
            id: 3,
            type: 'user',
            icon: '👤',
            title: 'New User Joined',
            message: '[User Name] has successfully created an account. Welcome them to the platform!',
            time: 'Jan 30, 2025 - 10:15 AM',
            color: 'bg-blue-500'
        },
        {
            id: 4,
            type: 'dispute',
            icon: '⚠️',
            title: 'Customer Dispute Alert',
            message: 'A new dispute has been raised by [Customer Name] regarding Order ID #ORD45678. Review and take action.',
            time: 'Jan 30, 2025 - 09:50 AM',
            color: 'bg-red-500'
        },
        // Add more dummy notifications here for demonstration
        {
            id: 5,
            type: 'order',
            icon: '📦',
            title: 'Order Shipped',
            message: 'Order #ORD56780 has been shipped and is on its way to [Customer Name].',
            time: 'Jan 29, 2025 - 03:00 PM',
            color: 'bg-green-500'
        },
        {
            id: 6,
            type: 'system',
            icon: '⚙️',
            title: 'System Update Available',
            message: 'A new system update is available. Please update at your earliest convenience.',
            time: 'Jan 29, 2025 - 09:00 AM',
            color: 'bg-yellow-500'
        },
        {
            id: 7,
            type: 'feedback',
            icon: '💬',
            title: 'New Feedback Received',
            message: 'New feedback submitted by [User Name]. Check the feedback section.',
            time: 'Jan 28, 2025 - 05:00 PM',
            color: 'bg-purple-500'
        },
        {
            id: 8,
            type: 'payment',
            icon: '💰',
            title: 'Payment Processed',
            message: 'Payment for Order #ORD56777 has been successfully processed.',
            time: 'Jan 28, 2025 - 10:00 AM',
            color: 'bg-green-500'
        },
        {
            id: 9,
            type: 'promo',
            icon: '🎁',
            title: 'New Promotion Launched',
            message: 'A new promotional campaign has been launched. Check details in the marketing section.',
            time: 'Jan 27, 2025 - 02:00 PM',
            color: 'bg-indigo-500'
        },
        {
            id: 10,
            type: 'security',
            icon: '🔒',
            title: 'Security Alert',
            message: 'Unusual login activity detected from a new device. Review your security settings.',
            time: 'Jan 27, 2025 - 08:00 AM',
            color: 'bg-red-500'
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5; // Number of notifications per page

    // Calculate notifications to display for the current page
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    // Calculate total pages
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Generate pagination buttons
    const renderPaginationButtons = () => {
        const pageNumbers = [];
        const maxButtons = 5; // Max number of pagination buttons to show

        if (totalPages <= maxButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Logic for showing ellipsis
            if (currentPage <= Math.floor(maxButtons / 2)) {
                for (let i = 1; i <= maxButtons - 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage > totalPages - Math.floor(maxButtons / 2)) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - (maxButtons - 3); i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers.map((number, index) => (
            number === '...' ? (
                <span key={index} className="w-8 h-8 flex items-center justify-center text-gray-600">...</span>
            ) : (
                <button
                    key={index}
                    onClick={() => handlePageChange(number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                                ${currentPage === number ? 'bg-yellow-500 text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                >
                    {number}
                </button>
            )
        ));
    };


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            {/* Header Component */}
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />

            {/* Main Content Area (Sidebar + Main Content) */}
            <div className="flex flex-1">
                {/* Sidebar Component */}
                <Sidebar sidebarCollapsed={sidebarCollapsed} />

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-6 overflow-hidden">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Notifications Center</h1>

                    {/* Notification Cards */}
                    <div className="space-y-6">
                        {currentNotifications.map((notification) => (
                            <div key={notification.id} className="bg-white rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
                                <div className={`w-1 h-full ${notification.color} absolute left-0 top-0 rounded-l-lg`}></div>
                                <div className="p-4 pl-6 flex items-start">
                                    <div className="mr-3 text-yellow-500 text-xl flex-shrink-0">
                                        <FaEnvelope /> {/* Using a generic envelope icon, specific icons can be added based on type */}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <span className="mr-2 text-lg">{notification.icon}</span>
                                            <h3 className="font-semibold text-gray-800 text-base">{notification.title}</h3>
                                        </div>
                                        <p className="text-gray-700 my-2 text-sm">{notification.message}</p>
                                        <p className="text-gray-500 text-xs">{notification.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex items-center justify-between">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className="fas fa-chevron-left mr-2"></i>
                            Previous
                        </button>

                        <div className="flex space-x-2">
                            {renderPaginationButtons()}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <i className="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsCenter;
