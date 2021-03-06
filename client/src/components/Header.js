import React, { useContext, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import CartCard from "./CartCard";

import { CartContext } from "../contexts/Cart";
import { authContext } from "../contexts/Auth";
import stringFormat from "../helpers/stringFormarter";

function Header({ openLogin, closeLogin }) {
  const { cartProduct, totalPrice } = useContext(CartContext);
  const { isLogIn, user, deleteUser } = useContext(authContext);
  const [text, setText] = useState("");
  const categoryList = localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : [];
  let history = useHistory();

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/product-page/${text}`);
  };

  return (
    <header>
      <div className="header-wrapper">
        <div className="brands-header">
          <h1>
            <Link to="/">Brands</Link>
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <div className="dropdown">
                <Link to="#" className="dropbtn">
                  Kategori
                </Link>
                <div className="dropdown-content">
                  {categoryList.length > 0 &&
                    categoryList.map((item) => (
                      <Link key={item} to={`/product-page/${item}`}>
                        {item}
                      </Link>
                    ))}
                </div>
              </div>
            </li>
            <li>
              <form onSubmit={handleSubmit} className="search-header">
                <input
                  className="input-border"
                  placeholder="search here..."
                  name="search"
                  value={text}
                  onChange={handleChange}
                />
                <button className="input-border">search</button>
              </form>
            </li>
            <li>
              <div className="dropdown">
                <Link className="header--link" to="/carts">
                  Cart
                </Link>
                <div className="dropdown-content ml-50">
                  {cartProduct.length > 0 ? (
                    <>
                      {cartProduct.map((item, i) => (
                        <CartCard key={i} product={item} />
                      ))}
                      <div className="cart-drop">
                        <p>Total : {stringFormat.toCurrency(totalPrice())}</p>
                      </div>
                      <div className="cart-drop">
                        <Link to="/carts/payment">Checkout</Link>
                      </div>
                    </>
                  ) : (
                    <p>Empty Cart</p>
                  )}
                </div>
              </div>
            </li>
            {!isLogIn ? (
              <>
                <li>
                  <Link className="header--link" to="/signup">
                    Daftar
                  </Link>
                </li>
                <li>
                  <Link
                    className="header--link"
                    onClick={() => {
                      openLogin();
                    }}
                  >
                    Masuk
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="header--link"
                    to="/profile/menu"
                  >{`${user.fName} ${user.lName}`}</Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="header--link"
                    onClick={() => deleteUser(history)}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
