import React, { useEffect, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { authContext } from "../contexts/Auth";

function ProfileMenu() {
  let { url } = useRouteMatch();
  const { store } = useContext(authContext);
  useEffect(() => {}, [store]);

  return (
    <div className=" input-border ">
      <div className="profile-menu">
        <div>
          <Link className="profile--link" to={`${url}/menu`}>
            User Information
          </Link>
          <Link className="profile--link" to={`${url}/protection`}>
            Protection
          </Link>
          <Link className="profile--link" to={`${url}/purchase-history`}>
            Purchase History
          </Link>
        </div>
        {store ? (
          <div>
            <h4>Store Menu</h4>
            <Link className="profile--link" to={`${url}/store/menu`}>
              Store Information
            </Link>
            <Link className="profile--link" to={`${url}/store/etalase`}>
              Store Etalase
            </Link>
            <Link className="profile--link" to={`${url}/store/products`}>
              Product List
            </Link>
            <Link className="profile--link" to={"/add-product"}>
              Add Product
            </Link>
            <Link className="profile--link" to={`${url}/store/order`}>
              Order List
            </Link>
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
