import {
  FaEdit,
  FaTrash,
  FaEllipsisV,
} from 'react-icons/fa';
import {confirmDelete} from "../components/Includes/SweetAlert2";
const numberCardsData = [
  {
    title: 'Total Orders',
    description: 'All orders placed on the platform',
    value: '5,246',
    color: 'bg-blue-500',
  },
  {
    title: 'Orders in Process',
    description: 'Orders currently being handled by riders',
    value: '1,262',
    color: 'bg-yellow-500',
  },
  {
    title: 'Completed Orders',
    description: 'Successfully fulfilled orders',
    value: '1,812',
    color: 'bg-green-500',
  },
  {
    title: 'Canceled Orders',
    description: 'Successfully fulfilled orders',
    value: '942',
    color: 'bg-red-500',
  },
  {
    title: 'Disputes Raised',
    description: 'Orders currently under review',
    value: '1,230',
    color: 'bg-yellow-400',
  },
];

export default numberCardsData;
export const AccesorynumberCardsData = [
  {
    title: 'Total Accessories 📦',
    description: 'All available accessories',
    value: '50',
    color: 'bg-blue-500',
  },
  {
    title: 'Low In-stock ⏳',
    description: 'Accessories that need restocking',
    value: '10',
    color: 'bg-yellow-500',
  },
  {
    title: 'Discontinued ❌',
    description: 'Accessories no longer available',
    value: '14',
    color: 'bg-green-500',
  }
  
];

export const tabs = ['Orders', 'Accessories'];

export const actionsByTab = {
  Orders: [],
  Accessories: [{ label: 'Manage All', route: '/order-management-manage-accessories' }],
};

export const columns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer Name' },
  { key: 'vendorName', label: 'Vendor Name' },
  { key: 'riderName', label: 'Rider Name' },
  { key: 'accessories', label: 'Accessories' },
  {
    key: 'status',
    label: 'Status',
    render: (value, row) => (
      <span className={`font-semibold ${row.statusColor}`}>{value}</span>
    ),
  },
  { key: 'payment', label: 'Payment' },
  { key: 'amount', label: 'Amount' },
  { key: 'date', label: 'Date' },
  {
    key: 'detailsUrl',
    label: 'Actions',
    render: (_,row,  setFilteredData)  => (
      <div className="flex space-x-2">
        <a href={row.detailsUrl+"/"+row.orderId} className="text-gray-500 hover:text-orange-500">
           <FaEdit />
        </a>
        <button className="text-gray-500 hover:text-red-500"  onClick={() => confirmDelete(setFilteredData, 'orderId', row.orderId,"Order")}>
           <FaTrash />
        </button>
        {/* <a href="" className="text-gray-500 hover:text-gray-700">
           <FaEllipsisV />
        </a> */}
      </div>
    ),
  },
];


