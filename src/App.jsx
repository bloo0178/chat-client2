import React from "react";
import Login from './components/screens/Login/Login';
import Channels from "./channels/Channels";
import Chat from "./chat/Chat";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import { SharedSnackbarProvider } from './components/common/Snackbar/SharedSnackbar.context';
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
