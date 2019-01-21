// for sendbird object
import React from "react";

const GlobalStateContext = React.createContext();

// Exportable consumer to be injected into components
export const GlobalStateConsumer = GlobalStateContext.Consumer;

// Provider
export class GlobalStateProvider extends React.Component {
  state = {
    username: "",
    sendbird: "", //sb_object
    channel: "" // currentChannel
  };

  updateUsername = newUsername => {
    this.setState({ username: newUsername });
  };

  setSendbird = sendbirdObj => {
    this.setState({ sendbird: sendbirdObj });
  };

  updateChannel = value => {
    this.setState({ channel: value });
  };

  render() {
    const { children } = this.props;
    const { username, sendbird, channel } = this.state;
    return (
      <GlobalStateContext.Provider
        value={{
          username: username,
          sendbird: sendbird,
          channel: channel,
          updateUsername: this.updateUsername,
          setSendbird: this.setSendbird
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    );
  }
}
