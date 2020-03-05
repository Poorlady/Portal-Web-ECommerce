import React from "react";

const currency = require("../helpers/stringFormarter");

function CartCard({ product }) {
  console.log(product);
  return (
    <div className="cart-card-wrapper">
      <div className="cart-card-img">
        <img src={`/uploads/${product.mainImg}`} alt={product.name} />
      </div>
      <div className="cart-card-title span-col-2">
        <h4>{product.name}</h4>
      </div>
      <div className="cart-card-info">
        <p>{product.amount}X</p>
      </div>
      <div className="cart-card-info">
        <p>{currency.toCurrency(product.price, product.amount)}</p>
      </div>
    </div>
  );
}

export default CartCard;
