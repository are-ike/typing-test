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

const Text = ({ setData, isTestOver }) => {
  const [characterIdx, setCharacterIdx] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [characterIdx]);

  useEffect(() => {
    if (!isTestOver) return;

    setData({
      wpm: 20,
      accuracy: 66,
    });
  }, [isTestOver]);

  const onKeyDown = (e) => {
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

      return <span className={className}>{char}</span>;
    });
  };

  return (
    <div className="characters-container">
      <p className="characters">{renderCharacters()}</p>
    </div>
  );
};

export default Text;
