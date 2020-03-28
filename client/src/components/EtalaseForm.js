import React, { useState } from "react";

import axios from "axios";

function EtalaseForm({ updateState, etalaseList, closePop, id }) {
  const [etalase, setEtalase] = useState("");
  const [allEtalase, setAllEtalase] = useState(etalaseList ? etalaseList : []);
  const URL = "/api/store/addEtalase";

  const handleChange = e => {
    const { value } = e.target;
    setEtalase(value);
  };

  const handleSubmit = async e => {
    setAllEtalase(prev => prev.push(etalase));
    e.preventDefault();

    await axios
      .put(URL, { id: id, etalase: allEtalase })
      .then(store => {
        updateState("store", store.data);
        closePop();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-inner etalase-inner">
        <h4>Add New Etalase</h4>
        <hr />
        <button
          className="login-close etalase-close input-border"
          onClick={() => closePop()}
        >
          X
        </button>
        <form onSubmit={handleSubmit} className="etalase-form">
          <div>
            <label>Add Etalase</label>
            <input
              name="etalase"
              onChange={handleChange}
              className="input-border"
            />
          </div>
          <button className="add-etalase input-border">Add Etalase</button>
        </form>
      </div>
    </div>
  );
}

export default EtalaseForm;
