import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import StoreOrderList from "./StoreOrderList";
import { authContext } from "../contexts/Auth";

function StoreOrder() {
  const { store } = useContext(authContext);
  const [order, setOrder] = useState([]);
  const URL = `/api/order/${store.name}`;

  const fetchOrder = async e => {
    await axios(URL)
      .then(result => setOrder(result.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchOrder();
  });

  const mappedOrders = order.map(item => (
    <StoreOrderList store={store} order={item} key={item._id} />
  ));
  return (
    <div className="store-order-page">
      <h4>Your Store's Order </h4>
      <hr />
      {mappedOrders}
    </div>
  );
}

export default StoreOrder;
