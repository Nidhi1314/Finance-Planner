
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const Insights = () => {
  const dummyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [500, 700, 600, 800, 750],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Expense Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analyze Expenses</h2>
      <p className="mb-4">View insights and trends from your financial statements.</p>
      <Line data={dummyData} options={options} />
    </div>
  );
};

export default Insights;
