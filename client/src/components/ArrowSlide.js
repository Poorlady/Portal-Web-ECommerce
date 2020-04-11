import React from "react";

function ArrowSlide({ onClick, position }) {
  return (
    <div className={` ${position}`}>
      <button className="arrow--button input-border" onClick={() => onClick()}>
        {position.split(" ").pop() === "right" ? ">" : "<"}
      </button>
    </div>
  );
}

export default ArrowSlide;
