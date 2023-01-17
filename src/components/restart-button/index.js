import React, { useState } from "react";
import "./index.css";

const RestartButton = ({ onTrigger }) => {
  const [isFocused, setIsFocused] = useState(false);

  const onKeyUp = (e) => {
    if (isFocused && e.code == "Enter") {
      onTrigger();
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <button
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onClick={onTrigger}
      className="restart-button"
    >
      Try Again
    </button>
  );
};

export default RestartButton;
