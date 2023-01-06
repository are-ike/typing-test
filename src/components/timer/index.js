import React, { useEffect, useState } from "react";
import "./style.css";

const Timer = ({ setIsTestOver, seconds, hasTestStarted }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    setSecondsLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!hasTestStarted) return;

    let interval;
    if (secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    } else {
      setIsTestOver(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [secondsLeft, hasTestStarted]);

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
        style={{ width: `${((seconds - secondsLeft) / seconds) * 100}%` }}
      ></div>
      <div className={`countdown ${hasTestStarted ? "remove-hidden" : ""}`}>
        0{Math.trunc(secondsLeft / 60)}:{getSecondsString(secondsLeft)}
      </div>
    </div>
  );
};

export default Timer;
