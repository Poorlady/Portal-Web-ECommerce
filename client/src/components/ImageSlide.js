import React from "react";

function ImageSlide({ url }) {
  return (
    <div>
      <a href="https://icons8.com">
        <img className="image-slide" src={`/uploads/admins/${url}`} alt={url} />
      </a>
    </div>
  );
}

export default ImageSlide;
