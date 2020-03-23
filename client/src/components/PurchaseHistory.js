import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import PurchaseItem from "./PurchaseItem";

const currency = require("../helpers/stringFormarter");

function PurchaseHistory({ user }) {
  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const [history, setHistory] = useState([]);
  const URL = `/api/order/${user._id}`;

  const handleClick = () => {
    setIsDetailClicked(prevState => !prevState);
  };

  const fetchOrder = async e => {
    await axios
      .get(URL)
      .then(result => {
        console.log(result);
        setHistory(result.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  console.log(history);

  const mappedHistory = history.map(item => (
    <div className="purchase-history-wrapper input-border">
      <div className="purchase-history-logo">
        <p>Logo Cart</p>
      </div>
      <div className="purchase-history-item span-col-2">
        <p>{item.order.items.length} item(s)</p>
        <Link onClick={handleClick} className="input-border">
          See details
        </Link>
      </div>
      <div>
        <p>date: {item.orderDate && item.orderDate.split("T").shift()}</p>
      </div>
      <div>
        <p>{currency.toCurrency(item.total)}</p>
      </div>
      <div>
        <p>payment method</p>
      </div>
      {isDetailClicked &&
        item.order.items.map(product => (
          <PurchaseItem product={product} key={product._id} />
        ))}
    </div>
  ));
  return (
    <>
      <h4 className="mb-20">Purchase History</h4>
      <div className="purchase-history-wrapper">
        <p>Hello</p>
      </div>
      {mappedHistory}
      {/* <div className="purchase-history-wrapper input-border">
        <div className="purchase-history-logo">
          <p>Logo Cart</p>
        </div>
        <div className="purchase-history-item span-col-2">
          <p>2 items</p>
          <Link onClick={handleClick} className="input-border">
            See details
          </Link>
        </div>
        <div>
          <p>date: dd-mm-yyyy</p>
        </div>
        <div>
          <p>$200.00</p>
        </div>
        <div>
          <p>payment method</p>
        </div>
        {isDetailClicked && <PurchaseItem />}
      </div> */}
    </>
  );
}

export default PurchaseHistory;
