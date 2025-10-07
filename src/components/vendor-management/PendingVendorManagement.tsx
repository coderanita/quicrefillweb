import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import DeliveryStats from "../service-management/DeliveryStats";
import ReusableTable from "../Includes/ReusableTable";
import getcountries from '../../MockData/PendingServiceData';
import { deliveryData,PendingVendorData} from '../../MockData/VendorManagmentData';
import { showSweetAlert } from '../Includes/SweetAlert2'; 
export const PendingVendorManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {

    const [region, setRegion] = useState('');
    const [filter, setFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(PendingVendorData);
    
 const PendingVendorColumns = [
  { header: "Vendor ID", accessor: "vendorId" },
  { header: "Business Name", accessor: "businessName" },
  { header: "Vendor Name", accessor: "vendorName" },
  { header: "Category", accessor: "category" },
  { header: "Region", accessor: "region" },
  { header: "Date Submitted", accessor: "dateSubmitted" },
  { header: "Compliance Docs", accessor: "complianceDocs" },
  {
    header: "Status",
    accessor: "status",
    render: (row: any) => {
      let colorClass = "text-gray-500"; 
      switch (row.status) {
        case "Approved": colorClass = "text-green-500"; break;
        case "Pending": colorClass = "text-yellow-600"; break;
        case "More Info Needed": colorClass = "text-blue-600"; break;
        case "Flagged": colorClass = "text-red-600"; break;
        default: colorClass = "text-gray-500";
      }
      return <span className={`font-semibold ${colorClass}`}>{row.status}</span>;
    },
  },
  {
  header: "Actions",
  accessor: "actions",
  render: (row: any) => {
    const handleStatusChange = (vendorId: string, newStatus: string) => {
      // Update status in state
      const updatedData = filteredData.map(v =>
        v.vendorId === vendorId ? { ...v, status: newStatus } : v
      );
      setFilteredData(updatedData);

      // Show alert
      const icon = newStatus === "Approved" ? "success" : "error";
      showSweetAlert(`Vendor ${vendorId} ${newStatus}`, icon);
    };

    return (
      <div className="flex items-center space-x-1">
        <a
          href={`/vendor-management-pending-vendor-details/${row.vendorId}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View
        </a>
        <span className="text-gray-400">/</span>

        <button
          onClick={() => handleStatusChange(row.vendorId, "Approved")}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Approve
        </button>
        <span className="text-gray-400">/</span>

        <button
          onClick={() => handleStatusChange(row.vendorId, "Rejected")}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Reject
        </button>
      </div>
    );
  },
}

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
                        title="Pending Vendor Management"
                        breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Vendor Management", "href": "/vendor-management" }, { "label": "Pending Vendor " }]}
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
                            columns={PendingVendorColumns}
                            data={filteredData}
                            rowsPerPage={10}
                            showPagination={true}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

