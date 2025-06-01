import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const Analyse = ({ processedData , duration }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

     let filteredData = [];
  if (duration === "3m") filteredData = processedData.slice(0, 90);
  else if (duration === "6m") filteredData = processedData.slice(0, 180);
  else if (duration === "1y") filteredData = processedData.slice(0, 365);
  else filteredData = processedData;


    const labels = filteredData.map(item => item.date);
    const amounts = filteredData.map(item => item.amount.toFixed(2));

    setChartData({
      labels,
      datasets: [
        {
          label: "Actual Daily Expense",
          data: amounts,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    });
  }, [processedData, duration]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Daily Actual Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount Spent (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div>

      
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default Analyse;
