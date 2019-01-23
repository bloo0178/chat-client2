import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalStateConsumer } from "../common/GlobalState.context";

const ProtectedRoute = ({ component: Component, ...props }) => (
  <GlobalStateConsumer>
    {({ sb }) => (
      <Route
        {...props}
        render={props =>
          sb !== "" ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </GlobalStateConsumer>
);

export default ProtectedRoute;
