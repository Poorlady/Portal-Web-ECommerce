import React, { useState } from "react";

import PurchasItem from "./PurchaseItem";
import { Link } from "react-router-dom";

function StoreOrderList({ order, store }) {
  const [isShowClicked, setIsShowClicked] = useState(false);

  const showAble = () => {
    setIsShowClicked(true);
  };

  const showDisable = () => {
    setIsShowClicked(false);
  };
  const orderItems = order.products
    .filter(item => item.storeName === store.name)
    .map(item => <PurchasItem product={item} key={item._id} />);

  return (
    <div className="store-order-wrapper input-border">
      <div className="store-order-info">
        <p className="capitalize">Name : {order.userName}</p>
        <p className="capitalize">Location : {order.location}</p>
      </div>
      <div className="store-order-date">
        <p className="capitalize">February 2, 2020</p>
      </div>
      <div className="store-order-item-wrapper">
        <div className="span-col-5">
          <p className="store-table-header">Order Item</p>
        </div>
        <div>
          <p className="store-table-header">Product Price</p>
        </div>
        {isShowClicked ? (
          <>
            {orderItems}
            <Link className="span-col-6" onClick={showDisable}>
              Close Details
            </Link>
          </>
        ) : (
          <Link className="span-col-6" onClick={showAble}>
            Show Details...
          </Link>
        )}
      </div>
    </div>
  );
}

export default StoreOrderList;
