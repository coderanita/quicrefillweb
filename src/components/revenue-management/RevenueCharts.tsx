import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // For Chart.js functionality
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa'; // For icons

// --- Static Chart Data ---
const chartData = {
    daily: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], data: [1.2, 1.4, 1.1, 2.5, 2.0, 1.8, 2.2] },
    weekly: { labels: [16, 18, 20, 22, 24, 26, 28], data: [1.3, 1.0, 1.0, 2.1, 1.6, 2.5, 1.7] },
    monthly: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], data: [1.5, 2.0, 1.8, 2.3, 2.1, 2.6] },
    yearly: { labels: ["2021", "2022", "2023", "2024"], data: [6.5, 7.2, 8.1, 8.9] }
};

const RevenueCharts = () => {
    // State to manage the selected timeframe for the line chart
    const [timeframe, setTimeframe] = useState('weekly'); 
    
    // Refs to access the canvas DOM elements
    const lineChartRef = useRef(null);
    const doughnutChartRef = useRef(null);
    
    // Ref to store the line chart instance itself
    const lineChartInstance = useRef(null); 

    const handleTimeframeChange = (e) => {
        setTimeframe(e.target.value);
    };

    // --- Line Chart Initialization and Update Effect ---
    useEffect(() => {
        if (!lineChartRef.current) return;

        const currentData = chartData[timeframe];
        const ctxLine = lineChartRef.current.getContext('2d');

        // 1. CLEANUP: Destroy the existing chart instance before creating a new one
        if (lineChartInstance.current) {
            lineChartInstance.current.destroy();
        }

        // 2. CREATION: Create a brand new chart instance
        lineChartInstance.current = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: currentData.labels,
                datasets: [{
                    data: currentData.data,
                    borderColor: "#888888",
                    backgroundColor: "#FACC15",
                    tension: 0.4,
                    pointBackgroundColor: "#FACC15",
                    pointBorderColor: "#FACC15",
                    pointRadius: 5,
                    pointHoverRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: context => `₦${context.parsed.y.toFixed(1)}M` // Updated to include ₦
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `₦${value.toFixed(1)}M`
                        }
                    }
                }
            }
        });
        
        // 3. UNMOUNT CLEANUP: Ensure the chart is destroyed when the component leaves the DOM
        return () => {
            if (lineChartInstance.current) {
                lineChartInstance.current.destroy();
                lineChartInstance.current = null;
            }
        };
    }, [timeframe]); // Re-run effect when timeframe state changes

    // --- Doughnut Chart Initialization Effect (Runs only once) ---
    useEffect(() => {
        if (!doughnutChartRef.current) return;

        const ctxDoughnut = doughnutChartRef.current.getContext('2d');
        const doughnutChart = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ["Service Charge", "Top-up Charge", "VAT Revenue"],
                datasets: [{
                    data: [45, 65, 55],
                    backgroundColor: ['#3B82F6', '#F97316', '#22C55E'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
        
        // Unmount cleanup for the doughnut chart
        return () => doughnutChart.destroy();
    }, []); 

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* 1. Total Revenue Card (Line Chart) */}
            <div className="bg-white rounded-2xl p-6 shadow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-gray-700 font-medium text-lg">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Total Revenue
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {/* Controlled Select Input */}
                            <select 
                                id="timeframe" 
                                value={timeframe}
                                onChange={handleTimeframeChange}
                                className="appearance-none bg-gray-100 border border-gray-300 text-sm px-4 py-1.5 rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            {/* Icon for the dropdown */}
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <FaCalendarAlt />
                            </div>
                        </div>
                        <button className="text-sm text-gray-700 font-medium hover:underline flex items-center gap-1">
                            View Details 
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
                {/* Canvas element for the Line Chart */}
                <div style={{ height: '300px' }}>
                    <canvas ref={lineChartRef}></canvas>
                </div>
            </div>
        
            {/* 2. Revenue Breakdown Card (Doughnut Chart) */}
            <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
                <h2 className="text-lg font-medium text-gray-700 mb-4 self-start">Revenue Breakdown</h2>
                
                {/* Doughnut Chart container */}
                <div className="relative w-40 h-40">
                    <canvas ref={doughnutChartRef}></canvas>
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-slate-800">
                        45%
                    </div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-around w-full mt-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        Service Charge <strong className="ml-1">45%</strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                        Top-up Charge <strong className="ml-1">65%</strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        VAT Revenue <strong className="ml-1">55%</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueCharts;