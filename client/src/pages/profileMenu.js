import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import ProfileForm from "../components/ProfileForm";
import ProfileMenu from "../components/ProfileMenu";
import ProfileProtection from "../components/ProtectionForm";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import PurchaseHistory from "../components/PurchaseHistory";
import StoreForm from "../components/StoreForm";
import EtalaseList from "../components/EtalaseList";
import StoreProductMenu from "../components/StoreProductMenu";
import StoreOrder from "../components/StoreOrder";

import { authContext } from "../contexts/Auth";

function Profile() {
  let { path } = useRouteMatch();
  const [store, setStore] = useState();
  const { user } = useContext(authContext);
  console.log(store);
  const fetchStore = async userId => {
    await axios
      .post("/api/store/getStore", { userId: userId })
      .then(result => setStore(result.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStore(user._id);
  }, []);

  return (
    <main className="profile-wrapper">
      <ProfileMenu store={store} />
      <div className="profile-form span-col-3">
        <Switch>
          <Route path={`${path}/menu`}>
            <ProfileForm />
          </Route>
          <Route path={`${path}/protection`}>
            <ProfileProtection />
          </Route>
          <Route path={`${path}/purchase-history`}>
            <PurchaseHistory />
          </Route>
          <Route path={`${path}/store/menu`}>
            <StoreForm store={store} fetchFunction={fetchStore} />
          </Route>
          <Route path={`${path}/store/etalase`}>
            <EtalaseList />
          </Route>
          <Route path={`${path}/store/products`}>
            <StoreProductMenu />
          </Route>
          <Route path={`${path}/store/order`}>
            <StoreOrder />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Profile;
