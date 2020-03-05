import React from "react";

import Person from "../img/user.jpg";

function StorePageHeader() {
  return (
    <div className="store-page-header input-border">
      <div className="store-header-left">
        <div className="store-header-photo">
          <img src={Person} alt="" />
        </div>
        <div className="store-header-info-left">
          <h4>Store name</h4>
          <p className="store-header-loc">Location : Jakarta Timur</p>
        </div>
      </div>
      <div className="store-header-right">
        <p>
          <span className="sold-header">Rating</span>5
        </p>
        <p>
          <span className="sold-header">Produk Terjual</span>
          1Rb
        </p>
      </div>
    </div>
  );
}

export default StorePageHeader;
