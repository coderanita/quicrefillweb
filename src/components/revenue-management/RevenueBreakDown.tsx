
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaDownload } from 'react-icons/fa';
import ServiceChargeDashboard from "./ServiceChargeBreakDown";
import TopUpChargeBreakDown from './TopUpChargeBreakDown';
import VATCollectionBreakDown from './VATCollectionBreakDown';
import VendorEarningsReport from './VendorEarningsReport';
export const RevenueBreakDown = ({ userId, sidebarCollapsed, toggleSidebar }) => {


  
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
            title="Revenue Management"
            breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Revenue Management" }, { "label": "Revenue Breakdown" },


            ]}
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
          {/* Top Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            
            <button
              className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center gap-2"
              onClick={() => console.log('Export as PDF clicked')} // Replace with your handler
            >
              <FaDownload />
              Export as PDF
            </button>
          </div>
            <ServiceChargeDashboard/>
            <TopUpChargeBreakDown/>
            <VATCollectionBreakDown/>
            <VendorEarningsReport/>
        </main>
      </div>
    </div>
  );
};

