import React from 'react';
import './PieChart.css';
import { Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ donut = false }) {
  const data = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: [
          '#f97316',
          '#3b82f6',
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: donut ? '70%' : 0,
  };

  return (
    <div className="admin-pie-chart">
      <div className="admin-chart-header">
        <h3>{donut ? 'User Status' : 'Active vs Inactive'}</h3>
      </div>
      {donut ? (
        <Doughnut data={data} options={options} />
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
}

export default PieChart;
