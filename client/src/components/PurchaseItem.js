import React from "react";

import Shoes from "../img/shoes.jpg";

function PurchaseItem() {
  return (
    <>
      <div className="item-photo">
        <img src={Shoes} />
      </div>
      <div className="span-col-4 the-item">
        <p className="the-item-header">Product's Name</p>
        <p>Product Option</p>
      </div>
      <div>
        <p>$100.00</p>
      </div>
    </>
  );
}

export default PurchaseItem;
