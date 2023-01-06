import React from "react";
import { SECONDS } from "../../constants";
import "./style.css";

const SelectSeconds = ({ selected, setSeconds, className }) => {
  return (
    <div className={`options ${className}`}>
      {Object.values(SECONDS).map((second) => (
        <p
        key={second}
          className={`second ${second === selected && "active"}`}
          onClick={() => setSeconds(second)}
        >
          {second}
        </p>
      ))}
    </div>
  );
};

export default SelectSeconds;
