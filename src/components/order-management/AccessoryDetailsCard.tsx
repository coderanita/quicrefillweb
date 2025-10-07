import { useState } from "react";

export const AccessoryDetailsCard = ({ data }) => {
  const [location, setLocation] = useState(data.location);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(data.paymentStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleStatusSelect = (status) => {
    setPaymentStatus(status);
    setIsDropdownOpen(false);
  };

  const handleLocationChange = () => setIsEditingLocation(true);
  const handleLocationSave = () => setIsEditingLocation(false);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">

        {/* Left Section */}
        <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-300">
          <div className="space-y-4 divide-y divide-solid divide-gray-200">
            <div className="font-medium">
              Accessory ID: <span className="text-yellow-600">{data.id}</span>
            </div>
            <div className="pt-4">
              <div className="text-sm text-gray-500">Customer name</div>
              <div className="font-medium">{data.customerName}</div>
            </div>
            <div className="pt-4">
              <div className="text-sm text-gray-500">Contact</div>
              <div className="font-medium">{data.contact}</div>
            </div>
            <div className="pt-4">
              <div className="text-sm text-gray-500">Location</div>
              {isEditingLocation ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                  />
                  <button
                    onClick={handleLocationSave}
                    className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="font-medium">
                  {location}
                  <button
                    onClick={handleLocationChange}
                    className="ml-2 mt-2 px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-300">
          <div className="space-y-4 divide-y divide-solid divide-gray-200">
            <div className="text-yellow-600 font-semibold">Item in order</div>
            <div className="pt-4 flex justify-between">
              <div>
                <div>• {data.item.name}</div>
                <div className="text-sm text-gray-500">Quantity: {data.item.quantity}</div>
              </div>
              <div className="font-semibold">₦{data.item.price.toLocaleString()}</div>
            </div>
            <div className="pt-4 flex justify-between text-gray-700">
              <span>Service fee</span>
              <span>₦{data.serviceFee.toLocaleString()}</span>
            </div>
            <div className="pt-4 flex justify-between font-medium items-center">
              <div className="flex items-center gap-2">
                <span>Total fee</span>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center border border-2 text-xs px-2 py-1 rounded ${
                      paymentStatus === "Paid"
                        ? "text-green-600 border-green-600"
                        : "text-red-600 border-red-600"
                    }`}
                  >
                    {paymentStatus} <i className="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {isDropdownOpen && (
                    <ul
                      className="absolute mt-1 w-24 bg-white border border-gray-200 rounded shadow text-sm z-10"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <li
                        onClick={() => handleStatusSelect("Paid")}
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-green-600"
                      >
                        Paid
                      </li>
                      <li
                        onClick={() => handleStatusSelect("Unpaid")}
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-red-600"
                      >
                        Unpaid
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <span>₦{data.totalFee.toLocaleString()}</span>
            </div>
            <div className="pt-4 flex justify-between">
              <span>Payment</span>
              <span className="text-gray-600">{data.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4 md:p-6">
          <div className="space-y-4 divide-y divide-solid divide-gray-200">
            <div className="text-red-600 font-semibold">Report</div>
            <div className="pt-4 text-sm text-gray-700">
              <div className="font-medium">Risk factors</div>
              <div>{data.report.riskFactors}</div>
            </div>
            <div className="pt-4 text-sm text-gray-700">
              <div className="font-medium">Internal notes</div>
              {data.report.internalNotes.map((note, index) => (
                <div key={index}>{note}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-4 py-4 md:px-6 bg-white flex justify-center gap-2">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Mark as resolved</button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">Investigate further</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Block user</button>
      </div>
    </div>
  );
};
