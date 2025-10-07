import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { FaCalendarAlt, FaChevronDown, FaLightbulb } from 'react-icons/fa';

// --- Chart Data (Remains the same as before) ---
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "Service Charge",
      backgroundColor: "#3B82F6", // Blue
      data: [300000, 500000, 200000, 450000, 600000, 550000, 700000, 680000, 650000, 600000],
    },
    {
      label: "VAT",
      backgroundColor: "#EF4444", // Red
      data: [100000, 200000, 90000, 150000, 220000, 200000, 240000, 230000, 210000, 190000],
    },
    {
      label: "Top-ups",
      backgroundColor: "#FACC15", // Yellow
      data: [250000, 600000, 150000, 700000, 850000, 800000, 880000, 860000, 840000, 810000],
    },
    {
      label: "Vendor Fees",
      backgroundColor: "#22C55E", // Green
      data: [270000, 900000, 270000, 900000, 1000000, 950000, 980000, 970000, 960000, 940000],
    },
  ],
};

const RevenueTrendsChart = () => {
  const [timeRange, setTimeRange] = useState('Monthly');
  const [showInsights, setShowInsights] = useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const createChart = useCallback(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              // --- 🎯 CRITICAL CHANGE 1: Set stacked to false for Grouped Bars ---
              stacked: false, 
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '₦' + (value / 1000) + 'k';
                },
              },
            },
            x: {
              // --- 🎯 CRITICAL CHANGE 2: Set stacked to false for Grouped Bars ---
              stacked: false, 
            }
          },
          plugins: {
            // Your image shows the legend at the top, so let's enable it!
            legend: {
                display: true, 
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    usePointStyle: true, // Use a point/circle style as seen in your image
                }
            }
          }
        },
      });
    }
  }, [timeRange]);


  useEffect(() => {
    createChart();
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [createChart]);

  return (
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-8 mb-6 space-y-10">
      <div className="bg-white p-6 rounded shadow relative">
        <div className="flex justify-between items-center mb-4">
          
          <h2 className="text-lg font-medium text-gray-700">Revenue Trends Over Time</h2>
          
          <div className="flex items-center space-x-3">
            
            {/* Time Range Selector */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
              <select 
                id="timeRange"
                value={timeRange}
                onChange={handleTimeRangeChange}
                className="appearance-none pl-9 pr-6 py-1.5 border border-gray-300 text-gray-700 text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
            </div>
            
            {/* Insights Button */}
            <button 
              onClick={() => setShowInsights(prev => !prev)}
              className="text-yellow-600 bg-yellow-100 hover:bg-yellow-200 text-sm px-3 py-1.5 rounded font-medium flex items-center space-x-1"
            >
              <FaLightbulb />
              <span>Insights</span>
            </button>
            
          </div>
        </div>

        {/* Chart Canvas */}
        <div style={{ height: '350px' }}> 
            <canvas ref={chartRef} id="revenueChart"></canvas>
        </div>
        
        {/* NOTE: Custom Legend is now removed or commented out 
               because the Chart.js legend is enabled and correctly styled. 
        */}
        
        {/* Insights Popup (Conditional Rendering/Class Toggle) */}
        <div 
          id="insightPopup" 
          className={`absolute top-20 right-6 w-[28rem] bg-white shadow-lg border border-gray-200 rounded-lg p-4 z-10 ${showInsights ? '' : 'hidden'}`}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">
              <FaLightbulb className="text-yellow-400 mr-1 inline-block" /> Insights from the Chart
            </h3>
            <button 
              onClick={() => setShowInsights(false)}
              className="text-gray-500 hover:text-gray-800 font-bold text-lg leading-none"
            >
              &times;
            </button>
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Gradual growth across all revenue sources over time.</li>
            <li>Notable spikes in May, October, and December.</li>
            <li>VAT increases proportionally with revenue, indicating compliance.</li>
            <li>Top-ups and vendor fees contribute significantly to total revenue.</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default RevenueTrendsChart;