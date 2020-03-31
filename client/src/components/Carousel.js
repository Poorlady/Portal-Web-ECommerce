import React, { useState, useEffect } from "react";
import ImageSlide from "./ImageSlide";
import ArrowSlide from "./ArrowSlide";

function Carousel({ classProp, item }) {
  // const [img, setImg] = useState(item);
  const [index, setIndex] = useState(0);
  // console.log(img[0]);
  useEffect(() => {
    // setImg(item);
  }, [item]);

  const prevSlide = () => {
    if (index === 0) {
      return setIndex(item.length - 1);
    }

    setIndex(prevState => prevState - 1);
  };

  const nextSlide = () => {
    if (index === item.length - 1) {
      return setIndex(0);
    }

    setIndex(prevState => prevState + 1);
  };
  return item.length > 0 ? (
    <>
      <div className={`${classProp} index-carousel`}>
        <div className="carousel-wrapper">
          <ArrowSlide onClick={prevSlide} position=" slide-arrow left" />
          <ImageSlide url={item[index]} />
          <ArrowSlide onClick={nextSlide} position=" slide-arrow right" />
        </div>
      </div>
    </>
  ) : (
    <p>Loading....</p>
  );
}

export default Carousel;
