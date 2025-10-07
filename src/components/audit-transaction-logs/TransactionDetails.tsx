import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

const MOCK_TRANSACTIONS = [
  {
    id: "TXN001",
    amount: "₦500,000",
    type: "Commission",
    date: "2025-03-11 10:15 AM",
    status: "Completed",
    method: "Wallet",
    reference: "REF_ABC123XYZ",
    processingTime: "3 seconds",
    fee: "₦5,000",
    net: "₦495,000",
    commission: "₦50,000",
    ip: "192.168.1.25",
    device: "iPhone",
    location: "Lagos, Nigeria",
    from: {
      id: "U12345",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 801 234 5678",
      wallet: "₦2,000,000",
    },
    to: {
      id: "V56789",
      name: "MegaTech Electronics",
      email: "megatech@email.com",
      phone: "+234 902 345 6789",
      earnings: "₦7,500,000",
    },
  },
  {
    id: "TXN002",
    amount: "₦75,000",
    type: "Payout",
    date: "2025-03-11 11:30 AM",
    status: "Pending",
    method: "Bank Transfer",
    reference: "REF_PND789ABC",
    processingTime: "10 minutes",
    fee: "₦1,000",
    net: "₦74,000",
    commission: "₦0",
    ip: "10.0.0.10",
    device: "Android",
    location: "Abuja, Nigeria",
    from: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦15,000,000",
    },
    to: {
      id: "U98765",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+234 803 987 6543",
      earnings: "₦85,000",
    },
  },
  {
    id: "TXN003",
    amount: "₦15,000",
    type: "Refund",
    date: "2025-03-11 12:45 PM",
    status: "Completed",
    method: "Card Payment",
    reference: "REF_RFD456JKL",
    processingTime: "5 seconds",
    fee: "₦0",
    net: "₦15,000",
    commission: "₦0",
    ip: "172.16.0.5",
    device: "Desktop",
    location: "Port Harcourt, Nigeria",
    from: {
      id: "V56789",
      name: "MegaTech Electronics",
      email: "megatech@email.com",
      phone: "+234 902 345 6789",
      earnings: "₦7,485,000",
    },
    to: {
      id: "U22334",
      name: "Michael B.",
      email: "michael.b@email.com",
      phone: "+234 807 543 2109",
      wallet: "₦15,000",
    },
  },
  {
    id: "TXN004",
    amount: "₦1,200,000",
    type: "Subscription",
    date: "2025-03-12 09:00 AM",
    status: "Completed",
    method: "Bank Transfer",
    reference: "REF_SUB998TYU",
    processingTime: "2 minutes",
    fee: "₦1,500",
    net: "₦1,198,500",
    commission: "₦0",
    ip: "192.168.1.30",
    device: "MacBook",
    location: "Lagos, Nigeria",
    from: {
      id: "V11223",
      name: "Global Ads Inc.",
      email: "ads@global.com",
      phone: "+234 806 123 7890",
      earnings: "₦5,000,000",
    },
    to: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦16,198,500",
    },
  },
  {
    id: "TXN005",
    amount: "₦25,000",
    type: "Commission",
    date: "2025-03-12 11:00 AM",
    status: "Failed",
    method: "Wallet",
    reference: "REF_FLD555ZZZ",
    processingTime: "1 second",
    fee: "₦0",
    net: "₦0",
    commission: "₦2,500",
    ip: "192.168.1.18",
    device: "Samsung Galaxy",
    location: "Kano, Nigeria",
    from: {
      id: "U34567",
      name: "Alex Okafor",
      email: "alex.o@email.com",
      phone: "+234 704 567 8901",
      wallet: "₦10,000",
    },
    to: {
      id: "V54321",
      name: "QuickServe Co.",
      email: "quickserve@email.com",
      phone: "+234 905 678 9012",
      earnings: "₦1,200,000",
    },
  },
  {
    id: "TXN006",
    amount: "₦300,000",
    type: "Payout",
    date: "2025-03-12 01:00 PM",
    status: "Completed",
    method: "Bank Transfer",
    reference: "REF_PYT333DEF",
    processingTime: "45 minutes",
    fee: "₦1,000",
    net: "₦299,000",
    commission: "₦0",
    ip: "41.203.15.10",
    device: "Desktop",
    location: "Lagos, Nigeria",
    from: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦15,899,500",
    },
    to: {
      id: "V99887",
      name: "Tech Solutions",
      email: "tech@solutions.com",
      phone: "+234 808 123 4567",
      earnings: "₦300,000",
    },
  },
  {
    id: "TXN007",
    amount: "₦5,000",
    type: "Refund",
    date: "2025-03-12 02:30 PM",
    status: "Pending",
    method: "Wallet",
    reference: "REF_RFD777GHI",
    processingTime: "N/A",
    fee: "₦0",
    net: "₦5,000",
    commission: "₦0",
    ip: "192.168.1.55",
    device: "iPad",
    location: "Enugu, Nigeria",
    from: {
      id: "U77889",
      name: "Ngozi M.",
      email: "ngozi.m@email.com",
      phone: "+234 810 543 8765",
      wallet: "₦50,000",
    },
    to: {
      id: "U77889",
      name: "Ngozi M.",
      email: "ngozi.m@email.com",
      phone: "+234 810 543 8765",
      wallet: "₦55,000",
    },
  },
  {
    id: "TXN008",
    amount: "₦850,000",
    type: "Commission",
    date: "2025-03-13 08:00 AM",
    status: "Completed",
    method: "Bank Transfer",
    reference: "REF_CMN444JKL",
    processingTime: "1 minute",
    fee: "₦2,000",
    net: "₦848,000",
    commission: "₦85,000",
    ip: "105.112.55.1",
    device: "Desktop",
    location: "Ibadan, Nigeria",
    from: {
      id: "U87654",
      name: "Ben Adekunle",
      email: "ben.a@email.com",
      phone: "+234 907 654 3210",
      wallet: "₦3,500,000",
    },
    to: {
      id: "V33445",
      name: "Intercontinental",
      email: "inter@cont.com",
      phone: "+234 809 101 1213",
      earnings: "₦9,000,000",
    },
  },
  {
    id: "TXN009",
    amount: "₦40,000",
    type: "Payout",
    date: "2025-03-13 10:30 AM",
    status: "Failed",
    method: "Wallet",
    reference: "REF_FLD009MNP",
    processingTime: "2 seconds",
    fee: "₦0",
    net: "₦0",
    commission: "₦0",
    ip: "192.168.1.10",
    device: "iPhone",
    location: "Lagos, Nigeria",
    from: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦15,899,500",
    },
    to: {
      id: "U11223",
      name: "Jane Smith",
      email: "jane.s@email.com",
      phone: "+234 802 000 1111",
      earnings: "₦40,000",
    },
  },
  {
    id: "TXN010",
    amount: "₦150,000",
    type: "Subscription",
    date: "2025-03-13 11:45 AM",
    status: "Completed",
    method: "Card Payment",
    reference: "REF_SUB101QRS",
    processingTime: "7 seconds",
    fee: "₦3,000",
    net: "₦147,000",
    commission: "₦0",
    ip: "172.16.0.15",
    device: "Desktop",
    location: "Abuja, Nigeria",
    from: {
      id: "U44556",
      name: "Tunde O.",
      email: "tunde.o@email.com",
      phone: "+234 903 555 6666",
      wallet: "₦500,000",
    },
    to: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦16,046,500",
    },
  },
  {
    id: "TXN011",
    amount: "₦250,000",
    type: "Commission",
    date: "2025-03-13 01:00 PM",
    status: "Pending",
    method: "Bank Transfer",
    reference: "REF_CMN111TUV",
    processingTime: "N/A",
    fee: "₦1,000",
    net: "₦249,000",
    commission: "₦25,000",
    ip: "41.203.20.5",
    device: "Android",
    location: "Kaduna, Nigeria",
    from: {
      id: "U55667",
      name: "Chioma Kalu",
      email: "chioma.k@email.com",
      phone: "+234 805 777 8888",
      wallet: "₦1,500,000",
    },
    to: {
      id: "V44556",
      name: "FinTech Hub",
      email: "fintech@hub.com",
      phone: "+234 906 999 0000",
      earnings: "₦4,000,000",
    },
  },
  {
    id: "TXN012",
    amount: "₦8,000",
    type: "Refund",
    date: "2025-03-14 09:30 AM",
    status: "Completed",
    method: "Wallet",
    reference: "REF_RFD123WXY",
    processingTime: "2 seconds",
    fee: "₦0",
    net: "₦8,000",
    commission: "₦0",
    ip: "192.168.1.40",
    device: "iPhone",
    location: "Lagos, Nigeria",
    from: {
      id: "V54321",
      name: "QuickServe Co.",
      email: "quickserve@email.com",
      phone: "+234 905 678 9012",
      earnings: "₦1,192,000",
    },
    to: {
      id: "U66778",
      name: "Femi A.",
      email: "femi.a@email.com",
      phone: "+234 804 111 2222",
      wallet: "₦8,000",
    },
  },
  {
    id: "TXN013",
    amount: "₦950,000",
    type: "Payout",
    date: "2025-03-14 11:00 AM",
    status: "Completed",
    method: "Bank Transfer",
    reference: "REF_PYT999ZAB",
    processingTime: "1 hour",
    fee: "₦1,500",
    net: "₦948,500",
    commission: "₦0",
    ip: "10.0.0.25",
    device: "Desktop",
    location: "Lagos, Nigeria",
    from: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦15,098,000",
    },
    to: {
      id: "V88990",
      name: "Prime Logistics",
      email: "prime@logistics.com",
      phone: "+234 811 333 4444",
      earnings: "₦950,000",
    },
  },
  {
    id: "TXN014",
    amount: "₦45,000",
    type: "Commission",
    date: "2025-03-14 01:30 PM",
    status: "Failed",
    method: "Card Payment",
    reference: "REF_FLD147CDE",
    processingTime: "4 seconds",
    fee: "₦0",
    net: "₦0",
    commission: "₦4,500",
    ip: "172.16.0.35",
    device: "Android",
    location: "Rivers State, Nigeria",
    from: {
      id: "U77889",
      name: "Ngozi M.",
      email: "ngozi.m@email.com",
      phone: "+234 810 543 8765",
      wallet: "₦55,000",
    },
    to: {
      id: "V56789",
      name: "MegaTech Electronics",
      email: "megatech@email.com",
      phone: "+234 902 345 6789",
      earnings: "₦7,485,000",
    },
  },
  {
    id: "TXN015",
    amount: "₦600,000",
    type: "Subscription",
    date: "2025-03-14 03:00 PM",
    status: "Completed",
    method: "Wallet",
    reference: "REF_SUB789FGH",
    processingTime: "5 seconds",
    fee: "₦0",
    net: "₦600,000",
    commission: "₦0",
    ip: "192.168.1.50",
    device: "MacBook",
    location: "Abuja, Nigeria",
    from: {
      id: "U99001",
      name: "Kunle D.",
      email: "kunle.d@email.com",
      phone: "+234 809 112 3344",
      wallet: "₦1,000,000",
    },
    to: {
      id: "V00101",
      name: "Platform Main",
      email: "platform@system.com",
      phone: "",
      wallet: "₦15,698,000",
    },
  },
];

