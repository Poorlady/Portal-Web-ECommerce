import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const authContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
  );
  const [store, setStore] = useState(
    localStorage.getItem("store") && JSON.parse(localStorage.getItem("store"))
  );
  const [isLogIn, setIsLogIn] = useState(
    localStorage.getItem("rememberMe") ? true : false
  );

  const fetchStore = async userId => {
    await axios
      .post("/api/store/getStore", { userId: userId })
      .then(result => {
        updateState("store", result.data);
      })
      .catch(err => console.log(err));
  };

  console.log(user);
  console.log(store);
  useEffect(() => {
    if (user != null && store == null) {
      fetchStore(user._id);
    }
  }, [user, store]);

  const deleteUser = history => {
    setUser();
    setStore();
    setIsLogIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("store");
    localStorage.removeItem("carts");
    localStorage.removeItem("rememberMe");
    history.push("/");
  };

  const updateState = (name, data) => {
    switch (name) {
      case "user":
        setUser(data);
        setIsLogIn(true);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("rememberMe", true);
        break;
      case "store":
        setStore(data);
        localStorage.setItem("store", JSON.stringify(data));
        break;
      default:
        break;
    }
  };
  return (
    <authContext.Provider
      value={{
        user,
        isLogIn,
        deleteUser,
        updateState,
        store
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthProvider };

// const fetchUser = async email => {
//   axios
//     .post("/api/user/getUserData", { email: email })
//     .then(result => setUser(result.data))
//     .catch(err => console.log(err));
// };
// const saveUser = user => {
//   // console.log(user);
//   setUser(user.data.data);
//   setIsLogIn(localStorage.getItem("logIn"));
// };

// const updateUser = user => {
//   setUser(user.data);
//   setIsLogIn(localStorage.getItem("logIn"));
// };