export const tableData = [
  {
    orderId: 'ORD1001',
    customerName: 'John Doe',
    vendorName: 'Elite Gas Hub',
    riderName: 'James Okoro',
    accessories: 'Fire extinguisher',
    status: 'In Progress',
    statusColor: 'text-yellow-500',
    payment: 'On delivery',
    amount: '12,500',
    date: '25/01/27 10:15 AM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1002',
    customerName: 'Mary Johnson',
    vendorName: 'FixIt Plumbers',
    riderName: 'Ahmed Bello',
    accessories: 'Gas masks',
    status: 'Completed',
    statusColor: 'text-green-500',
    payment: 'Wallet',
    amount: 75000,
    date: '25/01/27 02:45 PM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1003',
    customerName: 'Charles Uche',
    vendorName: 'PowerPlus Ltd.',
    riderName: '-',
    accessories: 'Gas hoses',
    status: 'In Progress',
    statusColor: 'text-yellow-500',
    payment: 'Flatterwave',
    amount: '8,500',
    date: '25/01/27 09:30 AM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1004',
    customerName: 'Charles Uche',
    vendorName: 'PowerPlus Ltd.',
    riderName: 'David M.',
    accessories: 'Safety goggles',
    status: 'Canceled',
    statusColor: 'text-red-500',
    payment: 'Flatterwave',
    amount: '10,000',
    date: '25/01/26 11:10 AM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1005',
    customerName: 'David Hassan',
    vendorName: 'TechGears Ltd.',
    riderName: '-',
    accessories: 'Gas masks',
    status: 'Completed',
    statusColor: 'text-green-500',
    payment: 'Wallet',
    amount: '6,900',
    date: '25/01/24 04:20 PM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1006',
    customerName: 'Esther John',
    vendorName: 'GreenGas Ltd.',
    riderName: 'Sola A.',
    accessories: 'Gas masks',
    status: 'Completed',
    statusColor: 'text-green-500',
    payment: 'On delivery',
    amount: '30,000',
    date: '25/01/26 11:20 AM',
    detailsUrl: '/order-management-details',
  },
  {
    orderId: 'ORD1007',
    customerName: 'Emmanuel Obi',
    vendorName: 'PetroHub Ltd.',
    riderName: 'Tunde A.',
    accessories: 'Safety goggles',
    status: 'In Progress',
    statusColor: 'text-yellow-500',
    payment: 'Transfer',
    amount: '50,000',
    date: '25/01/27 12:50 PM',
    detailsUrl: '/order-management-details',
  },
];
export const tabletabs = ['All', 'Pending', 'In Progress', 'Completed', 'Disputed'];

export const ACcolumns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer Name' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'address', label: 'Address' },
  { key: 'serviceType', label: 'Service Type' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => {
      let statusColor = 'text-gray-700';
      switch (value) {
        case 'Processing':
        case 'Out for delivery':
          statusColor = 'text-yellow-500';
          break;
        case 'Paid':
        case 'Order received':
          statusColor = 'text-green-500';
          break;
        case 'Out of stock':
          statusColor = 'text-red-500';
          break;
        default:
          break;
      }
      return <span className={`font-semibold ${statusColor}`}>{value}</span>;
    },
  },
  { key: 'payment', label: 'Payment' },
  { key: 'amount', label: 'Amount' },
  { key: 'date', label: 'Date' },
  {
    key: 'actions',
    label: 'Actions',
      render: (_,row,  setFilteredData)  => (
      <div className="flex space-x-2">
        <a href={"/order-management-accesories-details/"+row.orderId} className="text-gray-500 hover:text-orange-500">
           <FaEdit />
        </a>
        <button className="text-gray-500 hover:text-red-500"  onClick={() => confirmDelete(setFilteredData, 'orderId', row.orderId,"Accesory")}>
           <FaTrash />
        </button>
        {/* <a href="" className="text-gray-500 hover:text-gray-700">
           <FaEllipsisV />
        </a> */}
      </div>
    ),
  },
];

