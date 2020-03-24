import React, { useState } from "react";
import PurchaseItem from "./PurchaseItem";
import { Link } from "react-router-dom";

function PurchaseList({ item, reviewClick }) {
  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const currency = require("../helpers/stringFormarter");

  const handleClick = () => {
    setIsDetailClicked(prevState => !prevState);
  };

  return (
    <div className="purchase-history-wrapper input-border">
      <div className="purchase-history-logo">
        <p>Logo Cart</p>
      </div>
      <div className="purchase-history-item span-col-2">
        <p className="capitalize">{item.order.items.length} item(s)</p>
        <Link onClick={handleClick} className="input-border">
          See details
        </Link>
      </div>
      <div>
        <p className="capitalize">
          date: {item.orderDate && item.orderDate.split("T").shift()}
        </p>
      </div>
      <div>
        <p>{currency.toCurrency(item.total)}</p>
      </div>
      <div>
        <p className="capitalize">payment method</p>
      </div>
      {isDetailClicked &&
        item.order.items.map(product => (
          <PurchaseItem
            reviewClick={reviewClick}
            product={product}
            orderId={item._id}
            key={product._id}
          />
        ))}
    </div>
  );
}

export default PurchaseList;
