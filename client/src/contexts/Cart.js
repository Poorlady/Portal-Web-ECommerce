import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "./Auth";
const CartContext = React.createContext();
const currency = require("../helpers/stringFormarter");

function CartProvider(props) {
  const [cartProduct, setCartProduct] = useState([]);
  const { user } = useContext(authContext);

  console.log(cartProduct);
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      delAll();
    }
    if (cartProduct.length <= 0) {
      saveLocal();
    }
  }, [user]);

  const saveLocal = products => {
    localStorage.setItem("carts", JSON.stringify(products));
  };

  const manipulateCart = async (product, amount, colour, size) => {
    await axios
      .post("/api/user/cart", {
        productId: product._id,
        amount: amount,
        colour: colour,
        size: size,
        userId: user._id
      })
      .then(result => {
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  const findCartIndex = (product, colour, size) => {
    const cartProductIndex = cartProduct.findIndex(
      item =>
        item._id === product._id && item.colour === colour && item.size === size
    );
    return cartProductIndex;
  };

  const fetchCart = async () => {
    axios
      .get(`/api/user/cart/${user._id}`)
      .then(result => {
        setCartProduct(result.data.items);
        console.log("oka");
        saveLocal(result.data.items);
      })
      .catch(err => console.log(err));
  };

  const addProduct = async (product, amount, colour, size) => {
    const productId = product.productId ? product.productId : product;
    console.log(product.productId);
    manipulateCart(productId, amount, colour, size);
  };

  const subProduct = product => {
    manipulateCart(product.productId, -1, product.colour, product.size);
  };
  const delAll = () => {
    setCartProduct([]);
  };

  const delProduct = async product => {
    console.log(product);
    await axios
      .delete(`/api/user/cart/${product._id}U${user._id} `)
      .then(result => {
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  const totalPrice = () => {
    return currency.toCurrency(
      cartProduct.reduce(
        (acc, { productId, amount }) => acc + productId.price * amount,
        0
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        totalPrice,
        cartProduct,
        addProduct,
        delProduct,
        subProduct,
        delAll
        // toCurrency
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };

// if (
//   cartProduct &&
//   cartProduct.some(
//     item =>
//       item._id === product._id &&
//       item.colour === colour &&
//       item.size === size
//   )
// ) {
//   console.log("find it");
//   const changed = cartProduct.map(item => {
//     if (
//       item._id === product._id &&
//       item.colour === colour &&
//       item.size === size
//     ) {
//       return {
//         ...item,
//         amount: item.amount + amout
//       };
//     }
//     return item;
//   });
//   setCartProduct(changed);
// } else {
//   addNewProduct(product, amout, colour, size);
// }

// if (
//   cartProduct.some(item => item.id === product.id) &&
//   cartProduct.length > 0
// ) {
//   const changed = cartProduct.map(item => {
//     if (item.id === product.id) {
//       if (item.colour === product.colour && item.size === product.size) {
//         return {
//           ...item,
//           amount: item.amount - 1
//         };
//       }
//     }
//     return item;
//   });
//   setCartProduct(changed);
// }

// const manipulateAmount = (index, amount) => {
//   let updatedCartProducts = cartProduct;
//   let newQuantity = updatedCartProducts[index].amount + amount;
//   console.log(newQuantity);
//   updatedCartProducts[index].amount = newQuantity;
//   console.log(updatedCartProducts);
//   setCartProduct([...updatedCartProducts]);
// };

// const addNewProduct = (product, amout, colour, size) => {
//   setCartProduct(prevCart => [
//     ...prevCart,
//     { ...product, amount: amout, colour: colour, size: size }
//   ]);
// };