export const ACtableData = [
  {
    orderId: 'ORD1001',
    customerName: 'John Doe',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Processing',
    payment: 'On delivery',
    amount: '12,500',
    date: '25/01/27 10:15 AM',
    
  },
  {
    orderId: 'ORD1002',
    customerName: 'Mary Johnson',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Paid',
    payment: 'Wallet',
    amount: '12,500',
    date: '25/01/27 02:45 PM',
  },
  {
    orderId: 'ORD1003',
    customerName: 'Charles Uche',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Out for delivery',
    payment: 'Flutterwave',
    amount: '12,500',
    date: '25/01/27 09:30 AM',
  },
  {
    orderId: 'ORD1004',
    customerName: 'Charles Uche',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Out of stock',
    payment: 'Flutterwave',
    amount: '12,500',
    date: '25/01/26 11:10 AM',
  },
  {
    orderId: 'ORD1005',
    customerName: 'David Hassan',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Order received',
    payment: 'Wallet',
    amount: '12,500',
    date: '25/01/24 04:20 PM',
  },
  {
    orderId: 'ORD1006',
    customerName: 'Esther John',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Paid',
    payment: 'On delivery',
    amount: '12,500',
    date: '25/01/26 11:20 AM',
  },
  {
    orderId: 'ORD1007',
    customerName: 'Emmanuel Obi',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Out for delivery',
    payment: 'Transfer',
    amount: '12,500',
    date: '25/01/27 12:50 PM',
  },
  {
    orderId: 'ORD1008',
    customerName: 'Grace Nwosu',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Processing',
    payment: 'Flutterwave',
    amount: '12,500',
    date: '25/01/27 12:50 PM',
  },
  {
    orderId: 'ORD1009',
    customerName: 'John Ekpo',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Out of stock',
    payment: 'On delivery',
    amount: '12,500',
    date: '25/01/24 06:45 PM',
  },
  {
    orderId: 'ORD1010',
    customerName: 'Hannah Danjuma',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Out for delivery',
    payment: 'Wallet',
    amount: '12,500',
    date: '25/01/25 05:30 PM',
  },
  {
    orderId: 'ORD1011',
    customerName: 'Abdul Yusuf',
    phoneNumber: '090123456789',
    address: 'Third mainland...',
    serviceType: 'Accessories',
    status: 'Processing',
    payment: 'Wallet',
    amount: '12,500',
    date: '25/01/27 04:50 PM',
  },
];

