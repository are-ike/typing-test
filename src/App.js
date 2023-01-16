import { useEffect, useState } from "react";
import "./App.css";
import Result from "./components/result";
import Text from "./components/text";
import Timer from "./components/timer";
import { SECONDS } from "./constants";
import SelectSeconds from "./components/select-seconds";

function App() {
  const [seconds, setSeconds] = useState(SECONDS[60]);
  const [hasTestStarted, setHasTestStarted] = useState(false);
  const [isTestOver, setIsTestOver] = useState(false);
  const [resultData, setResultData] = useState({
    wpm: null,
    accuracy: null,
  });

  const reset = () => {
    setSeconds(SECONDS[60]);
    setHasTestStarted(false);
    setIsTestOver(false);
    setResultData({
      wpm: null,
      accuracy: null,
    });
  };

  return (
    <div className="container">
      {
        isTestOver && resultData.wpm !== null
        //true 
        ? (
          <Result resultData={resultData} resetTest={reset}/>
        ) : (
          <div className="test">
            <Timer
              setIsTestOver={setIsTestOver}
              seconds={seconds}
              hasTestStarted={hasTestStarted}
            />

            <p>Start typing</p>
            <SelectSeconds
              selected={seconds}
              setSeconds={setSeconds}
              className={hasTestStarted ? "hidden" : ""}
            />

            <Text
              setResultData={setResultData}
              isTestOver={isTestOver}
              seconds={seconds}
              hasTestStarted={hasTestStarted}
              setHasTestStarted={setHasTestStarted}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
