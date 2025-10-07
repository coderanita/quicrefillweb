import React, { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter, faDownload, faUser, faMotorcycle, faClipboard, faInfoCircle,
    faSackDollar, faComments, faMoneyBillTransfer, faBuilding, faSquareCaretDown,
    faShoppingBag, faChevronDown,faChevronLeft, faChevronRight, faEdit, faTrash, faEllipsisH, faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons'; // For regular calendar icon if needed
import { Link } from 'react-router-dom'; // Assuming you'll use Link for profile/logout

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


const MainContent = () => {
    // State for Date Filter
    const [datePickerMode, setDatePickerMode] = useState('today');
    const [datePickerValue, setDatePickerValue] = useState('');
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const datePickerRef = useRef(null);

    // State for Filter Dropdown
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [selectedFilterType, setSelectedFilterType] = useState(''); // 'Order Status', 'Payment Type', 'Service Type'
    const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
    const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
    const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    // Flatpickr initialization
    useEffect(() => {
        const dp = datePickerRef.current;
        if (dp) {
            let config = {
                dateFormat: "d M, Y",
                onChange: function (selectedDates, dateStr) {
                    setDatePickerValue(dateStr);
                }
            };

            if (datePickerMode === "today") {
                const today = new Date();
                setDatePickerValue(today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }));
                flatpickr(dp, config); // Initialize without opening
            } else if (datePickerMode === "Specific Date") {
                flatpickr(dp, config).open();
            } else if (datePickerMode === "monthly") {
                config = {
                    mode: "range",
                    dateFormat: "d M",
                    onChange: function (selectedDates, dateStr) {
                        if (selectedDates.length === 2) {
                            let start = selectedDates[0].toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                            let end = selectedDates[1].toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                            setDatePickerValue(`${start} - ${end}`);
                        }
                    }
                };
                flatpickr(dp, config).open();
            }
        }
    }, [datePickerMode]); // Re-run when mode changes

    const handleSetDateMode = (mode) => {
        setDatePickerMode(mode);
        setDateDropdownOpen(false);
    };

    const handleFilterTypeSelect = (type) => {
        setSelectedFilterType(type);
        setOrderDropdownOpen(type === 'Order Status');
        setPaymentDropdownOpen(type === 'Payment Type');
        setServiceDropdownOpen(type === 'Service Type');
    };

    const toggleSelection = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(s => s !== item));
        } else {
            setList([...list, item]);
        }
    };

    // Chart Data (Example data, replace with actual fetched data)
    const pieChartData = {
        labels: ['Petroleum', 'Cooking gas', 'Diesel', 'Electricity'],
        datasets: [{
            data: [40, 20, 25, 15],
            backgroundColor: [
                '#4FD1C5', // teal
                '#F6E05E', // yellow
                '#F56565', // red
                '#4299E1'  // blue
            ],
            borderWidth: 0
        }]
    };

    const barChartData = {
        labels: ['20', '22', '24', '26', '28', '30', '02', '04', '06', '08', '10', '12', '14', '16'],
        datasets: [{
            label: 'Daily Revenue',
            data: [250000, 350000, 200000, 280000, 220000, 180000, 500000, 320000, 450000, 280000, 220000, 380000, 200000, 350000],
            backgroundColor: (context) => {
                const index = context.dataIndex;
                return index === 6 ? '#4299E1' : '#4FD1C5'; // Blue for day 7, teal for others
            },
            borderWidth: 0,
            borderRadius: 4,
            maxBarThickness: 10
        }]
    };

    const barChartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        if (value === 0) return '₦0';
                        if (value === 100000) return '₦100k';
                        if (value === 200000) return '₦200k';
                        if (value === 300000) return '₦300k';
                        if (value === 400000) return '₦400k';
                        if (value === 500000) return '₦500k';
                        return `₦${value / 1000}k`; // Fallback for other values
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };


    // Sample data for tables (replace with actual data from API)
    const topVendors = [
        { rank: 1, id: 'VND-1001', name: 'Supreme Gas Ltd', totalRevenue: '2,400,000', todayRevenue: '800,000' },
        { rank: 2, id: 'VND-1002', name: 'Fast Diesel Co.', totalRevenue: '2,100,000', todayRevenue: '650,000' },
        { rank: 3, id: 'VND-1003', name: 'Mega Gas Nigeria', totalRevenue: '1,800,000', todayRevenue: '500,000' },
        { rank: 4, id: 'VND-1004', name: 'PetroSwift', totalRevenue: '1,500,000', todayRevenue: '480,000' },
        { rank: 5, id: 'VND-1005', name: 'Elite Energy', totalRevenue: '1,200,000', todayRevenue: '330,000' },
    ];

    const recentWithdrawals = [
        { id: '#WTHI01', user: 'John Doe', category: '2,400,000', status: 'Completed', amount: '800,000' },
        { id: '#WTHI02', user: 'Salami Ahmed', category: '2,100,000', status: 'Pending', amount: '650,000' },
        { id: '#WTHI03', user: 'Cynthia Micheal', category: '1,800,000', status: 'Completed', amount: '500,000' },
        { id: '#WTHI04', user: 'Chinedu Kalu', category: '1,500,000', status: 'Completed', amount: '480,000' },
        { id: '#WTHI05', user: 'Priscillia Madu', category: '1,200,000', status: 'Canceled', amount: '330,000' },
    ];

    const recentOrders = [
        { id: '#ORD1001', customer: 'John Doe', vendor: 'Elite Gas Hub', rider: 'James Okoro', service: 'Gas Refill', status: 'In Progress', payment: 'On delivery', amount: '₦12,500', date: '25/01/27 10:15 AM' },
        { id: '#ORD1002', customer: 'Mary Johnson', vendor: 'Fixit Plumbers', rider: 'Ahmed Bello', service: 'Petroleum', status: 'Completed', payment: 'Wallet', amount: '₦75,000', date: '25/01/27 02:45 PM' },
        { id: '#ORD1003', customer: 'Charles Uche', vendor: 'PowerPlus Ltd.', rider: '-', service: 'Gas Refill', status: 'Disputed', payment: 'Flatterwave', amount: '₦8,500', date: '25/01/27 09:30 AM' },
        { id: '#ORD1004', customer: 'Charles Uche', vendor: 'PowerPlus Ltd.', rider: 'David M.', service: 'Diesel', status: 'Canceled', payment: 'Flatterwave', amount: '₦10,000', date: '25/01/26 11:10 AM' },
        { id: '#ORD1005', customer: 'David Hassan', vendor: 'TechGears Ltd.', rider: '-', service: 'Accessories', status: 'Completed', payment: 'Wallet', amount: '₦6,900', date: '25/01/24 04:20 PM' },
        { id: '#ORD1006', customer: 'Esther John', vendor: 'GreenGas Ltd.', rider: 'Sola A.', service: 'Gas Refill', status: 'Completed', payment: 'On delivery', amount: '₦30,000', date: '25/01/26 11:20 AM' },
        { id: '#ORD1007', customer: 'Emmanuel Obi', vendor: 'PetroHub Ltd.', rider: 'Tunde A.', service: 'Petroleum', status: 'In Progress', payment: 'Transfer', amount: '₦50,000', date: '25/01/27 12:50 PM' },
        { id: '#ORD1008', customer: 'Grace Nwosu', vendor: 'PetroHub Ltd.', rider: '-', service: 'Electricity', status: 'In Progress', payment: 'Flatterwave', amount: '₦10,500', date: '25/01/27 12:50 PM' },
        { id: '#ORD1009', customer: 'John Ekpo', vendor: 'FuelSure Ltd.', rider: 'David M.', service: 'Diesel', status: 'Canceled', payment: 'On delivery', amount: '₦28,000', date: '25/01/24 06:45 PM' },
        { id: '#ORD1010', customer: 'Hannah Danjuma', vendor: 'TechGears Ltd.', rider: '-', service: 'Accessories', status: 'Completed', payment: 'Wallet', amount: '₦8,200', date: '25/01/25 05:30 PM' },
        { id: '#ORD1011', customer: 'Abdul Yusuf', vendor: 'GreenGas Ltd.', rider: 'Sola A.', service: 'Gas Refill', status: 'Completed', payment: 'Wallet', amount: '₦22,000', date: '25/01/27 04:50 PM' },
    ];


    return (
        <main className="flex-1 p-4 md:p-6 overflow-hidden">
         

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 z-10">
                {/* Total Users Card */}
                <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 relative">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-gray-600 text-xs" />
                            </div>
                            <span className="text-gray-600 ml-2">Total Users</span>
                        </div>
                        <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                    </div>
                    <div className="flex items-center mb-1">
                        <div className="text-3xl font-bold mb-2">5,246</div>
                        <span className="bg-green-100 text-green-600 ml-2 pl-1 pr-1 border border-green-300 rounded-xl text-xs font-semibold flex items-center">
                            20.4%
                            <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Active Users: <span className="font-semibold">3,187</span>
                        <span className="text-gray-400 ml-2 pl-1 pr-1 border border-gray-300 rounded-xl text-xs font-semibold">
                            61% of Total Users
                        </span>
                    </div>
                </div>

                {/* Total Riders Card */}
                <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 relative">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                <FontAwesomeIcon icon={faMotorcycle} className="text-gray-600 text-xs" />
                            </div>
                            <span className="text-gray-600 ml-2">Total Riders</span>
                        </div>
                        <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                    </div>
                    <div className="flex items-center mb-1">
                        <div className="text-3xl font-bold mb-2">3,140</div>
                        <span className="bg-red-100 text-red-500 ml-2 pl-1 pr-1 border border-red-300 rounded-xl text-xs font-semibold flex items-center gap-1">
                            10.3%
                            <svg className="w-5 h-5 text-red-500 mb-1 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20H4m0 0v-6m0 6L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Active Riders: <span className="font-semibold">2,901</span>
                        <span className="text-gray-400 ml-2 pl-1 pr-1 border border-gray-300 rounded-xl text-xs font-semibold">
                            83% of Total Users
                        </span>
                    </div>
                </div>

                {/* Completed Services Card */}
                <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 relative">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                <FontAwesomeIcon icon={faClipboard} className="text-gray-600 text-xs" />
                            </div>
                            <span className="text-gray-600 ml-2">Completed Services</span>
                        </div>
                        <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                    </div>
                    <div className="flex items-center mb-1">
                        <div className="text-3xl font-bold mb-2">8,412</div>
                        <span className="bg-green-100 text-green-600 ml-2 pl-1 pr-1 border border-green-300 rounded-xl text-xs font-semibold flex items-center">
                            20.3%
                            <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Active Riders: <span className="font-semibold">2,901</span>
                        <span className="text-gray-400 ml-2 pl-1 pr-1 border border-gray-300 rounded-xl text-xs font-semibold">
                            83% of Total Users
                        </span>
                    </div>
                </div>

                {/* Customer Satisfaction Card */}
                <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 relative">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                            <span className="text-gray-600">Customer Satisfaction Rating</span>
                        </div>
                        <div className="ml-2 h-5 bg-gray-200 p-1 rounded-md flex items-center justify-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-600 text-xs" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-2">89%</div>
                </div>
            </div>

            {/* Revenue and Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Revenue Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faSackDollar} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Revenue</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">₦2,356,000</div>
                            <span className="bg-green-100 text-green-600 ml-2 pl-1 pr-1 border border-green-300 rounded-xl text-xs font-semibold flex items-center">
                                8.40%
                                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>
                    <div className="bg-white mb-6 rounded-md border border-gray-300 shadow-md p-4 mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">Data Value</span>
                        </div>
                        <div className="text-2xl font-bold mb-2">₦2,356,000</div>
                        <div className="flex items-center mb-4">
                            <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                                8.40%
                            </span>
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                            </div>
                            <div className="w-1/2 flex flex-col justify-center space-y-3 pl-6">
                                <div className="items-center">
                                    <div className="flex">
                                        <span className="w-3 h-3 rounded-full bg-teal-400 mr-2"></span>
                                        <span className="text-xs text-gray-400">Petroleum</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto">36,638,465.14</span>
                                </div>
                                <div className="items-center">
                                    <div className="flex">
                                        <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                                        <span className="text-xs text-gray-400">Cooking gas</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto">36,638,465.14</span>
                                </div>
                                <div className="items-center">
                                    <div className="flex">
                                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                        <span className="text-xs text-gray-400">Diesel</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto">36,638,465.14</span>
                                </div>
                                <div className="items-center">
                                    <div className="flex">
                                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                        <span className="text-xs text-gray-400">Electricity</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto">36,638,465.14</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bar Chart Section */}
                <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <span className="text-gray-600"></span>
                        </div>
                        <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                    </div>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>

            {/* Other Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Number of Complaints Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faComments} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Number of Complaints</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">100</div>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>

                    {/* Total Amount Withdrawn Card */}
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Total Amount Withdrawn</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">₦1,406,000</div>
                            <span className="bg-green-100 text-green-600 ml-2 pl-1 pr-1 border border-green-300 rounded-xl text-xs font-semibold flex items-center">
                                4.10%
                                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>

                    {/* Number of Cities in Operation Card */}
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Number of Cities in Operation</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">20</div>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>
                </div>

                {/* Top Five Vendors Table */}
                <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                    <div className="flex items-center mb-4">
                        <span className="text-gray-600 font-medium">Top Five(5) Vendors on platform</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full pl-4">
                            <thead className="text-gray-400 bg-gray-100 pl-2">
                                <tr className="text-left text-xs">
                                    <th className="pb-3 font-medium">Rank</th>
                                    <th className="pb-3 font-medium">Vendor ID</th>
                                    <th className="pb-3 font-medium">Vendor / Delivery Rep Name</th>
                                    <th className="pb-3 font-medium">Total Revenue Earned(₦)</th>
                                    <th className="pb-3 font-medium">Revenue Earned Today(₦)</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {topVendors.map((vendor, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-3 text-gray-800">{vendor.rank}</td>
                                        <td className="py-3 text-gray-800">{vendor.id}</td>
                                        <td className="py-3 text-gray-800">{vendor.name}</td>
                                        <td className="py-3 text-gray-800">{vendor.totalRevenue}</td>
                                        <td className="py-3 text-gray-800">{vendor.todayRevenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* More Stats Cards (App Installation, Complaints, Active Services) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faSquareCaretDown} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Number of App Installation</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">10,000</div>
                            <span className="bg-red-100 text-red-500 ml-2 pl-1 pr-1 border border-red-300 rounded-xl text-xs font-semibold flex items-center gap-1">
                                8.3%
                                <svg className="w-5 h-5 text-red-500 mb-1 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 20H4m0 0v-6m0 6L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Number of Complaints</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">403</div>
                        </div>
                        <div className="text-sm text-gray-500">Last 7 Days</div>
                    </div>

                    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-600 text-xs" />
                                </div>
                                <span className="text-gray-600 ml-2">Total active services</span>
                            </div>
                            <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer text-gray-400" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-2xl font-bold mb-2">20</div>
                        </div>
                        <div><span className="text-sm text-gray-700">365 Orders:</span>&nbsp;<span className="text-sm text-gray-500">Last 7 Days</span></div>
                    </div>
                </div>

                {/* Top Five Recent Withdrawals Table */}
                <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 shadow-md p-4">
                    <div className="flex items-center mb-4">
                        <span className="text-gray-600 font-medium">Top Five (5) Recent Withdrawals</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="text-gray-400 bg-gray-100">
                                <tr className="text-left text-xs">
                                    <th className="py-3 px-4 font-medium">Transaction ID</th>
                                    <th className="py-3 px-4 font-medium">User Name</th>
                                    <th className="py-3 px-4 font-medium">Category</th>
                                    <th className="py-3 px-4 font-medium">Status</th>
                                    <th className="py-3 px-4 font-medium">Amount (₦)</th>
                                    <th className="py-3 px-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {recentWithdrawals.map((withdrawal, index) => (
                                    <tr key={index} className="border-t border-gray-100">
                                        <td className="py-3 px-4 text-gray-800">{withdrawal.id}</td>
                                        <td className="py-3 px-4 text-gray-800">{withdrawal.user}</td>
                                        <td className="py-3 px-4 text-gray-800">{withdrawal.category}</td>
                                        <td className={`py-3 px-4 ${withdrawal.status === 'Completed' ? 'text-green-600' : withdrawal.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{withdrawal.status}</td>
                                        <td className="py-3 px-4 text-gray-800">{withdrawal.amount}</td>
                                        <td className="py-3 px-4 text-blue-600 underline cursor-pointer">View Order</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
                <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400 mr-2" />
                    <span className="text-gray-600 font-medium">Recent Orders</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="text-gray-400 bg-gray-100">
                            <tr className="text-left text-xs">
                                <th className="p-3 font-medium">Order ID</th>
                                <th className="p-3 font-medium">Customer Name</th>
                                <th className="p-3 font-medium">Vendor Name</th>
                                <th className="p-3 font-medium">Rider Name</th>
                                <th className="p-3 font-medium">Service Type</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Payment</th>
                                <th className="p-3 font-medium">Amount</th>
                                <th className="p-3 font-medium">Date</th>
                                <th className="p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="border-t border-gray-100">
                                    <td className="p-3 text-gray-800">{order.id}</td>
                                    <td className="p-3 text-gray-800">{order.customer}</td>
                                    <td className="p-3 text-gray-800">{order.vendor}</td>
                                    <td className="p-3 text-gray-800">{order.rider}</td>
                                    <td className="p-3 text-gray-800">{order.service}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                                                order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                    order.status === 'Disputed' ? 'bg-orange-100 text-orange-600' :
                                                        order.status === 'Canceled' ? 'bg-red-100 text-red-600' : ''
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-gray-800">{order.payment}</td>
                                    <td className="p-3 text-gray-800">{order.amount}</td>
                                    <td className="p-3 text-gray-800">{order.date}</td>
                                    <td className="p-3 text-gray-400 flex items-center">
                                        <Link to="/order-management-details" className="mr-2"><FontAwesomeIcon icon={faEdit} /></Link>
                                        <button className="mr-2 hidden md:inline-block"><FontAwesomeIcon icon={faTrash} /></button>
                                        <button><FontAwesomeIcon icon={faEllipsisH} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 p-4 border-t">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Total entries: <span className="font-bold">200</span></span>
                        <button className="px-3 py-1 text-gray-400 flex items-center space-x-1" disabled>
                            <FontAwesomeIcon icon={faChevronLeft} /> <span>Previous</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-yellow-500 text-white font-bold rounded-full">1</button>
                        <span className="text-gray-700">2</span>
                        <span className="text-gray-700">3</span>
                        <span className="text-gray-500">..</span>
                        <span className="text-gray-700">8</span>
                        <span className="text-gray-700">9</span>
                        <span className="text-gray-700">10</span>
                    </div>

                    <button className="px-3 py-1 text-gray-500 flex items-center space-x-1 hover:text-gray-700">
                        <span>Next</span> <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default MainContent;