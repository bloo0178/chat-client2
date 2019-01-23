import React from "react";
import Login from "./login/Login";
import Channels from "./channels/Channels";
import Chat from "./chat/Chat";
import ProtectedRoute from "./common/ProtectedRoute";
import { SharedSnackbarProvider } from "./common/SharedSnackbar.context";
import {
  GlobalStateProvider,
 
} from "./common/GlobalState.context";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    sb: "",
    curChannel: ""
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
              <Route
                path="/channels"
                render={props => <Channels {...props} sb={this.state.sb} />}
              />
              {/*<ProtectedRoute path="/channels" component={Channels} />
              <ProtectedRoute path="/chat" component={Chat} />*/}
              <Route
                path="/chat/:channelURL"
                render={props => (
                  <Chat {...props} curChannel={this.state.curChannel} sb={this.state.sb} />
                )}
              />
            </React.Fragment>
          </Router>
        </SharedSnackbarProvider>
  
    );
  }
}

export default App;
