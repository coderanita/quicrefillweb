
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";


import { FaCircleInfo } from 'react-icons/fa6'; // Used for the info icon
import SmsEmailSettings from "./SmsEmailSettings";
import SmsEmailHostSettings from "./SmsEmailHostSettings";

// 1. Define the data for the cards right inside the component
const cardsData = [
  {
    id: 1,
    title: 'Total Messages Sent',
    subtitle: 'This month',
    value: '1000',
    valueColorClass: 'text-gray-800',
  },
  {
    id: 2,
    title: 'Total Emails Sent',
    subtitle: 'This month',
    value: '500',
    valueColorClass: 'text-gray-800',
  },
  {
    id: 3,
    title: 'Success Rate',
    subtitle: 'Daily',
    value: '95%',
    valueColorClass: 'text-green-500',
  },
];
export const MessageSettings = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Message Management"
            breadcrumbs={[]}
            filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            showExportButton={false}
            showSearchBox={true}
          />

          {/* --- Cards --- */}
          <div className="max-w-4xl bg-gray-100 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {cardsData.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-gray-700 text-sm font-medium">{card.title}</h3>
                      <p className="text-gray-500 text-xs">{card.subtitle}</p>
                    </div>
                    <FaCircleInfo className="text-gray-400" aria-label="Information" />
                  </div>
                  <p className={`text-3xl font-bold ${card.valueColorClass}`}>
                    {card.value}
                  </p>
                </div>
              ))}

            </div>
          </div>
            <SmsEmailSettings/>
            <SmsEmailHostSettings/>
        </main>
      </div>
    </div>
  );
};
