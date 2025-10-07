import React from "react";
import {
  FaArrowRight,
  FaQuestionCircle,
  FaCaretUp,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const VitalsDashboard = () => {
  /* ---------- Chart Data ---------- */
  const anrData = {
    labels: ["Feb 15", "22", "Mar 1", "8"],
    datasets: [
      {
        label: "Affected sessions (All versions)",
        data: [0.22, 0.28, 0.25, 0.27],
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Affected sessions (Android 10 or later)",
        data: [0.2, 0.24, 0.29, 0.28],
        borderColor: "#2dd4bf",
        backgroundColor: "#2dd4bf",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Affected areas (28-day rolling average)",
        data: [0.21, 0.25, 0.28, 0.29],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const crashData = {
    labels: ["Feb 15", "22", "Mar 1", "8"],
    datasets: [
      {
        label: "Affected sessions (All versions)",
        data: [0.01, 0.04, 0.02, 0.05],
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Affected sessions (Android 10 or later)",
        data: [0.005, 0.02, 0.04, 0.06],
        borderColor: "#2dd4bf",
        backgroundColor: "#2dd4bf",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Affected areas (28-day rolling average)",
        data: [0.008, 0.03, 0.03, 0.055],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = (min, max, step) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6b7280" } },
      y: {
        min,
        max,
        ticks: {
          stepSize: step,
          callback: (val) => (val * 100).toFixed(0) + "%",
          color: "#6b7280",
        },
        grid: { color: "#e5e7eb" },
      },
    },
  });

  /* ---------- Render ---------- */
  return (
    <div className="space-y-6 p-4">
      {/* Two Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ANR Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Core vitals</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
              More <FaArrowRight size={12} />
            </a>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">User-perceived ANR rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">0.24%</span>
              <span className="text-orange-600 text-sm font-medium">+0.01%</span>
              <span className="text-gray-500 text-xs">vs. previous 28 days</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4">Jan 16 - Jan 30 store visits chart</p>

          <div className="relative w-full h-64">
            <Line data={anrData} options={chartOptions(0, 0.6, 0.1)} />
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 top-[70%]" />
          </div>
        </div>

        {/* Crash Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Core vitals</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
              More <FaArrowRight size={12} />
            </a>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">User-perceived crash rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">0.17%</span>
              <span className="text-orange-600 text-sm font-medium">+0.03%</span>
              <span className="text-gray-500 text-xs">vs. previous 28 days</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4">Jan 16 - Jan 30 store visits chart</p>

          <div className="relative w-full h-64">
            <Line data={crashData} options={chartOptions(0, 1.2, 0.2)} />
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 top-[70%]" />
          </div>
        </div>
      </div>

      {/* All Vitals Table */}
      <div className="bg-white rounded-xl shadow-sm border w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All vitals</h2>
            <p className="text-sm text-gray-500">Stability</p>
          </div>
          <a href="/crash-analytics-all-vitals" className="text-sm font-medium text-gray-600 hover:underline flex items-center gap-1">
            More <FaArrowRight size={12} />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border border-gray-100">
            <thead>
              <tr className="bg-gray-100 font-semibold text-gray-600">
                <th className="p-3">Metric</th>
                <th className="p-3 text-center">Last 28 days</th>
                <th className="p-3 text-center">Vs. previous 28 days</th>
                <th className="p-3 text-center">Vs. peer’s median</th>
              </tr>
            </thead>
            <tbody>
              {["User perceived ANR rate", "ANR rate", "Multiple ANR rate"].map((metric, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-3 flex items-center gap-1 text-gray-600 font-medium">
                    {metric} <FaQuestionCircle className="text-gray-400 text-xs" />
                  </td>
                  <td className="p-3 text-center">0.24%</td>
                  <td className="p-3 text-center text-orange-600 flex justify-center items-center gap-1">
                    0.01% <FaCaretUp />
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 text-gray-700">
                      0.04% <span className="text-orange-600 text-xs">•</span>{" "}
                      <FaArrowRight className="text-blue-600" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalsDashboard;
