import React, { useContext } from "react";
import CartProduct from "../components/CartProduct";
import axios from "axios";
import { CartContext } from "../contexts/Cart";
import { authContext } from "../contexts/Auth";
import stringFormarter from "../helpers/stringFormarter";

function CartPayment() {
  const URL = "/api/order";
  const {
    cartProduct,
    addProduct,
    totalPrice,
    delProduct,
    subProduct,
    delAll
    // toCurrency
  } = useContext(CartContext);
  const { user } = useContext(authContext);
  let total = totalPrice();

  const handleClick = async e => {
    e.preventDefault();
    await axios
      .post(URL, { userId: user._id, total: total })
      .then(result => {
        localStorage.removeItem("carts");
        delAll();
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <div className="cart-list">
        <div className="span-col-4">
          <h2>Your Address :</h2>
          <div>
            <p className="f14 capitalize">{`${user.fName} ${user.lName}`}</p>
            <p className="f14">Phone Number</p>
            <p className="address-small capitalize">{user.address}</p>
            <p className="address-small capitalize">{`Kota ${user.city}, ${user.zip}`}</p>
          </div>
        </div>
        <div className=" cart-price input-border span-row-3">
          <h4>Total :</h4>
          <p>{stringFormarter.toCurrency(totalPrice())}</p>
          <button onClick={handleClick} className="input-border">
            Buy Now
          </button>
        </div>
        <div className="span-col-4 cart-items">
          {cartProduct.length > 0 ? (
            cartProduct.map((item, i) => (
              <CartProduct
                product={item}
                addProduct={addProduct}
                delProduct={delProduct}
                subProduct={subProduct}
                status={"payment"}
                key={i}
                // toCurrency={toCurrency}
              />
            ))
          ) : (
            <p>You have empty cart</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default CartPayment;
