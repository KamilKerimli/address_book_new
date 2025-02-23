import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  LineElement,
  PointElement,
  LineController,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCom = () => {
  const [mod, setMod] = useState(localStorage.getItem('theme'));
  const [textColor, setTextColor] = useState('black');
  const [usersColor, setUsersColor] = useState('blue');
  const [addressColor, setAddressColor] = useState('gray');
  const [d3Color, setD3Color] = useState('grey');
  const [borderColor, setBorderColor] = useState('white');

  useEffect(() => {
    const updateColors = () => {
      const currentTheme = localStorage.getItem('theme');
      setMod(currentTheme);
      if (currentTheme === 'dark') {
        setTextColor('white');
        setUsersColor('red');
        setAddressColor('green');
        setD3Color('#6200EE');
        setBorderColor('#3B82F6');
      } else {
        setTextColor('black');
        setUsersColor('blue');
        setAddressColor('gray');
        setD3Color('#3700B3');
        setBorderColor('white');
      }
    };

    updateColors(); // İlk renderdə yeniləyir

    const interval = setInterval(updateColors, 10);
    return () => clearInterval(interval);
  }, []);

  const userAddressData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Users',
        data: [120, 150, 180],
        backgroundColor: usersColor,
        borderColor: usersColor,
        borderWidth: 1,
        borderRadius: 10
      },
      {
        label: 'Addresses',
        data: [80, 100, 140],
        backgroundColor: addressColor,
        borderColor: addressColor,
        borderWidth: 1,
        borderRadius: 10
      },
    ],
  };

  const userAddressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          color: textColor,
          beginAtZero: true,
        },
      },
    },
  };

  const yearlyUserData = {
    labels: ['2023', '2024', '2025'],
    datasets: [
      {
        label: 'Users',
        data: [5000, 7000, 8500],
        backgroundColor: [usersColor, addressColor, d3Color],
        borderColor: borderColor,
        borderWidth: 2
      },
    ],
  };

  const yearlyUserOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {  
      tooltip: {
        enabled: true,
      },
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const yearlyAddressData = {
    labels: ['2023', '2024', '2025'],
    datasets: [
      {
        label: 'Addresses',
        data: [3000, 5000, 7000],
        borderColor: addressColor,
        fill: false,
      },
    ],
  };

  const yearlyAddressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return (
    <div className="mx-auto p-4 w-full dark:bg-gray-800 text-gray-200">
      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">User and Address Statistik (Last 3 Months)</h2>
        <div className="w-full h-64">
          <Bar data={userAddressData} options={userAddressOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full mt-4">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">Year of users statistics</h2>
        <div className="w-full h-64">
          <Doughnut data={yearlyUserData} options={yearlyUserOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full mt-4">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">Addresses Statistics</h2>
        <div className="w-full h-64">
          <Line data={yearlyAddressData} options={yearlyAddressOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCom;
