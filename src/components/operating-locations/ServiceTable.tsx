import React, { useState, useEffect } from "react";
import { MOCK_LOCATIONS2 } from "../../MockData/OperatingLocationsData";

// React component
const ServiceTable = ({ locationId }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const location = MOCK_LOCATIONS2.find((loc) => loc.id === locationId);
    setServices(location?.serviceData || []);
  }, [locationId]);

  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    );
  };

  return (
    <div className="max-w-full mx-auto bg-white rounded-xl shadow overflow-hidden mb-6">
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 text-xs">
          <tr>
            <th className="py-3 px-6">Service Name</th>
            <th className="py-3 px-6">User Stats</th>
            <th className="py-3 px-6">Revenue</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Date Created</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {services.map((service) => (
            <tr key={service.id}>
              <td className="py-3 px-6">{service.name}</td>
              <td className="py-3 px-6">{service.stats}</td>
              <td className="py-3 px-6">{service.revenue}</td>
              <td className="py-3 px-6">
                <span
                  className={`status-label font-medium ${
                    service.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {service.status}
                </span>
              </td>
              <td className="py-3 px-6">{service.dateCreated}</td>
              <td className="py-3 px-6 flex items-center space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.isActive}
                    onChange={() => toggleService(service.id)}
                    className="sr-only toggle-input"
                  />
                  <div
                    className={`toggle-bg relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      service.isActive ? "bg-yellow-400" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                        service.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </label>
                <i className="fas fa-pen text-gray-500 hover:text-blue-600 cursor-pointer"></i>
                <i className="fas fa-trash text-gray-500 hover:text-red-500 cursor-pointer"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
