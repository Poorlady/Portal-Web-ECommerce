import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
//components
import CartProduct from "../components/CartProduct";
//context
import { CartContext } from "../contexts/Cart";
import { authContext } from "../contexts/Auth";
//stripe
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
//helper
import stringFormarter from "../helpers/stringFormarter";
//cardElement option
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

function CartPayment() {
  const URL = "/api/order";
  const {
    cartProduct,
    addProduct,
    totalPrice,
    delProduct,
    subProduct,
    delAll,
    // toCurrency
  } = useContext(CartContext);
  const { user } = useContext(authContext);
  let total = totalPrice();
  const [billName, setBillName] = useState("");
  const [billAdd, setBillAdd] = useState("");
  const [billCity, setBillCity] = useState("");
  const [billZip, setBillZip] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (isSameAddress) {
      setBillName(`${user.fName} ${user.lName}`);
      setBillAdd(user.address);
      setBillCity(user.city);
      setBillZip(user.zip);
    } else {
      setBillName("");
      setBillAdd("");
      setBillCity("");
      setBillZip("");
    }
  }, [isSameAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.address == null && user.city == null && user.zip == null) {
      return alert("Please Add Your Address First!");
    }

    const userInfo = {
      name: isSameAddress ? `${user.fName} ${user.lName}` : billName,
      email: user.email,
      address: isSameAddress
        ? { city: user.city, line1: user.address, postal_code: user.zip }
        : { city: billCity, line1: billAdd, postal_code: billZip },
    };

    // const products = cartProduct.map(item => {
    //   return {
    //     name: item.productId.name,
    //     desc: item.productId.desc,
    //     price: item.productId.price * item.amount,
    //     size: item.size,
    //     colour: item.colour,
    //     amount: item.amount
    //   };
    // });
    setIsProcessing(true);
    console.log(stripe);
    const { data: clientSecret } = await axios.post("/api/stripe/post-intent", {
      total: totalPrice(),
    });
    console.log(clientSecret.client_secret);

    const card = elements.getElement(CardElement);
    console.log(card);

    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: card,
      billing_details: userInfo,
    });
    console.log(paymentMethod);

    const confirmedPayment = await stripe.confirmCardPayment(
      clientSecret.client_secret,
      {
        payment_method: paymentMethod.paymentMethod.id,
      }
    );

    console.log(confirmedPayment);

    await axios
      .post(URL, { userId: user._id, total: total })
      .then((result) => {
        localStorage.removeItem("carts");
        delAll();
        console.log(result);
      })
      .catch((err) => console.log(err));

    setIsProcessing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "billName":
        setBillName(value);
        break;
      case "billAdd":
        setBillAdd(value);
        break;
      case "billCity":
        setBillCity(value);
        break;
      case "billZip":
        setBillZip(value);
        break;
      default:
        if (user.address != null && user.city != null && user.zip != null) {
          setIsSameAddress((prevState) => !prevState);
        } else {
          alert("You Have No Address!");
        }
        break;
    }
  };

  return (
    <main>
      <div className="cart-list">
        <div className="span-col-4 cart-items">
          <h2>Products List</h2>
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
        <div className=" cart-price span-row-3">
          <p>Your Address :</p>
          <div>
            <p className="small-uInfo f14 capitalize">{`${user.fName} ${user.lName}`}</p>
            <p className="small-uInfo address-small capitalize">{user.phone}</p>
            {user.address ? (
              <p className="small-uInfo address-small capitalize">
                {user.address}
              </p>
            ) : (
              <p className="small-uInfo address-small capitalize">Address: -</p>
            )}
            {user.city && (
              <p className="small-uInfo address-small capitalize">{`Kota ${user.city}, ${user.zip}`}</p>
            )}
          </div>
          <h4>Total :</h4>
          <p>{stringFormarter.toCurrency(totalPrice())}</p>
        </div>
        {cartProduct.length > 0 && (
          <div className="span-col-4">
            <h2>Billing address</h2>
            <div className="same-address">
              <label>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={isSameAddress}
                />
                Same Billing Address
              </label>
            </div>
            <form onSubmit={handleSubmit}>
              {!isSameAddress && (
                <>
                  <div className="billing-address">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      name="billName"
                      className="input-border"
                    />
                  </div>
                  <div className="billing-address">
                    <label>Address</label>
                    <input
                      onChange={handleChange}
                      name="billAdd"
                      className="input-border"
                    />
                  </div>
                  <div className="billing-address">
                    <label>City</label>
                    <input
                      onChange={handleChange}
                      name="billCity"
                      className="input-border"
                    />
                  </div>
                  <div className="billing-address">
                    <label>Zip</label>
                    <input
                      onChange={handleChange}
                      name="billZip"
                      className="input-border"
                    />
                  </div>
                </>
              )}
              <div className="billing-card">
                <label>
                  Card detail
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </label>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="order-btn submit-btn input-border"
              >
                {isProcessing ? "Processing..." : "Buy Now!"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPayment;
