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
  const [usersSt, setUsersSt] = useState(null);
  const [usersYearSt, setUsersYearSt] = useState(null);
  const [addressSt, setAddressSt] = useState(null);
  const [addressYearSt, setAddressYearSt] = useState(null);
  const [mod, setMod] = useState(localStorage.getItem('theme'));
  const [textColor, setTextColor] = useState('black');
  const [usersColor, setUsersColor] = useState('blue');
  const [addressColor, setAddressColor] = useState('gray');
  const [d3Color, setD3Color] = useState('grey');
  const [borderColor, setBorderColor] = useState('white');

  const [userAddressData, setUserAddressData] = useState(null);
  const [userAddressOptions, setUserAddressOptions] = useState(null);
  const [yearlyUserData, setYearlyUserData] = useState(null);
  const [yearlyUserOptions, setYearlyUserOptions] = useState(null);
  const [yearlyAddressData, setYearlyAddressData] = useState(null);
  const [yearlyAddressOptions, setYearlyAddressOptions] = useState(null);

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

    const getStatistic = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:1144/admin/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `${token}` }),
          },
        });

        if (!response.ok) {
          alert(`Server Error`);
          return;
        }

        const data = await response.json();
        setUsersSt(data.usersSt);
        setUsersYearSt(data.usersYearSt);
        setAddressSt(data.addressSt);
        setAddressYearSt(data.addressYearSt);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    updateColors();
    getStatistic();

    const interval = setInterval(updateColors, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (usersSt && addressSt) {
      const usersData = [
        usersSt.Dec || 5, 
        usersSt.Jan || 5, 
        usersSt.Feb || 5
      ];
      const addressData = [
        addressSt.Dec || 5, 
        addressSt.Jan || 5, 
        addressSt.Feb || 5
      ];
  
      const newUserAddressData = {
        labels: ['Dec', 'Jan', 'Feb'], 
        datasets: [
          {
            label: 'Users',
            data: usersData,
            backgroundColor: usersColor,
            borderColor: usersColor,
            borderWidth: 1,
            borderRadius: 10,
          },
          {
            label: 'Addresses',
            data: addressData,
            backgroundColor: addressColor,
            borderColor: addressColor,
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      };
  
      const newUserAddressOptions = {
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
  
      if (usersYearSt) {
        const years = Object.keys(usersYearSt); 
        const usersYearData = years.map(year => usersYearSt[year] || 5);
    
        const newYearlyUserData = {
          labels: years, 
          datasets: [
            {
              label: 'Users',
              data: usersYearData,
              backgroundColor: [usersColor, addressColor, d3Color],
              borderColor: borderColor,
              borderWidth: 2,
            },
          ],
        };
  
        const newYearlyUserOptions = {
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
  
        const newYearlyAddressData = {
          labels: Object.keys(addressYearSt), 
          datasets: [
            {
              label: 'Addresses',
              data: Object.values(addressYearSt).map(value => value === 0 ? 2 : value), 
              borderColor: addressColor,
              fill: false,
            },
          ],
        };
        
  
        const newYearlyAddressOptions = {
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
  
        setUserAddressData(newUserAddressData);
        setUserAddressOptions(newUserAddressOptions);
        setYearlyUserData(newYearlyUserData);
        setYearlyUserOptions(newYearlyUserOptions);
        setYearlyAddressData(newYearlyAddressData);
        setYearlyAddressOptions(newYearlyAddressOptions);
      }
    }
  }, [usersSt, addressSt, usersYearSt, usersColor, addressColor, textColor, d3Color, borderColor]);
  

  if (!usersSt || !addressSt) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="mx-auto p-4 w-full dark:bg-gray-800 text-gray-200">
      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">
          User and Address Statistik (Last 3 Months)
        </h2>
        <div className="w-full h-64">
          {userAddressData && userAddressOptions && <Bar data={userAddressData} options={userAddressOptions} />}
        </div>
      </div>

      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full mt-4">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">
          Year of users statistics
        </h2>
        <div className="w-full h-64">
          {yearlyUserData && yearlyUserOptions && <Doughnut data={yearlyUserData} options={yearlyUserOptions} />}
        </div>
      </div>

      <div className="bg-white dark:bg-blue-500 p-6 rounded-lg shadow w-full mt-4">
        <h2 className="text-xl font-bold text-center md:text-left text-black dark:text-white">
          Addresses Statistics
        </h2>
        <div className="w-full h-64">
          {yearlyAddressData && yearlyAddressOptions && <Line data={yearlyAddressData} options={yearlyAddressOptions} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardCom;
