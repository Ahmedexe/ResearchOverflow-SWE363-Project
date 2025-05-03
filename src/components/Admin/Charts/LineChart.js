import React, { useState } from 'react';
import './LineChart.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [period, setPeriod] = useState('monthly');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4,
      },
      {
        label: 'Visits',
        data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 65, 75],
        fill: false,
        borderColor: '#f97316',
        tension: 0.4,
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
        display: true,
        text: 'User Activity',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-line-chart">
      <div className="admin-chart-header">
        <h3>Users vs Visits</h3>
        <div className="admin-chart-period">
          <span 
            className={period === 'weekly' ? 'active' : ''} 
            onClick={() => setPeriod('weekly')}
          >
            Weekly
          </span>
          <span 
            className={period === 'monthly' ? 'active' : ''} 
            onClick={() => setPeriod('monthly')}
          >
            Monthly
          </span>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
