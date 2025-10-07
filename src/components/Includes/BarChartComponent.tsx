import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartComponentProps {
  chartData: any;   // Entire chart data passed from parent
  chartOptions: any; // Entire chart options passed from parent
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ chartData, chartOptions }) => {
  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChartComponent;
