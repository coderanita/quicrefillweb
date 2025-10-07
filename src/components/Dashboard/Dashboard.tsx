import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import StatsCards from '../Includes/StatsCards';
import { FaArrowDown, FaEdit, FaTrash, FaEllipsisH, FaShoppingCart, FaComments, FaBuilding, FaUser, FaMotorcycle, FaClipboard, FaUserCog, FaMoneyBillWave } from 'react-icons/fa';

import PieChartComponent from '../Includes/PieChartComponent';
import BarChartComponent from '../Includes/BarChartComponent';
import ReusableTable from '../Includes/ReusableTable';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import for Excel export
import {confirmDelete} from '../Includes/SweetAlert2';

const Dashboard = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    const [useAlternativeData,setuseAlternativeData]=useState(true);    
    const [selectedDateMode, setSelectedDateMode] = useState('Today');
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
     const [orderCurrentData, setOrderCurrentData] = useState<any[]>([]);
   
  useEffect(() => {
    // whenever dataset toggle changes, reset orders
    if (useAlternativeData) {
      setOrderCurrentData(ordersDataAlternative);
    } else {
      setOrderCurrentData(ordersDataDefault);
    }
  }, [useAlternativeData]);



    // --- Data Set 1 (Default/Today's Data) ---
    const complaintsCardsDefault = [
        { title: 'Number of Complaints', icon: <FaComments className="text-gray-600 text-xs" />, value: '100', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, },
        { title: 'Total Amount Withdrawn', icon: <FaMoneyBillWave className="text-gray-600 text-xs" />, value: '₦1,406,000', percentage: '4.10%', percentageColor: 'green', description: 'Last 7 Days', extraInfo: '', showPercentageBox: true, },
        { title: 'Number of Cities in Operation', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '20', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, },
    ];
    const dashboardCardsDefault = [
        { title: 'Number of App Installation', icon: <FaArrowDown className="text-gray-600 text-xs" />, value: '10,000', percentage: '8.3%', percentageColor: 'red', description: 'Last 7 Days', extraInfo: '', showPercentageBox: true, showInfoIcon: true, showExtraDescription: false, percentageDirection: 'down', },
        { title: 'Number of Complaints', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '403', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, showInfoIcon: true, showExtraDescription: false, },
        { title: 'Total active services', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '20', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '365 Orders:', showPercentageBox: false, showInfoIcon: true, showExtraDescription: true, },
    ];
    const cardDataDefault = [
        { title: 'Total Users', icon: <FaUser className="text-gray-600 text-xs" />, value: '5,246', percentage: '20.4%', percentageColor: 'green', description: 'Active Users', extraInfo: '3,187 (61% of Total Users)', showPercentageBox: true },
        { title: 'Total Riders', icon: <FaMotorcycle className="text-gray-600 text-xs" />, value: '3,140', percentage: '10.3%', percentageColor: 'red', description: 'Active Riders', extraInfo: '2,901 (83% of Total Riders)', showPercentageBox: true },
        { title: 'Completed Services', icon: <FaClipboard className="text-gray-600 text-xs" />, value: '8,412', percentage: '20.3%', percentageColor: 'green', description: 'Active Riders', extraInfo: '2,901 (83% of Total Users)', showPercentageBox: true },
        { title: 'Customer Satisfaction Rating', icon: <FaUserCog className="text-gray-600 text-xs" />, value: '89%', percentage: '', percentageColor: 'green', description: '', extraInfo: '', showPercentageBox: false },
    ];
    const revenueCardDefault = [{ title: 'Revenue', icon: <FaMoneyBillWave className="text-gray-600 text-xs" />, value: '₦2,356,000', percentage: '8.4%', percentageColor: 'green', description: 'Last 7 Days', extraInfo: ' ', showPercentageBox: true }];
    const pieChartDataDefault = { labels: ['Petroleum', 'Cooking Gas', 'Diesel', 'Electricity'], values: [40, 20, 25, 15], colors: ['#14b8a6', '#facc15', '#ef4444', '#3b82f6'], };
    const barChartValuesDefault = [250000, 350000, 200000, 280000, 220000, 180000, 500000, 320000, 450000, 280000, 220000, 380000, 200000, 350000];
    const vendorDataDefault = [
        { rank: 1, vendorId: 'VND-1001', name: 'Supreme Gas Ltd', totalRevenue: '2,400,000', todayRevenue: '800,000' },
        { rank: 2, vendorId: 'VND-1002', name: 'Fast Diesel Co.', totalRevenue: '2,100,000', todayRevenue: '650,000' },
        { rank: 3, vendorId: 'VND-1003', name: 'Mega Gas Nigeria', totalRevenue: '1,800,000', todayRevenue: '500,000' },
        { rank: 4, vendorId: 'VND-1004', name: 'PetroSwift', totalRevenue: '1,500,000', todayRevenue: '480,000' },
        { rank: 5, vendorId: 'VND-1005', name: 'Elite Energy', totalRevenue: '1,200,000', todayRevenue: '330,000' },
    ];
    const transactionDataDefault = [
        { transactionId: 'WTHI01', userName: 'John Doe', category: '2,400,000', status: 'Completed', amount: '800,000', action: 'View Order' },
        { transactionId: 'WTHI02', userName: 'Salami Ahmed', category: '2,100,000', status: 'Pending', amount: '650,000', action: 'View Order' },
        { transactionId: 'WTHI03', userName: 'Cynthia Micheal', category: '1,800,000', status: 'Completed', amount: '500,000', action: 'View Order' },
        { transactionId: 'WTHI04', userName: 'Chinedu Kalu', category: '1,500,000', status: 'Completed', amount: '480,000', action: 'View Order' },
        { transactionId: 'WTHI05', userName: 'Priscillia Madu', category: '1,200,000', status: 'Canceled', amount: '330,000', action: 'View Order' },
    ];
    const ordersDataDefault = [
        { orderId: 'ORD1001', customerName: 'John Doe', vendorName: 'Elite Gas Hub', riderName: 'James Okoro', serviceType: 'Gas Refill', status: 'In Progress', payment: 'On delivery', amount: '₦12,500', date: '25/01/27 10:15 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1002', customerName: 'Mary Johnson', vendorName: 'Fixit Plumbers', riderName: 'Ahmed Bello', serviceType: 'Petroleum', status: 'Completed', payment: 'Wallet', amount: '₦75,000', date: '25/01/27 02:45 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1003', customerName: 'Charles Uche', vendorName: 'PowerPlus Ltd.', riderName: '-', serviceType: 'Gas Refill', status: 'Disputed', payment: 'Flatterwave', amount: '₦8,500', date: '25/01/27 09:30 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1004', customerName: 'Charles Uche', vendorName: 'PowerPlus Ltd.', riderName: 'David M.', serviceType: 'Diesel', status: 'Canceled', payment: 'Flatterwave', amount: '₦10,000', date: '25/01/26 11:10 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1005', customerName: 'David Hassan', vendorName: 'TechGears Ltd.', riderName: '-', serviceType: 'Accessories', status: 'Completed', payment: 'Wallet', amount: '₦6,900', date: '25/01/24 04:20 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1006', customerName: 'Esther John', vendorName: 'GreenGas Ltd.', riderName: 'Sola A.', serviceType: 'Gas Refill', status: 'Completed', payment: 'On delivery', amount: '₦30,000', date: '25/01/26 11:20 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1007', customerName: 'Emmanuel Obi', vendorName: 'PetroHub Ltd.', riderName: 'Tunde A.', serviceType: 'Petroleum', status: 'In Progress', payment: 'Transfer', amount: '₦50,000', date: '25/01/27 12:50 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1008', customerName: 'Grace Nwosu', vendorName: 'PetroHub Ltd.', riderName: '-', serviceType: 'Electricity', status: 'In Progress', payment: 'Flatterwave', amount: '₦10,500', date: '25/01/27 12:50 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1009', customerName: 'John Ekpo', vendorName: 'FuelSure Ltd.', riderName: 'David M.', serviceType: 'Diesel', status: 'Canceled', payment: 'On delivery', amount: '₦28,000', date: '25/01/24 06:45 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1010', customerName: 'Hannah Danjuma', vendorName: 'TechGears Ltd.', riderName: '-', serviceType: 'Accessories', status: 'Completed', payment: 'Wallet', amount: '₦8,200', date: '25/01/25 05:30 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD1011', customerName: 'Abdul Yusuf', vendorName: 'GreenGas Ltd.', riderName: 'Sola A.', serviceType: 'Gas Refill', status: 'Completed', payment: 'Wallet', amount: '₦22,000', date: '25/01/27 04:50 PM', actionUrl: 'order-management-details.html', },
    ];

    // --- Data Set 2 (Alternative Data) ---
    const complaintsCardsAlternative = [
        { title: 'Number of Complaints', icon: <FaComments className="text-gray-600 text-xs" />, value: '75', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, },
        { title: 'Total Amount Withdrawn', icon: <FaMoneyBillWave className="text-gray-600 text-xs" />, value: '₦950,000', percentage: '2.50%', percentageColor: 'red', description: 'Last 7 Days', extraInfo: '', showPercentageBox: true, },
        { title: 'Number of Cities in Operation', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '18', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, },
    ];
    const dashboardCardsAlternative = [
        { title: 'Number of App Installation', icon: <FaArrowDown className="text-gray-600 text-xs" />, value: '8,500', percentage: '5.1%', percentageColor: 'green', description: 'Last 7 Days', extraInfo: '', showPercentageBox: true, showInfoIcon: true, showExtraDescription: false, percentageDirection: 'up', },
        { title: 'Number of Complaints', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '320', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '', showPercentageBox: false, showInfoIcon: true, showExtraDescription: false, },
        { title: 'Total active services', icon: <FaBuilding className="text-gray-600 text-xs" />, value: '15', percentage: '', percentageColor: '', description: 'Last 7 Days', extraInfo: '280 Orders:', showPercentageBox: false, showInfoIcon: true, showExtraDescription: true, },
    ];
    const cardDataAlternative = [
        { title: 'Total Users', icon: <FaUser className="text-gray-600 text-xs" />, value: '4,800', percentage: '15.2%', percentageColor: 'red', description: 'Active Users', extraInfo: '2,800 (58% of Total Users)', showPercentageBox: true },
        { title: 'Total Riders', icon: <FaMotorcycle className="text-gray-600 text-xs" />, value: '2,900', percentage: '8.0%', percentageColor: 'green', description: 'Active Riders', extraInfo: '2,500 (86% of Total Riders)', showPercentageBox: true },
        { title: 'Completed Services', icon: <FaClipboard className="text-gray-600 text-xs" />, value: '7,500', percentage: '18.0%', percentageColor: 'red', description: 'Active Riders', extraInfo: '2,500 (86% of Total Users)', showPercentageBox: true },
        { title: 'Customer Satisfaction Rating', icon: <FaUserCog className="text-gray-600 text-xs" />, value: '85%', percentage: '', percentageColor: 'red', description: '', extraInfo: '', showPercentageBox: false },
    ];
    const revenueCardAlternative = [{ title: 'Revenue', icon: <FaMoneyBillWave className="text-gray-600 text-xs" />, value: '₦1,800,000', percentage: '5.0%', percentageColor: 'red', description: 'Last 7 Days', extraInfo: ' ', showPercentageBox: true }];
    const pieChartDataAlternative = { labels: ['Petroleum', 'Cooking Gas', 'Diesel', 'Electricity'], values: [30, 25, 20, 25], colors: ['#14b8a6', '#facc15', '#ef4444', '#3b82f6'], };
    const barChartValuesAlternative = [200000, 300000, 150000, 250000, 200000, 150000, 400000, 280000, 400000, 250000, 200000, 350000, 180000, 300000];
    const vendorDataAlternative = [
        { rank: 1, vendorId: 'VND-2001', name: 'New Gas Solutions', totalRevenue: '2,000,000', todayRevenue: '700,000' },
        { rank: 2, vendorId: 'VND-2002', name: 'Rapid Fuel Inc.', totalRevenue: '1,900,000', todayRevenue: '600,000' },
        { rank: 3, vendorId: 'VND-2003', name: 'Global Energy', totalRevenue: '1,700,000', todayRevenue: '450,000' },
        { rank: 4, vendorId: 'VND-2004', name: 'QuickFill Fuels', totalRevenue: '1,400,000', todayRevenue: '400,000' },
        { rank: 5, vendorId: 'VND-2005', name: 'Reliable Diesels', totalRevenue: '1,100,000', todayRevenue: '300,000' },
    ];
    const transactionDataAlternative = [
        { transactionId: 'WTHI06', userName: 'Aisha Musa', category: '1,500,000', status: 'Completed', amount: '500,000', action: 'View Order' },
        { transactionId: 'WTHI07', userName: 'Segun Adebayo', category: '1,000,000', status: 'Pending', amount: '400,000', action: 'View Order' },
        { transactionId: 'WTHI08', userName: 'Fatima Bello', category: '900,000', status: 'Completed', amount: '350,000', action: 'View Order' },
        { transactionId: 'WTHI09', userName: 'Emeka Okoro', category: '800,000', status: 'Completed', amount: '300,000', action: 'View Order' },
        { transactionId: 'WTHI10', userName: 'Funke Alabi', category: '700,000', status: 'Canceled', amount: '250,000', action: 'View Order' },
    ];
    const ordersDataAlternative = [
        { orderId: 'ORD2001', customerName: 'Alice Brown', vendorName: 'Alpha Gas', riderName: 'Chris Green', serviceType: 'Diesel', status: 'Completed', payment: 'Wallet', amount: '₦25,000', date: '25/02/01 09:00 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2002', customerName: 'Bob White', vendorName: 'Beta Fuels', riderName: 'Diana Blue', serviceType: 'Petroleum', status: 'In Progress', payment: 'On delivery', amount: '₦60,000', date: '25/02/01 11:30 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2003', customerName: 'Charlie Black', vendorName: 'Gamma Energy', riderName: '-', serviceType: 'Electricity', status: 'Disputed', payment: 'Transfer', amount: '₦15,000', date: '25/02/01 01:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2004', customerName: 'David Grey', vendorName: 'Delta Oil', riderName: 'Eve Red', serviceType: 'Gas Refill', status: 'Canceled', payment: 'Wallet', amount: '₦18,000', date: '25/01/31 03:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2005', customerName: 'Frank Cyan', vendorName: 'Epsilon Tech', riderName: '-', serviceType: 'Accessories', status: 'Completed', payment: 'On delivery', amount: '₦9,000', date: '25/01/30 05:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2006', customerName: 'Grace Magenta', vendorName: 'Zeta Gas', riderName: 'Harry Yellow', serviceType: 'Gas Refill', status: 'Completed', payment: 'Wallet', amount: '₦35,000', date: '25/01/31 09:00 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2007', customerName: 'Ivy Gold', vendorName: 'Theta Power', riderName: 'Jack Orange', serviceType: 'Diesel', status: 'In Progress', payment: 'Flatterwave', amount: '₦45,000', date: '25/02/01 10:00 AM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2008', customerName: 'Karen Silver', vendorName: 'Kappa Fuels', riderName: '-', serviceType: 'Petroleum', status: 'In Progress', payment: 'Wallet', amount: '₦11,000', date: '25/02/01 12:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2009', customerName: 'Liam Bronze', vendorName: 'Lambda Energy', riderName: 'Mia Platinum', serviceType: 'Electricity', status: 'Canceled', payment: 'On delivery', amount: '₦30,000', date: '25/01/29 02:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2010', customerName: 'Noah Copper', vendorName: 'Mu Technologies', riderName: '-', serviceType: 'Accessories', status: 'Completed', payment: 'Wallet', amount: '₦9,500', date: '25/01/28 04:00 PM', actionUrl: 'order-management-details.html', },
        { orderId: 'ORD2011', customerName: 'Olivia Iron', vendorName: 'Nu Gas', riderName: 'Paul Steel', serviceType: 'Gas Refill', status: 'Completed', payment: 'Transfer', amount: '₦20,000', date: '25/02/01 02:30 PM', actionUrl: 'order-management-details.html', },
    ];

    // Function to determine which data set to use
    

    const currentComplaintsCards = useAlternativeData ? complaintsCardsAlternative : complaintsCardsDefault;
    const currentDashboardCards = useAlternativeData ? dashboardCardsAlternative : dashboardCardsDefault;
    const currentCardData = useAlternativeData ? cardDataAlternative : cardDataDefault;
    const currentRevenueCard = useAlternativeData ? revenueCardAlternative : revenueCardDefault;
    const currentPieChartData = useAlternativeData ? pieChartDataAlternative : pieChartDataDefault;
    const currentBarChartValues = useAlternativeData ? barChartValuesAlternative : barChartValuesDefault;
    const currentVendorData = useAlternativeData ? vendorDataAlternative : vendorDataDefault;
    const currentTransactionData = useAlternativeData ? transactionDataAlternative : transactionDataDefault;

    const barChartLabels = ['20', '22', '24', '26', '28', '30', '02', '04', '06', '08', '10', '12', '14', '16'];
    const chartData = {
        labels: barChartLabels,
        datasets: [
            {
                label: 'Daily Revenue',
                data: currentBarChartValues,
                backgroundColor: (context: any) => {
                    const index = context.dataIndex;
                    return index === 6 ? '#4299E1' : '#4FD1C5'; // Blue for 7th bar
                },
                borderWidth: 0,
                borderRadius: 4,
                maxBarThickness: 10,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: number) {
                        if (value === 0) return '₦0';
                        if (value === 100000) return '₦100k';
                        if (value === 200000) return '₦200k';
                        if (value === 300000) return '₦300k';
                        if (value === 400000) return '₦400k';
                        if (value === 500000) return '₦500k';
                        return `₦${value / 1000}k`;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const columns = [
        { header: 'Rank', accessor: 'rank' },
        { header: 'Vendor ID', accessor: 'vendorId' },
        { header: 'Vendor / Delivery Rep Name', accessor: 'name' },
        { header: 'Total Revenue Earned (₦)', accessor: 'totalRevenue' },
        { header: 'Revenue Earned Today (₦)', accessor: 'todayRevenue' },
    ];

    const transactionColumns = [
        { header: 'Transaction ID', accessor: 'transactionId' },
        { header: 'User Name', accessor: 'userName' },
        { header: 'Category', accessor: 'category' },
        { header: 'Status', accessor: 'status' },
        { header: 'Amount (₦)', accessor: 'amount' },
        {
            header: 'Action',
            accessor: 'action',
            render: (row) => (
                <Link to={`/view-order/${row.transactionId}`} className="text-blue-600 underline cursor-pointer">
                    View Order
                </Link>
            )
        },
    ];

    const ordersColumns = [
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Customer Name', accessor: 'customerName' },
        { header: 'Vendor Name', accessor: 'vendorName' },
        { header: 'Rider Name', accessor: 'riderName' },
        { header: 'Service Type', accessor: 'serviceType' },
        {
            header: 'Status', accessor: 'status', render: (row: any) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${
                        row.status === 'Completed'
                            ? 'bg-green-100 text-green-600'
                            : row.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-600'
                                : row.status === 'Disputed'
                                    ? 'bg-orange-100 text-orange-600'
                                    : row.status === 'Canceled'
                                        ? 'bg-red-100 text-red-600'
                                        : ''
                    }`}
                >
                    {row.status}
                </span>
            ),
        },
        { header: 'Payment', accessor: 'payment' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row: any) => (
                <div className="flex items-center text-gray-400">
                    <a href={`/order-management-details/${row.orderId}`} className="mr-2">
                        <FaEdit />
                    </a>
                    <button className="mr-2 hidden md:inline-block" onClick={() => confirmDelete(setOrderCurrentData, 'orderId', row.orderId,"Order")}>
                        <FaTrash />
                    </button>
                    {/* <button>
                        <FaEllipsisH />
                    </button> */}
                </div>
            ),
        },
    ];

    const handleDateChange = (mode: string, startDate: Date | null, endDate: Date | null) => {
        setSelectedDateMode(mode);
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setuseAlternativeData(!useAlternativeData);
        console.log(`Date changed to: Mode: ${mode}, Start: ${startDate?.toLocaleDateString()}, End: ${endDate?.toLocaleDateString()}`);
    };

    const handleFilterChange = (filters: { [key: string]: string[] }) => {
        setActiveFilters(filters);
        console.log('Filters applied:', filters);
    };

    // Filtered orders data based on active filters
  const filteredOrdersData = orderCurrentData.filter(order => {
    let match = true;
    for (const category in activeFilters) {
      const selectedOptions = activeFilters[category];
      if (selectedOptions.length > 0) {
        if (category === 'Order Status' && !selectedOptions.includes(order.status)) match = false;
        if (category === 'Payment Type' && !selectedOptions.includes(order.payment)) match = false;
        if (category === 'Service Type' && !selectedOptions.includes(order.serviceType)) match = false;
      }
    }
    return match;
  });
    

    const handleExportClick = () => {
        
        const exportableColumns = ordersColumns.filter(
            (col: any) => col.header !== 'Actions' && col.accessor
        );

        
        const excelHeaders = exportableColumns.map((col: any) => col.header);
        const dataAccessors = exportableColumns.map((col: any) => col.accessor);
        
        const dataForExport = filteredOrdersData.map((row: any, rowIndex: number) => {
            const newRow: { [key: string]: any } = {};       
            const tempRow = { ...row };        
            if (tempRow.actionUrl !== undefined) {
                delete tempRow.actionUrl;
            }
            if (tempRow.actions !== undefined) { // Remove the 'actions' property from the data row
                delete tempRow.actions;
            }

            
            dataAccessors.forEach((accessor: string, index: number) => {
                let value;
                
                if (typeof accessor === 'function') {
                    value = accessor(tempRow);
                } else {
                    
                    value = tempRow[accessor];
                }
                
        
                newRow[excelHeaders[index]] = (value === null || value === undefined) ? '' : value;
            });
            return newRow;
        });

        
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed (0=Jan, 1=Feb, etc.)
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Formats the timestamp as YYYYMMDD_HHMMSS (e.g., "20231026_143500").
        const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;
        const filename = `Recent_Orders_${timestamp}.xlsx`;

        // Create the Excel worksheet from the prepared data.
        const ws = XLSX.utils.json_to_sheet(dataForExport);
        
        // Create a new Excel workbook.
        const wb = XLSX.utils.book_new();
        
        // Append the worksheet to the workbook, naming the sheet "Recent Orders".
        XLSX.utils.book_append_sheet(wb, ws, "Recent Orders");
        
        // Write the workbook to an .xlsx file with the dynamically generated filename.
        XLSX.writeFile(wb, filename);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header Component */}
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />

            {/* Main Content Area (Sidebar + Main Content) */}
            <div className="flex flex-1">
                {/* Sidebar Component */}
                <Sidebar sidebarCollapsed={sidebarCollapsed} />

                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <PageHeaderWithFilters
                        title="Dashboard Metrics"
                        breadcrumbs={[]}
                        showSearch={false}
                        showDatePicker={true}
                        showDropdown={true}
                        filterCategories={[
                            { name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
                            { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
                            { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] }
                        ]}
                        onDateChange={handleDateChange}
                        onFilterChange={handleFilterChange}
                        onExportClick={handleExportClick}
                    />
                    <StatsCards cards={currentCardData} />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                        {/* Revenue Card Section */}
                        <div className="lg:col-span-1 space-y-8">
                            <StatsCards cards={currentRevenueCard} wrapInGrid={false} />

                            {/* Pie Chart Section */}
                            <div className="bg-white mb-6 rounded-md border border-gray-300 shadow-md p-4 mt-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500">Data Value</span>
                                </div>

                                <div className="text-2xl font-bold mb-2">
                                    {currentRevenueCard[0].value}
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className={`text-sm bg-opacity-10 px-2 py-1 rounded flex items-center
                                        ${currentRevenueCard[0].percentageColor === 'green' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            {currentRevenueCard[0].percentageColor === 'green' ? (
                                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                            ) : (
                                                <path fillRule="evenodd" d="M12 13a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.586l-4.293-4.293a1 1 0 01-1.414 0L8 9.586l-4.293-4.293a1 1 0 01-1.414 1.414l5 5a1 1 0 011.414 0L11 9.414l3.586 3.586H12z" clipRule="evenodd" />
                                            )}
                                        </svg>
                                        {currentRevenueCard[0].percentage}
                                    </span>
                                </div>

                                <div className="flex flex-wrap">
                                    <div className="w-[150px] h-[150px] flex-shrink-0">
                                        <PieChartComponent data={currentPieChartData} />
                                    </div>

                                    <div className="flex flex-col justify-center space-y-3 pl-6 flex-1 min-w-[150px]">
                                        {currentPieChartData.labels.map((label, index) => (
                                            <div key={index} className="flex justify-between items-center flex-wrap">
                                                <div className="flex items-center">
                                                    <span
                                                        className="w-3 h-3 rounded-full mr-2"
                                                        style={{ backgroundColor: currentPieChartData.colors[index] }}
                                                    ></span>
                                                    <span className="text-xs text-gray-400">{label}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 break-words max-w-[100px] text-right">36,638,465.14</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Bar Chart Section */}
                        <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <span className="text-gray-600">Revenue Overview</span>
                                </div>
                                <i className="fas fa-info-circle cursor-pointer text-gray-400"></i>
                            </div>

                            <BarChartComponent chartData={chartData} chartOptions={chartOptions} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                        <div className="lg:col-span-1 space-y-8">
                            <StatsCards cards={currentComplaintsCards} wrapInGrid={false} />
                        </div>
                        <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                            <ReusableTable
                                title="Top Five (5) Vendors on platform"
                                columns={columns}
                                data={currentVendorData}
                                rowsPerPage={5}
                                showPagination={false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                        <div className="lg:col-span-1 space-y-8">
                            <StatsCards cards={currentDashboardCards} wrapInGrid={false} />
                        </div>
                        <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                            <ReusableTable
                                title="Top Five (5) Recent Withdrawals"
                                columns={transactionColumns}
                                data={currentTransactionData}
                                rowsPerPage={5}
                                showPagination={false}
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6 ">
                        <ReusableTable
                            title="Recent Orders"
                            icon={<FaShoppingCart className="text-gray-400 mr-2" />}
                            columns={ordersColumns}
                            data={filteredOrdersData} // Use filtered data here
                            rowsPerPage={10}
                        />
                    </div>

                </main>

            </div>
        </div>
    );
};

export default Dashboard;