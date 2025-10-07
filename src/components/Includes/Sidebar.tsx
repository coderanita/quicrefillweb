import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThLarge, faClipboardList, faCube, faBriefcase, faBagShopping, faUser, faStore,
    faTruckDroplet, faCheckSquare, faSackDollar, faChartPie, faHandHoldingUsd, faChartLine,
    faMoneyBillTransfer, faUserXmark, faMapMarker, faComments, faBinoculars, faChartBar,
    faLineChart, faShieldAlt, faFileAlt, faUserLock, faUserShield, faCog, faEnvelopeOpenText,
    faBell as faBellSolid, faTicketAlt, faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
    { label: "Summary", path: "/dashboard", icon: "faThLarge" },
    { label: "Order Management", path: "/order-management", icon: "faClipboardList" },
    { label: "Delivery Management", path: "/delivery-management", icon: "faCube" },
    { label: "Service Management", path: "/service-management", icon: "faBriefcase" },
    { label: "Accessories Management", path: "/accessories-management", icon: "faBagShopping" },
    { label: "User Management", path: "/user-management", icon: "faUser" },
    { label: "Vendor Management", path: "/vendor-management", icon: "faStore" },
    { label: "Delivery Rep Management", path: "/delivery-rep-management", icon: "faTruckDroplet" },
    { label: "Verification & Compliance", path: "/verification-and-compliance", icon: "faCheckSquare" },

    {
        label: "Revenue Management", icon: "faSackDollar", dropdown: [
            { label: "Revenue Management", path: "/revenue-management", icon: "faSackDollar" },
            { label: "Revenue Breakdown", path: "/revenue-breakdown", icon: "faChartPie" },
            { label: "Payout Management", path: "/payout-management", icon: "faHandHoldingUsd" },
            { label: "Revenue Analytics & Insights", path: "/revenue-analytics", icon: "faChartLine" },
        ]
    },

    { label: "Withdrawal Management", path: "/withdrawal-management", icon: "faMoneyBillTransfer" },
    { label: "Account Deletion", path: "/account-deletion", icon: "faUserXmark" },
    { label: "Operating Locations", path: "/operating-locations", icon: "faMapMarker" },
    { label: "Feedback", path: "/feedback", icon: "faComments" },
    { label: "Fraud Watch", path: "/fraud-watch", icon: "faBinoculars" },
    { label: "Reports and Analytics", path: "/reports-and-analytics", icon: "faChartBar" },
    { label: "Crash Analytics", path: "/crash-analytics", icon: "faLineChart" },

    {
        label: "Audit Logs & Security", icon: "faShieldAlt", dropdown: [
            { label: "Admin Logs activities", path: "/audit-admin-logs", icon: "faFileAlt" },
            { label: "Transaction Logs", path: "/audit-transaction-logs", icon: "faUserLock" },
        ]
    },

    { label: "Staff Management", path: "/staff-management", icon: "faUserShield" },

    {
        label: "System Settings", icon: "faCog", dropdown: [
            { label: "Message Settings", path: "/system-message-settings", icon: "faEnvelopeOpenText" },
            { label: "Push Notification Settings", path: "/system-push-notification-settings", icon: "faBellSolid" },
            { label: "Coupon Settings", path: "/system-coupon-settings", icon: "faTicketAlt" },
        ]
    },
];


const iconMap = {
    faThLarge, faClipboardList, faCube, faBriefcase, faBagShopping, faUser, faStore,
    faTruckDroplet, faCheckSquare, faSackDollar, faChartPie, faHandHoldingUsd, faChartLine,
    faMoneyBillTransfer, faUserXmark, faMapMarker, faComments, faBinoculars, faChartBar,
    faLineChart, faShieldAlt, faFileAlt, faUserLock, faUserShield, faCog, faEnvelopeOpenText,
    faBellSolid, faTicketAlt, faChevronDown, faChevronUp
};

const Sidebar = ({ sidebarCollapsed }) => {
    const location = useLocation();
    const [openDropdowns, setOpenDropdowns] = useState({});

    useEffect(() => {
        const newOpenDropdowns = {};
        sidebarItems.forEach(item => {
            if (item.dropdown) {
                const isActive = item.dropdown.some(child => location.pathname.startsWith(child.path));
                newOpenDropdowns[item.label] = isActive;
            }
        });
        setOpenDropdowns(newOpenDropdowns);
    }, [location.pathname]);

    const toggleDropdown = (label) => {
        setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const getLinkClasses = (path) =>
    location.pathname.startsWith(path)
        ? 'text-amber-500 flex items-center text-sm'
        : 'text-gray-600 hover:text-amber-500 flex items-center text-sm';

    const getDropdownParentClasses = (isActive) => isActive ? 'text-amber-500 flex items-center text-sm cursor-pointer' : 'text-gray-600 hover:text-amber-500 flex items-center text-sm cursor-pointer';
    const getDropdownItemClasses = (path) =>  location.pathname.startsWith(path) ? 'text-amber-500 flex items-center text-sm' : 'text-gray-800 hover:text-amber-500 flex items-center text-sm';

    return (
        <aside className={`relative bg-white min-h-screen shadow-sm z-20 border-r border-gray-300 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
            <nav className="p-4">
                <ul>
                    {sidebarItems.map(item => {
                        if (item.dropdown) {
                            const isActive = openDropdowns[item.label];
                            return (
                                <li key={item.label} className="mb-4">
                                    <div onClick={() => toggleDropdown(item.label)} className={getDropdownParentClasses(isActive)}>
                                        <FontAwesomeIcon icon={iconMap[item.icon]} className="mr-3" />
                                        <span className={sidebarCollapsed ? 'hidden' : ''}>{item.label}</span>
                                        <FontAwesomeIcon icon={isActive ? iconMap.faChevronUp : iconMap.faChevronDown} className={`ml-auto text-xs ${sidebarCollapsed ? 'hidden' : ''}`} />
                                    </div>

                                    {isActive && (
                                        <ul className={`mt-2 space-y-2 ${sidebarCollapsed ? 'border p-1 rounded-lg border-amber-300' : 'ml-6'}`}>
                                            {item.dropdown.map(subItem => (
                                                <li key={subItem.label}>
                                                    <Link to={subItem.path} className={getDropdownItemClasses(subItem.path)}>
                                                        <FontAwesomeIcon icon={iconMap[subItem.icon]} className="mr-3" />
                                                        <span className={sidebarCollapsed ? 'hidden' : ''}>{subItem.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }

                        return (
                            <li key={item.label} className="mb-4">
                                <Link to={item.path} className={getLinkClasses(item.path)}>
                                    <FontAwesomeIcon icon={iconMap[item.icon]} className="mr-3" />
                                    <span className={sidebarCollapsed ? 'hidden' : ''}>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
