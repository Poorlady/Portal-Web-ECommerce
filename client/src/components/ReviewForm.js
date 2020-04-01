import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../contexts/Auth";
import { useHistory } from "react-router-dom";

function ReviewForm({ closeReview, productToReview, orderId }) {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const { user } = useContext(authContext);
  const fullName = user.fName + " " + user.lName;
  let history = useHistory();
  console.log(productToReview);
  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post("/api/product/addreview", {
        userId: user._id,
        userName: fullName,
        productId: productToReview.product._id,
        orderList: productToReview._id,
        text: text,
        rate: rate,
        orderId: orderId
      })
      .then(resutl => {
        if (resutl.status === 200) {
          closeReview(200);
          history.push("/profile/purchase-history");
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    const { value, name } = e.target;
    if (name === "text") {
      setText(value);
    } else {
      setRate(value);
    }
  };
  return (
    <div className="popup-wrapper">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Review Text</label>
            <input
              className="input-border"
              type="text"
              name="text"
              placeholder="Put your review here"
              value={text}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Review Text</label>
            <input
              className=" input-border"
              type="number"
              min="1"
              max="5"
              name="rate"
              placeholder="Rate Here"
              value={rate}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className=" input-border">
              Submit
            </button>
          </div>
        </form>
        <button
          className="del-btn etalase-close login-close"
          onClick={() => closeReview()}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;
