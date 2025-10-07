import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { confirmDelete } from '../Includes/SweetAlert2';
import { FaTrash } from "react-icons/fa";
import MonthlySuspiciousTransactions from './MonthlySuspiciousTransactions';
import SuspiciousTransactions from './SuspiciousTransactions';


export const FraudWatch = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  
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
              title="Fraud Watch Dashboard"
              breadcrumbs={[]}
              showExportButton={false}
              filterCategories={[{ name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}

            />


          </div>

          <MonthlySuspiciousTransactions/>

          <SuspiciousTransactions/>
        </main>
      </div>
    </div>
  );
};

