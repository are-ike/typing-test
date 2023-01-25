import { useEffect, useState } from "react";
import "./App.css";
import Result from "./components/result";
import Text from "./components/text";
import Timer from "./components/timer";
import { SECONDS } from "./constants";
import SelectSeconds from "./components/select-seconds";

function App() {
  const [selectedSeconds, setSelectedSeconds] = useState(SECONDS[60]);
  const [completionTime, setCompletionTime] = useState(null);
  const [hasTestStarted, setHasTestStarted] = useState(false);
  const [isTestOver, setIsTestOver] = useState(false);
  const [resultData, setResultData] = useState({
    wpm: null,
    accuracy: null,
  });

  const reset = () => {
    setSelectedSeconds(SECONDS[60]);
    setHasTestStarted(false);
    setIsTestOver(false);
    setResultData({
      wpm: null,
      accuracy: null,
    });
  };

  return (
    <div className="container">
      {isTestOver && resultData.wpm !== null ? (
        // true
        <Result resultData={resultData} resetTest={reset} />
      ) : (
        <div className="test">
          <Timer
            setIsTestOver={setIsTestOver}
            selectedSeconds={selectedSeconds}
            hasTestStarted={hasTestStarted}
            isTestOver={isTestOver}
            setCompletionTime={setCompletionTime}
          />

          <p className={`start-typing ${hasTestStarted ? "hidden" : ""}`}>
            Start typing
          </p>

          <SelectSeconds
            selected={selectedSeconds}
            setSelectedSeconds={setSelectedSeconds}
            className={hasTestStarted ? "hidden" : ""}
          />

          <Text
            setResultData={setResultData}
            setIsTestOver={setIsTestOver}
            isTestOver={isTestOver}
            selectedSeconds={selectedSeconds}
            completionTime={completionTime}
            hasTestStarted={hasTestStarted}
            setHasTestStarted={setHasTestStarted}
          />
        </div>
      )}
    </div>
  );
}

export default App;
