import React, { useState } from "react";
import ImageSlide from "./ImageSlide";
import ArrowSlide from "./ArrowSlide";

function Carousel({ classProp }) {
  const [img, setImg] = useState([
    "https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781",
    "https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900",
    "https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328",
    "https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg"
  ]);
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    if (index === 0) {
      return setIndex(img.length - 1);
    }

    setIndex(prevState => prevState - 1);
  };

  const nextSlide = () => {
    if (index === img.length - 1) {
      return setIndex(0);
    }

    setIndex(prevState => prevState + 1);
  };
  return (
    <div className={`${classProp} index-carousel`}>
      <div className="carousel-wrapper">
        <ArrowSlide onClick={prevSlide} position=" slide-arrow left" />
        <ImageSlide url={img[index]} />
        <ArrowSlide onClick={nextSlide} position=" slide-arrow right" />
      </div>
    </div>
  );
}

export default Carousel;
