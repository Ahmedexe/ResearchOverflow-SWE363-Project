import React, { useState } from 'react';
import './BarChart.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [period, setPeriod] = useState('monthly');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pending',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
        backgroundColor: '#f97316',
      },
      {
        label: 'Resolved',
        data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 65, 75],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-bar-chart">
      <div className="admin-chart-header">
        <h3>Monthly vs Weekly</h3>
        <div className="admin-chart-period">
          <span 
            className={period === 'monthly' ? 'active' : ''} 
            onClick={() => setPeriod('monthly')}
          >
            Monthly
          </span>
          <span 
            className={period === 'weekly' ? 'active' : ''} 
            onClick={() => setPeriod('weekly')}
          >
            Weekly
          </span>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
