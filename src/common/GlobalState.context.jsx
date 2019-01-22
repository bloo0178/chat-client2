// for sendbird object
import React from "react";

const GlobalStateContext = React.createContext();

// Exportable consumer to be injected into components
export const GlobalStateConsumer = GlobalStateContext.Consumer;

// Provider
export class GlobalStateProvider extends React.Component {
  state = {
    sb: "", //sb_object
    messages: [] // might need
  };

  /*
  SB contains the following: 
  -sb.channelHandlers  (there is a function sb.removeAllChannelHandlers...)

  ????
  messages
  */

  addMessage = (sender, message) => {
    this.setState({
      messages: [...this.state.messages, { sender: sender, message: message }]
    });
  };

  clearMessages = () => {
    this.setState({ messages: [] });
  };

  setSendbird = sendbirdObj => {
    this.setState({ sb: sendbirdObj });
  };

  render() {
    const { children } = this.props;
    const { sb, messages } = this.state;
    if (!sb) {
      return (
        <GlobalStateContext.Provider
          value={{
            sb: sb, 
            setSendbird: this.setSendbird
          }}
        >
          {children}
        </GlobalStateContext.Provider>
      );
    }
    return (
      <GlobalStateContext.Provider
        value={{
          username: sb.currentUser.userId,
          sb: sb,
          messages: messages,
          enteredChannels: sb.OpenChannel.enteredChannels, 
          clearMessages: this.clearMessages
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    );
  }
}
