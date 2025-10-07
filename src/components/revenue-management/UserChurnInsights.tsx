import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Ensure Chart.js is installed

// --- Chart Configuration Data ---
const chartConfig = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      label: "Poor Customer Support",
      data: [600000, 620000, 630000, 640000, 650000, 620000, 610000, 590000, 600000, 610000, 700000],
      backgroundColor: "#EF4444", // Red 500
    },
    {
      label: "High Service Fees",
      data: [1100000, 1150000, 1170000, 1200000, 1220000, 1200000, 1190000, 1180000, 1190000, 1170000, 1250000],
      backgroundColor: "#3B82F6", // Blue 500
    },
    {
      label: "Payment Issues",
      data: [700000, 710000, 720000, 750000, 760000, 740000, 730000, 720000, 750000, 780000, 900000],
      backgroundColor: "#10B981", // Emerald 500 (or Green/Teal)
    },
    {
      label: "Service Delays",
      data: [250000, 270000, 260000, 240000, 230000, 220000, 200000, 190000, 210000, 230000, 300000],
      backgroundColor: "#F59E0B", // Amber 500
    },
    {
      label: "Other",
      data: [900000, 920000, 940000, 950000, 940000, 930000, 910000, 905000, 900000, 910000, 920000],
      backgroundColor: "#A855F7", // Violet 500
    }
  ]
};

export default function UserChurnInsights() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [showInsights, setShowInsights] = useState(false);

  const toggleInsights = () => {
    setShowInsights(prev => !prev);
  };
  
  const closeInsights = () => {
    setShowInsights(false);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
            // ⚠️ KEY CHANGE: Set stacked to false for grouped bars
            stacked: false, 
        },
        y: {
          beginAtZero: true,
          // ⚠️ KEY CHANGE: Set stacked to false for grouped bars
          stacked: false, 
          ticks: {
            callback: value => `₦${value / 1000000}M`
          },
          title: {
            display: true,
            text: 'Churn Value (₦)',
            font: { weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: { size: 12 }
          }
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ₦${(context.parsed.y).toLocaleString()}`;
            }
          }
        }
      }
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: chartConfig,
      options: options,
    });
    
    return () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
    };
  }, []); 

  return (
    <div className="max-w-full mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">User Churn & Account Deletion Insights</h2>
        <button 
          onClick={toggleInsights}
          className="flex items-center gap-1 border px-3 py-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-sm font-medium"
        >
          <span className="text-yellow-500 text-lg">💡</span> Insights
        </button>
      </div>

      <div className="relative w-full" style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>

      <div 
        className={`absolute top-20 right-6 w-[420px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10 
        ${showInsights ? '' : 'hidden'}`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900">💡 Insights from the Chart</h3>
          <button 
            onClick={closeInsights}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <ul className="list-disc text-sm text-gray-700 pl-5 space-y-2">
          <li>Poor Customer Support is the leading cause of churn, making up 35–40% of total deletions each month.</li>
          <li>High Service Fees and Payment Issues are also major contributors, accounting for 20–25% each.</li>
          <li>Churn spikes in November and December, possibly due to holiday season service demands.</li>
          <li>Service delays are more of a concern in the first half of the year, indicating possible operational issues that improve later.</li>
        </ul>
      </div>
    </div>
  );
}