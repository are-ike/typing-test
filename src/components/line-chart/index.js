import React from "react";
import { Line } from "react-chartjs-2";
import "./index.css";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "Roboto Mono";
Chart.defaults.color = "#d1d0c5";

const LineChart = ({ labels, data, option }) => {
  return (
    <div>
      <Line
       width={'1000'}
       
       height={'300'}
        id="1"
       // className="line-chart"
        options={{
          scales: {
            x: {
              grid: {
                color: "rgba(209, 208, 197, 0.5)",
              },
            },
            y: {
              grid: {
                color: "rgba(209, 208, 197, 0.5)",
              },
            },
          },
        }}
        data={{
          labels: labels,

          datasets: [
            {
              label: option === 'accuracy' ? 'Accuracy' : 'Speed',
              data: data,
              borderWidth: 2,
              borderColor: "#e2b714",
              fill: true,
              
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