export const allOrderDetails = [
  {
    "id": "ORD1001",
    "customerName": "John Doe",
    "vendorName": "Elite Gas Hub",
    "riderName": "James Okoro",
    "location": "45 Lagos Road, Lekki, Lagos",
    "item": {
      "name": "Fire extinguisher",
      "quantity": "1 unit",
      "price": 10500
    },
    "serviceFee": 2000,
    "totalFee": 12500,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "On delivery",
    "riderStatus": "en route",
    "statusTimeline": [
      { "status": "In progress", "time": null, "completed": false },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD1002",
    "customerName": "Mary Johnson",
    "vendorName": "FixIt Plumbers",
    "riderName": "Ahmed Bello",
    "location": "Third mainland avenue, Ikeja, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "5 units",
      "price": 72000
    },
    "serviceFee": 3000,
    "totalFee": 75000,
    "paymentStatus": "Paid",
    "couponCode": "#SUMMER 2025",
    "paymentMethod": "Wallet",
    "riderStatus": "arrived",
    "statusTimeline": [
      { "status": "In progress", "time": "02:45 PM", "completed": true },
      { "status": "Completed", "time": "03:30 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD1003",
    "customerName": "Charles Uche",
    "vendorName": "PowerPlus Ltd.",
    "riderName": "-",
    "location": "22 Victoria Island Drive, Victoria Island, Lagos",
    "item": {
      "name": "Gas hoses",
      "quantity": "3 units",
      "price": 7000
    },
    "serviceFee": 1500,
    "totalFee": 8500,
    "paymentStatus": "Paid",
    "couponCode": "#SPRING2025",
    "paymentMethod": "Flatterwave",
    "riderStatus": "unassigned",
    "statusTimeline": [
      { "status": "In progress", "time": "09:30 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD1004",
    "customerName": "Charles Uche",
    "vendorName": "PowerPlus Ltd.",
    "riderName": "David M.",
    "location": "15 Apapa Avenue, Apapa, Lagos",
    "item": {
      "name": "Safety goggles",
      "quantity": "2 units",
      "price": 9000
    },
    "serviceFee": 1000,
    "totalFee": 10000,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "Flatterwave",
    "riderStatus": "cancelled",
    "statusTimeline": [
      { "status": "In progress", "time": "11:10 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": "11:30 AM", "completed": true }
    ]
  },
  {
    "id": "ORD1005",
    "customerName": "David Hassan",
    "vendorName": "TechGears Ltd.",
    "riderName": "-",
    "location": "9 Surulere Street, Surulere, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "1 unit",
      "price": 6000
    },
    "serviceFee": 900,
    "totalFee": 6900,
    "paymentStatus": "Paid",
    "couponCode": null,
    "paymentMethod": "Wallet",
    "riderStatus": "unassigned",
    "statusTimeline": [
      { "status": "In progress", "time": "04:20 PM", "completed": true },
      { "status": "Completed", "time": "05:00 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD1006",
    "customerName": "Esther John",
    "vendorName": "GreenGas Ltd.",
    "riderName": "Sola A.",
    "location": "5 Festac Boulevard, Festac, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "2 units",
      "price": 28000
    },
    "serviceFee": 2000,
    "totalFee": 30000,
    "paymentStatus": "Unpaid",
    "couponCode": "#GASBONANZA",
    "paymentMethod": "On delivery",
    "riderStatus": "arrived",
    "statusTimeline": [
      { "status": "In progress", "time": "11:20 AM", "completed": true },
      { "status": "Completed", "time": "12:00 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD1007",
    "customerName": "Emmanuel Obi",
    "vendorName": "PetroHub Ltd.",
    "riderName": "Tunde A.",
    "location": "33 Eko Drive, Lekki, Lagos",
    "item": {
      "name": "Safety goggles",
      "quantity": "4 units",
      "price": 45000
    },
    "serviceFee": 5000,
    "totalFee": 50000,
    "paymentStatus": "Paid",
    "couponCode": null,
    "paymentMethod": "Transfer",
    "riderStatus": "en route",
    "statusTimeline": [
      { "status": "In progress", "time": "12:50 PM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2001",
    "customerName": "Grace Adebayo",
    "vendorName": "SafetyFirst Gear",
    "riderName": "Chris N.",
    "location": "10 Ikoyi Crescent, Ikoyi, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "3 units",
      "price": 40000
    },
    "serviceFee": 2500,
    "totalFee": 42500,
    "paymentStatus": "Paid",
    "couponCode": "#SAFETYFEB",
    "paymentMethod": "Wallet",
    "riderStatus": "delivered",
    "statusTimeline": [
      { "status": "In progress", "time": "08:00 AM", "completed": true },
      { "status": "Completed", "time": "09:15 AM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2002",
    "customerName": "Segun Olaleye",
    "vendorName": "Lagos Gas Solutions",
    "riderName": "-",
    "location": "7 Marina Road, CMS, Lagos",
    "item": {
      "name": "Fire extinguisher",
      "quantity": "2 units",
      "price": 21000
    },
    "serviceFee": 2000,
    "totalFee": 23000,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "On delivery",
    "riderStatus": "unassigned",
    "statusTimeline": [
      { "status": "In progress", "time": "10:30 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2003",
    "customerName": "Funke Williams",
    "vendorName": "GasPro Innovations",
    "riderName": "Emeka O.",
    "location": "12 Badagry Expressway, Ojo, Lagos",
    "item": {
      "name": "Gas hoses",
      "quantity": "5 units",
      "price": 12000
    },
    "serviceFee": 1800,
    "totalFee": 13800,
    "paymentStatus": "Paid",
    "couponCode": "#PROMOAPR",
    "paymentMethod": "Transfer",
    "riderStatus": "en route",
    "statusTimeline": [
      { "status": "In progress", "time": "01:00 PM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2004",
    "customerName": "Kunle Adeoye",
    "vendorName": "Secure Safety Supply",
    "riderName": "Grace I.",
    "location": "20 Abeokuta Street, Ebute Metta, Lagos",
    "item": {
      "name": "Safety goggles",
      "quantity": "1 unit",
      "price": 5500
    },
    "serviceFee": 800,
    "totalFee": 6300,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "On delivery",
    "riderStatus": "arrived",
    "statusTimeline": [
      { "status": "In progress", "time": "03:40 PM", "completed": true },
      { "status": "Completed", "time": "04:20 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2005",
    "customerName": "Adaeze Okoro",
    "vendorName": "GasMasters Nigeria",
    "riderName": "-",
    "location": "8 Bourdillon Road, Ikoyi, Lagos",
    "item": {
      "name": "Fire extinguisher",
      "quantity": "1 unit",
      "price": 11000
    },
    "serviceFee": 2000,
    "totalFee": 13000,
    "paymentStatus": "Paid",
    "couponCode": null,
    "paymentMethod": "Wallet",
    "riderStatus": "unassigned",
    "statusTimeline": [
      { "status": "In progress", "time": "09:00 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2006",
    "customerName": "Chukwuma Eze",
    "vendorName": "Pipeline Solutions",
    "riderName": "James Okoro",
    "location": "14 Agege Motor Road, Mushin, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "2 units",
      "price": 29000
    },
    "serviceFee": 2500,
    "totalFee": 31500,
    "paymentStatus": "Unpaid",
    "couponCode": "#LAGOSDEALS",
    "paymentMethod": "On delivery",
    "riderStatus": "en route",
    "statusTimeline": [
      { "status": "In progress", "time": "11:50 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2007",
    "customerName": "Bola Ahmed",
    "vendorName": "Prime Gas Co.",
    "riderName": "Ahmed Bello",
    "location": "3 Makoko Waterfront, Yaba, Lagos",
    "item": {
      "name": "Gas hoses",
      "quantity": "4 units",
      "price": 9500
    },
    "serviceFee": 1600,
    "totalFee": 11100,
    "paymentStatus": "Paid",
    "couponCode": null,
    "paymentMethod": "Flatterwave",
    "riderStatus": "delivered",
    "statusTimeline": [
      { "status": "In progress", "time": "02:10 PM", "completed": true },
      { "status": "Completed", "time": "03:00 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2008",
    "customerName": "Nkechi Obi",
    "vendorName": "QuickFix Supplies",
    "riderName": "Tunde A.",
    "location": "27 Ogudu Road, Ogudu, Lagos",
    "item": {
      "name": "Safety goggles",
      "quantity": "3 units",
      "price": 18000
    },
    "serviceFee": 1200,
    "totalFee": 19200,
    "paymentStatus": "Paid",
    "couponCode": "#SAFETYFIRST",
    "paymentMethod": "Wallet",
    "riderStatus": "arrived",
    "statusTimeline": [
      { "status": "In progress", "time": "10:15 AM", "completed": true },
      { "status": "Completed", "time": "11:00 AM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2009",
    "customerName": "Oluwafemi D.",
    "vendorName": "MegaGas Ventures",
    "riderName": "-",
    "location": "6 Maryland Crescent, Maryland, Lagos",
    "item": {
      "name": "Fire extinguisher",
      "quantity": "1 unit",
      "price": 10800
    },
    "serviceFee": 1900,
    "totalFee": 12700,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "On delivery",
    "riderStatus": "unassigned",
    "statusTimeline": [
      { "status": "In progress", "time": "04:50 PM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2010",
    "customerName": "Fatima Musa",
    "vendorName": "GasMart Nigeria",
    "riderName": "David M.",
    "location": "18 Dopemu Road, Agege, Lagos",
    "item": {
      "name": "Gas masks",
      "quantity": "2 units",
      "price": 26000
    },
    "serviceFee": 2300,
    "totalFee": 28300,
    "paymentStatus": "Paid",
    "couponCode": "#GASDISCOUNT",
    "paymentMethod": "Transfer",
    "riderStatus": "en route",
    "statusTimeline": [
      { "status": "In progress", "time": "08:30 AM", "completed": true },
      { "status": "Completed", "time": null, "completed": false },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  },
  {
    "id": "ORD2011",
    "customerName": "Michael Dada",
    "vendorName": "Universal Safety Co.",
    "riderName": "Sola A.",
    "location": "25 Ikorodu Road, Ketu, Lagos",
    "item": {
      "name": "Safety goggles",
      "quantity": "2 units",
      "price": 11000
    },
    "serviceFee": 1100,
    "totalFee": 12100,
    "paymentStatus": "Unpaid",
    "couponCode": null,
    "paymentMethod": "On delivery",
    "riderStatus": "arrived",
    "statusTimeline": [
      { "status": "In progress", "time": "01:40 PM", "completed": true },
      { "status": "Completed", "time": "02:30 PM", "completed": true },
      { "status": "Cancelled", "time": null, "completed": false }
    ]
  }
];

export const ACallOrderDetails = [
  {
    id: 'ORD1001',
    customerName: 'John Doe',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Pressure Cooker',
      quantity: 'x1',
      price: 10000,
    },
    serviceFee: 2500,
    totalFee: 12500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'On delivery',
    report: {
      riskFactors: 'Unusual payment method, Multiple failed attempts.',
      internalNotes: ['Flagged by system on 25th Feb, 2025.','New user with unverified phone number.'],
    },
  },
  {
    id: 'ORD1002',
    customerName: 'Mary Johnson',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Electric Kettle',
      quantity: 'x2',
      price: 6000,
    },
    serviceFee: 500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Wallet',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed via wallet. Ready for packaging.'],
    },
  },
  {
    id: 'ORD1003',
    customerName: 'Charles Uche',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Toaster Oven',
      quantity: 'x1',
      price: 11000,
    },
    serviceFee: 1500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Flutterwave',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed. Item handed over to delivery partner.'],
    },
  },
  {
    id: 'ORD1004',
    customerName: 'Charles Uche',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Coffee Maker',
      quantity: 'x1',
      price: 12000,
    },
    serviceFee: 500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Flutterwave',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed, but product is currently out of stock.'],
    },
  },
  {
    id: 'ORD1005',
    customerName: 'David Hassan',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Blender',
      quantity: 'x1',
      price: 11500,
    },
    serviceFee: 1000,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Wallet',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed via wallet. Ready for processing.'],
    },
  },
  {
    id: 'ORD1006',
    customerName: 'Esther John',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Air Fryer',
      quantity: 'x1',
      price: 11500,
    },
    serviceFee: 1000,
    totalFee: 12500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'On delivery',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Order received. Customer will pay on delivery.'],
    },
  },
  {
    id: 'ORD1007',
    customerName: 'Emmanuel Obi',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Hand Mixer',
      quantity: 'x3',
      price: 4000,
    },
    serviceFee: 500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Transfer',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed via bank transfer. Dispatched for delivery.'],
    },
  },
  {
    id: 'ORD1008',
    customerName: 'Grace Nwosu',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Microwave',
      quantity: 'x1',
      price: 12000,
    },
    serviceFee: 500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Flutterwave',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed via Flutterwave. Processing order.'],
    },
  },
  {
    id: 'ORD1009',
    customerName: 'John Ekpo',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Waffle Maker',
      quantity: 'x1',
      price: 11500,
    },
    serviceFee: 1000,
    totalFee: 12500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'On delivery',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Product out of stock. Order cancelled. Customer will not be charged.'],
    },
  },
  {
    id: 'ORD1010',
    customerName: 'Hannah Danjuma',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Slow Cooker',
      quantity: 'x1',
      price: 10500,
    },
    serviceFee: 2000,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Wallet',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed from wallet. Dispatched.'],
    },
  },
  {
    id: 'ORD1011',
    customerName: 'Abdul Yusuf',
    contact: '090123456789',
    location: 'Third mainland...',
    item: {
      name: 'Rice Cooker',
      quantity: 'x1',
      price: 11000,
    },
    serviceFee: 1500,
    totalFee: 12500,
    paymentStatus: 'Paid',
    paymentMethod: 'Wallet',
    report: {
      riskFactors: 'None.',
      internalNotes: ['Payment confirmed from wallet. Order is being processed.'],
    },
  },
];

