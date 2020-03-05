import React, { useState, useEffect } from "react";

const CartContext = React.createContext();

const currency = require("../helpers/stringFormarter");

function CartProvider(props) {
  const [cartProduct, setCartProduct] = useState([]);
  // console.log(cartProduct);
  useEffect(() => {
    // console.log("refresh cart");
  }, [cartProduct]);

  const addProduct = (product, amout, size, colour) => {
    if (cartProduct.some(item => item._id === product._id)) {
      console.log("find it");
      const changed = cartProduct.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            amount: item.amount + 1
          };
        }
        return item;
      });
      setCartProduct(changed);
    } else {
      setCartProduct(prevCart => [
        ...prevCart,
        { ...product, amount: amout, colour: colour, size: size }
      ]);
    }
  };

  const delProduct = product => {
    setCartProduct(prevCart => prevCart.filter(item => item.id !== product.id));
  };

  const subProduct = product => {
    if (
      cartProduct.some(item => item.id === product.id) &&
      cartProduct.length > 0
    ) {
      const changed = cartProduct.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            amount: item.amount - 1
          };
        }
        return item;
      });
      setCartProduct(changed);
    }
  };
  const totalPrice = () => {
    return currency.toCurrency(
      cartProduct.reduce((acc, { price, amount }) => acc + price * amount, 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        totalPrice,
        cartProduct,
        addProduct,
        delProduct,
        subProduct
        // toCurrency
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
