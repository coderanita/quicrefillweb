import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import DeliveryStats from "../service-management/DeliveryStats";
import ReusableTable from "../Includes/ReusableTable";

import getcountries, { deliveryData, PendingServicecolumns,PendingServiceData } from '../../MockData/PendingServiceData';
export const PendingServiceManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {

    const [region, setRegion] = useState('');
    const [filter, setFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(PendingServiceData);
    

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
                        title="Pending Service Management"
                        breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Service Management", "href": "/service-management" }, { "label": "Pending Service Management" }]}
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
                  
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable
                            title=""
                            columns={PendingServicecolumns}
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

