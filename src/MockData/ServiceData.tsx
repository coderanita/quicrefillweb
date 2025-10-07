import { FaGasPump, FaBolt, FaClipboardCheck } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
export const ServiceOrdersHistoryData = [
  { id: "ORD-00112", name: "John Doe",  qty: "2 Units", price: 10000, date: "2025-03-10", status: "Completed",   payment: "Wallet",       service: "Gas Refill" },
  { id: "ORD-00113", name: "Jane Smith", qty: "1 Unit",  price:  5000, date: "2025-03-11", status: "In Progress", payment: "On delivery",  service: "Diesel" },
  { id: "ORD-00114", name: "Mike Ross",  qty: "3 Units", price: 15000, date: "2025-03-12", status: "Cancelled",   payment: "Flutterwave",  service: "Accessories" },
];
  export const initialData = [
  {
    id: "SERI001",
    quantity: "350 KG",
    vendor: "GreenGas Ltd.",
    rider: "Adebayo O.",
    type: "Gas Refill",
    status: "Active",
    price: "₦1,500",
    location: "Lagos",
    revenue: "₦6,300,000",
    dateCreated: "25/01/27 10:15 AM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI002",
    quantity: "500 Lit",
    vendor: "GreenGas Ltd.",
    rider: "Sodiq A.",
    type: "Diesel",
    status: "Active",
    price: "₦1,200",
    location: "Abuja",
    revenue: "₦12,250,000",
    dateCreated: "25/01/27 02:45 PM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI003",
    quantity: "420 Liters",
    vendor: "FuelSure Ltd.",
    rider: "Amaka K.",
    type: "Petroleum",
    status: "Suspended",
    price: "₦900",
    location: "Kano",
    revenue: "₦9,240,000",
    dateCreated: "25/01/26 11:20 AM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI004",
    quantity: "x1",
    vendor: "TechGears Ltd.",
    rider: "Tunde B.",
    type: "Accessories",
    status: "Discontinued",
    price: "₦7,500",
    location: "Lagos",
    revenue: "₦2,400,000",
    dateCreated: "25/01/26 12:50 PM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI005",
    quantity: "600 Liters",
    vendor: "PetroHub Ltd.",
    rider: "Sodiq A.",
    type: "Diesel",
    status: "Active",
    price: "₦1,350",
    location: "Abuja",
    revenue: "₦15,000,000",
    dateCreated: "25/01/25 12:50 PM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI006",
    quantity: "450 Liters",
    vendor: "FuelSure Ltd.",
    rider: "Adebayo O.",
    type: "Petroleum",
    status: "Inactive",
    price: "₦1,010",
    location: "Abuja",
    revenue: "₦9,675,000",
    dateCreated: "25/01/25 10:15 AM",
    detailsUrl: "service-management-details",
  },
  {
    id: "SERI007",
    quantity: "x4",
    vendor: "TechGears Ltd.",
    rider: "Musa T.",
    type: "Accessories",
    status: "Active",
    price: "₦1,010",
    location: "Abuja",
    revenue: "₦9,675,000",
    dateCreated: "25/01/23 10:15 AM",
    detailsUrl: "service-management-details",
  },
];



