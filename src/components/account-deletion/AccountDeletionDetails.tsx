
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { FaSync, FaDownload } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AccountDeletionDetailView from './AccountDeletionDetailView';
export const AccountDeletionDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {

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
              title="Deletion Request Details"
              breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Account Deletion Requests", "href": "/account-deletion" }, { "label": "Request Details", },


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
              onBackClick={() => { navigate('/account-deletion'); }}
            />
            {/* Right: Generate Report Button */}
            <div className="flex justify-end gap-4 mb-6">

              <button
                onClick={() => { showSweetAlert('Data Rereshed', 'success') }}
                className="w-full sm:w-auto bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm shadow-sm transition duration-150 ease-in-out"
              >
                <FaSync className="inline mr-2" />
                Refresh
              </button>
              <button
                onClick={() => { }}
                className="w-full sm:w-auto bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm shadow-sm transition duration-150 ease-in-out"
              >
                <FaDownload className="inline mr-2" />
                Export as PDF
              </button>
            </div>
          </div>
            <AccountDeletionDetailView/>
        </main>

      </div>
    </div>
  );
};

