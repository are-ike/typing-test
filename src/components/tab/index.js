import React from "react";
import './index.css'

const Tab = ({ options, setOption, option }) => {
  return (
    <div className="result-options">
      {options.map((option) => (
        <div onClick={setOption(option.id)}>{option.name}</div>
      ))}
    </div>
  );
};

export default Tab;
