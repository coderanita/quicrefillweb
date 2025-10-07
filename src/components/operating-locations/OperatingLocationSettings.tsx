
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import LocationDashboardCard from './LocationDashboardCard';
import LocationCharts from './LocationCharts';
import ServiceTable from './ServiceTable';
import TabsComponent from '../../MockData/TabsComponent';

export const OperatingLocationSettings = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const  {id}=useParams(); 

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
              title=''
              breadcrumbs={[]}
              showExportButton={false}
                filterCategories={[{ name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}  
              showBackButton={true}
              onBackClick={()=>{navigate('/operating-locations')}}

            />


          </div>
          <LocationDashboardCard  locationId={id}/>
          <LocationCharts  locationId={""+id}/>
          <ServiceTable locationId={""+id}/>
          <TabsComponent locationId={""+id}/>
            
        </main>
      </div>
    </div>
  );
};

