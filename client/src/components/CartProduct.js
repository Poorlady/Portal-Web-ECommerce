import React from "react";

const currency = require("../helpers/stringFormarter");
const calculator = require("../helpers/calculator");
function CartProduct({
  product,
  delProduct,
  addProduct,
  subProduct,
  status,
  // toCurrency
}) {
  const date = new Date();

  return (
    <div className="cart-product-wrapper">
      <div className="cart-product-img">
        <img
          src={`/uploads/products/${product.productId.mainImg}`}
          alt={product.productId.name}
        />
      </div>
      <div className="cart-product-option span-col-3">
        <div>
          <p className="cart-product-optionHead">{product.productId.name}</p>
          <span className="capitalize">
            By {product.productId.storeId.name}
          </span>
        </div>
        <div>
          <p>Color: {product.colour ? product.colour : "-"}</p>
          <p>Size: {product.size ? product.size : "-"}</p>
        </div>
        <div>
          <p>Weight: {product.productId.weight}Kg</p>
          <p>Condition: {product.productId.condition}</p>
        </div>
      </div>
      <div>
        <p>
          {product.productId.discount
            ? new Date(product.productId.discount.startedDate) <= date &&
              new Date(product.productId.discount.endDate) >= date &&
              currency.toCurrency(
                calculator.getDiscount(product.productId),
                product.amount
              )
            : currency.toCurrency(product.productId.price, product.amount)}
        </p>
        {status !== "payment" && (
          <div className="cart-product-amount">
            <button
              className=" amount--button input-border"
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
            <button
              className=" amount--button input-border"
              onClick={() =>
                addProduct(product, 1, product.colour, product.size)
              }
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartProduct;
