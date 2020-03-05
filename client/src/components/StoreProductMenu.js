import React, { useState } from "react";
import StoreProductList from "../components/StoreProductList";

function StoreProductMenu() {
  const [isDelClicked, setIsDelClicked] = useState(false);

  const delClicked = () => {
    setIsDelClicked(true);
  };

  const delClose = () => {
    setIsDelClicked(false);
  };

  return (
    <div className="store-productmenu-wrapper">
      <h4>Your Store Products</h4>
      <form>
        <input
          type="text"
          placeholder="Search Product"
          className="input-border store-productmenu-search"
        />
      </form>
      <hr />
      <StoreProductList delClicked={delClicked} />
      {isDelClicked && (
        <div className="popup-wrapper">
          <div className="popup-inner">
            <div className="store-product-del">
              <p>Are you sure?</p>
              <button className="ml-0 del-btn input-border">Delete</button>
              <button className=" input-border" onClick={delClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreProductMenu;
