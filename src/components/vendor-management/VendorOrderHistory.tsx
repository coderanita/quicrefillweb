import React, { useState, useEffect } from 'react';

// Sample data for the table
const initialOrders = [
  { id: 'ORD-5601', date: '2025-03-10', deliveryRep: 'John Doe', status: 'Completed', deliveryTime: '28 mins', serviceType: 'Gas Refill', paymentType: 'On delivery' },
  { id: 'ORD-5602', date: '2025-03-09', deliveryRep: 'Jane Smith', status: 'Completed', deliveryTime: '31 mins', serviceType: 'Gas Refill', paymentType: 'Wallet' },
  { id: 'ORD-5603', date: '2025-03-09', deliveryRep: 'Ibrahim Musa', status: 'In Progress', deliveryTime: '43 mins', serviceType: 'Petroleum', paymentType: 'Flutterwave' },
  { id: 'ORD-5604', date: '2025-03-08', deliveryRep: 'Ngozi Okeke', status: 'Completed', deliveryTime: '34 mins', serviceType: 'Gas Refill', paymentType: 'On delivery' },
  { id: 'ORD-5605', date: '2025-03-07', deliveryRep: 'Anthony Ade', status: 'Canceled', deliveryTime: '34 mins', serviceType: 'Gas Refill', paymentType: 'Wallet' },
  { id: 'ORD-5606', date: '2025-03-06', deliveryRep: 'Peter Ojo', status: 'Disputed', deliveryTime: '55 mins', serviceType: 'Electricity', paymentType: 'Flutterwave' },
  { id: 'ORD-5607', date: '2025-03-06', deliveryRep: 'Mary Idowu', status: 'Completed', deliveryTime: '20 mins', serviceType: 'Accessories', paymentType: 'On delivery' },
  { id: 'ORD-5608', date: '2025-03-05', deliveryRep: 'David Emeka', status: 'In Progress', deliveryTime: '40 mins', serviceType: 'Gas Refill', paymentType: 'Wallet' },
  { id: 'ORD-5609', date: '2025-03-05', deliveryRep: 'Femi Abiodun', status: 'Completed', deliveryTime: '25 mins', serviceType: 'Diesel', paymentType: 'On delivery' },
  { id: 'ORD-5610', date: '2025-03-04', deliveryRep: 'Grace Uzoma', status: 'In Transit', deliveryTime: '15 mins', serviceType: 'Gas Refill', paymentType: 'Flutterwave' },
  { id: 'ORD-5611', date: '2025-03-03', deliveryRep: 'Lola Okoye', status: 'Completed', deliveryTime: '30 mins', serviceType: 'Petroleum', paymentType: 'On delivery' },
  { id: 'ORD-5612', date: '2025-03-02', deliveryRep: 'Bayo Adewale', status: 'Canceled', deliveryTime: '45 mins', serviceType: 'Accessories', paymentType: 'Wallet' },
  { id: 'ORD-5613', date: '2025-03-01', deliveryRep: 'Sade Johnson', status: 'Completed', deliveryTime: '33 mins', serviceType: 'Gas Refill', paymentType: 'On delivery' },
  { id: 'ORD-5614', date: '2025-02-28', deliveryRep: 'Tunde Oladele', status: 'In Progress', deliveryTime: '50 mins', serviceType: 'Diesel', paymentType: 'Flutterwave' },
  { id: 'ORD-5615', date: '2025-02-27', deliveryRep: 'Chioma Adebayo', status: 'Completed', deliveryTime: '22 mins', serviceType: 'Gas Refill', paymentType: 'On delivery' },
  { id: 'ORD-5616', date: '2025-02-26', deliveryRep: 'Kunle Oladipo', status: 'Completed', deliveryTime: '38 mins', serviceType: 'Electricity', paymentType: 'Wallet' },
  { id: 'ORD-5617', date: '2025-02-25', deliveryRep: 'Nneka Ebere', status: 'In Transit', deliveryTime: '10 mins', serviceType: 'Gas Refill', paymentType: 'On delivery' },
  { id: 'ORD-5618', date: '2025-02-24', deliveryRep: 'Obioma Ifeanyi', status: 'Completed', deliveryTime: '29 mins', serviceType: 'Petroleum', paymentType: 'Flutterwave' },
  { id: 'ORD-5619', date: '2025-02-23', deliveryRep: 'Kemi Ayodele', status: 'Disputed', deliveryTime: '41 mins', serviceType: 'Accessories', paymentType: 'On delivery' },
  { id: 'ORD-5620', date: '2025-02-22', deliveryRep: 'Bola Adebisi', status: 'Completed', deliveryTime: '26 mins', serviceType: 'Diesel', paymentType: 'Wallet' },
];

