
import React, { useEffect} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title } from "chart.js";
import { useState } from "react";


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const Insights = ({ predictionData }) => {
  const [chartData, setchartData] = useState(null);

  useEffect(()=>{
    if(!predictionData || predictionData.length<2) return;

    const labels=[];
    const spending=[];

    for(let i=1;i<predictionData.length;i++)
    {
      const prev=predictionData[i-1].yhat;
      const curr=predictionData[i].yhat;
      const date=predictionData[i].date;

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
  }, [predictionData]);

  const options={
    reponsive:true,
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Analyse Expenses</h2>
      <p className="mb-4">This graph shows the predicted daily spending trend based on your uploaded data.</p>
      {chartData ? <Line data={chartData} options={options}/> : <p>Loading...</p>}
    </div>
  );
};
export default Insights;