import React, { useState, useEffect } from "react";
import ArrowSlide from "./ArrowSlide";
import ProductCard from "./ProductCard";
function ProductSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(products => setProducts(products));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    // find the index of the last image in the array
    const lastIndex = products.length - 1;
    // check if we need to start over from the last index again
    const resetIndex = currentIndex === 0;
    const index = resetIndex ? lastIndex : currentIndex - 1;
    // assign the logical index to currentImageIndex that will use in render method
    setCurrentIndex(index);
  };
  const nextSlide = () => {
    // find the index of the last image in the array
    const lastIndex = products.length - 1;
    // check if we need to start over from the first index
    const resetIndex = currentIndex === lastIndex;
    const index = resetIndex ? 0 : currentIndex + 1;
    // assign the logical index to currentImageIndex that will use in render method
    setCurrentIndex(index);
  };

  // get current image index
  const index = currentIndex;
  // create a new array with 5 videos from the source images
  let firstFiveVideo = products.slice(index, index + 5);
  // check the length of the new array (it’s less than 5 when index is near the end of the array)
  if (firstFiveVideo.length < 5) {
    // if the firstFiveVideo's length is lower than 5 images than append missing images from the beginning of the original array
    firstFiveVideo = firstFiveVideo.concat(
      products.slice(0, 5 - firstFiveVideo.length)
    );
  }

  return (
    <div className="slider-wrapper">
      <ArrowSlide onClick={prevSlide} position={"slide-arrow left"}>
        Prev
      </ArrowSlide>
      <div className="products-slider">
        {firstFiveVideo.map(product => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <ArrowSlide onClick={nextSlide} position={"slide-arrow right"}>
        Next
      </ArrowSlide>
    </div>
  );
}

export default ProductSlider;
