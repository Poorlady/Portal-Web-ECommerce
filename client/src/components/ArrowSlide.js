import React from "react";

function ArrowSlide({ onClick, position }) {
  console.log(position.split(" ").pop());
  return (
    <div className={` ${position}`}>
      <button className="arrow--button input-border" onClick={() => onClick()}>
        {position.split(" ").pop() === "right" ? ">" : "<"}
      </button>
    </div>
  );
}

export default ArrowSlide;
