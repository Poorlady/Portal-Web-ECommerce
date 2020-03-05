import React from "react";

function EtalaseForm({ closePop }) {
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
        <form className="etalase-form">
          <div>
            <label>Add Etalase</label>
            <input className="input-border" />
          </div>
          <button className="add-etalase input-border">Add Etalase</button>
        </form>
      </div>
    </div>
  );
}

export default EtalaseForm;
