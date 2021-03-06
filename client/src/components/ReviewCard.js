import React from "react";

function ReviewCard({ review }) {
  return (
    <div className="review-card input-border">
      <div className="review-card-photo">
        <img src={`/uploads/users/${review.user.userId.img}`} alt="" />
      </div>
      <div className="review-card-text span-col-3">
        <p className="capitalize review-card-username">
          User Name: {review.user.name}
        </p>
        <p>{review.text}</p>
      </div>
      <div>Rate: {review.rate}</div>
    </div>
  );
}

export default ReviewCard;
