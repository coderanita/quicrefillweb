import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { confirmDelete } from '../Includes/SweetAlert2';
import { FaPlus ,FaEdit, FaTrash, FaEye, FaCog } from "react-icons/fa";

export const OperatingLocations = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  // Table data
 const LocationData = [
  { locationId: "LOC-001", country: "Nigeria", state: "-", lga: "-", city: "-", status: "Enabled" },
  { locationId: "LOC-002", country: "", state: "Lagos", lga: "Ikeja LGA", city: "Lagos City", status: "Enabled" },
  { locationId: "LOC-003", country: "", state: "Abuja", lga: "Gwagwalada", city: "FCT", status: "Enabled" },
  { locationId: "LOC-004", country: "", state: "Kano State", lga: "Nassarawa LGA", city: "Kano City", status: "Enabled" },
  { locationId: "LOC-005", country: "", state: "Rivers State", lga: "Port Harcourt City LGA", city: "Kano City", status: "Enabled" },
  { locationId: "LOC-006", country: "", state: "Enugu State", lga: "Enugu North LGA", city: "Enugu City", status: "Enabled" },
  { locationId: "LOC-007", country: "South Africa", state: "-", lga: "-", city: "-", status: "Disabled" },
  { locationId: "LOC-008", country: "", state: "Gauteng Province", lga: "City of Johannesburg", city: "Johannesburg", status: "Disabled" },
  { locationId: "LOC-009", country: "", state: "Western Cape Province", lga: "City of Cape Town", city: "CapeTown", status: "Disabled" },
  { locationId: "LOC-010", country: "", state: "KwaZulu-Natal Province", lga: "eThekwini Metropolitan", city: "Durban", status: "Disabled" },
  { locationId: "LOC-011", country: "Ghana", state: "-", lga: "-", city: "-", status: "Enabled" },
  { locationId: "LOC-012", country: "", state: "Greater Accra Region", lga: "Accra Metropolitan Assembly", city: "Accra", status: "Enabled" },
  { locationId: "LOC-013", country: "", state: "Ashanti Region", lga: "Kumasi Metropolitan Assembly", city: "Kumasi", status: "Disabled" },
  { locationId: "LOC-014", country: "", state: "Northern Region", lga: "Tamale Metropolitan Assembly", city: "Tamale", status: "Disabled" },
];
  const navigate = useNavigate();
  const [locations, setLocations] = useState(LocationData);


// Column configuration
 const LocationColumns = [
  { header: "Country", accessor: "country" },
  { header: "State/Province", accessor: "state" },
  { header: "LGA", accessor: "lga" },
  { header: "City", accessor: "city" },
  {
    header: "Status",
    accessor: "status",
    render: (row: any) => {
      const colorClass = row.status === "Enabled" ? "text-green-500" : "text-red-500";
      return (
        <span className={`font-semibold ${colorClass}`}>
          {row.status}
        </span>
      );
    },
  },
 {
    header: "Actions",
    accessor: "actions",
    render: (row: any) => (
      <div className="flex items-center space-x-2">
        <a href={"/operating-location-add/"+row.locationId} className="text-gray-500 hover:text-blue-500">
          <FaEdit size={14} />
        </a>
        <button className="text-red-500 hover:text-red-700" onClick={() => confirmDelete(setLocations, 'locationId', row.locationId,"Location")}>
          <FaTrash size={14} />
        </button>
        <a href={"/operating-location-view/"+row.locationId} className="text-gray-500 hover:text-green-500">
          <FaEye size={14} />
        </a>
        <button className="text-gray-500 hover:text-yellow-500">
          <FaCog size={14} />
        </button>
      </div>
    ),
  }
];



  

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
              title="Operating Locations"
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
          
            <div className="flex flex-wrap gap-2">
                <a href="/operating-location-add" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded-lg border border-gray-300 flex items-center justify-center sm:justify-start w-full sm:w-auto mb-6">
                    <FaPlus className='mr-2'></FaPlus>
                    Add Location
                </a>
            </div>      

          <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 ">
            <ReusableTable
              title=""
              columns={LocationColumns}
              data={locations} // ✅ use state, not static Data
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

