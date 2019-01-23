// for sendbird object
import React from "react";

const GlobalStateContext = React.createContext();

// Exportable consumer to be injected into components
export const GlobalStateConsumer = GlobalStateContext.Consumer;

// Provider
export class GlobalStateProvider extends React.Component {
  state = {
    sb: "", //sb_object
    channels: [], 
    curChannel: '', // can remove this check in Channels if I decide to keep. Right now, used for Chat.
  };

  /*
  SB contains the following: 
  -sb.channelHandlers  (there is a function sb.removeAllChannelHandlers...)

  ????
  messages
  */


  setSendbird = sendbirdObj => {
    this.setState({ sb: sendbirdObj });
  };

  setCurChannel = curChannel => {
    this.setState({ curChannel: curChannel })
  };

  // will use this when I create a channel, etc. Pass the channelList as props as well.
  refreshChannelList = async (sb) => {
    return new Promise(resolve => {
      //let channelList;
      const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
      openChannelListQuery.next((channels, error) => {
        if (error) return console.log(error);
        //channelList = channels;
        this.setState({ channels: channels });
        resolve();
      });
    });
  };

  render() {
    const { children } = this.props;
    const { sb, messages, channels, curChannel } = this.state;
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
          enteredChannels: sb.OpenChannel.enteredChannels,
          refreshChannelList: this.refreshChannelList,
          channels: channels,
          curChannel: curChannel,
          setCurChannel: this.setCurChannel
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    );
  }
}
