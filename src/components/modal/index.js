import React from "react";
import "./style.css";

const Modal = ({ showModal, data }) => {
  return (
    showModal && (
      <div className="underlay">
        <div className="modal">
          <p>
            Your speed is {data.wpm} wpm with {data.accuracy}% accuracy
          </p>
        </div>
      </div>
    )
  );
};

export default Modal;
