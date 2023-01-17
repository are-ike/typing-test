import React, { useEffect, useState } from "react";
import LineChart from "../line-chart";
import RestartButton from "../restart-button";
import Tab from "../tab";
import "./index.css";

const tabOptions = [
  { id: "wpm", name: "Speed (WPM)" },
  { id: "accuracy", name: "Accuracy (%)" },
];

const Result = ({ resetTest, resultData }) => {
  const [option, setOption] = useState(tabOptions[0].id);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("wpm-data")) ?? [];

    if (!results.length) resetTest();

    setResults(results);
  }, []);

  const transformResultsToGraphData = () => {
    const dates = results.map((result) => result.date);
    const wpm = results.map((result) => result.wpm);
    const accuracy = results.map((result) => result.accuracy);

    return { dates, wpm, accuracy };
  };

  return (
    <>
      {results.length && (
        <div className="results-container">
          <div>
            <div className="flex-center">
              <RestartButton onTrigger={resetTest}/>
            </div>
            <Tab
              options={tabOptions}
              setOption={setOption}
              selectedOption={option}
            />
            <div className="results">
              <div>
                <div>
                  <h6 className="heading">wpm</h6>
                  <p className="value">{resultData.wpm ?? 0}</p>
                </div>
                <div>
                  <h6 className="heading">accuracy</h6>
                  <p className="value">{resultData.accuracy ?? 0}%</p>
                </div>
              </div>
              <LineChart
                option={option}
                labels={transformResultsToGraphData().dates}
                data={
                  option === tabOptions[0].id
                    ? transformResultsToGraphData().wpm
                    : transformResultsToGraphData().accuracy
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
