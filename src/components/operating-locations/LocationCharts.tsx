import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { FaUserFriends, FaTruck } from "react-icons/fa";
import { MOCK_LOCATIONS2 } from "../../MockData/OperatingLocationsData";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface LocationChartsProps {
  locationId: string;
}

const LocationCharts: React.FC<LocationChartsProps> = ({ locationId }) => {
  // Find the location from MOCK_LOCATIONS2 using locationId
  const location = MOCK_LOCATIONS2.find((loc) => loc.id === locationId);

  if (!location) {
    return <div className="text-red-500">Location not found</div>;
  }

  // Pie chart data for User Distribution
  const userChartData = {
    labels: ["Customer", "Rider", "Vendor"],
    datasets: [
      {
        data: [location.activeUsers, location.activeRiders, location.activeVendors],
        backgroundColor: ["#FBBF24", "#3B82F6", "#10B981"],
        borderWidth: 0,
      },
    ],
  };

  // Bar chart data for Order Volume (monthly)
  const orderChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Orders",
        data: location.monthlyOrders,
        backgroundColor: "#06b6d4",
        borderRadius: 4,
        barThickness: 12,
      },
    ],
  };

  const orderChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 250,
          callback: (value: number) => (value === 1000 ? "1k" : value),
        },
        grid: { drawBorder: false },
      },
      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* User Distribution Pie Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <FaUserFriends className="text-yellow-500" /> User Distribution
          </h2>
        
        
        </div>
        <div className="flex justify-center items-center">
            <div className="w-80 h-80"> {/* adjust w-48 / h-48 to change size */}
                <Pie data={userChartData} />
            </div>
        </div>
      </div>

      {/* Order Volume Bar Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaTruck className="text-blue-500" /> Order Volume
        </h2>
        <Bar data={orderChartData} options={orderChartOptions} />
      </div>
    </div>
  );
};

export default LocationCharts;
