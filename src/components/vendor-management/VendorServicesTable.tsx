import React, { useState } from "react";
import { FaPlusCircle, FaEye, FaBan, FaTimes } from "react-icons/fa"; 
import {showSweetAlert} from '../Includes/SweetAlert2';

const INITIAL_SERVICES = [
  {
    ServiceID: "SVC-001",
    ServiceName: "12.5kg Gas Refill",
    Category: "Gas Refill",
    Status: "Active",
    NumberOfOrders: 120,
    DateListed: "2025-02-10",
    LastUpdated: "2025-03-15",
  },
  {
    ServiceID: "SVC-002",
    ServiceName: "Diesel Supply",
    Category: "Diesel",
    Status: "Inactive",
    NumberOfOrders: 45,
    DateListed: "2025-01-20",
    LastUpdated: "2025-02-28",
  },
  {
    ServiceID: "SVC-003",
    ServiceName: "LPG Cylinder (50kg)",
    Category: "Accessories",
    Status: "Discontinued",
    NumberOfOrders: 30,
    DateListed: "2024-12-05",
    LastUpdated: "2025-01-15",
  },
  {
    ServiceID: "SVC-004",
    ServiceName: "Petrol Supply",
    Category: "Petroleum",
    Status: "Active",
    NumberOfOrders: 95,
    DateListed: "2025-02-18",
    LastUpdated: "2025-03-10",
  },
  {
    ServiceID: "SVC-005",
    ServiceName: "Gas Burner Installation",
    Category: "Accessories",
    Status: "Inactive",
    NumberOfOrders: 10,
    DateListed: "2025-01-05",
    LastUpdated: "2025-02-01",
  },
  {
    ServiceID: "SVC-006",
    ServiceName: "Bulk LPG Supply",
    Category: "Gas Refill",
    Status: "Active",
    NumberOfOrders: 150,
    DateListed: "2025-02-12",
    LastUpdated: "2025-03-12",
  },
];

// Table status colors (unchanged)
const statusColor = {
  Active: "text-green-800",
  Inactive: "text-yellow-800",
  Discontinued: "text-red-800",
};

