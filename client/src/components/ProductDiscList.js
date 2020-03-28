import React from "react";
import ProductSlider from "./ProductSlider";

function ProductDiscList() {
  return (
    <div className="disc-wrapper">
      <div className="disc-header">
        <h2>Today's Special Discount</h2>
      </div>
      <div className="disc-slider">
        <ProductSlider />
      </div>
    </div>
  );
}

export default ProductDiscList;
