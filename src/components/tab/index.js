import React from "react";
import "./index.css";

const Tab = ({ options, setOption, selectedOption }) => {
  return (
    <div className="result-options">
      {options.map((option, idx) => (
        <div
          key={option.id}
          onClick={() => setOption(option.id)}
          className={`tab-option ${
            option.id === selectedOption ? "selected-option" : ""
          } ${idx === 0 ? "one" : "two"}`}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default Tab;
