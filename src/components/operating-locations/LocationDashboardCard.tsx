import React, { useState, useEffect } from 'react';
import { MOCK_LOCATIONS2 } from '../../MockData/OperatingLocationsData';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineInfo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const getStatusColor = (status) => {
  switch (status) {
    case 'Enabled':
      return 'text-green-500';
    case 'Restricted':
      return 'text-yellow-500';
    case 'Disabled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default function LocationDashboardCard({ locationId = "LOC-001" }) {
    const navigate=useNavigate();
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const data = MOCK_LOCATIONS2.find(loc => loc.id === locationId);
    setLocationData(data);
  }, [locationId]);

  if (!locationData) {
    return <div className="p-6 text-center text-gray-500">Loading or Location ID not found...</div>;
  }

  const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date)) return dateString; 
        
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    } catch (e) {
        return dateString;
    }
  };
  
  const { 
    country, state, lga, status, lastModifiedBy, date, 
    activeUsers, activeVendors, ordersProcessed, revenueGenerated 
  } = locationData;

  const statusClasses = getStatusColor(status);

  return (
    <div className="mx-auto max-w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* === LOCATION DETAILS CARD === */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Location Details</h2>
            <FiEdit2 className="text-gray-500 w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" onClick={()=>{navigate('/operating-location-add/'+locationId)}} />
          </div>
          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium">Country:</span> {country}
            </p>
            <p>
              <span className="font-medium">State:</span> {state}
            </p>
            <p>
              <span className="font-medium">LGA:</span> {lga}
            </p>
            <p>
              <span className="font-medium">Status:</span> 
              <span className={`${statusClasses} font-semibold ml-1`}>
                {status}
              </span>
            </p>
            <p>
              <span className="font-medium">Last modified by:</span> {lastModifiedBy || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Date:</span> {formatDate(date) || 'N/A'}
            </p>
          </div>
        </div>

        {/* === METRICS GRID (4 Cards) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Active Users Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-700 mr-2">Total Active Users</h2>
              <MdOutlineInfo className="text-gray-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-blue-500">{activeUsers || '0'}</p>
          </div>

          {/* Active Vendors Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-700 mr-2">Total Active Vendors</h2>
              <MdOutlineInfo className="text-gray-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-green-500">{activeVendors || '0'}</p>
          </div>

          {/* Orders Processed Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-700 mr-2">Total orders processed</h2>
              <MdOutlineInfo className="text-gray-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-purple-500">{ordersProcessed || '0'}</p>
          </div>

          {/* Revenue Generated Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-700 mr-2">Total Revenue Generated</h2>
              <MdOutlineInfo className="text-gray-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-orange-500">{revenueGenerated || '$ 0'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}