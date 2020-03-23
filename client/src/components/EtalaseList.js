import React, { useState, useEffect } from "react";

import EtalaseForm from "./EtalaseForm";

function EtalaseList({ etalase, id, updateState }) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isEtalase] = useState(etalase && etalase);

  useEffect(() => {}, [isEtalase]);

  const openPop = () => {
    setIsAddClicked(true);
  };

  const closePop = () => {
    setIsAddClicked(false);
  };

  let etalaseList = etalase && etalase.map(item => <li key={item}>{item}</li>);

  return (
    <div>
      {isAddClicked && (
        <EtalaseForm
          etalaseList={etalase && etalase}
          id={id}
          updateState={updateState}
          closePop={closePop}
        />
      )}
      <div className="etalase-list-header">
        <h4>Etalase List</h4>
        <button className="input-border" onClick={openPop}>
          Add Etalase
        </button>
        <hr />
      </div>
      <div className="etalase-lists">
        <ul>{etalaseList}</ul>
      </div>
    </div>
  );
}

export default EtalaseList;
