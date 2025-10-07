import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHourglassHalf, FaRegClone } from "react-icons/fa"; // example icons
import {PendingServicesData} from "../../MockData/PendingServiceData";

const PendingServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the pending service by ID
  const service = PendingServicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Pending service not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left section - Service details */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:w-7/12">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">{service.id}</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <FaRegClone className="h-5 w-5" />
          </button>
        </div>

        {/* Service Information Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Field
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 text-gray-500">Service Name</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.serviceName}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Vendor Contact</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.vendorContact}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Category</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.category}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Service Status</td>
                <td className="px-4 py-2 font-medium text-yellow-600 flex items-center gap-2">
                  {service.status} <FaHourglassHalf />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Submission Date</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.submissionDate}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Price Per Unit</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.price}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Estimated Delivery</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.estimatedDelivery}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Service Location</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.location}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Service Radius</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.radius}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Business Hours</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.businessHours}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">
                  Minimum Order Quantity
                </td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.minOrder}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Delivery Fee (per km)</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.deliveryFee}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-500">Geo Location</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {service.geoLocation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm">
            Approve Service
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm">
            Reject Service
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm">
            Request Service Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingServiceDetails;
