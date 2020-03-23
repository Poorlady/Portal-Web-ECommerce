import React from "react";

const currency = require("../helpers/stringFormarter");

function CartCard({ product }) {
  console.log(product);
  return (
    <div className="cart-card-wrapper">
      <div className="cart-card-img">
        <img
          src={`/uploads/products/${product.productId.mainImg}`}
          alt={product.productId.name}
        />
      </div>
      <div className="cart-card-title span-col-2">
        <h4>{product.productId.name}</h4>
      </div>
      <div className="cart-card-info">
        <p>{product.amount}X</p>
      </div>
      <div className="cart-card-info">
        <p>{currency.toCurrency(product.productId.price, product.amount)}</p>
      </div>
    </div>
  );
}

export default CartCard;
