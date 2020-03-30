import React, { useContext } from "react";
import CartProduct from "../components/CartProduct";
import { CartContext } from "../contexts/Cart";
import { Link } from "react-router-dom";
import stringFormat from "../helpers/stringFormarter";

function Carts() {
  const {
    cartProduct,
    addProduct,
    totalPrice,
    delProduct,
    subProduct
    // toCurrency
  } = useContext(CartContext);

  return (
    <main>
      <div className="cart-header">
        <div className="cart-80">
          Shopping Cart : {cartProduct.length} Item(s)
        </div>
      </div>
      <div className="cart-list">
        <div className="span-col-4 cart-items">
          {cartProduct.length > 0 ? (
            cartProduct.map((item, i) => (
              <CartProduct
                product={item}
                addProduct={addProduct}
                delProduct={delProduct}
                subProduct={subProduct}
                key={i}
                // toCurrency={toCurrency}
              />
            ))
          ) : (
            <p>You have empty cart</p>
          )}
        </div>
        <div className=" cart-price input-border">
          <h4>Total :</h4>
          <p>{stringFormat.toCurrency(totalPrice())}</p>
          <Link className="red--link input-border" to="carts/payment">
            Buy Now
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Carts;
