
import { FaExchangeAlt, FaFileDownload, FaInfoCircle } from 'react-icons/fa';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import ReusableTable from '../Includes/ReusableTable';


const formatNaira = (value) => {
  // Simple formatting function for Naira currency (₦)
  if (!value) return '₦0.00';
  const rawValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  return `₦${rawValue.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

 const revenueTableColumns = [
  { header: "Transaction ID", accessor: "id" },
  { header: "Date", accessor: "date" },
  { header: "Service Type", accessor: "service" },
  { header: "User ID", accessor: "userId" },
  { header: "Vendor / Delivery Rep", accessor: "vendor" },
  { 
    header: "Amount (₦)", 
    accessor: "amount",
    render: (row) => formatNaira(row.amount),
  },
  { 
    header: "VAT (₦)", 
    accessor: "vat",
    render: (row) => formatNaira(row.vat),
  },
  { 
    header: "Service Charge", 
    accessor: "serviceCharge",
    render: (row) => formatNaira(row.serviceCharge),
  },
  { 
    header: "Top-up Charge", 
    accessor: "topUpCharge",
    render: (row) => formatNaira(row.topUpCharge),
  },
  { 
    header: "Status", 
    accessor: "status",
    render: (row) => {
      let colorClass = "text-gray-700";
      switch (row.status.toLowerCase()) {
        case "paid":
          colorClass = "text-green-500";
          break;
        case "pending":
          colorClass = "text-yellow-500";
          break;
        case "processing":
          colorClass = "text-orange-500";
          break;
        case "refunded":
          colorClass = "text-red-500";
          break;
        default:
          colorClass = "text-gray-500";
      }
      return <span className={`${colorClass} font-medium`}>{row.status}</span>;
    },
  },
  
];
const RevenueData = [
  { id: 'TXN-1001', date: '2025-03-01', service: 'Gas Refill', userId: 'U-3052', vendor: 'V-1001 (GasPro Ltd)', amount: '50000', vat: '3750', serviceCharge: '5000', topUpCharge: '500', status: 'Paid' },
  { id: 'TXN-1002', date: '2025-03-01', service: 'Gas Refill', userId: 'U-4023', vendor: 'V-1022 (ToolMasters)', amount: '120000', vat: '9000', serviceCharge: '12000', topUpCharge: '1200', status: 'Paid' },
  { id: 'TXN-1003', date: '2025-03-02', service: 'Accessories', userId: 'U-6784', vendor: 'V-1008 (EcoGas)', amount: '30000', vat: '2250', serviceCharge: '3000', topUpCharge: '300', status: 'Pending' },
  { id: 'TXN-1004', date: '2025-03-02', service: 'Electricity', userId: 'U-9320', vendor: '-', amount: '22500', vat: '1687', serviceCharge: '2250', topUpCharge: '225', status: 'Paid' },
  { id: 'TXN-1005', date: '2025-03-03', service: 'Petroleum', userId: 'U-1124', vendor: 'V-1004 (SpeedyGas)', amount: '85000', vat: '6377', serviceCharge: '8500', topUpCharge: '850', status: 'Processing' },
  { id: 'TXN-1006', date: '2025-03-03', service: 'Petroleum', userId: 'U-7903', vendor: 'V-1007 (GreenFlame)', amount: '65000', vat: '4875', serviceCharge: '6500', topUpCharge: '650', status: 'Paid' },
  { id: 'TXN-1007', date: '2025-03-04', service: 'Electricity', userId: 'U-4502', vendor: '-', amount: '95000', vat: '7125', serviceCharge: '9500', topUpCharge: '950', status: 'Paid' },
  { id: 'TXN-1008', date: '2025-03-05', service: 'Electricity', userId: 'U-1289', vendor: '-', amount: '40000', vat: '3000', serviceCharge: '4000', topUpCharge: '400', status: 'Pending' },
  { id: 'TXN-1009', date: '2025-03-06', service: 'Gas Refill', userId: 'U-3408', vendor: 'V-1012 (QuickGas)', amount: '150000', vat: '11250', serviceCharge: '15000', topUpCharge: '1500', status: 'Paid' },
  { id: 'TXN-1010', date: '2025-03-07', service: 'Diesel', userId: 'U-9230', vendor: 'V-1001 (GasPro Ltd)', amount: '25000', vat: '1875', serviceCharge: '2500', topUpCharge: '250', status: 'Processing' },
  { id: 'TXN-1011', date: '2025-03-07', service: 'Petroleum', userId: 'U-5583', vendor: 'V-1017 (FastFill Gas)', amount: '55000', vat: '4125', serviceCharge: '5500', topUpCharge: '550', status: 'Paid' },
  { id: 'TXN-1012', date: '2025-03-09', service: 'Gas Refill', userId: 'U-7832', vendor: 'V-1006 (EcoGas)', amount: '130000', vat: '9750', serviceCharge: '13000', topUpCharge: '1300', status: 'Pending' },
  { id: 'TXN-1013', date: '2025-03-10', service: 'Gas Refill', userId: 'U-2904', vendor: 'V-1001 (GasPro Ltd)', amount: '38000', vat: '2850', serviceCharge: '3800', topUpCharge: '380', status: 'Paid' },
  { id: 'TXN-1014', date: '2025-03-10', service: 'Gas Refill', userId: 'U-9034', vendor: 'V-1001 (GasPro Ltd)', amount: '110000', vat: '8250', serviceCharge: '11000', topUpCharge: '1100', status: 'Processing' },
];

// Placeholder data for the summary cards
const summaryCards = [
  { title: 'Total Revenue', value: '₦5,200,000' },
  { title: 'Total Expenses', value: '₦1,800,000' },
  { title: 'Net Profit', value: '₦3,400,000' },
  { title: 'Refunds Processed', value: '₦200,000' },
  { title: 'Payouts Made', value: '₦1,000,000' },
];
export const ReportsAndAnalytics = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  return (   <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
    <main className="flex-1 p-4 m-4 w-full overflow-x-hidden">
      

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Financial Accounting & Profit Transfer</h2>
          <p className="text-sm text-gray-600">Generate financial reports for any time period and manage profit transfers from the payment company.</p>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <a href="/reports-and-analytics-profit-transafer-request" className="flex items-center gap-2 bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-3 rounded text-sm font-medium">
            <FaExchangeAlt />
            Request Profit Transfer
          </a>
          <button className="flex items-center gap-2 bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-3 rounded text-sm font-medium">
            <FaFileDownload />
            Export as PDF
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Grid Layout for Form and Summary */}
      <div className="grid md:grid-cols-3 gap-6 items-start mt-6">
        
        {/* Left Form Section (Report Generation) */}
        <div className="bg-white rounded-lg border shadow-sm p-5 col-span-1">
          <h3 className="font-medium text-gray-800 mb-4">Financial Report Generation Section</h3>
          
          <label htmlFor="transaction-type" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type:</label>
          <select id="transaction-type" className="w-full border border-gray-300 rounded px-3 py-2 mb-6">
            <option>Revenue</option>
            <option>Expenses</option>
            <option>Profit</option>
          </select>
          
          {/* Date Pickers with Timeline style */}
          <div className="relative pl-6 border-l-2 border-yellow-400 mb-6">
            <div className="absolute -left-2 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <label htmlFor="start-date" className="text-sm text-gray-700">Start Date</label>
            <input type="date" id="start-date" className="w-full mt-1 mb-4 border border-gray-300 rounded px-3 py-2"/>
            
            <div className="absolute -left-2 top-24 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <label htmlFor="end-date" className="text-sm text-gray-700">End Date</label>
            <input type="date" id="end-date" className="w-full mt-1 border border-gray-300 rounded px-3 py-2"/>
          </div>
          
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded">
            Generate Report
          </button>
        </div>
        
        {/* Right Summary Section (Report Summary) */}
        <div className="col-span-2">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Report Summary</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Map over the summary card data */}
            {summaryCards.map((card, index) => (
              <div key={index} className="bg-white border rounded p-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                  <span>{card.title}</span>
                  <FaInfoCircle className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            ))}

          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Revenue Breakdown Table */}
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable

                            title=""
                            columns={revenueTableColumns}
                            data={RevenueData}

                            rowsPerPage={8}
                            showPagination={true}
                        />
                    </div>
    </main>
    </div></div>
  );
};

