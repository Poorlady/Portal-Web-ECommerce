import React from "react";

import PowerStoreBanner from "./PowerStoreBaner";
import PowerStoreEtalase from "./PowerStoreEtalase";

function PowerStore() {
  return (
    <div className="power-store-wrapper">
      <div className="span-col-4">
        <h4>Store Name</h4>
      </div>
      <PowerStoreEtalase />
      <PowerStoreEtalase />
      <PowerStoreEtalase />
      <PowerStoreEtalase />
      <PowerStoreEtalase />
      <PowerStoreBanner />
    </div>
  );
}

export default PowerStore;
