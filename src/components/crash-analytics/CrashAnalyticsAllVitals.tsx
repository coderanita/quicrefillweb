
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../Includes/ReusableTable';

import { FaInfoCircle } from "react-icons/fa";

export const CrashAnalyticsAllVitals = ({ userId, sidebarCollapsed, toggleSidebar }) => {
const sampleVitalsData = [
  {
    id: 'C1001',
    title: "Input dispatching timed-out (random.generated.98TGH-link.lorem...)",
    subTitle: "random.generated.98TGH-link.lorem.",
    type: "0.24%",
    newInProduction: "",
    occurrences: "1,276",
    impactedUsers: "844",
    lastOccurred: "34 minutes ago",
  },
  {
    id: 'C1002',
    title: "App freeze during background operation (xyz.module.ABC)",
    subTitle: "xyz.module.ABC",
    type: "0.31%",
    newInProduction: "Yes",
    occurrences: "892",
    impactedUsers: "640",
    lastOccurred: "2 hours ago",
  },
  {
    id: 'C1003',
    title: "Database lock exception (db.connection.pool)",
    subTitle: "db.connection.pool",
    type: "0.15%",
    newInProduction: "No",
    occurrences: "562",
    impactedUsers: "400",
    lastOccurred: "Yesterday",
  },
  {
    id: 'C1004',
    title: "Network request failed on connection timeout (api.v1.data.fetch)",
    subTitle: "api.v1.data.fetch",
    type: "0.45%",
    newInProduction: "Yes",
    occurrences: "2,105",
    impactedUsers: "1,520",
    lastOccurred: "10 minutes ago",
  },
  {
    id: 'C1005',
    title: "Excessive memory usage in image processing (core.utils.image.load)",
    subTitle: "core.utils.image.load",
    type: "0.88%",
    newInProduction: "",
    occurrences: "4,590",
    impactedUsers: "3,100",
    lastOccurred: "5 minutes ago",
  },
  {
    id: 'C1006',
    title: "Uncaught promise rejection in UI rendering (ui.component.list.render)",
    subTitle: "ui.component.list.render",
    type: "0.19%",
    newInProduction: "No",
    occurrences: "780",
    impactedUsers: "512",
    lastOccurred: "1 hour ago",
  },
  {
    id: 'C1007',
    title: "Stalled main thread during data serialization (json.parser.heavy)",
    subTitle: "json.parser.heavy",
    type: "0.62%",
    newInProduction: "Yes",
    occurrences: "3,201",
    impactedUsers: "2,550",
    lastOccurred: "45 minutes ago",
  },
  {
    id: 'C1008',
    title: "Frequent garbage collection causing jank (gc.overhead.loop)",
    subTitle: "gc.overhead.loop",
    type: "0.29%",
    newInProduction: "",
    occurrences: "1,450",
    impactedUsers: "980",
    lastOccurred: "Today",
  },
  {
    id: 'C1009',
    title: "Permission denied error on file access (file.storage.read)",
    subTitle: "file.storage.read",
    type: "0.05%",
    newInProduction: "No",
    occurrences: "310",
    impactedUsers: "155",
    lastOccurred: "3 days ago",
  },
  {
    id: 'C1010',
    title: "WebView rendering failure on older devices (webview.kit.render)",
    subTitle: "webview.kit.render",
    type: "0.71%",
    newInProduction: "Yes",
    occurrences: "3,987",
    impactedUsers: "3,010",
    lastOccurred: "20 minutes ago",
  },
  {
    id: 'C1011',
    title: "Security exception due to unauthorized access (auth.token.validate)",
    subTitle: "auth.token.validate",
    type: "0.08%",
    newInProduction: "",
    occurrences: "422",
    impactedUsers: "210",
    lastOccurred: "1 week ago",
  },
  {
    id: 'C1012',
    title: "Client-side routing error on page load (router.js.config)",
    subTitle: "router.js.config",
    type: "0.33%",
    newInProduction: "No",
    occurrences: "1,675",
    impactedUsers: "1,300",
    lastOccurred: "6 hours ago",
  },
  {
    id: 'C1013',
    title: "Crash on attempt to access null object (object.reference.null)",
    subTitle: "object.reference.null",
    type: "1.20%",
    newInProduction: "Yes",
    occurrences: "6,804",
    impactedUsers: "5,400",
    lastOccurred: "1 minute ago",
  },
];
 const VitalsColumns = [
  {
    header: "Crash/ANR",
    accessor: "title",
    render: (row) => (
      <div>
        <div className="text-sm text-gray-600">{row.title}</div>
        <div className="text-xs text-gray-500">{row.subTitle}</div>
      </div>
    ),
  },
  { header: "Type", accessor: "type" },
  { header: "New in production", accessor: "newInProduction" },
  { header: "Occurrences", accessor: "occurrences" },
  { header: "Impacted users", accessor: "impactedUsers" },
  { header: "Last occurred", accessor: "lastOccurred" },
   {
    header: "Actions",
    accessor: "actions",
    render: (row) => (
      <button
        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        onClick={() => navigate('/crash-analytics-details/'+row.id) }
      >
        <FaInfoCircle size={14} /> View
      </button>
    ),
  },
];

const navigate=useNavigate();


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
              title=""
              breadcrumbs={[]}
              showExportButton={false}
              filterCategories={[]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showDateSelector={false}
              showBackButton={true}
              onBackClick={()=>navigate('/crash-analytics')}
              

            />
          </div>
               <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 ">
            <ReusableTable
              title="All Vitals"
              columns={VitalsColumns}
              data={sampleVitalsData} // ✅ use state, not static Data
              rowsPerPage={5}
              showPagination={true}
            />
          </div>
          
        </main>
      </div>
    </div>
  );
};

