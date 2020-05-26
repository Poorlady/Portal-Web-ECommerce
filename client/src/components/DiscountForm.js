import React, { useState } from "react";
import axios from "axios";

function DiscountForm({ closeForm, id }) {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [discount, setDiscount] = useState();
  const URL = "/api/products/add-discount";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStart(value);
    } else if (name === "end") {
      setEnd(value);
    } else {
      setDiscount(value);
    }
  };

  const validate = () => {
    let value = new Date(start) - new Date(end);
    if (value > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(URL, { start: start, end: end, id: id, rate: discount })
        .then((result) => {
          setEnd("");
          setStart("");
          alert("discount added");
          closeForm();
        })
        .catch((err) => console.log(err));
    } else {
      alert("End date have to be greater than start date");
    }
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-inner">
        <div className="disc-form-class">
          <form onSubmit={handleSubmit}>
            <h1>Add Discount</h1>
            <div className="disc-form-group">
              <label>Start Date</label>
              <input
                onChange={handleChange}
                name="start"
                value={start}
                className="input-border"
                type="date"
              />
            </div>
            <div className="disc-form-group">
              <label>End Date</label>
              <input
                onChange={handleChange}
                name="end"
                value={end}
                className="input-border"
                type="date"
              />
            </div>
            <div className="disc-form-group">
              <label>Dicount rate</label>
              <input
                placeholder="in percent"
                onChange={handleChange}
                name="rate"
                value={discount}
                className="input-border"
                type="number"
                min="1"
                max="100"
              />
            </div>
            <button className="input-border submit-btn" type="submit">
              Submit
            </button>
            <button
              onClick={() => closeForm()}
              className="input-border cancel-btn"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DiscountForm;
