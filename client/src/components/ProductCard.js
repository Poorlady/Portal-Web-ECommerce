import React from "react";
import { Link } from "react-router-dom";
const calculator = require("../helpers/calculator");
const currency = require("../helpers/stringFormarter");

function ProductCard({ product }) {
  const date = new Date();
  return (
    <Link className="card--link" to={`/product/${product._id}`}>
      <div className="product-card">
        <div className="product-card-photo">
          <img src={`/uploads/products/${product.mainImg}`} alt="" />
        </div>
        <div className="product-info">
          <p className="card-name">{product.name}</p>
          {product.discount ? (
            new Date(product.discount.startedDate) <= date &&
            new Date(product.discount.endDate) >= date && (
              <>
                <p className="strip">
                  {currency.toCurrency(product.price, product.amount)}
                </p>
                <small className="nostrip">{` ${product.discount.rate}% discount`}</small>
                <p>{currency.toCurrency(calculator.getDiscount(product))}</p>
              </>
            )
          ) : (
            <p>{currency.toCurrency(product.price, product.amount)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
