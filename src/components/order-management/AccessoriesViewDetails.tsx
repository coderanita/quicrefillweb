import React, { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { AccessoryEditDetailsCard } from './AccessoryEditDetailsCard';
import { accessoriesData } from '../../MockData/orderData';

export const AccessoriesViewDetails = ({
  userId,
  sidebarCollapsed,
  toggleSidebar
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1️⃣ Initialize local state from mock data
  const [accessory, setAccessory] = useState(null);

  useEffect(() => {
    const found = accessoriesData.find(item => item.accessoryId === id);
    setAccessory(found || null);
  }, [id]);

  // 2️⃣ Handler to save edits
  const handleSave = (accessoryId, updatedFields) => {
    setAccessory(prev =>
      prev && prev.accessoryId === accessoryId
        ? { ...prev, ...updatedFields }
        : prev
    );
    // TODO: fire API call or update your shared store here
  };

  // 3️⃣ Handler to suspend accessory
  const handleSuspend = accessoryId => {
    setAccessory(prev =>
      prev && prev.accessoryId === accessoryId
        ? { ...prev, status: 'Suspended' }
        : prev
    );
    // TODO: call API to suspend, reuse shared SweetAlert2 util if desired
  };

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
            title="Accessory details"
            breadcrumbs={[]}
            showExportButton={false}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showBackButton={true}
            showDateSelector={false}
            onBackClick={() => navigate('/order-management-manage-accessories')}
          />

          {/* 🔁 Conditional Rendering */}
          {accessory ? (
            <AccessoryEditDetailsCard
              accessory={accessory}
              onSave={handleSave}
              onSuspend={handleSuspend}
            />
          ) : (
            <div className="text-center mt-10 text-red-600 font-semibold">
              Accessory not found for ID: {id}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
