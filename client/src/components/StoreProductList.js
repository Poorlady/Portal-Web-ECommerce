import React, { useState } from "react";
import DiscountForm from "./DiscountForm";
import { Link } from "react-router-dom";

import stringFormater from "../helpers/stringFormarter";

function StoreProductList({ product, deleteProduct }) {
  const [isDelClicked, setIsDelClicked] = useState(false);
  const [isDiscClicked, setIsDiscClicked] = useState(false);

  const delClicked = () => {
    setIsDelClicked(true);
  };

  const delClose = () => {
    setIsDelClicked(false);
  };

  const openForm = () => {
    setIsDiscClicked(true);
  };

  const closeForm = () => {
    setIsDiscClicked(false);
  };

  return (
    <div className="store-product-wrapper">
      <div className="store-product-img">
        <img src={`/uploads/products/${product.mainImg}`} alt={product.name} />
      </div>
      <div className="span-col-2 store-product-detail">
        <h4>{product.name}</h4>
        <p>Price : {stringFormater.toCurrency(product.price)}</p>
        <p>{product.desc}</p>
      </div>
      <div className="store-product-menu">
        <Link
          to={`/edit-product/${product._id}`}
          className="input-border edit-btn"
        >
          Edit
        </Link>
        <button className="input-border del-btn" onClick={delClicked}>
          Delete
        </button>
        <button onClick={() => openForm()} className="input-border disc-btn">
          Add Discount
        </button>
      </div>
      {isDelClicked && (
        <div className="popup-wrapper">
          <div className="popup-inner">
            <div className="store-product-del">
              <p>Are you sure?</p>
              <button
                className="ml-0 del-btn input-border"
                onClick={(e) => {
                  deleteProduct(product._id);
                  delClose();
                }}
              >
                Delete
              </button>
              <button className=" input-border" onClick={delClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDiscClicked && <DiscountForm closeForm={closeForm} id={product._id} />}
    </div>
  );
}

export default StoreProductList;
