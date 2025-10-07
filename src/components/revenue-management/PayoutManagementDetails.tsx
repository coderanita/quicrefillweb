
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaPrint } from 'react-icons/fa';
//import { showSweetAlert } from '../Includes/SweetAlert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PayoutDetailsView from './PayoutDetailsView';
import PayoutTransactionBreakdown from './PayoutTransactionBreakdown';
export const PayoutManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {

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
            <PageHeaderWithFilters
              title="Payout Details"
              breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Revenue Management", "href": "/revenue-management" }, { "label": "Payout Management", "href": "/payout-management" },
              { "label": id }

              ]}
              showExportButton={false}
              filterCategories={[
              ]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={false}
              showDateSelector={false}
              showBackButton={true}
              onBackClick={() => { navigate('/payout-management'); }}
            />
            {/* Right: Generate Report Button */}
            <button
            onClick={()=>{window.print();}}
              className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2"
            >
              <FaPrint />
              <span>Print Payout Details</span>
            </button>
          </div>
            <PayoutDetailsView  payoutId={id}/>
            <PayoutTransactionBreakdown/>
        </main>
      </div>
    </div>
  );
};

