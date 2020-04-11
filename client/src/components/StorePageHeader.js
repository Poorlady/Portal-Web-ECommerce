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
          <h4 className="capitalize">{store.name}</h4>
          <p className="store-header-loc">
            Location :{" "}
            {store.location.split(",").map((item) => (
              <>
                <span>{item}</span>
                <br />
              </>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StorePageHeader;
