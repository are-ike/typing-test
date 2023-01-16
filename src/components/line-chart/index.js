import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const LineChart = ({labels, data}) => {
  return (
    <div>
      <Line
      id="1"
        //options={...}
        data={{
          labels: labels,
          datasets: [
            {
              label: "# of Votes",
              data: data,
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