// --- View Details Modal (Improved UI - Unchanged) ---
const ViewServiceModal = ({ service, onClose }) => (
    service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[350px] w-full max-w-lg transform scale-100 transition-transform duration-300">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Service Details: {service.ServiceID}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Body - Data Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    
                    <div className="col-span-2">
                        <p className="text-gray-500 font-medium">Service Name</p>
                        <p className="text-gray-900 font-semibold text-base">{service.ServiceName}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Service ID</p>
                        <p className="text-gray-800 font-medium">{service.ServiceID}</p>
                    </div>
                    
                    <div>
                        <p className="text-gray-500">Category</p>
                        <p className="text-gray-800 font-medium">{service.Category}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Status</p>
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                service.Status === "Active" ? "bg-green-100 text-green-800" :
                                service.Status === "Inactive" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                            }`}
                        >
                            {service.Status}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500">Total Orders</p>
                        <p className="text-gray-800 font-medium">{service.NumberOfOrders}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Date Listed</p>
                        <p className="text-gray-800 font-medium">{service.DateListed}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Last Updated</p>
                        <p className="text-gray-800 font-medium">{service.LastUpdated}</p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button
                        className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
);

// --- Add Service Modal (Improved UI - Unchanged) ---
const AddServiceModal = ({ newService, setNewService, handleAddService, onClose }) => (
    newService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <form
                className="bg-white rounded-xl shadow-2xl p-6 min-w-[350px] w-full max-w-lg transform scale-100 transition-transform duration-300"
                onSubmit={handleAddService}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Add New Vendor Service</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Body - Form Fields */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    
                    {/* ServiceID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service ID (e.g., SVC-007)</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            type="text" required 
                            placeholder="SVC-XXX"
                            value={newService.ServiceID}
                            onChange={e => setNewService({ ...newService, ServiceID: e.target.value })}
                        />
                    </div>
                    
                    {/* Service Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            type="text" required 
                            placeholder="e.g., 12.5kg Gas Refill"
                            value={newService.ServiceName}
                            onChange={e => setNewService({ ...newService, ServiceName: e.target.value })}
                        />
                    </div>
                    
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            type="text" required 
                            placeholder="e.g., Gas Refill"
                            value={newService.Category}
                            onChange={e => setNewService({ ...newService, Category: e.target.value })}
                        />
                    </div>
                    
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="border border-gray-300 w-full p-2 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={newService.Status}
                            onChange={e => setNewService({ ...newService, Status: e.target.value })}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Discontinued</option>
                        </select>
                    </div>
                    
                    {/* NumberOfOrders */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Orders</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            type="number" required 
                            min="0"
                            placeholder="0"
                            value={newService.NumberOfOrders}
                            onChange={e => setNewService({ ...newService, NumberOfOrders: e.target.value })}
                        />
                    </div>
                    
                    {/* Date Listed */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Listed</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" 
                            type="date" required 
                            value={newService.DateListed}
                            onChange={e => setNewService({ ...newService, DateListed: e.target.value })}
                        />
                    </div>
                    
                    {/* Last Updated */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" 
                            type="date" required 
                            value={newService.LastUpdated}
                            onChange={e => setNewService({ ...newService, LastUpdated: e.target.value })}
                        />
                    </div>
                </div>

                {/* Modal Footer - Actions */}
                <div className="pt-4 border-t flex justify-end space-x-3">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        type="button"
                        onClick={onClose}>Cancel</button>
                    <button className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition-colors text-sm font-medium" type="submit">
                        <FaPlusCircle className="inline mr-2" />Add Service
                    </button>
                </div>
            </form>
        </div>
    )
);

// --- Main Component ---
export default function VendorServicesTable() {
  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [modalService, setModalService] = useState(null);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [newService, setNewService] = useState({
    ServiceID: "",
    ServiceName: "",
    Category: "",
    Status: "Active",
    NumberOfOrders: 0,
    DateListed: "",
    LastUpdated: "",
  });

  const openAddPopup = () => {
    setAddPopupOpen(true);
    setNewService({
      ServiceID: "",
      ServiceName: "",
      Category: "",
      Status: "Active",
      NumberOfOrders: 0,
      DateListed: "",
      LastUpdated: "",
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const serviceToAdd = {
        ...newService,
        ServiceID: newService.ServiceID || `SVC-${String(services.length + 1).padStart(3, '0')}`,
        LastUpdated: newService.LastUpdated || date, 
    };

    setServices([...services, serviceToAdd]);
    setAddPopupOpen(false);
    showSweetAlert('Service Added Successfully!', 'success');
  };

  const closeViewModal = () => setModalService(null);
  const closeAddModal = () => setAddPopupOpen(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Vendor Services Table
          </h2>
        </div>
        <div className="overflow-auto p-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 tracking-wider">
              <tr>
                <th className="px-2 py-2 text-left font-medium">ServiceID</th>
                <th className="px-2 py-2 text-left font-medium">ServiceName</th>
                <th className="px-2 py-2 text-left font-medium">Category</th>
                <th className="px-2 py-2 text-left font-medium">Status</th>
                <th className="px-2 py-2 text-left font-medium">NumberOfOrders</th>
                <th className="px-2 py-2 text-left font-medium">DateListed</th>
                <th className="px-2 py-2 text-left font-medium">LastUpdated</th>
                <th className="px-2 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
              {services.map((svc, idx) => (
                <tr key={svc.ServiceID || idx}>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.ServiceID}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.ServiceName}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.Category}</td>
                  <td className={`px-2 py-2 whitespace-nowrap`}>
                    <span
                      className={`inline-flex items-center px-1 py-0.5 rounded-full font-medium ${statusColor[svc.Status]}`}
                    >
                      {svc.Status}
                    </span>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.NumberOfOrders}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.DateListed}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{svc.LastUpdated}</td>
                  <td className="px-2 py-2 whitespace-nowrap flex gap-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => setModalService(svc)}
                      title="View"
                    >
                      View
                    </button>
                    <button
                      className="text-orange-500 hover:text-orange-700 cursor-pointer"
                      title="Deactivate"
                      onClick={()=>{showSweetAlert('Deactivated Service','success') }}
                    >
                      / Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={openAddPopup}
        // REVERTED to the original button style
        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm mb-6 flex items-center"
      >
        <FaPlusCircle className="mr-2" />
        Service Action Button
      </button>

      {/* Render the improved modals */}
      {addPopupOpen && (
        <AddServiceModal 
            newService={newService} 
            setNewService={setNewService} 
            handleAddService={handleAddService} 
            onClose={closeAddModal} 
        />
      )}
      {modalService && <ViewServiceModal service={modalService} onClose={closeViewModal} />}
    </div>
  );
}