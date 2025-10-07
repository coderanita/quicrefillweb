import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import FraudMetrics from './FraudMetrics';
import FlaggedWithdrawalsTable from './FlaggedWithdrawalsTable';


export const SuspiciousVendorWithdrawals = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  
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
          <div className="">

            <PageHeaderWithFilters
              title="Suspicious Vendor Account Withdrawals"
              breadcrumbs={[{"label":"Dashboard","href":"/dashboard"},{"label":"Fraud Watch","href":"/fraud-watch"},{"label":"Vendor Withdrawals","href":"/fraud-watch-suspicious-vendor-withdrawals"}]}
              showExportButton={false}
              filterCategories={[]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={false}
              showDateSelector={false}

            />


          </div>
          <FraudMetrics/>
          <FlaggedWithdrawalsTable />
        </main>
      </div>
    </div>
  );
};

