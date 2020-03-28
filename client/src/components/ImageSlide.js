import React from "react";

function ImageSlide({ url }) {
  return (
    <div>
      <img className="image-slide" src={url} alt={url} />
    </div>
  );
}

export default ImageSlide;
