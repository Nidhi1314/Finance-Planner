
import React, { useEffect} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title } from "chart.js";
import { useState } from "react";


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const Predict = ({ predictionData, duration}) => {
  const [chartData, setchartData] = useState(null);
  

  useEffect(()=>{
    if(!predictionData || predictionData.length<2) return;
    let filteredData = [];
  if (duration === "3m") filteredData = predictionData.slice(0, 90);
  else if (duration === "6m") filteredData = predictionData.slice(0, 180);
  else if (duration === "1y") filteredData = predictionData.slice(0, 365);
  else filteredData = predictionData;

console.log("Sample predictionData:", predictionData.slice(0, 5));
console.log("Filtered Data:", filteredData);

    const labels=[];
    const spending=[];

    for(let i=1;i<filteredData.length;i++)
    {
      const prev=filteredData[i-1].yhat;
      const curr=filteredData[i].yhat;
      const date=filteredData[i].date;

      const spent=Math.max(0,prev-curr);
      spending.push(spent.toFixed(2));
      labels.push(date);
    }

    setchartData({
      labels,
      datasets:[
        {
          label:"Daily spending",
          data:spending,
          borderColor:"rgba(255,99,132,1",
          fill:false,
          tension:0.3,
        },
      ],
    });
  }, [predictionData, duration]);

  const options={
    responsive:true,
    plugins:{
      title:{
        display:true,
        text:"Predicted Daily Spending Trend",
      },
    },
    scales:{
      y:{
        beginAtZero:true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl h-[500px] mx-auto">
      
      {chartData ? <Line data={chartData} options={options}/> : <p>Loading...</p>}
      
    </div>
  );
};
export default Predict;