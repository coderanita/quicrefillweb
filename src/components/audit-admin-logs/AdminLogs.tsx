
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from '../Includes/ReusableTable';
import { useNavigate } from 'react-router-dom';

export const AdminLogs = ({ userId, sidebarCollapsed, toggleSidebar }) => {
const navigate=useNavigate();
const mockActivities = [
  {
    logId: "L1001",
    dateTime: "25/01/27 02:45 PM",
    adminUser: "admin_john",
    activityDescription: "Updated order #ORD12345 status from Pending to Completed",
    module: "Orders",
    ipAddress: "192.168.1.15"
  },
  {
    logId: "L1002",
    dateTime: "26/01/27 10:30 AM",
    adminUser: "admin_susan",
    activityDescription: "Created new user account 'user_mike'",
    module: "User Management",
    ipAddress: "192.168.1.22"
  },
  {
    logId: "L1003",
    dateTime: "26/01/27 11:15 AM",
    adminUser: "admin_john",
    activityDescription: "Deleted product #PRD54321 from catalog",
    module: "Products",
    ipAddress: "192.168.1.15"
  },
  {
    logId: "L1004",
    dateTime: "27/01/27 09:50 AM",
    adminUser: "admin_alex",
    activityDescription: "Updated payment method for order #ORD54321",
    module: "Payments",
    ipAddress: "192.168.1.30"
  },
  {
    logId: "L1005",
    dateTime: "27/01/27 11:05 AM",
    adminUser: "admin_susan",
    activityDescription: "Reset password for user 'user_lisa' due to security alert",
    module: "Security",
    ipAddress: "192.168.1.22"
  },
  {
    logId: "L1006",
    dateTime: "27/01/27 01:20 PM",
    adminUser: "admin_john",
    activityDescription: "Published new marketing campaign 'Spring_Sale_2027'",
    module: "Marketing",
    ipAddress: "192.168.1.15"
  },
  {
    logId: "L1007",
    dateTime: "28/01/27 08:35 AM",
    adminUser: "admin_alex",
    activityDescription: "Archived sales report 'Q4_2026_Final' after review",
    module: "Reporting",
    ipAddress: "192.168.1.30"
  },
  {
    logId: "L1008",
    dateTime: "28/01/27 09:40 AM",
    adminUser: "admin_susan",
    activityDescription: "Approved refund for transaction #TXN98765",
    module: "Payments",
    ipAddress: "192.168.1.22"
  },
  {
    logId: "L1009",
    dateTime: "28/01/27 03:00 PM",
    adminUser: "admin_john",
    activityDescription: "Modified shipping rates for 'Express' delivery zone",
    module: "Settings",
    ipAddress: "192.168.1.15"
  },
  {
    logId: "L1010",
    dateTime: "29/01/27 11:55 AM",
    adminUser: "admin_alex",
    activityDescription: "Granted temporary elevated permissions to 'dev_user_4'",
    module: "User Management",
    ipAddress: "192.168.1.30"
  },
  {
    logId: "L1011",
    dateTime: "29/01/27 04:10 PM",
    adminUser: "admin_susan",
    activityDescription: "Uploaded new version (v3.1) of mobile application build",
    module: "Deployments",
    ipAddress: "192.168.1.22"
  },
  {
    logId: "L1012",
    dateTime: "30/01/27 09:00 AM",
    adminUser: "admin_john",
    activityDescription: "Opened support ticket #SUP1002 for customer 'jane_doe'",
    module: "Support",
    ipAddress: "192.168.1.15"
  },
  {
    logId: "L1013",
    dateTime: "30/01/27 10:45 AM",
    adminUser: "admin_alex",
    activityDescription: "Rolled back configuration file 'config.yaml' to previous state",
    module: "Settings",
    ipAddress: "192.168.1.30"
  },
  {
    logId: "L1014",
    dateTime: "30/01/27 01:00 PM",
    adminUser: "admin_susan",
    activityDescription: "Banned IP range '54.240.197.0/24' due to bot activity",
    module: "Security",
    ipAddress: "192.168.1.22"
  }
];


 const ActivityColumns = [
  { header: "Log ID", accessor: "logId" },
  { header: "Date & Time", accessor: "dateTime" },
  { header: "Admin User", accessor: "adminUser" },
  { header: "Activity Description", accessor: "activityDescription" },
  { header: "Module Affected", accessor: "module" },
  { header: "IP Address", accessor: "ipAddress" },
  {
    header: "Actions",
    accessor: "actions",
    render: (row) => (
      <button
        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        onClick={() => navigate("/audit-admin-logs-details/" + row.logId)}
      >
         View Details
      </button>
    ),
  },
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
              title="Audit logs - Admin Activities"
              breadcrumbs={[{"label":"Review the actions taken by administrators on the platform"}]}
              showExportButton={false}
                  filterCategories={[
              { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },
            ]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}

            />


          </div>
            <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 ">
            <ReusableTable
              title="All Vitals"
              columns={ActivityColumns}
              data={mockActivities} 
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
          
          
        </main>
      </div>
    </div>
  );
};

