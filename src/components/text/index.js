import React, { useState, useEffect } from "react";
import "./style.css";

const status = {
  CORRECT: "CORRECT",
  WRONG: "WRONG",
  NONE: "NONE",
};

const text =
  "An excerpt in writing is a";

const textArray = text.split("");
let mapping = {};

const Text = ({
  setResultData,
  isTestOver,
  setIsTestOver,
  selectedSeconds,
  completionTime,
  setHasTestStarted,
  hasTestStarted,
}) => {
  const [characterIdx, setCharacterIdx] = useState(0);

  const calculateResult = () => {
    const characters = Object.values(mapping).filter(
      (stat) => stat !== status.NONE
    ).length;
    const words = characters / 5;
    const wpm = words / ((completionTime ?? selectedSeconds) / 60);

    const correctCharacters = Object.values(mapping).filter(
      (stat) => stat === status.CORRECT
    ).length;
    const accuracy = (correctCharacters / characters) * 100;

    const result = {
      wpm: Math.round(wpm),
      accuracy: Math.ceil(accuracy),
    };

    storeResult(result);
    setResultData(result);
    reset();
  };

  const reset = () => {
    mapping = {};
    setCharacterIdx(0);
  };

  const storeResult = (newResult) => {
    newResult.date = getDate();
    const results = JSON.parse(localStorage.getItem("wpm-data")) ?? [];
    results.push(newResult);
    localStorage.setItem("wpm-data", JSON.stringify(results));
  };

  const getDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const onBackspace = () => {
    if (!hasTestStarted) return;

    const newCharacterIdx = characterIdx - 1;

    mapping[newCharacterIdx] = status.NONE;

    setCharacterIdx(newCharacterIdx);
  };

  const onKeyDown = (e) => {
    //Regex to accept non-special characters
    const regex = /^[\w\[\]` \\\/"|,.?~!@#$%\^&*()={}:;<>+'-]{1}$/;

    if (e.keyCode === 8) onBackspace();

    if (!regex.test(e.key)) return;
    //Start timer once the first key is pressed
    setHasTestStarted(true);

    if (e.key == textArray[characterIdx]) {
      mapping[characterIdx] = status.CORRECT;
    } else {
      mapping[characterIdx] = status.WRONG;
    }

    if(characterIdx === textArray.length - 1){
      setIsTestOver(true)
    }

    setCharacterIdx((characterIdx) => characterIdx + 1);
  };

  const renderCharacters = () => {
    return textArray.map((char, index) => {
      let className = "character";

      if (index === characterIdx) {
        className += " active";
      }

      if (mapping[index] === status.CORRECT) {
        className += " correct";
      }

      if (mapping[index] === status.WRONG) {
        className += " wrong";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [characterIdx]);

  useEffect(() => {
    if (!isTestOver || completionTime === null) return;
console.log(completionTime);
    calculateResult();
  }, [isTestOver, completionTime]);

  return (
    <div className="characters-container">
      <p className="characters">{renderCharacters()}</p>
    </div>
  );
};

export default Text;
