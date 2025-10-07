import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartComponentProps {
  data: { labels: string[]; values: number[]; colors: string[] };
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: false, // fixed size
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-[150px] h-[150px] mx-auto">
      <Pie data={chartData} options={chartOptions} width={150} height={150} />
    </div>
  );
};

export default PieChartComponent;