export const accessoryColumns = [
  { key: 'accessoryId', label: 'Accessory ID' },
  { key: 'name', label: 'Name' },
  { key: 'stockCount', label: 'Stock Count' },
  { key: 'price', label: 'Price' },
  {
    key: 'status',
    label: 'Status',
    render: (value, row) => (
      <span className={`font-semibold ${row.statusColor}`}>{value}</span>
    ),
  },
  { key: 'dateCreated', label: 'Date Created' },
  {
    key: 'detailsUrl',
    label: 'Actions',
    render: (_, row, setFilteredData) => (
      <div className="flex space-x-2">
        <a href={"/order-management-view-accessories/" + row.accessoryId} className="text-gray-500 hover:text-orange-500">
          <FaEdit />
        </a>
        <button className="text-gray-500 hover:text-red-500" onClick={() => confirmDelete(setFilteredData, 'accessoryId', row.accessoryId,"Accessory")}>
          <FaTrash />
        </button>
        {/* <a href="#" className="text-gray-500 hover:text-gray-700">
          <FaEllipsisV />
        </a> */}
      </div>
    ),
  },
];

export const accessoriesData = [
  {
    accessoryId: 'ACC1001',
    name: 'Gas Cylinder',
    stockCount: '100 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/27 10:15 AM',
    description: 'A durable, high-capacity gas cylinder, perfect for home and commercial use. Features a robust safety valve and a rust-resistant coating.',
    images: ['/images/item.png'],
  },
  {
    accessoryId: 'ACC1002',
    name: 'Gas Cooker',
    stockCount: '35 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/27 02:45 PM',
    description: 'A modern two-burner gas cooker with an auto-ignition feature and a sleek, easy-to-clean glass top. Ideal for any kitchen.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1003',
    name: 'Gas Cylinder',
    stockCount: '2 items',
  price: 75000,
    status: 'Suspended',
    statusColor: 'text-red-500',
    dateCreated: '25/01/26 11:20 AM',
    description: 'A standard-size gas cylinder with a pressure gauge. It is currently under inspection and temporarily suspended from sale.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1004',
    name: 'Gas Cylinder',
    stockCount: '55 items',
    price: 75000,
    status: 'Suspended',
    statusColor: 'text-red-500',
    dateCreated: '25/01/26 12:50 PM',
    description: 'A high-pressure gas cylinder for industrial applications. This item is temporarily unavailable due to a recall for safety checks.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1005',
    name: 'Gas Cooker',
    stockCount: '74 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/25 12:50 PM',
    description: 'A four-burner stainless steel gas cooker with a built-in oven and grill. A perfect addition for large families and professional chefs.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1006',
    name: 'Gas Cylinder',
    stockCount: '55 items',
    price: 75000,
    status: 'Suspended',
    statusColor: 'text-red-500',
    dateCreated: '25/01/26 12:50 PM',
    description: 'A portable, lightweight gas cylinder. Currently suspended due to low stock and a supplier issue.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1007',
    name: 'Gas Cooker',
    stockCount: '3 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/25 12:50 PM',
    description: 'A compact, single-burner gas stove, excellent for camping, outdoor events, or small apartments. Very easy to use and maintain.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1008',
    name: 'Gas Cooker',
    stockCount: '42 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/25 12:50 PM',
    description: 'A two-burner model with an enhanced flame control system for precise cooking. Features a durable enamel finish.',
    images: ['/images/item.png']
  },
  {
    accessoryId: 'ACC1009',
    name: 'Gas Cooker',
    stockCount: '16 items',
    price: 75000,
    status: 'Active',
    statusColor: 'text-green-500',
    dateCreated: '25/01/25 12:50 PM',
    description: 'A high-efficiency three-burner gas cooker with integrated safety features, including a flame failure device. Great for everyday cooking.',
    images: ['/images/item.png']
  },
];