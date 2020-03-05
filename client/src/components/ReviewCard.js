import React from "react";

import User from "../img/user.jpg";

function ReviewCard() {
  return (
    <div className="review-card input-border">
      <div className="review-card-photo">
        <img src={User} alt="" />
      </div>
      <div className="review-card-text span-col-3">
        <p className="review-card-username">Username</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          scelerisque erat eget turpis pellentesque, sed faucibus dolor
          tristique. Nulla vitae quam et odio fringilla lacinia.
        </p>
      </div>
      <div>Review star</div>
    </div>
  );
}

export default ReviewCard;
