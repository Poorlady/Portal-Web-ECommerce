import React, { useState } from "react";

import EtalaseForm from "./EtalaseForm";

function EtalaseList() {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const openPop = () => {
    setIsAddClicked(true);
  };

  const closePop = () => {
    setIsAddClicked(false);
  };
  return (
    <div>
      {isAddClicked && <EtalaseForm closePop={closePop} />}
      <div className="etalase-list-header">
        <h4>Etalase List</h4>
        <button className="input-border" onClick={openPop}>
          Add Etalase
        </button>
        <hr />
      </div>
      <div></div>
    </div>
  );
}

export default EtalaseList;