export const ServiceData = [
  {
    id: "SERI001",
    name: "Premium Gas Refill",
    vendor: "Supreme Gas Ltd",
    category: "Gas Refill",
    status: "Active",
    region: "Lagos",
    pricing: "₦1,000 per 1kg",
    minOrder: "2 Units",
    maxOrder: "50 Units",
    dateAdded: "2023-02-10",
    lastUpdated: "2023-03-18",
    stats: {
      totalOrders: 125,
      pendingOrders: 6,
      completedOrders: 110,
      cancelledOrders: 9,
      averageRating: 4.5,
      totalRevenue: "₦625,000",
    },
  },
  {
    id: "SERI002",
    name: "Basic Gas Delivery",
    vendor: "Green Energy",
    category: "Gas Delivery",
    status: "Inactive",
    region: "Abuja",
    pricing: "₦800 per 1kg",
    minOrder: "1 Unit",
    maxOrder: "20 Units",
    dateAdded: "2023-01-05",
    lastUpdated: "2023-03-10",
    stats: {
      totalOrders: 80,
      pendingOrders: 5,
      completedOrders: 70,
      cancelledOrders: 5,
      averageRating: 4.0,
      totalRevenue: "₦320,000",
    },
  },
  {
    id: "SERI003",
    name: "Industrial Gas Cylinder Refill",
    vendor: "Mega Gas Co.",
    category: "Industrial Gas",
    status: "Active",
    region: "Port Harcourt",
    pricing: "₦15,000 per cylinder",
    minOrder: "1 Unit",
    maxOrder: "5 Units",
    dateAdded: "2023-04-01",
    lastUpdated: "2023-04-20",
    stats: {
      totalOrders: 45,
      pendingOrders: 2,
      completedOrders: 40,
      cancelledOrders: 3,
      averageRating: 4.8,
      totalRevenue: "₦675,000",
    },
  },
  {
    id: "SERI004",
    name: "Cooking Gas Installation",
    vendor: "Home Solutions Inc.",
    category: "Installation",
    status: "Active",
    region: "Lagos",
    pricing: "₦5,000 per installation",
    minOrder: "1 Unit",
    maxOrder: "1 Unit",
    dateAdded: "2023-03-25",
    lastUpdated: "2023-04-15",
    stats: {
      totalOrders: 60,
      pendingOrders: 1,
      completedOrders: 58,
      cancelledOrders: 1,
      averageRating: 4.7,
      totalRevenue: "₦300,000",
    },
  },
  {
    id: "SERI005",
    name: "Emergency Gas Delivery",
    vendor: "Swift Gas Logistics",
    category: "Gas Delivery",
    status: "Active",
    region: "Abuja",
    pricing: "₦1,200 per 1kg",
    minOrder: "1 Unit",
    maxOrder: "10 Units",
    dateAdded: "2023-04-10",
    lastUpdated: "2023-04-22",
    stats: {
      totalOrders: 95,
      pendingOrders: 10,
      completedOrders: 80,
      cancelledOrders: 5,
      averageRating: 4.6,
      totalRevenue: "₦114,000",
    },
  },
  {
    id: "SERI006",
    name: "Cylinder Maintenance Service",
    vendor: "Safe Cylinders",
    category: "Maintenance",
    status: "Active",
    region: "Kano",
    pricing: "₦3,500 per unit",
    minOrder: "1 Unit",
    maxOrder: "5 Units",
    dateAdded: "2023-05-01",
    lastUpdated: "2023-05-10",
    stats: {
      totalOrders: 30,
      pendingOrders: 3,
      completedOrders: 25,
      cancelledOrders: 2,
      averageRating: 4.9,
      totalRevenue: "₦105,000",
    },
  },
  {
    id: "SERI007",
    name: "Bulk Gas Supply",
    vendor: "National Gas Partners",
    category: "Bulk Supply",
    status: "Active",
    region: "All Regions",
    pricing: "Negotiable",
    minOrder: "100 Units",
    maxOrder: "1000 Units",
    dateAdded: "2023-05-15",
    lastUpdated: "2023-05-20",
    stats: {
      totalOrders: 15,
      pendingOrders: 1,
      completedOrders: 14,
      cancelledOrders: 0,
      averageRating: 5.0,
      totalRevenue: "₦5,000,000",
    },
  },
];

export const deliveryData = [
  {
    label: 'Total Petroleum Delivered',
    value: '3,500 Liters',
    bg: 'bg-amber-500',
    icon: <FaGasPump className="text-white text-md" />,
  },
  {
    label: 'Total Diesel Delivered',
    value: '2,850 Liters',
    bg: 'bg-amber-300',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24">
        <rect x="6" y="3" width="12" height="18" stroke="black" strokeWidth="2" fill="none" />
        <line x1="6" y1="6" x2="18" y2="6" stroke="black" strokeWidth="2" />
        <line x1="6" y1="18" x2="18" y2="18" stroke="black" strokeWidth="2" />
        <path d="M12 10c-1.5 2-2 2.5-2 3a2 2 0 1 0 4 0c0-0.5-0.5-1-2-3z" fill="black" />
      </svg>
    ),
  },
  {
    label: 'Total Gas Delivered',
    value: '4,200 KG',
    bg: 'bg-teal-300',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24">
        <rect x="7" y="6" width="10" height="12" stroke="black" strokeWidth="2" fill="none" rx="2" />
        <rect x="9" y="3" width="6" height="3" stroke="black" strokeWidth="2" fill="none" />
        <path d="M12 10c-1.5 2-2 2.5-2 3a2 2 0 1 0 4 0c0-0.5-0.5-1-2-3z" fill="black" />
      </svg>
    ),
  },
  {
    label: 'Electricity Purchased',
    value: '920,000 kWh',
    bg: 'bg-blue-500',
    icon: <FaBolt className="text-white text-md" />,
    size: 'w-9 h-9',
  },
  {
    label: 'Total Orders Processed',
    value: '2,500',
    bg: 'bg-green-500 text-white',
    icon: <FaClipboardCheck className="text-md" />,
  },
];

