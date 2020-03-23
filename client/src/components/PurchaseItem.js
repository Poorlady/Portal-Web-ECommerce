import React from "react";
import { Link } from "react-router-dom";
const currency = require("../helpers/stringFormarter");

function PurchaseItem({ product }) {
  return (
    <>
      <div className="item-photo">
        <img src={`/uploads/products/${product.mainImg}`} alt={product.name} />
      </div>
      <div className="span-col-3 the-item">
        <p className="the-item-header">{product.name}</p>
        <p>Size: {product.size}</p>
        <p>Colour: {product.colour}</p>
        <p>Amount: {product.amount}</p>
      </div>
      <div>
        <Link to={`/store/${product.storeName}`} className="capitalize">
          {product.storeName}
        </Link>
      </div>
      <div>
        <p>{currency.toCurrency(product.price)}</p>
      </div>
    </>
  );
}

export default PurchaseItem;
