import React from "react";

// import Person from "../img/user.jpg";

function StorePageHeader({ store }) {
  console.log(store);
  return (
    <div className="store-page-header input-border">
      <div className="store-header-left">
        <div className="store-header-photo">
          <img src={`/uploads/stores/${store.img}`} alt="" />
        </div>
        <div className="store-header-info-left">
          <h4>{store.name}</h4>
          <p className="store-header-loc">Location : {store.location}</p>
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
