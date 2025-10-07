import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Includes/Header";
import Sidebar from "../Includes/Sidebar";
import PageHeaderWithFilters from "../Includes/PageHeaderWithFilters";
import { showSweetAlert } from "../Includes/SweetAlert2";

export const StaffManagementAdd = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    twoFactorAuth: false,
    emailNotifications: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.username.trim()) tempErrors.username = "Username is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.role) tempErrors.role = "Please select a role";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //console.log("✅ Form Submitted:", formData);
      showSweetAlert("Form Submitted",'success');
      navigate("/staff-management");
    }
  };

  const handleCancel = () => {
    navigate("/staff-management");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userId={userId}
      />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageHeaderWithFilters
            title="Add New Staff"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Staff Management", href: "/staff-management" },
              { label: "Add New Staff" },
            ]}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showExportButton={false}
            showSearchBox={false}
            showBackButton={true}
            showDateSelector={false}
          />

          {/* --- Form Content --- */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add Staff Form</h1>
            <p className="text-gray-600 mb-6">
              Provide all the required information to add a new admin
            </p>

            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <h2 className="text-lg font-medium text-gray-700 mb-4">Personal Details</h2>

              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Provide phone number"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Login Credentials */}
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Login Credentials
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create login password"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm login password"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Role Assignment */}
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Role Assignment
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Assign Role<span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full border border-gray-400 rounded py-2 px-3 bg-white shadow focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a role</option>
                  <option>Operations Admin</option>
                  <option>Finance Admin</option>
                  <option>Support Staff</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* Account Settings */}
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Account Settings
              </h2>

              <div className="mb-4 flex items-center">
                <label className="text-gray-700 text-sm font-bold mr-4">
                  Two-Factor Authentication
                </label>
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                />
              </div>

              <div className="mb-6 flex items-center">
                <label className="text-gray-700 text-sm font-bold mr-4">
                  Receive Email Notifications
                </label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-40"
                >
                  Create 
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-40"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
