import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
import VendorDetailCard from './VendorDetailCard';

import VendorServicesTable from './VendorServicesTable';
import AssignedRepsTable from './AssignedRepsTable';
import VendorOrderHistory from './VendorOrderHistory';
import ComplianceDocuments from './ComplianceDocuments';
import VendorWithdrawHistory from './VendorWithdrawHistory';
import { FaFileAlt } from 'react-icons/fa';


export const VendorManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {


    const { id } = useParams();
    const navigate = useNavigate();
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
                    <div className="flex items-center justify-between mb-4">
                        {/* Left: Page Header with Filters */}
                        <PageHeaderWithFilters
                            title="Vendor Detail Page"
                            breadcrumbs={[
                            { label: "Dashboard", href: "/dashboard" },
                            { label: "Vendor Management", href: "/vendor-management" },
                            { label: id }
                            ]}
                            showExportButton={false}
                            filterCategories={[]}
                            onDateChange={() => { }}
                            onFilterChange={() => { }}
                            onExportClick={() => { }}
                            showDateSelector={false}
                            showBackButton={true}
                            onBackClick={() => navigate('/vendor-management')}
                        />

                        {/* Right: Generate Report Button */}
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2"
                        >
                            <FaFileAlt />
                            <span>Generate Vendor Performance Report</span>
                        </button>
                        </div>

                    <VendorDetailCard vendorId={id}/>
                    <VendorServicesTable/>
                    <AssignedRepsTable/>
                    <VendorOrderHistory/>
                    <ComplianceDocuments/>
                    <VendorWithdrawHistory/>
                      
                </main>
            </div>
        </div>
    );
};

