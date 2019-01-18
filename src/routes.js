import React from "react";
import Channels from "./channels/Channels";
import Login from "./login/Login";
import {Route } from "react-router-dom";

const routes = (
  <React.Fragment>
    <Route path="/login" component={Login} />
    <Route path="/channels" component={Channels} />
  </React.Fragment>
);

export default routes;
