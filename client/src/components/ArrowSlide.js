import React from "react";

function ArrowSlide({ onClick, position }) {
  return (
    <div className={` ${position}`}>
      <button onClick={() => onClick()}>arrow</button>
    </div>
  );
}

export default ArrowSlide;
