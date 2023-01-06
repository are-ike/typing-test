import React, { useState, useEffect } from "react";
import "./style.css";

const status = {
  CORRECT: "CORRECT",
  WRONG: "WRONG",
  NONE: "NONE",
};

const text =
  "An excerpt in writing is a quoted passage taken from a longer work, such as a book, or poem, or an article. Whatever the subject of your writing or the type of writing you intend to compose, excerpts can be used to  readers what it is you want them to understand and remember about the subject.";

const textArray = text.split("");
const mapping = {};

const Text = ({
  setResultData,
  isTestOver,
  seconds,
  setHasTestStarted,
  hasTestStarted,
}) => {
  const [characterIdx, setCharacterIdx] = useState(0);

  const calculateResult = () => {
    const characters = Object.values(mapping).filter(
      (stat) => stat !== status.NONE
    ).length;
    const words = characters / 5;
    const wpm = words / (seconds / 60);

    const correctCharacters = Object.values(mapping).filter(
      (stat) => stat === status.CORRECT
    ).length;
    const accuracy = (correctCharacters / characters) * 100;

    setResultData({
      wpm,
      accuracy,
    });
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

      return <span key={index} className={className}>{char}</span>;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [characterIdx]);

  useEffect(() => {
    if (!isTestOver) return;

    calculateResult();
  }, [isTestOver]);

  return (
    <div className="characters-container">
      <p className="characters">{renderCharacters()}</p>
    </div>
  );
};

export default Text;