const TransactionDetails: React.FC = () => {
    const navigate=useNavigate();
  const { id } = useParams<{ id: string }>();
  const txn = MOCK_TRANSACTIONS.find((t) => t.id === id);

  if (!txn) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Transaction not found
      </div>
    );
  }

  return (
    <div className="mb-6 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-8 items-start p-6">
      {/* Left Transaction Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full md:w-3/5 max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{txn.id}</h2>
          <button className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <FaRegCopy />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-2 mb-4 bg-gray-100 p-2 -mx-2 rounded-t-lg">
          <div className="text-gray-600 font-bold ml-2">Label</div>
          <div className="text-gray-600 font-bold ml-2">Value</div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Amount:", value: txn.amount },
            { label: "Transaction Type:", value: txn.type },
            { label: "Date & Time:", value: txn.date },
            {
              label: "Status:",
              value: (
                <span className="text-green-600 font-medium">{txn.status}</span>
              ),
            },
            { label: "Payment Method:", value: txn.method },
            { label: "Reference Code:", value: txn.reference },
            { label: "Processing Time:", value: txn.processingTime },
            { label: "Transaction Fee:", value: txn.fee },
            { label: "Net Amount Received:", value: txn.net },
            { label: "Platform Commission:", value: txn.commission },
            { label: "IP Address:", value: txn.ip },
            { label: "Device Used:", value: txn.device },
            { label: "Geo Location:", value: txn.location },
          ].map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-2"
            >
              <div className="text-gray-600">{item.label}</div>
              <div className="text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Parties Involved Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full md:w-2/5 max-w-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Parties Involved
        </h2>

        <div className="space-y-4">
          {/* From User */}
          <div className="bg-gray-100 p-3 rounded-lg text-gray-800 font-medium">
            From: {txn.from.id} ({txn.from.name})
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="text-gray-600">User Email</div>
            <div className="text-gray-800">{txn.from.email}</div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="text-gray-600">User Phone</div>
            <div className="text-gray-800">{txn.from.phone}</div>
          </div>
          <div className="grid grid-cols-1 gap-1 border-b border-gray-200 pb-4">
            <div className="text-gray-600">Wallet Balance</div>
            <div className="text-gray-800">{txn.from.wallet}</div>
          </div>

          {/* To Vendor */}
          <div className="bg-gray-100 p-3 rounded-lg text-gray-800 font-medium mt-4">
            To: {txn.to.id} ({txn.to.name})
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="text-gray-600">Business Email</div>
            <div className="text-gray-800">{txn.to.email}</div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="text-gray-600">Vendor Phone</div>
            <div className="text-gray-800">{txn.to.phone}</div>
          </div>
          <div className="grid grid-cols-1 gap-1 pb-4">
            <div className="text-gray-600">Total Earnings</div>
            <div className="text-gray-800">{txn.to.earnings}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 mt-6">
          <button className="w-full px-6 py-3 rounded-lg text-white font-medium bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
           onClick={()=>navigate('/user-management-view-user/U1001')}>
            View User Profile
          </button>
          <button className="w-full px-6 py-3 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          onClick={()=>navigate('/vendor-management-view-vendor/VND-1001')}>
            View Vendor Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
