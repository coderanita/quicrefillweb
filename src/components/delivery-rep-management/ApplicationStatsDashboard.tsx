
import { ApplicationStats } from '../../MockData/DeliveryRepData'; // Adjust path as needed

const ApplicationStatsDashboard = () => {
  return (
    <div className="p-4 mb-4 flex flex-wrap justify-between gap-4">
      {ApplicationStats.map((stat) => (
        <div 
          key={stat.id}
          className="bg-white flex items-center gap-4 border border-gray-100 rounded-md p-3 shadow-sm 
                     w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)]"

        >
          <div 
            className="w-8 h-8 rounded-md" 
            style={{ background: stat.gradient }}
          ></div>
          
          {/* Text Content */}
          <div>
            <p className="text-lg font-semibold text-black leading-tight">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 leading-snug">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatsDashboard;