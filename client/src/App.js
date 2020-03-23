import React, { useState, useContext } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

//import main component
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";

//import Pages
import LandingApp from "./pages/landingApp";
import SignUp from "./pages/signUp";
import ProductPage from "./pages/productPage";
import ProductDetail from "./pages/productDetail";
import Carts from "./pages/carts";
import Profile from "./pages/profileMenu";
import AddProduct from "./pages/addProduct";
import StorePage from "./pages/storePage";
import PowerStore from "./pages/powerStore";
import CartPayment from "./pages/cartPayment";

import { authContext } from "./contexts/Auth";

import PrivateRoute from "./components/PrivateRoutes";

function App() {
  const [isPop, setIsPop] = useState(false);
  const { isLogIn } = useContext(authContext);

  const openLogin = () => {
    console.log(isLogIn);
    if (!localStorage.getItem("logIn")) {
      setIsPop(true);
    }
  };

  const closeLogin = () => {
    setIsPop(false);
  };
  return (
    <>
      <Header openLogin={openLogin} />
      {isPop && <LogIn closeLogin={closeLogin} />}
      <Switch>
        <Route exact path="/">
          <LandingApp />
        </Route>
        <Route path="/signup">
          <SignUp closeLogin={closeLogin} />
        </Route>
        <Route exact path="/product-page/:param">
          <ProductPage />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/carts">
          <Carts />
        </Route>
        <PrivateRoute path="/profile" openLogin={openLogin}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/add-product" openLogin={openLogin}>
          <AddProduct />
        </PrivateRoute>
        <PrivateRoute path="/edit-product/:id" openLogin={openLogin}>
          <AddProduct />
        </PrivateRoute>
        <PrivateRoute path="/store/:name" openLogin={openLogin}>
          <StorePage />
        </PrivateRoute>
        <PrivateRoute path="/power-store/page" openLogin={openLogin}>
          <PowerStore />
        </PrivateRoute>
        <PrivateRoute path="/carts/payment" openLogin={openLogin}>
          <CartPayment />
        </PrivateRoute>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
