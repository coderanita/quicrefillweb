
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaSync,FaDownload } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';
import PayoutSummaryCards from './PayoutSummaryCards';
import PayoutTable from './PayoutTable';
import PaymentMethodTrackingCard from './PaymentMethodTrackingCard';
export const PayoutManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {



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
            title="Payout Management"
            breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Revenue Management", "href": "/revenue-management" }, { "label": "Payout Management" },


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
              onClick={() => {showSweetAlert('Data Rereshed','success') }}
              className="w-full sm:w-auto bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm shadow-sm transition duration-150 ease-in-out"
            >
              <FaSync className="inline mr-2" />
              Refresh Data
            </button>
            <button
              onClick={() => { }}
              className="w-full sm:w-auto bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm shadow-sm transition duration-150 ease-in-out"
            >
              <FaDownload className="inline mr-2" />
              Export as PDF
            </button>
          </div>
            <PayoutSummaryCards/>
            <PayoutTable/>
            <PaymentMethodTrackingCard/>
        </main>
      </div>
    </div>
  );
};

