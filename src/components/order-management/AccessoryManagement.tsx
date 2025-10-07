import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import NumberCardsGrid from '../Includes/NumberCardsGrid';
import DataTableWrapper from '../Includes/DataTableWrapper';
import { useNavigate } from 'react-router-dom';
import {
  AccesorynumberCardsData,
  accessoriesData,
  accessoryColumns
} from '../../MockData/orderData';
import AccessoryModal from './AccessoryModal';

export const AccessoryManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(accessoriesData);
const [accessoryCount, setAccessoryCount] = useState(accessoriesData.length);
const formatDate = () => {
  const now = new Date();
  const pad = (n) => (n < 10 ? '0' + n : n);
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear().toString().slice(-2);
  const hours = now.getHours();
  const minutes = pad(now.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = pad(hours % 12 || 12);

  return `${day}/${month}/${year} ${formattedHour}:${minutes} ${ampm}`;
};


  return (
    
    <div className="bg-gray-100 min-h-screen flex flex-col">
       <AccessoryModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(formData) => {
          const newId = `ACC${1001 + accessoryCount}`;
          const newAccessory = {
            accessoryId: newId,
            name: formData.name,
            stockCount: `${formData.stock} items`,
            price: formData.price,
            status: 'Active',
            statusColor: 'text-green-500',
            dateCreated: formatDate(),
          };

          setFilteredData((prev) => [...prev, newAccessory]);
          setAccessoryCount((prev) => prev + 1);
        }}
      />

      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userId={userId}
      />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-hidden">
          <PageHeaderWithFilters
            title="Manage Accessory"
            breadcrumbs={[]}
            showExportButton={false}
            filterCategories={[
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            showBackButton={true}
            showDateSelector={false}
            showFilterDropdown={false}
            
            onBackClick={() => {
              navigate('/order-management', {
                state: { initialTab: 'Accessories' }
              });
            }} 
          />
          <NumberCardsGrid cards={AccesorynumberCardsData} discType="solid" />

          <DataTableWrapper
            tabs={[]}
            activeTab={[]} // This tells DataTableWrapper which tab is active
            onTabChange={[]} // This function updates the main tab state
            globalActions={[
              { label: 'Create New Accesorry', onClick: () => setModalOpen(true) }]}
            columns={accessoryColumns}
            tableData={filteredData}
            totalEntries={accessoryCount}
            setFilteredData={setFilteredData}

          />


        </main>
      </div>
    </div>
  );
};

