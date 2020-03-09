import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

import { authContext } from "../contexts/Auth";

function ProfileMenu() {
  let { url } = useRouteMatch();
  const { store } = useContext(authContext);
  useEffect(() => {}, [store]);

  return (
    <div className=" input-border ">
      <div className="profile-menu">
        <div>
          <Link to={`${url}/menu`}>User Information</Link>
          <Link to={`${url}/protection`}>Protection</Link>
          <Link to={`${url}/purchase-history`}>Purchase History</Link>
        </div>
        {store ? (
          <div>
            <h4>Store Menu</h4>
            <Link to={`${url}/store/menu`}>Store Information</Link>
            <Link to={`${url}/store/etalase`}>Store Etalase</Link>
            <Link to={`${url}/store/products`}>Product List</Link>
            <Link to={"/add-product"}>Add Product</Link>
            <Link to={`${url}/store/order`}>Order List</Link>
          </div>
        ) : (
          <Link
            to={`${url}/store/menu`}
            className="profile-open-store input-border"
          >
            Open Store
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProfileMenu;
