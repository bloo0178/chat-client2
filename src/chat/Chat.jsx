import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import ChatHeader from "./ChatHeader"; 
import ChatMenu from "./ChatMenu";
import NavBar from "../common/NavBar";
import styles from "./styles";
import MessagesContainer from "./MessagesContainer";

class Chat extends React.Component {
  state = {
    loading: true, 
    channel: "",
    newMessage: "",
    channelName: "",
    participants: []
  };

  getParticipantList = channel => {
    let list = [];
    const participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, error) => {
      if (error) return console.log(error);
      participantList.map(participant => {
        return list.push(participant.userId);
      });
    });
    return list;
  };

  addChannelHandler = (sb, channel) => {
    const ChannelHandler = new sb.ChannelHandler();
    const channelHandlerID = channel.url;
    ChannelHandler.onUserEntered = (openChannel, user) => {
      //why does this return openChannel?
      const participantList = this.getParticipantList(channel);
      const newMessage = {
        sender: "info",
        message: `${user.userId} has joined.`
      };
      this.setState({
        participants: participantList,
        newMessage: newMessage
      });
    };
    ChannelHandler.onUserExited = (openChannel, user) => {
      const participantList = this.getParticipantList(channel);
      const newMessage = {
        sender: "info",
        message: `${user.userId} has left.`
      };
      this.setState({
        participants: participantList,
        newMessage: newMessage
      });
    };
    ChannelHandler.onMessageReceived = (channel, message) => {
      this.setState({
        newMessage: message
      });
    };
    // Add channel event handler to the SendBird object.
    sb.addChannelHandler(channelHandlerID, ChannelHandler);
  };

  async componentDidMount() {
    const { sb } = this.props;
    const channelURL = this.props.match.params.channelURL;
    const channel = await this.getChannel(sb, channelURL);
    this.addChannelHandler(sb, channel);
    window.addEventListener("beforeunload", this.onUnload);
    this.setState({
      channel: channel,
      channelName: channel.name,
      loading: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  getChannel = (sb, channelURL) => {
    return new Promise(resolve => {
      sb.OpenChannel.getChannel(channelURL, (channel, error) => {
        if (error) return error;
        resolve(channel);
      });
    });
  };

  onUnload = event => {
    event.preventDefault();
    this.exitChannel(this.props.sb, this.state.channel); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  updateParticipants = participantsList => {
    this.setState({ participants: participantsList });
  };

  exitChannel = curChannel => {
    const { sb } = this.props;
    return new Promise(resolve => {
      sb.removeChannelHandler(curChannel.url);
      curChannel.exit((response, error) => {
        if (error) console.log(error);
        resolve(() => console.log("success"));
      });
    });
  };

  render() {
    const {
      classes: { loadingSpinner, chatHeader, chatContainer },
      history,
      sb
    } = this.props;
    const { channelName, newMessage, loading, channel } = this.state;

    if (loading === true) { 
      return (
        <div className={loadingSpinner}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <NavBar history={history} />
        <div className={chatContainer}>
          <div className={chatHeader}>
            <ChatHeader title={channelName} history={history}>
              <ChatMenu history={history} sb={sb} channel={channel} />
            </ChatHeader>
          </div>
          <MessagesContainer
            channel={channel}
            sb={sb}
            newMessage={newMessage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Chat);
