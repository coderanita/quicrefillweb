
import { FaStar } from "react-icons/fa";
import { FaThumbtack, FaOilCan, FaFire, FaGasPump, FaClipboardCheck } from 'react-icons/fa';


  export const deliveryData = [
  {
    label: 'Total Pending Services',
    value: '125',
    bg: 'bg-amber-500',
    icon: <FaThumbtack className="text-white text-md" />,
  },
  {
    label: 'Diesel Services',
    value: '20',
    bg: 'bg-amber-300',
    icon: <FaOilCan className="text-black text-md" />,
  },
  {
    label: 'Gas Services',
    value: '45',
    bg: 'bg-teal-300',
    icon: <FaFire className="text-black text-md" />,
  },
  {
    label: 'Petroleum Services',
    value: '35',
    bg: 'bg-blue-500',
    icon: <FaGasPump className="text-white text-md" />,
  },
  {
    label: 'Accessories Services',
    value: '25',
    bg: 'bg-green-500',
    icon: <FaClipboardCheck className="text-white text-md" />,
  },
];
export const PendingServicecolumns = [
  { header: "Service ID", accessor: "id" },
  { header: "Service Name", accessor: "serviceName" },
  { header: "Service Rep(s)", accessor: "reps" },
  { header: "Category", accessor: "category" },
  { header: "Submitted Date", accessor: "submittedDate" },
  { header: "Compliance Docs", accessor: "complianceDocs" },
  {
    header: "Status",
    accessor: "status",
    render: (row: any) => (
      <span
        className={`font-semibold ${
          row.status === "Approved"
            ? "text-green-500"
            : row.status === "Pending"
            ? "text-yellow-500"
            : row.status === "Canceled"
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    render: (row: any) => (
      <a
        href={`${row.detailsUrl}/${row.id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </a>
    ),
  },
];
export const PendingServiceData =[{
    "id": "SRV-2001",
    "serviceName": "XYZ Gas Ltd",
    "reps": "John Doe, Jane Smith",
    "category": "Gas Refill",
    "submittedDate": "12/03/2025",
    "complianceDocs": "5",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2002",
    "serviceName": "Apex Petroleum",
    "reps": "Michael Chafur",
    "category": "Gas Refill",
    "submittedDate": "12/03/2025",
    "complianceDocs": "3",
    "status": "Canceled",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2003",
    "serviceName": "Fuel Gas Inc",
    "reps": "No Assigned Rep",
    "category": "Accessories",
    "submittedDate": "12/03/2025",
    "complianceDocs": "2",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2004",
    "serviceName": "FuelFast Ltd",
    "reps": "Amaka Williams",
    "category": "Diesel",
    "submittedDate": "12/03/2025",
    "complianceDocs": "5",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2005",
    "serviceName": "PumpCare Ltd",
    "reps": "Ibrahim Musa, Ngozi Okeke",
    "category": "Petroleum",
    "submittedDate": "12/03/2025",
    "complianceDocs": "1",
    "status": "Canceled",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2006",
    "serviceName": "EcoFuel Ltd",
    "reps": "Sarah Khan",
    "category": "Ethanol",
    "submittedDate": "13/03/2025",
    "complianceDocs": "4",
    "status": "Approved",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2007",
    "serviceName": "SunGas Inc",
    "reps": "No Assigned Rep",
    "category": "Solar Gas",
    "submittedDate": "14/03/2025",
    "complianceDocs": "3",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2008",
    "serviceName": "GreenFuel Ltd",
    "reps": "David Johnson",
    "category": "Biofuel",
    "submittedDate": "15/03/2025",
    "complianceDocs": "2",
    "status": "Canceled",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2009",
    "serviceName": "NextGen Petroleum",
    "reps": "Samuel Adams",
    "category": "Petroleum",
    "submittedDate": "16/03/2025",
    "complianceDocs": "6",
    "status": "Approved",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2010",
    "serviceName": "PowerGas Ltd",
    "reps": "No Assigned Rep",
    "category": "Power Gas",
    "submittedDate": "17/03/2025",
    "complianceDocs": "5",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2011",
    "serviceName": "BlueFlame Energy",
    "reps": "Samuel Odu",
    "category": "LPG",
    "submittedDate": "18/03/2025",
    "complianceDocs": "3",
    "status": "Approved",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2012",
    "serviceName": "EcoFuel Ltd",
    "reps": "Fatima Yusuf",
    "category": "Biodiesel",
    "submittedDate": "18/03/2025",
    "complianceDocs": "4",
    "status": "Canceled",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2013",
    "serviceName": "SolarGas Ltd",
    "reps": "Musa Ali",
    "category": "Solar Gas",
    "submittedDate": "19/03/2025",
    "complianceDocs": "2",
    "status": "Pending",
    "detailsUrl": "service-management-pending-details"
  },
  {
    "id": "SRV-2014",
    "serviceName": "NextGen Fuels",
    "reps": "Ngozi Eze",
    "category": "Ethanol",
    "submittedDate": "19/03/2025",
    "complianceDocs": "1",
    "status": "Approved",
    "detailsUrl": "service-management-pending-details"
  }
];



export const PendingServicesData = [
  {
    id: "SRV-2001",
    serviceName: "XYZ Gas Ltd",
    vendorContact: "contact@xyzgas.com, +234 802 345 6789",
    category: "Gas",
    status: "Pending",
    submissionDate: "12/03/2025",
    price: "₦1250.00",
    estimatedDelivery: "30 mins",
    location: "Jahi",
    radius: "10 km",
    businessHours: "6am - 9pm",
    minOrder: "2kg",
    deliveryFee: "₦300",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2002",
    serviceName: "Apex Petroleum",
    vendorContact: "support@apexpetro.com, +234 801 555 9912",
    category: "Petroleum",
    status: "Canceled",
    submissionDate: "12/03/2025",
    price: "₦1500.00",
    estimatedDelivery: "45 mins",
    location: "Garki",
    radius: "15 km",
    businessHours: "7am - 10pm",
    minOrder: "10 liters",
    deliveryFee: "₦400",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2003",
    serviceName: "Fuel Gas Inc",
    vendorContact: "info@fuelgas.com, +234 809 111 7788",
    category: "Accessories",
    status: "Pending",
    submissionDate: "12/03/2025",
    price: "₦2500.00",
    estimatedDelivery: "1 hour",
    location: "Maitama",
    radius: "8 km",
    businessHours: "8am - 6pm",
    minOrder: "1 item",
    deliveryFee: "₦150",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2004",
    serviceName: "FuelFast Ltd",
    vendorContact: "sales@fuelfast.ng, +234 806 456 2234",
    category: "Diesel",
    status: "Pending",
    submissionDate: "12/03/2025",
    price: "₦2000.00",
    estimatedDelivery: "90 mins",
    location: "Wuse",
    radius: "20 km",
    businessHours: "24/7",
    minOrder: "50 liters",
    deliveryFee: "₦500",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2005",
    serviceName: "PumpCare Ltd",
    vendorContact: "hello@pumpcare.co, +234 803 123 4567",
    category: "Petroleum",
    status: "Canceled",
    submissionDate: "12/03/2025",
    price: "₦1400.00",
    estimatedDelivery: "25 mins",
    location: "Kubwa",
    radius: "12 km",
    businessHours: "5am - 11pm",
    minOrder: "15 liters",
    deliveryFee: "₦350",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2006",
    serviceName: "EcoFuel Ltd",
    vendorContact: "info@ecofuel.com, +234 705 678 9012",
    category: "Ethanol",
    status: "Approved",
    submissionDate: "13/03/2025",
    price: "₦1100.00",
    estimatedDelivery: "40 mins",
    location: "Lugbe",
    radius: "18 km",
    businessHours: "7am - 9pm",
    minOrder: "5 liters",
    deliveryFee: "₦250",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2007",
    serviceName: "SunGas Inc",
    vendorContact: "solar@sungas.net, +234 908 765 4321",
    category: "Solar Gas",
    status: "Pending",
    submissionDate: "14/03/2025",
    price: "₦1800.00",
    estimatedDelivery: "50 mins",
    location: "Life Camp",
    radius: "25 km",
    businessHours: "9am - 5pm",
    minOrder: "10kg",
    deliveryFee: "₦600",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2008",
    serviceName: "GreenFuel Ltd",
    vendorContact: "contact@greenfuel.co, +234 810 234 5678",
    category: "Biofuel",
    status: "Canceled",
    submissionDate: "15/03/2025",
    price: "₦1300.00",
    estimatedDelivery: "1 hour",
    location: "Lokogoma",
    radius: "14 km",
    businessHours: "8am - 7pm",
    minOrder: "20 liters",
    deliveryFee: "₦450",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2009",
    serviceName: "NextGen Petroleum",
    vendorContact: "sales@nextgen.com, +234 812 345 6789",
    category: "Petroleum",
    status: "Approved",
    submissionDate: "16/03/2025",
    price: "₦1550.00",
    estimatedDelivery: "35 mins",
    location: "Gwarinpa",
    radius: "16 km",
    businessHours: "24/7",
    minOrder: "5 liters",
    deliveryFee: "₦200",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2010",
    serviceName: "PowerGas Ltd",
    vendorContact: "support@powergas.ng, +234 807 890 1234",
    category: "Power Gas",
    status: "Pending",
    submissionDate: "17/03/2025",
    price: "₦1900.00",
    estimatedDelivery: "45 mins",
    location: "Central Area",
    radius: "5 km",
    businessHours: "9am - 8pm",
    minOrder: "3kg",
    deliveryFee: "₦180",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2011",
    serviceName: "BlueFlame Energy",
    vendorContact: "info@blueflame.co, +234 813 456 7890",
    category: "LPG",
    status: "Approved",
    submissionDate: "18/03/2025",
    price: "₦1650.00",
    estimatedDelivery: "20 mins",
    location: "Wuse 2",
    radius: "8 km",
    businessHours: "7am - 10pm",
    minOrder: "5kg",
    deliveryFee: "₦250",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2012",
    serviceName: "EcoFuel Ltd",
    vendorContact: "contact@ecofuel.com, +234 705 678 9012",
    category: "Biodiesel",
    status: "Canceled",
    submissionDate: "18/03/2025",
    price: "₦1450.00",
    estimatedDelivery: "1 hour",
    location: "Asokoro",
    radius: "10 km",
    businessHours: "8am - 6pm",
    minOrder: "30 liters",
    deliveryFee: "₦350",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2013",
    serviceName: "SolarGas Ltd",
    vendorContact: "info@solargas.net, +234 908 123 4567",
    category: "Solar Gas",
    status: "Pending",
    submissionDate: "19/03/2025",
    price: "₦2100.00",
    estimatedDelivery: "55 mins",
    location: "Kado",
    radius: "15 km",
    businessHours: "9am - 5pm",
    minOrder: "5kg",
    deliveryFee: "₦500",
    geoLocation: "Abuja, Nigeria",
  },
  {
    id: "SRV-2014",
    serviceName: "NextGen Fuels",
    vendorContact: "contact@nextgenfuels.com, +234 814 567 8901",
    category: "Ethanol",
    status: "Approved",
    submissionDate: "19/03/2025",
    price: "₦1200.00",
    estimatedDelivery: "30 mins",
    location: "Jabi",
    radius: "11 km",
    businessHours: "6am - 11pm",
    minOrder: "10 liters",
    deliveryFee: "₦280",
    geoLocation: "Abuja, Nigeria",
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
 