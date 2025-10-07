import React, { useState } from "react";
import {
  FaInfoCircle,
  FaEdit,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
  FaCalendarAlt,
} from "react-icons/fa";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import ReusableTable from "../Includes/ReusableTable";
import { confirmDelete, showSweetAlert } from "../Includes/SweetAlert2";
import ValidityRangePicker from "./ValidityRangePicker";

export const CouponManagement = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  // Table columns
  const couponColumns = [
    { header: "Coupon Code", accessor: "code" },
    { header: "Discount Type", accessor: "discountType" },
    { header: "Discount Value", accessor: "discountValue" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Usage", accessor: "usage" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center space-x-3 text-sm">
          {/* --- Toggle Button --- */}
          <button
            onClick={() => handleToggleStatus(row.code)}
            className="text-lg"
            title={row.status === "Active" ? "Deactivate" : "Activate"}
          >
            {row.status === "Active" ? (
              <FaToggleOn className="text-xl text-yellow-500 hover:text-yellow-600 transition duration-150" />
            ) : (
              <FaToggleOff className="text-xl text-gray-400 hover:text-gray-500 transition duration-150" />
            )}
          </button>

          {/* --- Edit --- */}
          <a href={"/system-coupon-settings-details/"+row.code} className="text-yellow-500 hover:text-yellow-600 text-sm" title="Edit">
            <FaEdit />
          </a>

          {/* --- Delete --- */}
          <button
            className="text-gray-500 hover:text-gray-600 text-sm"
            onClick={() => confirmDelete(setCouponData,"code",row.code,"Coupon")}
            title="Delete"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

const [couponData, setCouponData] = useState([
  // Original Records (Updated to align with mockCouponData codes where possible)
  { code: "SUMMER2025", discountType: "Percentage", discountValue: "70% Off", status: "Active", usage: 100 },
  { code: "SPRING20", discountType: "Order Percentage", discountValue: "50% Off", status: "Active", usage: 83 },
  
  // Extended Records (Matching mockCouponData)
  { code: "FLASH3001", discountType: "Percentage", discountValue: "40% Off", status: "Inactive", usage: 75 },
  { code: "WINTERPREMIUM02", discountType: "Fixed Amount", discountValue: "500 Off", status: "Active", usage: 187 },
  { code: "SPRING1003", discountType: "Percentage", discountValue: "10% Off", status: "Active", usage: 281 },
  { code: "WELCOME1004", discountType: "Order Percentage", discountValue: "20% Off", status: "Inactive", usage: 496 },
  { code: "GIFTVIP05", discountType: "Free Shipping", discountValue: "Free", status: "Inactive", usage: 492 },
  { code: "SUMMERVIP06", discountType: "Free Shipping", discountValue: "Free", status: "Inactive", usage: 396 },
  { code: "AUTUMNSALE07", discountType: "Percentage", discountValue: "40% Off", status: "Inactive", usage: 273 },
  { code: "WELCOMESALE08", discountType: "Order Percentage", discountValue: "30% Off", status: "Inactive", usage: 207 },
  { code: "AUTUMNSALE09", discountType: "Free Shipping", discountValue: "Free", status: "Inactive", usage: 247 },
  { code: "AUTUMNSALE10", discountType: "Order Percentage", discountValue: "15% Off", status: "Inactive", usage: 385 },
  { code: "WINTERVIP11", discountType: "Percentage", discountValue: "10% Off", status: "Inactive", usage: 372 },
  { code: "AUTUMN5012", discountType: "Order Percentage", discountValue: "10% Off", status: "Active", usage: 289 },
  { code: "AUTUMNVIP13", discountType: "Order Percentage", discountValue: "30% Off", status: "Inactive", usage: 464 },
]);

  // Form state
  const [form, setForm] = useState({
    code: "SPRING25",
    discountValue: "50% off",
    maxPerUser: 1,
    discountType: "Percentage",
    validityStart: "",
    validityEnd: "",
    totalLimit: 100,
    targetAudience: "New users",
  });

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCoupon = () => {
    if (!form.code || !form.discountValue || !form.validityStart || !form.validityEnd) {
      showSweetAlert("Please fill all required fields", "error");
      return;
    }

    const newCoupon = {
      code: form.code,
      discountType: form.discountType,
      discountValue: form.discountValue,
      status: "Active",
      usage: 0,
    };
    setCouponData([newCoupon, ...couponData]);
    showSweetAlert("Coupon created successfully!", "success");
  };

  const handleToggleStatus = (code) => {
    setCouponData((prev) =>
      prev.map((coupon) =>
        coupon.code === code
          ? { ...coupon, status: coupon.status === "Active" ? "Inactive" : "Active" }
          : coupon
      )
    );
  };

  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} userId={userId} />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Coupon Management"
            breadcrumbs={[]}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            showExportButton={false}
            showSearchBox={true}
          />

          {/* --- Stats Cards --- */}
          <div className="bg-gray-100 mb-6 flex flex-col md:flex-row gap-6 items-start max-w-full mx-auto">
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              {/* Active Coupons */}
              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-gray-700 text-base font-medium">Total Active Coupons</h4>
                  <FaInfoCircle className="text-gray-400" />
                </div>
                <p className="text-4xl font-bold text-gray-800">
                  {couponData.filter((c) => c.status === "Active").length}
                </p>
              </div>

              {/* Total Redeemed */}
              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-base font-medium">Total Redeem Coupons</h3>
                  <FaInfoCircle className="text-gray-400" />
                </div>
                <p className="text-4xl font-bold text-gray-800">
                  {couponData.reduce((sum, c) => sum + c.usage, 0)}
                </p>
              </div>

              {/* Most Used Coupon */}
              <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xs">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-base font-medium">Most Used Coupon</h3>
                  <FaInfoCircle className="text-gray-400" />
                </div>
                {couponData.length > 0 && (
                  <>
                    <p className="text-2xl font-bold text-gray-800">
                      #{[...couponData].sort((a, b) => b.usage - a.usage)[0].code}
                    </p>
                    <p className="text-lg text-gray-500">
                      {[...couponData].sort((a, b) => b.usage - a.usage)[0].usage} uses
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* --- Coupon Form --- */}
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl mx-4">
              <h1 className="text-xl font-semibold text-gray-800 mb-6">Create Coupon</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-8">
                <div className="flex flex-col space-y-1">
                  <label className="text-gray-700 text-sm font-medium">Coupon Code</label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => handleFormChange("code", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-gray-700 text-sm font-medium">Discount Value</label>
                  <input
                    type="text"
                    value={form.discountValue}
                    onChange={(e) => handleFormChange("discountValue", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-gray-700 text-sm font-medium">Max Limit Per User</label>
                  <input
                    type="number"
                    value={form.maxPerUser}
                    onChange={(e) => handleFormChange("maxPerUser", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-gray-700 text-sm font-medium">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => handleFormChange("discountType", e.target.value)}
                    className="bg-white w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>

              <div className="flex flex-col space-y-1">
            <label className="text-gray-700 text-sm font-medium">Validity</label>
            <ValidityRangePicker
              value={{ startDate: form.validityStart, endDate: form.validityEnd }}
              onChange={(range) => {
                handleFormChange("validityStart", range.startDate);
                handleFormChange("validityEnd", range.endDate);
              }}
            />
          </div>


                <div className="flex flex-col space-y-1">
                  <label className="text-gray-700 text-sm font-medium">Total Max Limit</label>
                  <input
                    type="number"
                    value={form.totalLimit}
                    onChange={(e) => handleFormChange("totalLimit", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1 mb-8 w-full md:w-1/3">
                <label className="text-gray-700 text-sm font-medium">Target Audience</label>
                <input
                  type="text"
                  value={form.targetAudience}
                  onChange={(e) => handleFormChange("targetAudience", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>

              <div className="flex justify-start">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-300"
                  onClick={handleCreateCoupon}
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          {/* --- Table --- */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <ReusableTable
              title="Coupons"
              columns={couponColumns}
              data={couponData}
              rowsPerPage={5}
              showPagination
            />
          </div>
        </main>
      </div>
    </div>
  );
};
