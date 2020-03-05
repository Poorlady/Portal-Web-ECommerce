import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";

import { authContext } from "../contexts/Auth";

function PrivateRoute({ children, openLogin, ...rest }) {
  const { isLogIn } = useContext(authContext);
  return <Route {...rest}>{isLogIn ? children : openLogin()}</Route>;
}

export default PrivateRoute;
