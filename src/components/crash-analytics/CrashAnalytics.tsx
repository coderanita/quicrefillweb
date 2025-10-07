
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import VitalsDashboard from './VitalsDashboard';

export const CrashAnalytics = ({ userId, sidebarCollapsed, toggleSidebar }) => {





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
              title="Crash Analytics Vitals Overview"
              breadcrumbs={[{"label":"Monitor and improve your app's technical quality and discoverability."}]}
              showExportButton={false}
              filterCategories={[]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              

            />


          </div>
        <VitalsDashboard/>
          
        </main>
      </div>
    </div>
  );
};

