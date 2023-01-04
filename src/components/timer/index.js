import React, { useEffect, useState } from "react";
import "./style.css";

const SECONDS = 60;

const Timer = ({ setIsTestOver }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (seconds < SECONDS) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    if (seconds === SECONDS) {
      setIsTestOver(true);
    }
  }, [seconds]);

  const displayCountdown = () => {

      const number = SECONDS - seconds

      if(number < 60){
          let seconds = number

          if(`${number}`.length < 2){
              seconds = `0${number}`
          }
          return `00:${seconds}`
      }else{
          return `1:00`
      }
  }

  return (
    <div className="timer">
      <div
        className="progress-bar"
        style={{ width: `${(seconds / 60) * 100}%` }}
      ></div>
      <div className="countdown">{displayCountdown()}</div>
    </div>
  );
};

export default Timer;
