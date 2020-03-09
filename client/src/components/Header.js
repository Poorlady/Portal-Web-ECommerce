import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import CartCard from "./CartCard";

import { CartContext } from "../contexts/Cart";
import { authContext } from "../contexts/Auth";

function Header({ openLogin, closeLogin }) {
  const { cartProduct, totalPrice } = useContext(CartContext);
  const { isLogIn, user, deleteUser } = useContext(authContext);

  useEffect(() => {
    console.log(user);
  }, []);

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
              <div class="dropdown">
                <Link class="dropbtn">Kategori</Link>
                <div class="dropdown-content">
                  <Link to="/product-page/komputer">Komputer</Link>
                  <Link to="/product-page/buku">Buku</Link>
                  <Link to="/product-page/sepatu pria">Sepatu Pria</Link>
                  <Link to="/product-page">Sepatu Wanita</Link>
                  <Link to="/product-page">Sepatu Anak-anak</Link>
                </div>
              </div>
            </li>
            <li>
              <form className="search-header">
                <input
                  className="input-border"
                  placeholder="search here..."
                  name="search"
                />

                <button className="input-border">search</button>
              </form>
            </li>
            <li>
              <div class="dropdown">
                <Link to="/carts">Cart</Link>
                <div class="dropdown-content ml-50">
                  {cartProduct.length > 0 ? (
                    <>
                      {cartProduct.map(item => (
                        <CartCard key={item._id} product={item} />
                      ))}
                      <div className="cart-drop">
                        <p>Total : {totalPrice()}</p>
                      </div>
                      <div className="cart-drop">
                        <Link>Checkout</Link>
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
                  <div className="btn-header">
                    <Link to="/signup">
                      <p>Daftar</p>
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      openLogin();
                    }}
                  >
                    <div className="btn-header">
                      <p>Masuk</p>
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {console.log(isLogIn)}
                <li>
                  <Link to="/profile">{`${user.fName} ${user.lName}`}</Link>
                </li>
                <li>
                  <Link onClick={() => deleteUser()}>Logout</Link>
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
