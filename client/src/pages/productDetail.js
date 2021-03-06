import React, { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import ProductSlider from "../components/ProductSlider";
import ReviewCard from "../components/ReviewCard";

import { CartContext } from "../contexts/Cart";
const calculator = require("../helpers/calculator");
const currency = require("../helpers/stringFormarter");

function ProductDetail() {
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);
  const [pickColour, setPickColour] = useState("");
  const [pickSize, setPickSize] = useState("");
  const date = new Date();
  const { id } = useParams();

  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
    // console.log("detail refresh");

    return () => {
      setAmount(0);
      setPickColour("");
      setPickSize("");
    };
  }, [id]);

  //fetching dataapi
  const getProduct = async () => {
    await fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((prod) => setProduct(prod));
  };

  const handleChange = (e) => {
    pickOption(e.target.name, e.target.value);
  };

  const pickOption = (name, value) => {
    if (value === `Pick ${name}`) {
      return alert(`Pick Your ${name}`);
    }
    switch (name) {
      case "size":
        setPickSize(value);
        break;
      case "colour":
        setPickColour(value);
        break;
      default:
        break;
    }
  };

  //manipulate the amount function
  const addAmount = () => {
    if (amount === product.stock) {
      return alert("Maximum Stock");
    }
    setAmount((prev) => prev + 1);
  };
  const subAmount = () => {
    if (amount === 0) {
      return alert("Amount Can't Be Below 0");
    }
    setAmount((prev) => prev - 1);
  };

  //manipulate view in page
  const descClick = (e) => {
    setIsOptionClicked(false);
  };

  const reviewClick = (e) => {
    setIsOptionClicked(true);
  };

  //the orderproduct object
  // const orderProduct = {
  //   ...product,
  //   colour: pickColour,
  //   size: pickSize,
  //   amount: amount
  // };
  //validate the order product
  const validate = (product) => {
    if (checkedOption()) {
      if (pickSize === "" || pickColour === "" || amount === 0) {
        return false;
      }
    } else {
      if (amount === 0) {
        return false;
      }
    }
    return true;
  };

  const checkedOption = () => {
    if (
      (Array.isArray(product.size) && product.size.length) ||
      (Array.isArray(product.colour) && product.colour.length)
    ) {
      return true;
    }
    return false;
  };

  const mappedReview =
    product &&
    product.review &&
    product.review.map((item) => <ReviewCard id={item._id} review={item} />);

  return !product ? (
    <div className="productdetail-wrapper">
      <p>Product Not Found</p>
    </div>
  ) : (
    <div className="productdetail-wrapper">
      <div className="productdetail-photo">
        <div className="productdetail-mainphoto">
          <img src={`/uploads/products/${product.mainImg}`} alt="" />
        </div>
        <div className="productdetail-subphoto">
          <img src={`/uploads/products/${product.secondImg}`} alt="" />
        </div>
        <div className="productdetail-subphoto">
          <img src={`/uploads/products/${product.thirdImg}`} alt="" />
        </div>
      </div>
      <div className="productdetail-info">
        <h2>{product.name}</h2>
        {product.discount ? (
          new Date(product.discount.startedDate) <= date &&
          new Date(product.discount.endDate) >= date ? (
            <>
              <p className="strip">
                {currency.toCurrency(product.price, product.amount)}
              </p>
              <small className="nostrip">{` ${product.discount.rate}% discount`}</small>
              <p>{currency.toCurrency(calculator.getDiscount(product))}</p>
            </>
          ) : (
            <p>{currency.toCurrency(product.price, product.amount)}</p>
          )
        ) : (
          <p>{currency.toCurrency(product.price, product.amount)}</p>
        )}
        <div>
          <p>Product's Information</p>
          <p className="product-sub-info">
            Weight: {product.weight}kg | Condition: {product.condition} | By :
            <Link
              className="capitalize"
              to={`/store/${
                product.storeId !== undefined && product.storeId.name
              }`}
            >
              {product.storeId !== undefined && product.storeId.name}
            </Link>
          </p>
        </div>
        <form className="productdetail-option">
          <div className="ml-0">
            {checkedOption() ? (
              <>
                <p>Colour :</p>
                <select
                  name="colour"
                  className=" detail--select input-border"
                  onChange={handleChange}
                  value={pickColour}
                >
                  <option value="" defaultChecked>
                    Pick Colour
                  </option>
                  {product.colour &&
                    product.colour.map((colour) => (
                      <option key={colour} value={colour}>
                        {colour}
                      </option>
                    ))}
                </select>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            {checkedOption() ? (
              <>
                <p>Size : </p>
                <select
                  value={pickSize}
                  name="size"
                  className="detail--select input-border"
                  onChange={handleChange}
                >
                  <option value="" defaultChecked>
                    Pick Size
                  </option>
                  {product.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <></>
            )}
          </div>
        </form>
        <div className="productdetail-quantity">
          <p>Quantity :</p>
          <button
            className="amount--button input-border ml-0"
            onClick={() => subAmount()}
          >
            -
          </button>
          <input className="input-border" type="text" value={amount} />
          <button
            className=" amount--button input-border"
            onClick={() => addAmount()}
          >
            +
          </button>
        </div>
        <div className="product-buttons">
          <Link
            to="#"
            onClick={() => {
              if (validate()) {
                addProduct(product, amount, pickColour, pickSize);
              } else {
                alert("Colour, Size, and Amount Options Must be Filled!");
              }
            }}
            className="cart--button ml-0"
          >
            Add To Cart
          </Link>
        </div>
      </div>
      <div className="productdetail-desc">
        <div>
          <button
            className="subdetail--button input-border"
            onClick={descClick}
          >
            Product Description
          </button>
          <button
            className="subdetail--button input-border"
            onClick={reviewClick}
          >
            Product Review
          </button>
        </div>
        <hr />
        {!isOptionClicked ? (
          <p>{product.desc}</p>
        ) : (
          <div className="review-wrapper">
            {mappedReview.length > 0 ? (
              mappedReview
            ) : (
              <p>No review for this product</p>
            )}
          </div>
        )}
      </div>
      <div className="productdetail-recom">
        <ProductSlider />
      </div>
    </div>
  );
}

export default ProductDetail;
