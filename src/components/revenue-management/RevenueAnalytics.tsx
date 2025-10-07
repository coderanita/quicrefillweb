
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaPrint, FaDownload } from 'react-icons/fa';
//import { showSweetAlert } from '../Includes/SweetAlert2';
import RevenueTrendsChart from './RevenueTrendsChart';
import RevenueTrendBreakDown from './RevenueTrendBreakDown';
import TopVendorsRevenue from './TopVendorsRevenue';
import { useNavigate } from 'react-router-dom';
import UserChurnInsights from './UserChurnInsights';
import MonthlyAccountDeletionTable from './MonthlyAccountDeletionTable';
export const RevenueAnalytics = ({ userId, sidebarCollapsed, toggleSidebar }) => {


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
          <div className="flex items-center justify-between mb-4 w-full">

            {/* Left/Center: Page Header Component */}
            <PageHeaderWithFilters
              title="Revenue Analytics & Insights"
              breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Revenue Management", "href": "/revenue-management" }, { "label": " Revenue Analytics & Insights" }]}
              showExportButton={false}
              filterCategories={[]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={false}
              showDateSelector={false}
              showBackButton={true}
              onBackClick={() => { navigate('/payout-management'); }}
            />

            {/* Right: Grouped Report Buttons Container (FIXED ALIGNMENT) */}
            {/* The ml-auto class pushes this group to the far right, next to the PageHeader component */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Export As PDF Button (Original Grey Gradient Design) */}
              <button
                onClick={() => { /* Implement actual PDF export logic here */ }}
                className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2 shadow-sm transition duration-150 ease-in-out"
              >
                <FaDownload className="w-4 h-4" />
                <span>Export As PDF</span>
              </button>

              {/* Print Reports Button (Original Grey Gradient Design) */}
              <button
                onClick={() => { window.print(); }}
                className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2 shadow-sm transition duration-150 ease-in-out"
              >
                <FaPrint className="w-4 h-4" />
                <span>Print Reports</span>
              </button>

            </div>
          </div>
          <RevenueTrendsChart/>
          <RevenueTrendBreakDown/>
          <TopVendorsRevenue/>
          <UserChurnInsights/>
          <MonthlyAccountDeletionTable/>
        </main>
      </div>
    </div>
  );
};

