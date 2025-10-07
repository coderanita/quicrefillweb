const numberCardsData =[
  {
    "title": "Total Orders",
    "description": "All orders placed for accessories",
    "value": "5,246",
    "color": "bg-blue-500"
  },
  {
    "title": "Completed Orders",
    "description": "Successfully fulfilled accessories orders",
    "value": "1,812",
    "color": "bg-green-500"
  },
  {
    "title": "Out for Delivery",
    "description": "Accessories orders currently being delivered",
    "value": "1,262",
    "color": "bg-yellow-500"
  },
  {
    "title": "Canceled Orders",
    "description": "Cancelled accessories orders",
    "value": "942",
    "color": "bg-red-400"
  },
  {
    "title": "Suspicious Orders",
    "description": "Orders currently being flagged for irregular activities",
    "value": "1,230",
    "color": "bg-yellow-400"
  },
  {
    "title": "Out of Stock",
    "description": "Orders currently unavailable",
    "value": "1,230",
    "color": "bg-orange-600"
  },
  {
    "title": "Payment Received",
    "description": "Total amount received from accessories sale",
    "value": "1,230",
    "color": "bg-sky-600"
  }
];

export default numberCardsData;

export const orderData=[
  {
    "orderId": "ORD1001",
    "customerName": "John Doe",
    "vendorName": "Elite Gas Hub",
    "riderName": "James Okoro",
    "accessories": "Fire extinguisher",
    "status": "In Progress",
    "payment": "On delivery",
    "amount": "₦12,500",
    "date": "25/01/27 10:15 AM"
  },
  {
    "orderId": "ORD1002",
    "customerName": "Mary Johnson",
    "vendorName": "FixIt Plumbers",
    "riderName": "Ahmed Bello",
    "accessories": "Gas masks",
    "status": "Completed",
    "payment": "Wallet",
    "amount": "₦75,000",
    "date": "25/01/27 02:45 PM"
  },
  {
    "orderId": "ORD1003",
    "customerName": "Charles Uche",
    "vendorName": "PowerPlus Ltd.",
    "riderName": "-",
    "accessories": "Gas hoses",
    "status": "In Progress",
    "payment": "Flatterwave",
    "amount": "₦8,500",
    "date": "25/01/27 09:30 AM"
  },
  {
    "orderId": "ORD1004",
    "customerName": "Charles Uche",
    "vendorName": "PowerPlus Ltd.",
    "riderName": "David M.",
    "accessories": "Safety goggles",
    "status": "Canceled",
    "payment": "Flatterwave",
    "amount": "₦10,000",
    "date": "25/01/26 11:10 AM"
  },
  {
    "orderId": "ORD1005",
    "customerName": "David Hassan",
    "vendorName": "TechGears Ltd.",
    "riderName": "-",
    "accessories": "Gas masks",
    "status": "Completed",
    "payment": "Wallet",
    "amount": "₦6,900",
    "date": "25/01/24 04:20 PM"
  },
  {
    "orderId": "ORD1006",
    "customerName": "Esther John",
    "vendorName": "GreenGas Ltd.",
    "riderName": "Sola A.",
    "accessories": "Gas masks",
    "status": "Completed",
    "payment": "On delivery",
    "amount": "₦30,000",
    "date": "25/01/26 11:20 AM"
  },
  {
    "orderId": "ORD1007",
    "customerName": "Emmanuel Obi",
    "vendorName": "PetroHub Ltd.",
    "riderName": "Tunde A.",
    "accessories": "Safety goggles",
    "status": "In Progress",
    "payment": "Transfer",
    "amount": "₦50,000",
    "date": "25/01/27 12:50 PM"
  }
];

export const accessoriesData = [
  {
    accessoryId: 'ORD1001',
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
    accessoryId: 'ORD1002',
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
    accessoryId: 'ORD1003',
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
    accessoryId: 'ORD1004',
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
    accessoryId: 'ORD1005',
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
    accessoryId: 'ORD1006',
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
    accessoryId: 'ORD1007',
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
    accessoryId: 'ORD1008',
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
    accessoryId: 'ORD1009',
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