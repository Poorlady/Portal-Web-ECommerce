import React, { useState } from "react";

import PurchasItem from "./PurchaseItem";
import { Link } from "react-router-dom";

function StoreOrderList() {
  const [isShowClicked, setIsShowClicked] = useState(false);

  const showAble = () => {
    setIsShowClicked(true);
  };

  const showDisable = () => {
    setIsShowClicked(false);
  };

  return (
    <div className="store-order-wrapper input-border">
      <div className="store-order-info">
        <p>Name : Nama User</p>
        <p>
          Location : Jl. Mulwo Selatan No.15, Kel. Karangasem, Kec. Laweyan,
          Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145
        </p>
      </div>
      <div className="store-order-date">
        <p>February 2, 2020</p>
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
            <PurchasItem />
            <PurchasItem />
            <PurchasItem />
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
