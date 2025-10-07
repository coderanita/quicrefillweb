import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
import PendingServiceDetails from "./PendingServiceDetails";
import AssignedReps from "./AssignedReps";
import ComplianceDocuments from "./ComplianceDocuments";



export const PendingServiceManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {


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
                    <PageHeaderWithFilters
                        title="Pending Service Detail Page"
                        breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Pending Service Management", "href": "/service-management-pending" }, { "label": "Pending Service Detail" },
                        { "label": id },

                        ]}
                        showExportButton={false}
                        filterCategories={[]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showDateSelector={false}
                        showBackButton={true}
                        onBackClick={() => navigate('/service-management')}
                    />
                    <PendingServiceDetails/>
                    <AssignedReps/>
                    <ComplianceDocuments/>
                </main>
            </div>
        </div>
    );
};

