import React from "react";

import { Link } from "react-router-dom";

import stringFormater from "../helpers/stringFormarter";

function StoreProductList({ product, delClicked }) {
  return (
    <div className="store-product-wrapper">
      <div className="store-product-img">
        <img src={`/uploads/products/${product.mainImg}`} />
      </div>
      <div className="span-col-2 store-product-detail">
        <h4>{product.name}</h4>
        <p>Price : {stringFormater.toCurrency(product.price)}</p>
        <p>Stock : {product.stock} pieces</p>
      </div>
      <div className="store-product-menu">
        <Link
          to={`/edit-product/${product._id}`}
          className="input-border edit-btn"
        >
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
