import React from "react";

import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../helpers/AuthHelpers";
import ROLES from "../helpers/Roles";

export default function ProtectedRoute({
  component: Component,
  role,
  ...rest
}) {
  // console.log("role", isAuthenticated()?.user?.role);
  return (
    <Route
      {...rest}
      render={(props) =>
        "ADMIN" == role ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
