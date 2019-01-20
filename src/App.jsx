import React from "react";
import Login from "./login/Login";
import Channels from "./channels/Channels";
import ProtectedRoute from "./common/ProtectedRoute";
import { SharedSnackbarProvider } from "./common/SharedSnackbar.context";
import { GlobalStateProvider } from "./common/GlobalState.context";
import { BrowserRouter as Router, Route } from "react-router-dom";

let userid = ""; // change this to pull w/ context

const App = () => {
  return (
    <GlobalStateProvider>
      <SharedSnackbarProvider>
        <Router>
          <React.Fragment>
            <Route path="/login" component={Login} />
            <ProtectedRoute
              path="/channels"
              component={Channels}
              userid={userid}
            />
          </React.Fragment>
        </Router>
      </SharedSnackbarProvider>
    </GlobalStateProvider>
  );
};

export default App;