import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, ArcElement } from "chart.js";
import { AiOutlineInfoCircle } from "react-icons/ai";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement
);

const transactionsData = [1200, 800, 1500, 2200, 3000, 2600, 2300, 2000, 1900, 1700, 1500, 1600, 1800, 2200, 2500, 2800, 3100];

const MonthlySuspiciousTransactions = () => {
  // Highlight logic for line chart points
  const highlightIndex = 7; // highlights the 8th point (index starts from 0)
  const pointRadii = transactionsData.map((_, i) => (i === highlightIndex ? 4 : 0));

  // LINE CHART CONFIG
  const lineData = {
    labels: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: "Suspicious Transactions",
        data: transactionsData,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: pointRadii,
        pointHoverRadius: 6,
        pointBackgroundColor: "#f59e0b",
        pointHoverBackgroundColor: "#f59e0b"
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: (context) => {
          // If you want to implement a custom tooltip, you can do it here.
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { display: false },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" }
      }
    }
  };

  // DOUGHNUT CHART CONFIG
  const riskValue = 38;
  const doughnutData = {
    datasets: [
      {
        data: [riskValue, 100 - riskValue],
        backgroundColor: ["#FFC833", "#f8f8f8"],
        borderWidth: 0,
        cutout: "80%",
        borderRadius: 50,
        weight: 1
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false }
    }
  };

  return (
    <div className="max-w-full mx-auto mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Monthly Suspicious Transactions Trend
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* User Suspicious Transactions */}
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">User Suspicious Transactions</div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-800">8950</div>
                  <div className="text-green-500 font-medium">+ 22%</div>
                </div>
              </div>
              {/* Vendor Suspicious Transactions */}
              <div className="border rounded-lg p-4">
                  {/* Link on top */}
                  <div className="mb-2">
                    <a
                      href="/fraud-watch-suspicious-vendor-withdrawals"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View Vendor Suspicious Transactions
                    </a>
                  </div>

                  {/* Card Content */}
                  <div className="text-sm text-gray-500 mb-1">Vendor Suspicious Transactions</div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-800">1520</div>
                    <div className="text-yellow-500 font-medium">- 24%</div>
                  </div>
              </div>

            </div>
            <div className="text-sm text-gray-500 mb-4">
              Jan 16 - Jan 30 Number of flagged orders per month
            </div>
            <div className="h-64 relative">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-md h-full text-center">
            <div className="text-[20px] font-semibold mb-2 text-[#1f1f3c] flex justify-center items-center gap-2">
              Fraud Risk Score
              <AiOutlineInfoCircle className="text-gray-400 text-[18px]" />
            </div>
            <div className="relative w-[200px] h-[200px] mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[28px] font-semibold text-[#1f1f3c]">
                {riskValue}%
              </div>
            </div>
            <div className="mt-5 text-left">
              <p className="flex items-center gap-2 text-sm mb-1">
                <span className="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                High (🔴 80% - 100%)
              </p>
              <p className="flex items-center gap-2 text-sm mb-1">
                <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block"></span>
                Medium (🟡 50% - 79%)
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                Low (🟢 0% - 49%)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MonthlySuspiciousTransactions;
