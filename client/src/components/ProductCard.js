import React from "react";
import { Link } from "react-router-dom";

const currency = require("../helpers/stringFormarter");

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="product-card">
        <div className="product-card-photo">
          <img src={`/uploads/${product.mainImg}`} alt="" />
        </div>
        <div className="product-info">
          <p className="card-name">{product.name}</p>
          <p> {product.price && currency.toCurrency(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
