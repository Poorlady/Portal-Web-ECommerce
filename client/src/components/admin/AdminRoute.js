import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";

import { authContext } from "../../contexts/Auth";

function AdminRoute({ children, role, ...rest }) {
  const { isLogIn } = useContext(authContext);
  return (
    <Route {...rest}>
      {isLogIn && !role ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/admin"
          }}
        />
      )}
    </Route>
  );
}

export default AdminRoute;
