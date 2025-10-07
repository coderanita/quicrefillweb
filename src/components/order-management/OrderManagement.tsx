import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import NumberCardsGrid from '../Includes/NumberCardsGrid';
import DataTableWrapper from '../Includes/DataTableWrapper';
import { useLocation } from 'react-router-dom';
import numberCardsData, {
  tabs, // Main tabs: "Orders", "Accessories"
  tabletabs, // Sub-tabs: "All", "Completed", etc.
  actionsByTab,
  columns as ordersColumns,
  tableData as ordersTableData,
  ACcolumns as accessoriesColumns,
  ACtableData as accessoriesTableData,
} from '../../MockData/orderData';
import OrderStatusTabs from './OrderStatusTabs';

export const OrderManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const location = useLocation();
   
  const [selectedMainTab, setSelectedMainTab] = useState(location.state?.initialTab ?? 'Orders');
  const [selectedSubTab, setSelectedSubTab] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [currentColumns, setCurrentColumns] = useState([]);

  useEffect(() => {
    let dataToFilter = [];

    // Step 1: Select the correct columns and a full dataset based on the main tab.
    if (selectedMainTab === 'Orders') {
      setCurrentColumns(ordersColumns);
      dataToFilter = ordersTableData;
    } else if (selectedMainTab === 'Accessories') {
      setCurrentColumns(accessoriesColumns);
      dataToFilter = accessoriesTableData;
    }

    // Step 2: Filter the full dataset based on the selected sub-tab (status).
    if (selectedSubTab === 'All') {
      setFilteredData(dataToFilter);
    } else {
      // Assuming both orders and accessories data have a 'status' key
      setFilteredData(dataToFilter.filter(item => item.status === selectedSubTab));
    }
  }, [selectedMainTab, selectedSubTab]);

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
            title="Order Management"
            breadcrumbs={[]}
            showExportButton={false}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
          />
          <NumberCardsGrid cards={numberCardsData} discType="solid" />
          
          <OrderStatusTabs 
            activeTab={selectedSubTab} 
            onTabClick={setSelectedSubTab} 
            tabs={tabletabs} 
          />
          
          <DataTableWrapper
            tabs={tabs} // This prop defines the main "Orders" and "Accessories" tabs
            activeTab={selectedMainTab} // This tells DataTableWrapper which tab is active
            onTabChange={setSelectedMainTab} // This function updates the main tab state
            actionsByTab={actionsByTab}
            columns={currentColumns} // Correct columns are passed here
            tableData={filteredData} // Correct filtered data is passed here
            totalEntries={filteredData.length}
             setFilteredData={setFilteredData}
          />
        </main>
      </div>
    </div>
  );
};

 