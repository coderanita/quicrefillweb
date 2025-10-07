import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 
import { FaChevronDown } from 'react-icons/fa'; // Using FaChevronDown for the dropdown icon

// --- Chart Data Mapping ---
const datasetsByRange = {
    daily: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            { label: 'Service Charge', data: [200000, 500000, 1000000, 600000, 300000], backgroundColor: '#3b82f6' },
            { label: 'Top-up Charge', data: [400000, 600000, 800000, 700000, 500000], backgroundColor: '#f59e0b' },
        ],
    },
    weekly: {
        labels: Array(12).fill('20'), // Simplified labels for weekly view based on original script
        datasets: [
            { label: 'Service Charge', data: [700000, 1200000, 500000, 10000000, 700000, 300000, 11000000, 800000, 1300000, 700000, 900000, 500000], backgroundColor: '#3b82f6' },
            { label: 'Top-up Charge', data: [6000000, 3200000, 5800000, 450000, 800000, 600000, 2500000, 4500000, 350000, 150000, 1200000, 450000], backgroundColor: '#f59e0b' },
        ],
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            { label: 'Service Charge', data: [4000000, 3000000, 5000000], backgroundColor: '#3b82f6' },
            { label: 'Top-up Charge', data: [6000000, 4500000, 4700000], backgroundColor: '#f59e0b' },
        ],
    },
    yearly: {
        labels: ['2024'],
        datasets: [
            { label: 'Service Charge', data: [55000000], backgroundColor: '#3b82f6' },
            { label: 'Top-up Charge', data: [62000000], backgroundColor: '#f59e0b' },
        ],
    }
};

const RevenueBarChart = () => {
    const [timeframe, setTimeframe] = useState('weekly');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Custom tick callback function for NGN formatting
    const ngnCallback = value => {
        if (value >= 10000000) return '₦' + (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000000) return '₦' + (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000) return '₦' + (value / 1000).toFixed(0) + 'k';
        return '₦' + value;
    };

    // --- Chart Lifecycle Effect ---
    useEffect(() => {
        if (!chartRef.current) return;

        const currentData = datasetsByRange[timeframe];
        const ctx = chartRef.current.getContext('2d');

        // 1. CLEANUP: Destroy the previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // 2. CREATION: Create a new chart instance
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: currentData.labels,
                datasets: currentData.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensures the 400px height is honored
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: ngnCallback // Use the custom formatting function
                        }
                    },
                    x: {
                        // Chart.js auto handles category scaling, no explicit config needed unless customized
                    }
                }
            }
        });

        // 3. UNMOUNT CLEANUP
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [timeframe]); // Re-run effect whenever the timeframe state changes

    return (
        <div className="max-w-full mx-auto bg-white shadow rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Service Charge vs. Top-up Charge Bar Graph</h2>
                <div className="relative">
                    {/* Controlled Select Input */}
                    <select 
                        id="dropdown-weekly-chart" 
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="appearance-none w-32 py-2 pl-3 pr-8 text-sm border rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    {/* Dropdown Chevron Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaChevronDown />
                    </div>
                </div>
            </div>
            {/* Canvas element with ref for Chart.js */}
            <div style={{ height: '400px' }}> {/* Container for fixed height */}
                 <canvas ref={chartRef} className="w-full"></canvas>
            </div>
        </div>
    );
};

export default RevenueBarChart;