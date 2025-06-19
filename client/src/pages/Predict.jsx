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

const Predict = ({ predictionData, duration }) => {
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    if (!predictionData || predictionData.length < 2) return;

    let filteredData = [];
    if (duration === "3m") filteredData = predictionData.slice(0, 90);
    else if (duration === "6m") filteredData = predictionData.slice(0, 180);
    else if (duration === "1y") filteredData = predictionData.slice(0, 365);
    else filteredData = predictionData;

    const labels = [];
    const spending = [];

    for (let i = 1; i < filteredData.length; i++) {
      const prev = filteredData[i - 1].yhat;
      const curr = filteredData[i].yhat;
      const date = filteredData[i].date;

      const spent = Math.max(0, prev - curr);
      spending.push(spent.toFixed(2));
      labels.push(date);
    }

    // Set Line chart data
    setChartData({
      labels,
      datasets: [
        {
          label: "Daily Predicted Spending",
          data: spending,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    });

    // Pie chart data: group by 90-day chunks
    const totalSpending = spending.reduce((acc, val) => acc + parseFloat(val), 0);
    const pieChunks = [];
    const chunkSize = 90;

  if (duration === "1y") {
  // Special case: divide into 4 quarters as evenly as possible
  const quarterSize = Math.floor(spending.length / 4);
  for (let i = 0; i < 4; i++) {
    const start = i * quarterSize;
    const end = i === 3 ? spending.length : (i + 1) * quarterSize;
    const chunk = spending.slice(start, end);
    const sum = chunk.reduce((acc, val) => acc + parseFloat(val), 0);
    pieChunks.push(sum);
  }
} else {
  // Default chunking by 90-day groups
  for (let i = 0; i < spending.length; i += chunkSize) {
    const chunk = spending.slice(i, i + chunkSize);
    if (chunk.length > 0) {
      const sum = chunk.reduce((acc, val) => acc + parseFloat(val), 0);
      pieChunks.push(sum);
    }
  }
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
          label: "Quarterly Predicted Spending (₹)",
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
  }, [predictionData, duration]);

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Predicted Daily Spending Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Predicted Amount (₹)",
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
        <h2 className="text-xl font-semibold mb-4 text-center">Predicted Daily Spending Trend</h2>
        {chartData ? (
          <Line data={chartData} options={lineOptions} />
        ) : (
          <p className="text-center text-gray-500">Loading prediction chart...</p>
        )}
      </div>

      {/* Pie Chart Card */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-[1.02] transform transition-transform duration-300">
        <h2 className="text-xl font-semibold mb-4 text-center">Grouped Monthly Predictions</h2>
        {pieData ? (
          <Pie data={pieData} options={pieOptions} />
        ) : (
          <p className="text-center text-gray-500">Loading Pie Chart...</p>
        )}
      </div>
    </div>
  );
};

export default Predict;
