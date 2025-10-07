
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';
import { MOCK_TRANSACTIONS } from '../../MockData/ReportsData'; 
import { FaFileExport, FaDownload } from "react-icons/fa";
import { showSweetAlert } from '../Includes/SweetAlert2';
export const ProfiltTransferRequestDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
const navigate=useNavigate();
const {id}=useParams();
 // Mock Data

  const transaction = MOCK_TRANSACTIONS.find((t) => t.txnId === id);
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Left: Page Header */}
      <PageHeaderWithFilters
        title={"Transfer Details"}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports and Analytics", href: "/reports-and-analytics" },
          {
            label: "Profit Transfer Request",
            href: "/reports-and-analytics-profit-transafer-request",
          },
          { label: "Transfer Details - " + id },
        ]}
        showExportButton={false}
        filterCategories={[]}
        onDateChange={() => {}}
        onFilterChange={() => {}}
        onExportClick={() => {}}
        showDateSelector={false}
        showBackButton={true}
        onBackClick={() => navigate("/accessories-management")}
      />

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3">
        <button className="flex items-center justify-center gap-2 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 shadow-sm hover:from-gray-200 hover:to-gray-300"
        onClick={()=>{showSweetAlert('Sending.. Transfer Report to Finance Team','info')}}
        >
          <FaFileExport className="text-gray-600" />
          Send Transfer Report to Finance Team
        </button>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 shadow-sm hover:from-gray-200 hover:to-gray-300"
        onClick={()=>{showSweetAlert('Downloading.. Receipt for '+id,'info')}}
        >
          <FaDownload className="text-gray-600" />
          Download Receipt
        </button>
      </div>
    </div>
                <TransactionDetails transaction={transaction}/>
                </main>
            </div>
        </div>
    );
};