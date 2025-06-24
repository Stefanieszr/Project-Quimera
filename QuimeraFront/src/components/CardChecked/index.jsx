import React from "react";
import "./styles.css";

function CardChecked({ children, isClicked, handleClick }) {
  return (
    <div
      className={`card ${isClicked ? "card-clicked" : ""}`}
      onClick={handleClick}
    >
      <span>{children}</span>
    </div>
  );
}

export default CardChecked;
