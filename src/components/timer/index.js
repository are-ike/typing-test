import React, { useEffect, useState } from "react";
import "./style.css";

const Timer = ({
  setIsTestOver,
  selectedSeconds,
  hasTestStarted,
  isTestOver,
  setCompletionTime,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(selectedSeconds);

  useEffect(() => {
    setSecondsLeft(selectedSeconds);
  }, [selectedSeconds]);

  useEffect(() => {
    if (!hasTestStarted) return;

    let interval;
    if (secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    } else {
      setIsTestOver(true);
      setCompletionTime('N/A')
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [secondsLeft, hasTestStarted]);

  useEffect(() => {
    if (isTestOver && secondsLeft !== 0) {
      setCompletionTime(selectedSeconds - secondsLeft);
      console.log(selectedSeconds, secondsLeft, selectedSeconds - secondsLeft);
    }
  }, [isTestOver]);

  const getSecondsString = (secondsLeft) => {
    let secondsString = `${secondsLeft % 60}`;

    if (`${secondsString}`.length < 2) {
      secondsString = `0${secondsString}`;
    }
    return secondsString;
  };

  return (
    <div className="timer">
      <div
        className="progress-bar"
        style={{
          width: `${
            ((selectedSeconds - secondsLeft) / selectedSeconds) * 100
          }%`,
        }}
      ></div>
      <div className={`countdown ${hasTestStarted ? "remove-hidden" : ""}`}>
        0{Math.trunc(secondsLeft / 60)}:{getSecondsString(secondsLeft)}
      </div>
    </div>
  );
};

export default Timer;
