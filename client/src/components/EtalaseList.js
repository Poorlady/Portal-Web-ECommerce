import React, { useState, useEffect } from "react";
import axios from "axios";
import EtalaseForm from "./EtalaseForm";

function EtalaseList({ etalase, id, updateState }) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isEtalase] = useState(etalase && etalase);
  const URL = "/api/store/addEtalase";

  useEffect(() => {}, [isEtalase]);

  const openPop = () => {
    setIsAddClicked(true);
  };

  const closePop = () => {
    setIsAddClicked(false);
  };

  const deleteEtalase = async (name) => {
    let newEtalase = etalase.filter((item) => item !== name);
    await axios
      .put(URL, { id: id, etalase: newEtalase })
      .then((store) => {
        updateState("store", store.data);
        closePop();
      })
      .catch((err) => console.log(err));
  };

  let etalaseList =
    etalase &&
    etalase.map((item) => (
      <div key={item} className="etalaseList-div">
        <li>{item}</li>
        <button
          className="input-border del-btn"
          onClick={() => deleteEtalase(item)}
        >
          Delete
        </button>
      </div>
    ));

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
