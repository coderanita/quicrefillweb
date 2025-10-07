import React, { useEffect, useRef } from 'react';
// 1. ⚠️ CRUCIAL: Import Chart.js
// You MUST have installed Chart.js first: npm install chart.js
import Chart from 'chart.js/auto'; 

// --- Data for the component ---
const vendorData = [
  { rank: 1, name: 'Supreme Gas Ltd', revenue: '2,400,000', percentage: '21%', color: 'red-500', hexColor: '#F44336' },
  { rank: 2, name: 'Fast Diesel Co.', revenue: '2,100,000', percentage: '18%', color: 'purple-500', hexColor: '#9C27B0' },
  { rank: 3, name: 'Mega Gas Nigeria', revenue: '1,800,000', percentage: '16%', color: 'indigo-500', hexColor: '#673AB7' },
  { rank: 4, name: 'PetroSwift', revenue: '1,500,000', percentage: '13%', color: 'blue-500', hexColor: '#2196F3' },
  { rank: 5, name: 'Elite Energy', revenue: '1,200,000', percentage: '10%', color: 'sky-500', hexColor: '#03A9F4' },
  { rank: 6, name: 'EcoGas Limited', revenue: '900,000', percentage: '8%', color: 'yellow-800', hexColor: '#A1887F' },
  { rank: 7, name: 'Energy Plus Ltd', revenue: '750,000', percentage: '7%', color: 'teal-500', hexColor: '#009688' },
  { rank: 8, name: 'SolarTech Nigeria', revenue: '500,000', percentage: '4%', color: 'green-500', hexColor: '#4CAF50' },
  { rank: 9, name: 'Superior Oil', revenue: '350,000', percentage: '2%', color: 'yellow-500', hexColor: '#FFC107' },
  { rank: 10, name: 'Bright Gas', revenue: '250,000', percentage: '1%', color: 'orange-400', hexColor: '#FF9800' },
];

const totalRevenue = '11,750,000';

const chartData = {
  labels: vendorData.map(v => v.name),
  datasets: [{
    label: 'Revenue Share',
    data: vendorData.map(v => parseInt(v.percentage.replace('%', ''))),
    backgroundColor: vendorData.map(v => v.hexColor),
    borderWidth: 0,
    hoverOffset: 10
  }]
};

// Plugin to draw percentage in the center (Adapted for Chart.js in React)
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    ctx.save();

    const activeElements = chart.getActiveElements();
    if (activeElements.length > 0) {
      const dataset = chart.data.datasets[activeElements[0].datasetIndex];
      const value = dataset.data[activeElements[0].index];
      const total = dataset.data.reduce((sum, val) => sum + val, 0);
      const percentage = ((value / total) * 100).toFixed(0) + '%';

      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(percentage, width / 2, height / 2);
    } else {
        // Display a default text (e.g., 'Hover for %') if nothing is hovered
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Adjust the Y position slightly to fit better if needed
        ctx.fillText('Hover for %', width / 2, height / 2); 
    }
    ctx.restore();
  }
};


export default function TopVendorsRevenue() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    if (!chartRef.current) return; // Ensure canvas ref is available

    // 2. Destroy previous chart instance if it exists (important for hot-reloading)
    if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    const config = {
      type: 'doughnut',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        hover: { mode: 'nearest', intersect: true }
      },
      plugins: [centerTextPlugin]
    };

    // 3. ⚠️ CRUCIAL: Use the imported 'Chart' object
    chartInstanceRef.current = new Chart(ctx, config); 
    
    // Cleanup function to destroy the chart when the component unmounts
    return () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
    };
  }, []); // Runs only once on mount

  // --- JSX Structure ---
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-gray-700 text-sm font-medium mb-4">Top Vendors & Delivery Reps by Revenue</h2>
      <div className="flex flex-col lg:flex-row gap-6">

        {/* --- Chart --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[300px]">
          {/* We link the ref to the canvas element */}
          <canvas ref={chartRef} className="w-full max-w-md"></canvas>
        </div>

        {/* --- Table --- */}
        <div className="w-full lg:w-1/2 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Vendor / Delivery Rep Name</th>
                <th className="py-2 px-4">Revenue Earned (₦)</th>
                <th className="py-2 px-4">Percentage of Total (%)</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the data */}
              {vendorData.map((vendor) => (
                <tr key={vendor.rank} className="border-b">
                  {/* Tailwind color classes must be written fully for the CSS bundler to include them */}
                  <td className={`py-2 px-4 text-${vendor.color} border-l-4 border-${vendor.color}`}>{vendor.rank}</td>
                  <td className="py-2 px-4">{vendor.name}</td>
                  <td className="py-2 px-4">{vendor.revenue}</td>
                  <td className="py-2 px-4">{vendor.percentage}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4 font-medium">Total</td>
                <td className="py-2 px-4">All Vendors & Reps</td>
                <td className="py-2 px-4">{totalRevenue}</td>
                <td className="py-2 px-4">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}