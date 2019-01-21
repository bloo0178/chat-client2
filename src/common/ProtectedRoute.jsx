import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalStateConsumer } from "../common/GlobalState.context";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <GlobalStateConsumer>
    {({ username }) => (
      <Route
        {...rest}
        render={props =>
          username !== "" ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </GlobalStateConsumer>
);

export default ProtectedRoute;
