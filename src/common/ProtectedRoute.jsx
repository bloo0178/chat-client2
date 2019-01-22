import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalStateConsumer } from "../common/GlobalState.context";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <GlobalStateConsumer>
    {({ sb }) => (
      <Route
        {...rest}
        render={props =>
          sb !== "" ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </GlobalStateConsumer>
);

export default ProtectedRoute;
