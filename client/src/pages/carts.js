import React, { useContext } from "react";

import CartProduct from "../components/CartProduct";

import { CartContext } from "../contexts/Cart";
import AddProduct from "./addProduct";

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
            cartProduct.map(item => (
              <CartProduct
                product={item}
                addProduct={addProduct}
                delProduct={delProduct}
                subProduct={subProduct}
                key={item._id}
                // toCurrency={toCurrency}
              />
            ))
          ) : (
            <p>You have empty cart</p>
          )}
        </div>
        <div className=" cart-price input-border">
          <h4>Total :</h4>
          <p>{totalPrice()}</p>
          <button className="input-border">Buy Now</button>
        </div>
      </div>
    </main>
  );
}

export default Carts;
