import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Analyse = ({ processedData, duration }) => {
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    let filteredData = [];
    if (duration === "3m") filteredData = processedData.slice(0, 90);
    else if (duration === "6m") filteredData = processedData.slice(0, 180);
    else if (duration === "1y") filteredData = processedData.slice(0, 365);
    else filteredData = processedData;

    // Line Chart
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

    // Pie Chart - Quarterly Breakdown
    const totalSpending = filteredData.reduce((sum, item) => sum + item.amount, 0);
    const pieChunks = [];
    const chunkSize = 90;

    for (let i = 0; i < filteredData.length; i += chunkSize) {
      const chunk = filteredData.slice(i, i + chunkSize);
      const chunkSum = chunk.reduce((sum, item) => sum + item.amount, 0);
      pieChunks.push(chunkSum);
    }

    const pieLabels = pieChunks.map((_, idx) => {
  const start = idx * 3 + 1;
  const end = start + 2;
  return `Month ${start}–${end}`;
});

    setPieData({
      labels: pieLabels,
      datasets: [
        {
          label: "Quarterly Spending (₹)",
          data: pieChunks,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
          hoverOffset: 12,
          borderRadius: 5,
        },
      ],
    });
  }, [processedData, duration]);

  const lineOptions = {
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

  const pieOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const amount = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((amount / total) * 100).toFixed(1);
            return `₹${amount.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#4B5563",
          boxWidth: 18,
          padding: 15,
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4">
  {/* Line Chart Card */}
  <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-[1.02] transform transition-transform duration-300">
    <h2 className="text-xl font-semibold mb-4 text-center">Daily Actual Expenses</h2>
    {chartData ? <Line data={chartData} options={lineOptions} /> : <p>Loading Line Chart...</p>}
  </div>

  {/* Pie Chart Card */}
  <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-[1.02] transform transition-transform duration-300">
    <h2 className="text-xl font-semibold mb-4 text-center">Grouped Monthly Predictions</h2>
    {pieData ? <Pie data={pieData} options={pieOptions} /> : <p>Loading Pie Chart...</p>}
  </div>
</div>

  );
};

export default Analyse;
