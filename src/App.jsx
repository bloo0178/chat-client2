import React from "react";
import Login from "./login/Login";
import Channels from "./channels/Channels";
import Chat from "./chat/Chat";
import ProtectedRoute from "./common/ProtectedRoute";
import { SharedSnackbarProvider } from "./common/SharedSnackbar.context";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    sb: "",
  };

  setSB = sb => {
    this.setState({
      sb: sb
    });
  };

  render() {
    return (
      <SharedSnackbarProvider>
        <Router>
          <React.Fragment>
            <Route
              path="/login"
              render={props => <Login {...props} setSB={this.setSB} />}
            />
            <ProtectedRoute
              sb={this.state.sb}
              path="/channels"
              component={Channels}
            />
            <ProtectedRoute
              sb={this.state.sb}
              path="/chat/:channelURL"
              component={Chat}
            />
          </React.Fragment>
        </Router>
      </SharedSnackbarProvider>
    );
  }
}

export default App;
