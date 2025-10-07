import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../Includes/ReusableTable";
import getcountries, { deliveryData, initialData } from '../../MockData/ServiceData';
import DashboardBreakdown from './DashboardBreakdown';
import DeliveryStats from './DeliveryStats';
import { confirmDelete } from '../Includes/SweetAlert2';




export const ServiceManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {

    const [region, setRegion] = useState('');
    const [filter, setFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(initialData);
    const columns = [
        { header: "Service ID", accessor: "id" },
        { header: "Quantity", accessor: "quantity" },
        { header: "Vendor Name", accessor: "vendor" },
        { header: "Rider Name", accessor: "rider" },
        { header: "Type", accessor: "type" },
        {
            header: "Status",
            accessor: "status",
            render: (row: any) => (
                <span
                    className={`font-semibold ${row.status === "Active"
                            ? "text-green-500"
                            : row.status === "Suspended"
                                ? "text-yellow-500"
                                : row.status === "Inactive"
                                    ? "text-orange-500"
                                    : "text-gray-500"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        { header: "Price", accessor: "price" },
        { header: "Location", accessor: "location" },
        { header: "Revenue", accessor: "revenue" },
        { header: "Date Created", accessor: "dateCreated" },
        {
            header: "Actions",
            accessor: "actions",
            render: (row: any) => (
                <div className="flex space-x-2">
                    <a
                        href={`${row.detailsUrl}/${row.id}`}
                        className="text-gray-500 hover:text-orange-500"
                    >
                        <FaEdit />
                    </a>
                    <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => confirmDelete(setFilteredData, 'id', row.id, "Service")}
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
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
                        title="Service Management"
                        breadcrumbs={[]}
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
                    />
                    <div className="flex ">
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="border border-gray-300 text-xs px-1 py-1 rounded-md bg-white text-black"
                        >
                            <option value="">Region Selector</option>
                            {getcountries.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 px-1 py-1 rounded-md bg-white text-xs"
                        >
                            <option>All</option>
                            {/* Add more filter options here if needed */}
                        </select>
                    </div>

                    <DeliveryStats stats={deliveryData} />
                    <DashboardBreakdown />
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <ReusableTable
                            title=""
                            columns={columns}
                            data={filteredData}
                            rowsPerPage={5}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