const statusColors = {
  'Completed': 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Canceled': 'bg-red-100 text-red-800',
  'Disputed': 'bg-red-100 text-red-800',
  'In Transit': 'bg-blue-100 text-blue-800',
};

const itemsPerPage = 5;

const VendorOrderHistory = () => {
  const [orders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [dateFilter, setDateFilter] = useState('All');
  const [specificDate, setSpecificDate] = useState('');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('status');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filterOptions = {
    status: ['Completed', 'In Progress', 'Canceled', 'Disputed', 'In Transit'],
    payment: ['On delivery', 'Wallet', 'Flutterwave'],
    service: ['Gas Refill', 'Petroleum', 'Diesel', 'Accessories', 'Electricity'],
  };

  const today = '2025-03-10'; // Hardcoded for this demo

  useEffect(() => {
    const applyFilters = () => {
      let tempOrders = [...orders];

      // Date Filtering
      if (dateFilter === 'Today') {
        tempOrders = tempOrders.filter(order => order.date === today);
      } else if (dateFilter === 'Specific Date' && specificDate) {
        tempOrders = tempOrders.filter(order => order.date === specificDate);
      }

      // Column Filtering
      if (selectedStatuses.length > 0) {
        tempOrders = tempOrders.filter(order => selectedStatuses.includes(order.status));
      }
      if (selectedPayments.length > 0) {
        tempOrders = tempOrders.filter(order => selectedPayments.includes(order.paymentType));
      }
      if (selectedServices.length > 0) {
        tempOrders = tempOrders.filter(order => selectedServices.includes(order.serviceType));
      }

      setFilteredOrders(tempOrders);
      setCurrentPage(1); // Reset to first page on filter change
    };

    applyFilters();
  }, [dateFilter, specificDate, selectedStatuses, selectedPayments, selectedServices, orders]);

  const toggleFilter = (filterType, value) => {
    const stateSetter = {
      status: setSelectedStatuses,
      payment: setSelectedPayments,
      service: setSelectedServices,
    };

    const currentState = {
      status: selectedStatuses,
      payment: selectedPayments,
      service: selectedServices,
    };

    const setter = stateSetter[filterType];
    const currentArray = currentState[filterType];

    if (currentArray.includes(value)) {
      setter(currentArray.filter(item => item !== value));
    } else {
      setter([...currentArray, value]);
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ordersToDisplay = filteredOrders.slice(startIndex, endIndex);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Modal Component
  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {/* Close Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h3>
          <div className="space-y-3 text-sm">
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Order ID:</span>
              <span className="text-gray-800">{order.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Date:</span>
              <span className="text-gray-800">{order.date}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Delivery Representative:</span>
              <span className="text-gray-800">{order.deliveryRep}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Order Status:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Delivery Time:</span>
              <span className="text-gray-800">{order.deliveryTime}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Service Type:</span>
              <span className="text-gray-800">{order.serviceType}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">Payment Type:</span>
              <span className="text-gray-800">{order.paymentType}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Vendor Order History</h2>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {/* Date Picker */}
            <div className="relative w-full md:w-auto">
              <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                <div className="pl-3 pr-2 text-gray-500">
                  {/* Calendar Icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-24 py-2 text-sm text-gray-700 focus:outline-none cursor-pointer"
                  placeholder="Select date"
                  value={dateFilter === 'Specific Date' ? specificDate : dateFilter}
                  readOnly
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                />
                <button
                  type="button"
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  className="px-3 py-2 border-l border-gray-300 text-sm text-gray-700 bg-white focus:outline-none flex items-center gap-1">
                  <span className="mode-label">
                    {dateFilter}
                  </span>
                  {/* Chevron Down Icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <div
                className={`absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-10 ${isDateDropdownOpen ? 'block' : 'hidden'}`}
                onMouseLeave={() => setIsDateDropdownOpen(false)}
              >
                <button
                  type="button"
                  data-mode="All"
                  onClick={() => { setDateFilter('All'); setIsDateDropdownOpen(false); setSpecificDate(''); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  All
                </button>
                <button
                  type="button"
                  data-mode="today"
                  onClick={() => { setDateFilter('Today'); setIsDateDropdownOpen(false); setSpecificDate(''); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Today
                </button>
                <button
                  type="button"
                  data-mode="Specific Date"
                  onClick={() => { setDateFilter('Specific Date'); setIsDateDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Specific Date
                </button>
                {dateFilter === 'Specific Date' && (
                  <input
                    type="date"
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                    className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg transition-all duration-200 hover:bg-gray-50">
                {/* Filter Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg> Filter
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-96 bg-white border rounded-lg shadow-lg p-4 z-30 transition-all duration-200 ${isFilterDropdownOpen ? 'block' : 'hidden'}`}
              >
                <h3 className="text-gray-700 font-medium mb-3">Select Filter</h3>

                {/* Main Options */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveFilterTab('status')}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${activeFilterTab === 'status' ? 'bg-yellow-400 text-white' : 'border'}`}
                  >
                    Order Status
                  </button>
                  <button
                    onClick={() => setActiveFilterTab('payment')}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${activeFilterTab === 'payment' ? 'bg-yellow-400 text-white' : 'border'}`}
                  >
                    Payment Type
                  </button>
                  <button
                    onClick={() => setActiveFilterTab('service')}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${activeFilterTab === 'service' ? 'bg-yellow-400 text-white' : 'border'}`}
                  >
                    Service Type
                  </button>
                </div>

                {/* Status Options */}
                {activeFilterTab === 'status' && (
                  <div className="mt-3">
                    <h3 className="text-gray-700 font-medium mb-2">Select Order Status</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.status.map(status => (
                        <button
                          key={status}
                          onClick={() => toggleFilter('status', status)}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${selectedStatuses.includes(status) ? 'bg-yellow-400' : 'border'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Options */}
                {activeFilterTab === 'payment' && (
                  <div className="mt-3">
                    <h3 className="text-gray-700 font-medium mb-2">Select Payment Type</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.payment.map(payment => (
                        <button
                          key={payment}
                          onClick={() => toggleFilter('payment', payment)}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${selectedPayments.includes(payment) ? 'bg-yellow-400' : 'border'}`}
                        >
                          {payment}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Options */}
                {activeFilterTab === 'service' && (
                  <div className="mt-3">
                    <h3 className="text-gray-700 font-medium mb-2">Select Service Type</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.service.map(service => (
                        <button
                          key={service}
                          onClick={() => toggleFilter('service', service)}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${selectedServices.includes(service) ? 'bg-yellow-400' : 'border'}`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="mt-4 text-center">
                  <button onClick={() => setIsFilterDropdownOpen(false)}
                    className="px-4 py-2 bg-yellow-400 rounded-lg text-black font-medium hover:bg-yellow-500 transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 tracking-wider">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-medium">Order ID</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Date</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Delivery Rep</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Order Status</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Delivery Time</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Service Type</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersToDisplay.map(order => (
                <tr key={order.id}>
                  <td className="px-3 py-3 whitespace-nowrap">{order.id}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{order.date}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{order.deliveryRep}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{order.deliveryTime}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{order.serviceType}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer">
                    <button
                      onClick={() => openModal(order)}
                      className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found for the selected filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-4 border-t mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Total entries: <span className="font-bold">{filteredOrders.length}</span></span>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`px-3 py-1 text-gray-400 flex items-center space-x-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
              disabled={currentPage === 1}
            >
              {/* Chevron Left Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg> <span>Previous</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                onClick={() => setCurrentPage(page + 1)}
                className={`px-3 py-1 font-bold rounded-full transition-colors duration-200 ${currentPage === page + 1 ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className={`px-3 py-1 text-gray-500 flex items-center space-x-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            {/* Chevron Right Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
              {isModalOpen && <OrderDetailsModal order={selectedOrder} onClose={closeModal} />}
      </div>

    
  );
};

export default VendorOrderHistory;
