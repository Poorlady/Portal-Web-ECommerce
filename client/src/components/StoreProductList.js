import React from "react";

import { Link } from "react-router-dom";

import Shoes from "../img/shoes.jpg";

function StoreProductList({ delClicked }) {
  return (
    <div className="store-product-wrapper">
      <div className="store-product-img">
        <img src={Shoes} />
      </div>
      <div className="span-col-2 store-product-detail">
        <h4>Product's Name</h4>
        <p>Price : $100.00</p>
        <p>Stock : 10 pieces</p>
      </div>
      <div className="store-product-menu">
        <Link to="/edit-product:id" className="input-border edit-btn">
          Edit
        </Link>
        <button className="input-border del-btn" onClick={delClicked}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StoreProductList;
