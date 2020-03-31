import React from "react";

function CarouselItem({ item, handleClick }) {
  return (
    <div className="carousel--item-div">
      <a href="https://icons8.com">
        <img src={`/uploads/admins/${item}`} alt={item} />
      </a>
      <button
        onClick={() => handleClick(item)}
        className="del-btn cat--item input-border"
      >
        delete
      </button>
    </div>
  );
}

export default CarouselItem;
