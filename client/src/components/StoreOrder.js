import React from "react";

import StoreOrderList from "./StoreOrderList";

function StoreOrder() {
  return (
    <div className="store-order-page">
      <h4>Your Store's Order </h4>
      <hr />
      <StoreOrderList />
      <StoreOrderList />
    </div>
  );
}

export default StoreOrder;
