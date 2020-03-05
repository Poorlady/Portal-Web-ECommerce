import React, { useState } from "react";

import { Link } from "react-router-dom";

import PurchaseItem from "./PurchaseItem";

function PurchaseHistory() {
  const [isDetailClicked, setIsDetailClicked] = useState(false);

  const handleClick = () => {
    setIsDetailClicked(prevState => !prevState);
  };

  return (
    <>
      <h4 className="mb-20">Purchase History</h4>
      <div className="purchase-history-wrapper">
        <p>Hello</p>
      </div>
      <div className="purchase-history-wrapper input-border">
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
      </div>
    </>
  );
}

export default PurchaseHistory;
