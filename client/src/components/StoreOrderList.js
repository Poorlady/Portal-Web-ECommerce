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
  console.log(order);
  const orderItems = order.order.items
    .filter(item => item.product.storeId.name === store.name)
    .map(item => <PurchasItem product={item} key={item._id} />);

  console.log(orderItems);
  return (
    // <p>hello</p>
    <div className="store-order-wrapper input-border">
      <div className="store-order-info">
        <p className="capitalize">Name : {order.user.name}</p>
        <p className="capitalize">Location : {order.user.location}</p>
      </div>
      <div className="store-order-date">
        <p className="capitalize">{order.orderDate.split("T").shift()}</p>
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
