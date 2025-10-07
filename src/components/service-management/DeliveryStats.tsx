import React from 'react';

const DeliveryStats = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-6">
      
      <div className={stats.length === 4? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 ": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"}>
        {stats.map(({ label, value, icon, bg, size = 'w-8 h-8' }, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <div className={`${size} flex items-center justify-center ${bg} rounded-md`}>
              {icon}
            </div>
            <div>
              <p className="text-lg font-bold">{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryStats;
