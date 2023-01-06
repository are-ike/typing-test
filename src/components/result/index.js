import React, { useEffect } from "react";
import LineChart from "../line-chart";

const Result = ({ resultData }) => {
    useEffect(() => {
        //localStorage.getItem('wpm-data')
    })
  return (
    <div>
      <div>
        <div>
          <h6>wpm</h6>
          <p>{Math.round(resultData.wpm)}</p>
        </div>
        <div>
          <h6>accuracy</h6>
          <p>{Math.ceil(resultData.accuracy)}%</p>
        </div>
      </div>
      <LineChart/>
    </div>
  );
};

export default Result;
