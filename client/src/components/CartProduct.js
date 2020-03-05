import React, { useState } from "react";

const currency = require("../helpers/stringFormarter");

function CartProduct({
  product,
  delProduct,
  addProduct,
  subProduct
  // toCurrency
}) {
  return (
    <div className="cart-product-wrapper">
      <div className="cart-product-img">
        <img src={`/uploads/${product.mainImg}`} alt={product.name} />
      </div>
      <div className="cart-product-option span-col-3">
        <div>
          <p className="cart-product-optionHead">{product.name}</p>
          <span>By {product.storeName}</span>
        </div>
        <div>
          <p>Color: {product.colour ? product.colour : "-"}</p>
          <p>Size: {product.size ? product.size : "-"}</p>
        </div>
        <div>
          <p>Weight: {product.weight}Kg</p>
          <p>Condition: {product.condition}</p>
        </div>
      </div>
      <div>
        <p>{currency.toCurrency(product.price, product.amount)}</p>
        <div className="cart-product-amount">
          <button
            className="input-border"
            onClick={() =>
              product.amount === 1 ? delProduct(product) : subProduct(product)
            }
          >
            -
          </button>
          <input
            className="input-border"
            type="number"
            placeholder="amount"
            value={product.amount}
          />
          <button className="input-border" onClick={() => addProduct(product)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
