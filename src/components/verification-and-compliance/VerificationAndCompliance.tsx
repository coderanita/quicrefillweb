import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ComplianceCards from './ComplianceCards';
import ReusableTable from "../Includes/ReusableTable";


export const VerificationAndCompliance = ({ userId, sidebarCollapsed, toggleSidebar }) => {

    const complianceColumns = [
        {
            header: "Submission ID",
            accessor: "submissionId",
        },
        {
            header: "Customer Name",
            accessor: "customerName",
        },
        {
            header: "Type",
            accessor: "type",
        },
        {
            header: "Submission Date",
            accessor: "submissionDate",
        },
        {
            header: "Status",
            accessor: "status",
            render: (row) => {
                let color =
                    row.status === "Pending"
                        ? "text-yellow-500"
                        : row.status === "Approved"
                            ? "text-green-500"
                            : "text-red-500";
                return <span className={`${color} font-semibold`}>{row.status}</span>;
            },
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (row) => (
                <a
                    href={"verification-and-compliance-details/"+row.submissionId}
                    className="text-blue-500 hover:underline"
                    
                >
                    View Details
                </a>
            ),
        },
    ];


    const complianceData = [
        {
            submissionId: "VER78601001",
            customerName: "John Doe",
            type: "Rider Registration",
            submissionDate: "25/01/27 02:45 PM",
            status: "Pending",
        },
        {
            submissionId: "VER78601002",
            customerName: "Fixit Plumbers",
            type: "Rider Registration",
            submissionDate: "25/01/27 02:45 PM",
            status: "Approved",
        },
        {
            submissionId: "VER78601003",
            customerName: "PowerPlus Ltd.",
            type: "Vendor Registration",
            submissionDate: "25/01/27 02:45 PM",
            status: "Approved",
        },
        {
            submissionId: "VER78601004",
            customerName: "TechGears Ltd.",
            type: "Vehicle License",
            submissionDate: "25/01/27 02:45 PM",
            status: "Rejected",
        },
        {
            submissionId: "VER78601005",
            customerName: "PowerPlus Ltd.",
            type: "Vendor Registration",
            submissionDate: "25/01/27 02:45 PM",
            status: "Approved",
        },
        {
            submissionId: "VER78601006",
            customerName: "TechGears Ltd.",
            type: "Vehicle License",
            submissionDate: "25/01/27 02:45 PM",
            status: "Rejected",
        },
    ];



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
                        title="Compliance & Verification"
                        breadcrumbs={[]}
                        showExportButton={true}
                        filterCategories={[
                            { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
                            { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
                            { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
                        ]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={true}


                    />
                    <ComplianceCards />
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title="Compliance & Verification"
                            columns={complianceColumns}
                            data={complianceData}

                            rowsPerPage={5}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