const getcountries =[
  {
    "value": "AF",
    "label": "Afghanistan"
  },
  {
    "value": "AL",
    "label": "Albania"
  },
  {
    "value": "DZ",
    "label": "Algeria"
  },
  {
    "value": "AS",
    "label": "American Samoa"
  },
  {
    "value": "AD",
    "label": "Andorra"
  },
  {
    "value": "AO",
    "label": "Angola"
  },
  {
    "value": "AI",
    "label": "Anguilla"
  },
  {
    "value": "AQ",
    "label": "Antarctica"
  },
  {
    "value": "AG",
    "label": "Antigua and Barbuda"
  },
  {
    "value": "AR",
    "label": "Argentina"
  },
  {
    "value": "AM",
    "label": "Armenia"
  },
  {
    "value": "AW",
    "label": "Aruba"
  },
  {
    "value": "AU",
    "label": "Australia"
  },
  {
    "value": "AT",
    "label": "Austria"
  },
  {
    "value": "AZ",
    "label": "Azerbaijan"
  },
  {
    "value": "BS",
    "label": "Bahamas"
  },
  {
    "value": "BH",
    "label": "Bahrain"
  },
  {
    "value": "BD",
    "label": "Bangladesh"
  },
  {
    "value": "BB",
    "label": "Barbados"
  },
  {
    "value": "BY",
    "label": "Belarus"
  },
  {
    "value": "BE",
    "label": "Belgium"
  },
  {
    "value": "BZ",
    "label": "Belize"
  },
  {
    "value": "BJ",
    "label": "Benin"
  },
  {
    "value": "BM",
    "label": "Bermuda"
  },
  {
    "value": "BT",
    "label": "Bhutan"
  },
  {
    "value": "BO",
    "label": "Bolivia"
  },
  {
    "value": "BA",
    "label": "Bosnia and Herzegovina"
  },
  {
    "value": "BW",
    "label": "Botswana"
  },
  {
    "value": "BR",
    "label": "Brazil"
  },
  {
    "value": "IO",
    "label": "British Indian Ocean Territory"
  },
  {
    "value": "BN",
    "label": "Brunei Darussalam"
  },
  {
    "value": "BG",
    "label": "Bulgaria"
  },
  {
    "value": "BF",
    "label": "Burkina Faso"
  },
  {
    "value": "BI",
    "label": "Burundi"
  },
  {
    "value": "KH",
    "label": "Cambodia"
  },
  {
    "value": "CM",
    "label": "Cameroon"
  },
  {
    "value": "CA",
    "label": "Canada"
  },
  {
    "value": "CV",
    "label": "Cape Verde"
  },
  {
    "value": "KY",
    "label": "Cayman Islands"
  },
  {
    "value": "CF",
    "label": "Central African Republic"
  },
  {
    "value": "TD",
    "label": "Chad"
  },
  {
    "value": "CL",
    "label": "Chile"
  },
  {
    "value": "CN",
    "label": "China"
  },
  {
    "value": "CO",
    "label": "Colombia"
  },
  {
    "value": "KM",
    "label": "Comoros"
  },
  {
    "value": "CG",
    "label": "Congo"
  },
  {
    "value": "CD",
    "label": "Congo, Democratic Republic of the"
  },
  {
    "value": "CR",
    "label": "Costa Rica"
  },
  {
    "value": "CI",
    "label": "Côte d'Ivoire"
  },
  {
    "value": "HR",
    "label": "Croatia"
  },
  {
    "value": "CU",
    "label": "Cuba"
  },
  {
    "value": "CY",
    "label": "Cyprus"
  },
  {
    "value": "CZ",
    "label": "Czech Republic"
  },
  {
    "value": "DK",
    "label": "Denmark"
  },
  {
    "value": "DJ",
    "label": "Djibouti"
  },
  {
    "value": "DM",
    "label": "Dominica"
  },
  {
    "value": "DO",
    "label": "Dominican Republic"
  },
  {
    "value": "EC",
    "label": "Ecuador"
  },
  {
    "value": "EG",
    "label": "Egypt"
  },
  {
    "value": "SV",
    "label": "El Salvador"
  },
  {
    "value": "GQ",
    "label": "Equatorial Guinea"
  },
  {
    "value": "ER",
    "label": "Eritrea"
  },
  {
    "value": "EE",
    "label": "Estonia"
  },
  {
    "value": "SZ",
    "label": "Eswatini"
  },
  {
    "value": "ET",
    "label": "Ethiopia"
  },
  {
    "value": "FJ",
    "label": "Fiji"
  },
  {
    "value": "FI",
    "label": "Finland"
  },
  {
    "value": "FR",
    "label": "France"
  },
  {
    "value": "GF",
    "label": "French Guiana"
  },
  {
    "value": "PF",
    "label": "French Polynesia"
  },
  {
    "value": "GA",
    "label": "Gabon"
  },
  {
    "value": "GM",
    "label": "Gambia"
  },
  {
    "value": "GE",
    "label": "Georgia"
  },
  {
    "value": "DE",
    "label": "Germany"
  },
  {
    "value": "GH",
    "label": "Ghana"
  },
  {
    "value": "GI",
    "label": "Gibraltar"
  },
  {
    "value": "GR",
    "label": "Greece"
  },
  {
    "value": "GL",
    "label": "Greenland"
  },
  {
    "value": "GD",
    "label": "Grenada"
  },
  {
    "value": "GP",
    "label": "Guadeloupe"
  },
  {
    "value": "GU",
    "label": "Guam"
  },
  {
    "value": "GT",
    "label": "Guatemala"
  },
  {
    "value": "GG",
    "label": "Guernsey"
  },
  {
    "value": "GN",
    "label": "Guinea"
  },
  {
    "value": "GW",
    "label": "Guinea-Bissau"
  },
  {
    "value": "GY",
    "label": "Guyana"
  },
  {
    "value": "HT",
    "label": "Haiti"
  },
  {
    "value": "HN",
    "label": "Honduras"
  },
  {
    "value": "HK",
    "label": "Hong Kong"
  },
  {
    "value": "HU",
    "label": "Hungary"
  },
  {
    "value": "IS",
    "label": "Iceland"
  },
  {
    "value": "IN",
    "label": "India"
  },
  {
    "value": "ID",
    "label": "Indonesia"
  },
  {
    "value": "IR",
    "label": "Iran"
  },
  {
    "value": "IQ",
    "label": "Iraq"
  },
  {
    "value": "IE",
    "label": "Ireland"
  },
  {
    "value": "IL",
    "label": "Israel"
  },
  {
    "value": "IT",
    "label": "Italy"
  },
  {
    "value": "JM",
    "label": "Jamaica"
  },
  {
    "value": "JP",
    "label": "Japan"
  },
  {
    "value": "JE",
    "label": "Jersey"
  },
  {
    "value": "JO",
    "label": "Jordan"
  },
  {
    "value": "KZ",
    "label": "Kazakhstan"
  },
  {
    "value": "KE",
    "label": "Kenya"
  },
  {
    "value": "KI",
    "label": "Kiribati"
  },
  {
    "value": "KW",
    "label": "Kuwait"
  },
  {
    "value": "KG",
    "label": "Kyrgyzstan"
  },
  {
    "value": "LA",
    "label": "Laos"
  },
  {
    "value": "LV",
    "label": "Latvia"
  },
  {
    "value": "LB",
    "label": "Lebanon"
  },
  {
    "value": "LS",
    "label": "Lesotho"
  },
  {
    "value": "LR",
    "label": "Liberia"
  },
  {
    "value": "LY",
    "label": "Libya"
  },
  {
    "value": "LI",
    "label": "Liechtenstein"
  },
  {
    "value": "LT",
    "label": "Lithuania"
  },
  {
    "value": "LU",
    "label": "Luxembourg"
  },
  {
    "value": "MO",
    "label": "Macau"
  },
  {
    "value": "MK",
    "label": "Macedonia"
  },
  {
    "value": "MG",
    "label": "Madagascar"
  },
  {
    "value": "MW",
    "label": "Malawi"
  },
  {
    "value": "MY",
    "label": "Malaysia"
  },
  {
    "value": "MV",
    "label": "Maldives"
  },
  {
    "value": "ML",
    "label": "Mali"
  },
  {
    "value": "MT",
    "label": "Malta"
  },
  {
    "value": "MH",
    "label": "Marshall Islands"
  },
  {
    "value": "MQ",
    "label": "Martinique"
  },
  {
    "value": "MR",
    "label": "Mauritania"
  },
  {
    "value": "MU",
    "label": "Mauritius"
  },
  {
    "value": "YT",
    "label": "Mayotte"
  },
  {
    "value": "MX",
    "label": "Mexico"
  },
  {
    "value": "FM",
    "label": "Micronesia (Federated States of)"
  },
  {
    "value": "MD",
    "label": "Moldova"
  },
  {
    "value": "MC",
    "label": "Monaco"
  },
  {
    "value": "MN",
    "label": "Mongolia"
  },
  {
    "value": "ME",
    "label": "Montenegro"
  },
  {
    "value": "MS",
    "label": "Montserrat"
  },
  {
    "value": "MA",
    "label": "Morocco"
  },
  {
    "value": "MZ",
    "label": "Mozambique"
  },
  {
    "value": "MM",
    "label": "Myanmar"
  },
  {
    "value": "NA",
    "label": "Namibia"
  },
  {
    "value": "NR",
    "label": "Nauru"
  },
  {
    "value": "NP",
    "label": "Nepal"
  },
  {
    "value": "NL",
    "label": "Netherlands"
  },
  {
    "value": "NC",
    "label": "New Caledonia"
  },
  {
    "value": "NZ",
    "label": "New Zealand"
  },
  {
    "value": "NI",
    "label": "Nicaragua"
  },
  {
    "value": "NE",
    "label": "Niger"
  },
  {
    "value": "NG",
    "label": "Nigeria"
  },
  {
    "value": "NU",
    "label": "Niue"
  },
  {
    "value": "NF",
    "label": "Norfolk Island"
  },
  {
    "value": "KP",
    "label": "North Korea"
  },
  {
    "value": "MP",
    "label": "Northern Mariana Islands"
  },
  {
    "value": "NO",
    "label": "Norway"
  },
  {
    "value": "OM",
    "label": "Oman"
  },
  {
    "value": "PK",
    "label": "Pakistan"
  },
  {
    "value": "PW",
    "label": "Palau"
  },
  {
    "value": "PS",
    "label": "Palestinian Territory"
  },
  {
    "value": "PA",
    "label": "Panama"
  },
  {
    "value": "PG",
    "label": "Papua New Guinea"
  },
  {
    "value": "PY",
    "label": "Paraguay"
  },
  {
    "value": "PE",
    "label": "Peru"
  },
  {
    "value": "PH",
    "label": "Philippines"
  },
  {
    "value": "PN",
    "label": "Pitcairn Islands"
  },
  {
    "value": "PL",
    "label": "Poland"
  },
  {
    "value": "PT",
    "label": "Portugal"
  },
  {
    "value": "PR",
    "label": "Puerto Rico"
  },
  {
    "value": "QA",
    "label": "Qatar"
  },
  {
    "value": "RO",
    "label": "Romania"
  },
  {
    "value": "RU",
    "label": "Russia"
  },
  {
    "value": "RW",
    "label": "Rwanda"
  },
  {
    "value": "RE",
    "label": "Réunion"
  },
  {
    "value": "BL",
    "label": "Saint Barthélemy"
  },
  {
    "value": "SH",
    "label": "Saint Helena"
  },
  {
    "value": "KN",
    "label": "Saint Kitts and Nevis"
  },
  {
    "value": "LC",
    "label": "Saint Lucia"
  },
  {
    "value": "MF",
    "label": "Saint Martin"
  },
  {
    "value": "PM",
    "label": "Saint Pierre and Miquelon"
  },
  {
    "value": "VC",
    "label": "Saint Vincent and the Grenadines"
  },
  {
    "value": "WS",
    "label": "Samoa"
  },
  {
    "value": "SM",
    "label": "San Marino"
  },
  {
    "value": "ST",
    "label": "Sao Tome and Principe"
  },
  {
    "value": "SA",
    "label": "Saudi Arabia"
  },
  {
    "value": "SN",
    "label": "Senegal"
  },
  {
    "value": "RS",
    "label": "Serbia"
  },
  {
    "value": "SC",
    "label": "Seychelles"
  },
  {
    "value": "SL",
    "label": "Sierra Leone"
  },
  {
    "value": "SG",
    "label": "Singapore"
  },
  {
    "value": "SX",
    "label": "Sint Maarten"
  },
  {
    "value": "SK",
    "label": "Slovakia"
  },
  {
    "value": "SI",
    "label": "Slovenia"
  },
  {
    "value": "SB",
    "label": "Solomon Islands"
  },
  {
    "value": "SO",
    "label": "Somalia"
  },
  {
    "value": "ZA",
    "label": "South Africa"
  },
  {
    "value": "GS",
    "label": "South Georgia and the South Sandwich Islands"
  },
  {
    "value": "KR",
    "label": "South Korea"
  },
  {
    "value": "SS",
    "label": "South Sudan"
  },
  {
    "value": "ES",
    "label": "Spain"
  },
  {
    "value": "LK",
    "label": "Sri Lanka"
  },
  {
    "value": "SD",
    "label": "Sudan"
  },
  {
    "value": "SR",
    "label": "Suriname"
  },
  {
    "value": "SJ",
    "label": "Svalbard and Jan Mayen"
  },
  {
    "value": "SE",
    "label": "Sweden"
  },
  {
    "value": "CH",
    "label": "Switzerland"
  },
  {
    "value": "SY",
    "label": "Syria"
  },
  {
    "value": "TW",
    "label": "Taiwan"
  },
  {
    "value": "TJ",
    "label": "Tajikistan"
  },
  {
    "value": "TZ",
    "label": "Tanzania"
  },
  {
    "value": "TH",
    "label": "Thailand"
  },
  {
    "value": "TL",
    "label": "Timor-Leste"
  },
  {
    "value": "TG",
    "label": "Togo"
  },
  {
    "value": "TK",
    "label": "Tokelau"
  },
  {
    "value": "TO",
    "label": "Tonga"
  },
  {
    "value": "TT",
    "label": "Trinidad and Tobago"
  },
  {
    "value": "TN",
    "label": "Tunisia"
  },
  {
    "value": "TR",
    "label": "Turkey"
  },
  {
    "value": "TM",
    "label": "Turkmenistan"
  },
  {
    "value": "TC",
    "label": "Turks and Caicos Islands"
  },
  {
    "value": "TV",
    "label": "Tuvalu"
  },
  {
    "value": "UG",
    "label": "Uganda"
  },
  {
    "value": "UA",
    "label": "Ukraine"
  },
  {
    "value": "AE",
    "label": "United Arab Emirates"
  },
  {
    "value": "GB",
    "label": "United Kingdom"
  },
  {
    "value": "US",
    "label": "United States"
  },
  {
    "value": "UY",
    "label": "Uruguay"
  },
  {
    "value": "UZ",
    "label": "Uzbekistan"
  },
  {
    "value": "VU",
    "label": "Vanuatu"
  },
  {
    "value": "VE",
    "label": "Venezuela"
  },
  {
    "value": "VN",
    "label": "Vietnam"
  },
  {
    "value": "VG",
    "label": "Virgin Islands"
  },
  {
    "value": "WF",
    "label": "Wallis and Futuna"
  },
  {
    "value": "EH",
    "label": "Western Sahara"
  },
  {
    "value": "YE",
    "label": "Yemen"
  },
  {
    "value": "ZM",
    "label": "Zambia"
  },
  {
    "value": "ZW",
    "label": "Zimbabwe"
  }
]

export default getcountries;
    // Dummy Review Data
export  const reviewData = [
  {
    id: "RVW-0012",
    customer: "Michael E.",
    rating: 5,
    comment: "Great service! Fast Delivery",
    date: "2025-03-12",
  },
  {
    id: "RVW-0013",
    customer: "Sarah K.",
    rating: 4,
    comment: "Very reliable and quick.",
    date: "2025-03-15",
  },
  {
    id: "RVW-0014",
    customer: "James T.",
    rating: 3,
    comment: "Service was okay, could improve.",
    date: "2025-03-20",
  },
];


  export const reviewColumns = [
    { header: "Review ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    {
      header: "Rating",
      accessor: "rating",
      render: (row: any) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 ${
                i < row.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({row.rating})</span>
        </div>
      ),
    },
    { header: "Comment", accessor: "comment" },
    { header: "Date", accessor: "date" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row: any) => (
        <a href={`/review/${row.id}`} className="text-blue-500 hover:underline">
          View Review
        </a>
      ),
    },
  ];