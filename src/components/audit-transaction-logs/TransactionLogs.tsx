
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from '../Includes/ReusableTable';
import { useNavigate } from 'react-router-dom';
import TranactionLogCard from './TranactionLogCard';

export const TransactionLogs = ({ userId, sidebarCollapsed, toggleSidebar }) => {
const navigate=useNavigate();
const mockTransactionLogData = [
  {
    id: "TXN001",
    dateTime: "25/01/27 02:45 PM",
    type: "Commission",
    amount: "₦500,000",
    fromUser: "U12345",
    toUser: "V56789",
    method: "Wallet",
    status: "Completed",
    notes: "Commission for order #ORD12345"
  },
  {
    id: "TXN002",
    dateTime: "25/01/27 03:05 PM",
    type: "Payout",
    amount: "₦750,000",
    fromUser: "Platform",
    toUser: "V67890",
    method: "Bank Transfer",
    status: "Pending",
    notes: "Vendor payout processing"
  },
  {
    id: "TXN003",
    dateTime: "25/01/27 03:20 PM",
    type: "Refund",
    amount: "₦150,000",
    fromUser: "U23456",
    toUser: "U23456",
    method: "Card Payment",
    status: "Completed",
    notes: "Refund for canceled order"
  },
  {
    id: "TXN004",
    dateTime: "25/01/27 03:45 PM",
    type: "Subscription",
    amount: "₦250,000",
    fromUser: "V34567",
    toUser: "Platform",
    method: "Wallet",
    status: "Completed",
    notes: "Annual subscription payment"
  },
  {
    id: "TXN005",
    dateTime: "25/01/27 04:00 PM",
    type: "Commission",
    amount: "₦350,000",
    fromUser: "U45678",
    toUser: "V56789",
    method: "Wallet",
    status: "Failed",
    notes: "Insufficient funds"
  },
  {
    id: "TXN006",
    dateTime: "25/01/27 04:15 PM",
    type: "Payout",
    amount: "₦1,200,000",
    fromUser: "Platform",
    toUser: "V12345",
    method: "Bank Transfer",
    status: "Completed",
    notes: "Weekly vendor earnings"
  },
  {
    id: "TXN007",
    dateTime: "25/01/27 04:30 PM",
    type: "Refund",
    amount: "₦90,000",
    fromUser: "U67890",
    toUser: "U67890",
    method: "Card Payment",
    status: "Completed",
    notes: "Customer complaint refund"
  },
  {
    id: "TXN008",
    dateTime: "25/01/27 04:45 PM",
    type: "Subscription",
    amount: "₦500,000",
    fromUser: "V98765",
    toUser: "Platform",
    method: "Wallet",
    status: "Completed",
    notes: "Annual subscription payment"
  },
  {
    id: "TXN009",
    dateTime: "25/01/27 05:00 PM",
    type: "Commission",
    amount: "₦700,000",
    fromUser: "U87654",
    toUser: "V54321",
    method: "Wallet",
    status: "Pending",
    notes: "Awaiting confirmation"
  },
  {
    id: "TXN010",
    dateTime: "25/01/27 05:15 PM",
    type: "Payout",
    amount: "₦450,000",
    fromUser: "Platform",
    toUser: "V11223",
    method: "Bank Transfer",
    status: "Completed",
    notes: "Vendor withdrawal"
  },
  {
    id: "TXN011",
    dateTime: "25/01/27 05:30 PM",
    type: "Refund",
    amount: "₦200,000",
    fromUser: "U22334",
    toUser: "U22334",
    method: "Wallet",
    status: "Failed",
    notes: "Wallet balance too low"
  },
  {
    id: "TXN012",
    dateTime: "25/01/27 05:45 PM",
    type: "Subscription",
    amount: "₦150,000",
    fromUser: "V99887",
    toUser: "Platform",
    method: "Card Payment",
    status: "Completed",
    notes: "Monthly plan activation"
  },
  {
    id: "TXN013",
    dateTime: "25/01/27 06:00 PM",
    type: "Commission",
    amount: "₦320,000",
    fromUser: "U44556",
    toUser: "V33445",
    method: "Wallet",
    status: "Completed",
    notes: "Commission for order #ORD56789"
  },
  {
    id: "TXN014",
    dateTime: "25/01/27 06:15 PM",
    type: "Payout",
    amount: "₦600,000",
    fromUser: "Platform",
    toUser: "V55667",
    method: "Wallet",
    status: "Pending",
    notes: "Payout in review"
  },
  {
    id: "TXN015",
    dateTime: "25/01/27 06:30 PM",
    type: "Commission",
    amount: "₦400,000",
    fromUser: "U77889",
    toUser: "V44556",
    method: "Bank Transfer",
    status: "Completed",
    notes: "Commission for order #ORD99887"
  }
];


 const TransactionLogColumns = [
  { header: "ID", accessor: "id" },
  { header: "Date & Time", accessor: "dateTime" },
  { header: "Type", accessor: "type" },
  { header: "Amount", accessor: "amount" },
  { header: "From", accessor: "fromUser" },
  { header: "To", accessor: "toUser" },
  { header: "Method", accessor: "method" },
  { 
    header: "Status", 
    accessor: "status",
    render: (row) => {
      let colorClass = 'text-gray-700';
      if (row.status === 'Completed') {
        colorClass = 'text-green-600';
      } else if (row.status === 'Pending') {
        colorClass = 'text-yellow-600';
      } else if (row.status === 'Failed') {
        colorClass = 'text-red-600';
      }

      return <span className={colorClass}>{row.status}</span>;
    }
  },
  { header: "Notes", accessor: "notes" },
  {
    header: "Actions",
    accessor: "actions",
    render: (row) => (
      <button
        className="text-blue-500 hover:underline"
        // Replace '/transaction-details/' with your actual route path
        onClick={() => navigate("/audit-transaction-logs-details/" + row.id)}
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
              title="Transaction Logs"
              breadcrumbs={[{"label":"Review and analyze all financial transactions across the platform."}]}
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
          <TranactionLogCard />
            <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 ">
            <ReusableTable
              title=""
              columns={TransactionLogColumns}
              data={mockTransactionLogData} 
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
          
          
        </main>
      </div>
    </div>
  );
};

