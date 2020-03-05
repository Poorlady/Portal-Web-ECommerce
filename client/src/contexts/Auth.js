import React, { useEffect, useState } from "react";

const authContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState({});
  const [isLogIn, setIsLogIn] = useState();

  // const fetchUser = async email => {
  //   axios
  //     .post("/api/user/getUserData", { email: email })
  //     .then(result => setUser(result.data))
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    if (checkUser !== null) {
      updateUser(JSON.parse(checkUser));
      setIsLogIn(localStorage.getItem("logIn"));
    }
  }, []);

  const saveUser = user => {
    // console.log(user);
    setUser(user.data.data);
    setIsLogIn(localStorage.getItem("logIn"));
  };

  const deleteUser = () => {
    setUser({});
    setIsLogIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("logIn");
  };

  const updateUser = user => {
    setUser(user.data);
    setIsLogIn(localStorage.getItem("logIn"));
  };

  return (
    <authContext.Provider
      value={{ user, isLogIn, saveUser, deleteUser, updateUser }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthProvider };
