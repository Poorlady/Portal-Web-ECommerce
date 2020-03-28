import React from "react";
import { Link, useLocation } from "react-router-dom";
const currency = require("../helpers/stringFormarter");

function PurchaseItem({ product, reviewClick, orderId }) {
  let location = useLocation();

  console.log(orderId);
  return (
    <>
      <div className="item-photo">
        <img
          src={`/uploads/products/${product.product.mainImg}`}
          alt={product.name}
        />
      </div>
      <div
        className={`${
          location.pathname === "/profile/purchase-history"
            ? "span-col-2"
            : "span-col-3"
        } the-item`}
      >
        <p className="the-item-header">{product.product.name}</p>
        <p>Size: {product.size}</p>
        <p>Colour: {product.colour}</p>
        <p>Amount: {product.amount}</p>
      </div>
      {location.pathname === "/profile/purchase-history" && (
        <div>
          {product.reviewed ? (
            <p>Already reviewed</p>
          ) : (
            <button
              onClick={() => reviewClick(product, orderId)}
              className="input-border"
            >
              Add Review
            </button>
          )}
        </div>
      )}
      <div>
        <Link
          to={`/store/${product.product.storeId.name}`}
          className="capitalize"
        >
          {product.product.storeId.name}
        </Link>
      </div>
      <div>
        <p>{currency.toCurrency(product.product.price)}</p>
      </div>
    </>
  );
}

export default PurchaseItem;
