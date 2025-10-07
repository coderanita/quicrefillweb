import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { FaSortDown, FaEdit, FaBan } from "react-icons/fa";
import ReusableTable from "../Includes/ReusableTable";
import ValidityRangePicker from "./ValidityRangePicker"; // import your date range picker
import { format } from "date-fns";
import { showSweetAlert } from "../Includes/SweetAlert2";

// Mock coupon data as an array
const mockCouponData = [
  {
    id: "SPRING20",
    code: "SPRING20",
    discountType: "Order Percentage",
    discountValue: "50% Off",
    status: "Active",
    totalUsage: 83,
    remainingUsage: 17,
    validity: {
      startDate: new Date("2025-02-19"),
      endDate: new Date("2025-02-24"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "SUMMER2025",
    code: "SUMMER2025",
    discountType: "Percentage",
    discountValue: "70% Off",
    status: "Active",
    totalUsage: 100,
    remainingUsage: 20,
    validity: {
      startDate: new Date("2025-03-20"),
      endDate: new Date("2025-03-27"),
    },
    targetAudience: "All customers",
  },
  {
    id: "FLASH3001",
    code: "FLASH3001",
    discountType: "Percentage",
    discountValue: "40% Off",
    status: "Expired",
    totalUsage: 75,
    remainingUsage: 10,
    validity: {
      startDate: new Date("2026-06-22"),
      endDate: new Date("2026-06-27"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "WINTERPREMIUM02",
    code: "WINTERPREMIUM02",
    discountType: "Fixed Amount",
    discountValue: "500 Off",
    status: "Pending",
    totalUsage: 187,
    remainingUsage: 38,
    validity: {
      startDate: new Date("2026-03-14"),
      endDate: new Date("2026-04-30"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "SPRING1003",
    code: "SPRING1003",
    discountType: "Percentage",
    discountValue: "10% Off",
    status: "Active",
    totalUsage: 281,
    remainingUsage: 99,
    validity: {
      startDate: new Date("2025-01-26"),
      endDate: new Date("2025-02-03"),
    },
    targetAudience: "Specific products",
  },
  {
    id: "WELCOME1004",
    code: "WELCOME1004",
    discountType: "Order Percentage",
    discountValue: "20% Off",
    status: "Expired",
    totalUsage: 496,
    remainingUsage: 199,
    validity: {
      startDate: new Date("2025-09-05"),
      endDate: new Date("2025-09-22"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "GIFTVIP05",
    code: "GIFTVIP05",
    discountType: "Free Shipping",
    discountValue: "Free",
    status: "Expired",
    totalUsage: 492,
    remainingUsage: 196,
    validity: {
      startDate: new Date("2025-02-12"),
      endDate: new Date("2025-02-22"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "SUMMERVIP06",
    code: "SUMMERVIP06",
    discountType: "Free Shipping",
    discountValue: "Free",
    status: "Inactive",
    totalUsage: 396,
    remainingUsage: 12,
    validity: {
      startDate: new Date("2026-06-07"),
      endDate: new Date("2026-07-11"),
    },
    targetAudience: "New customers",
  },
  {
    id: "AUTUMNSALE07",
    code: "AUTUMNSALE07",
    discountType: "Percentage",
    discountValue: "40% Off",
    status: "Inactive",
    totalUsage: 273,
    remainingUsage: 15,
    validity: {
      startDate: new Date("2026-05-09"),
      endDate: new Date("2026-06-06"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "WELCOMESALE08",
    code: "WELCOMESALE08",
    discountType: "Order Percentage",
    discountValue: "30% Off",
    status: "Inactive",
    totalUsage: 207,
    remainingUsage: 7,
    validity: {
      startDate: new Date("2026-09-07"),
      endDate: new Date("2026-09-30"),
    },
    targetAudience: "All customers",
  },
  {
    id: "AUTUMNSALE09",
    code: "AUTUMNSALE09",
    discountType: "Free Shipping",
    discountValue: "Free",
    status: "Expired",
    totalUsage: 247,
    remainingUsage: 66,
    validity: {
      startDate: new Date("2026-08-25"),
      endDate: new Date("2026-10-13"),
    },
    targetAudience: "Specific products",
  },
  {
    id: "AUTUMNSALE10",
    code: "AUTUMNSALE10",
    discountType: "Order Percentage",
    discountValue: "15% Off",
    status: "Expired",
    totalUsage: 385,
    remainingUsage: 1,
    validity: {
      startDate: new Date("2025-06-04"),
      endDate: new Date("2025-06-25"),
    },
    targetAudience: "New customers",
  },
  {
    id: "WINTERVIP11",
    code: "WINTERVIP11",
    discountType: "Percentage",
    discountValue: "10% Off",
    status: "Inactive",
    totalUsage: 372,
    remainingUsage: 169,
    validity: {
      startDate: new Date("2026-09-25"),
      endDate: new Date("2026-10-17"),
    },
    targetAudience: "Specific products",
  },
  {
    id: "AUTUMN5012",
    code: "AUTUMN5012",
    discountType: "Order Percentage",
    discountValue: "10% Off",
    status: "Active",
    totalUsage: 289,
    remainingUsage: 47,
    validity: {
      startDate: new Date("2026-04-23"),
      endDate: new Date("2026-06-09"),
    },
    targetAudience: "Loyal customers",
  },
  {
    id: "AUTUMNVIP13",
    code: "AUTUMNVIP13",
    discountType: "Order Percentage",
    discountValue: "30% Off",
    status: "Expired",
    totalUsage: 464,
    remainingUsage: 48,
    validity: {
      startDate: new Date("2025-12-14"),
      endDate: new Date("2026-01-21"),
    },
    targetAudience: "Specific products",
  }
];


const mockUsageData = [
  {
    date: "26/03/2025",
    couponCode: "AUTUMN5012",
    userName: "John Doe",
    userId: "U-1001",
    email: "john@email.com",
    orderId: "ORD-5678",
    discount: "10,000",
    original: "100,000",
    final: "90,000"
  },
  {
    date: "25/03/2025",
    couponCode: "WINTERPREMIUM02",
    userName: "Jane Smith",
    userId: "U-1002",
    email: "jane@email.com",
    orderId: "ORD-5679",
    discount: "20,000",
    original: "200,000",
    final: "180,000"
  },
  {
    date: "24/03/2025",
    couponCode: "SUMMERVIP06",
    userName: "Heidi Green",
    userId: "U-1003",
    email: "heidi.green@corp.com",
    orderId: "ORD-5680",
    discount: "5,000",
    original: "160,000",
    final: "155,000"
  },
  {
    date: "23/03/2025",
    couponCode: "SPRING20",
    userName: "Alice Davis",
    userId: "U-1004",
    email: "alice.davis@corp.com",
    orderId: "ORD-5681",
    discount: "5,000",
    original: "230,000",
    final: "225,000"
  },
  {
    date: "22/03/2025",
    couponCode: "SUMMER2025",
    userName: "Mike Foster",
    userId: "U-1005",
    email: "mike.foster@corp.com",
    orderId: "ORD-5682",
    discount: "15,000",
    original: "110,000",
    final: "95,000"
  },
  {
    date: "21/03/2025",
    couponCode: "GIFTVIP05",
    userName: "Alice Ames",
    userId: "U-1006",
    email: "alice.ames@corp.com",
    orderId: "ORD-5683",
    discount: "5,000",
    original: "300,000",
    final: "295,000"
  },
  {
    date: "20/03/2025",
    couponCode: "",
    userName: "Ivan Lee",
    userId: "U-1007",
    email: "ivan.lee@corp.com",
    orderId: "ORD-5684",
    discount: "5,000",
    original: "150,000",
    final: "145,000"
  },
  {
    date: "19/03/2025",
    couponCode: "AUTUMNSALE09",
    userName: "Kyle Miller",
    userId: "U-1008",
    email: "kyle.miller@corp.com",
    orderId: "ORD-5685",
    discount: "10,000",
    original: "230,000",
    final: "220,000"
  },
  {
    date: "18/03/2025",
    couponCode: "WELCOMESALE08",
    userName: "Heidi Lee",
    userId: "U-1009",
    email: "heidi.lee@corp.com",
    orderId: "ORD-5686",
    discount: "10,000",
    original: "230,000",
    final: "220,000"
  },
  {
    date: "17/03/2025",
    couponCode: "FLASH3001",
    userName: "Alice Ames",
    userId: "U-1010",
    email: "alice.ames@corp.com",
    orderId: "ORD-5687",
    discount: "15,000",
    original: "60,000",
    final: "45,000"
  },
  {
    date: "16/03/2025",
    couponCode: "",
    userName: "Heidi Foster",
    userId: "U-1011",
    email: "heidi.foster@corp.com",
    orderId: "ORD-5688",
    discount: "5,000",
    original: "70,000",
    final: "65,000"
  },
  {
    date: "15/03/2025",
    couponCode: "WINTERVIP11",
    userName: "Frank Irwin",
    userId: "U-1012",
    email: "frank.irwin@corp.com",
    orderId: "ORD-5689",
    discount: "15,000",
    original: "110,000",
    final: "95,000"
  },
  {
    date: "14/03/2025",
    couponCode: "AUTUMNSALE10",
    userName: "Judy Jones",
    userId: "U-1013",
    email: "judy.jones@corp.com",
    orderId: "ORD-5690",
    discount: "15,000",
    original: "140,000",
    final: "125,000"
  },
  {
    date: "13/03/2025",
    couponCode: "SPRING1003",
    userName: "Bob King",
    userId: "U-1014",
    email: "bob.king@corp.com",
    orderId: "ORD-5691",
    discount: "15,000",
    original: "90,000",
    final: "75,000"
  },
  {
    date: "12/03/2025",
    couponCode: "AUTUMNSALE07",
    userName: "Judy Clark",
    userId: "U-1015",
    email: "judy.clark@corp.com",
    orderId: "ORD-5692",
    discount: "20,000",
    original: "30,000",
    final: "10,000"
  },
  {
    date: "27/03/2025",
    couponCode: "WELCOME1004",
    userName: "Generated User 1",
    userId: "U-2001",
    email: "generated.user1@mock.com",
    orderId: "ORD-6001",
    discount: "7,500",
    original: "120,000",
    final: "112,500"
  },
  {
    date: "27/03/2025",
    couponCode: "AUTUMNVIP13",
    userName: "Generated User 2",
    userId: "U-2002",
    email: "generated.user2@mock.com",
    orderId: "ORD-6002",
    discount: "7,500",
    original: "120,000",
    final: "112,500"
  }
];

export default function CouponDetails() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [usage, setUsage] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

useEffect(() => {
  // Find coupon by id or code
  const filteredCoupon = mockCouponData.find(c => c.id === id || c.code === id);

  if (filteredCoupon) {
    setCoupon(filteredCoupon);
    setFormData(filteredCoupon);
  } else {
    setCoupon(null);
  }

  // Filter usage data for this coupon
  const filteredUsage = mockUsageData.filter(u => u.couponCode === id || u.couponCode === filteredCoupon?.code);
  setUsage(filteredUsage);
}, [id]);


  if (!coupon) return <p className="text-center mt-10">Loading coupon...</p>;

  const handleEditToggle = () => {
    if (isEditing) {
      // Validate required fields
      const requiredFields = ["code", "discountType", "discountValue", "status", "validity", "targetAudience"];
      for (let field of requiredFields) {
        if (
          !formData[field] ||
          (field === "validity" && (!formData.validity.startDate || !formData.validity.endDate))
        ) {
          showSweetAlert("Please fill all required fields", "error");
          return;
        }
      }

      setCoupon(formData);
      showSweetAlert("Coupon updated successfully!", "success");
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Coupon Code", accessor: "couponCode" },
    { header: "User Name", accessor: "userName" },
    { header: "User ID", accessor: "userId" },
    { header: "Email", accessor: "email" },
    {
      header: (
        <span className="flex items-center">
          Order ID <FaSortDown className="ml-1 text-gray-400" />
        </span>
      ),
      accessor: "orderId",
    },
    { header: "Discount Applied (₦)", accessor: "discount" },
    { header: "Original Price (₦)", accessor: "original" },
    {
      header: (
        <span className="flex items-center">
          Final Price (₦) <FaSortDown className="ml-1 text-gray-400" />
        </span>
      ),
      accessor: "final",
    },
  ];

  // Editable fields configuration
  const fields = [
    { label: "Coupon code", field: "code", type: "text", editable: true },
    { label: "Discount type", field: "discountType", type: "select", options: ["Percentage", "Order Percentage", "Fixed Amount"], editable: true },
    { label: "Discount value", field: "discountValue", type: "text", editable: true },
    { label: "Status", field: "status", type: "select", options: ["Active", "Inactive"], editable: true },
    { label: "Total usage", field: "totalUsage", type: "number", editable: false },
    { label: "Remaining usage", field: "remainingUsage", type: "number", editable: false },
    { label: "Validity", field: "validity", type: "daterange", editable: true },
    { label: "Target audience", field: "targetAudience", type: "text", editable: true },
  ];

  return (
    <div className="p-6">
      {/* Coupon Details */}
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{coupon.code}</h2>

        <div className="grid grid-cols-2 gap-y-2">
          {fields.map(({ label, field, type, options, editable }) => (
            <React.Fragment key={field}>
              <div className="px-4 py-2 text-gray-600 text-sm border-b border-gray-200 font-medium">{label}:</div>
              <div className="px-4 py-2 text-gray-800 text-sm border-b border-gray-200">
                {isEditing && editable ? (
                  type === "daterange" ? (
                    <ValidityRangePicker
                      value={formData.validity}
                      onChange={(val) => handleChange("validity", val)}
                    />
                  ) : type === "select" ? (
                    <select
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    >
                      {options.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                    />
                  )
                ) : type === "daterange" ? (
                  `${format(coupon.validity.startDate, "d MMM")} - ${format(coupon.validity.endDate, "d MMM")}`
                ) : (
                  <span className={field === "status" && coupon.status === "Active" ? "text-green-500" : ""}>
                    {coupon[field]}
                  </span>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleEditToggle}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            <FaEdit /> {isEditing ? "Save" : "Edit coupon"}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          onClick={()=>showSweetAlert('Coupon Suspended !!',"info")}
          >
            <FaBan /> Suspend coupon
          </button>
        </div>
      </div>

      {/* Coupon Usage Table */}
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 p-6 pb-4">Coupon Usage Table</h2>
          <div className="p-4">
            <ReusableTable columns={columns} data={usage} />
          </div>
        </div>
      </div>
    </div>
  );
}
