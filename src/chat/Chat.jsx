import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageInput from "./MessageInput"; // MessageInput == CreateMessage
import MessagesDisplay from "./MessagesDisplay";
import { withStyles } from "@material-ui/core/styles";
//import { exitChannel, addChannelHandler } from '../utils/sendbirdHelpers';
import {
  getMessages,
  getChannel,
  getParticipantList
} from "../utils/sendbirdHelpers";
import ChatHeader from "./ChatHeader"; // ChannelHeader == InfoBar
import ChatMenu from "./ChatMenu"; // ChannelMenu == OptionsMenu
import NavBar from "../common/NavBar";

const styles = {
  root: {
    width: "100%",
    height: "90vh", // maybe position at bottom?
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end"
  },
  displayMessages: {
    overflowY: "auto"
  },
  createMessage: {
    width: "100%"
  },
  infoContainer: {
    maxHeight: "7vh",
    minHeight: "7vh",
    marginBottom: "auto",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  loadingSpinner: {
    height: "90vh", // maybe position at bottom?
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class Chat extends React.Component {
  state = {
    loading: true,
    channel: "",
    messages: [],
    channelName: "",
    participants: []
  };

  onUnload = event => {
    event.preventDefault();
    //exitChannel(); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  addChannelHandler = (sb, channel) => {
    const ChannelHandler = new sb.ChannelHandler();
    const channelHandlerID = channel.url;

    ChannelHandler.onUserEntered = (openChannel, user) => {
      //why does this return openChannel (and user)?
      const participantList = getParticipantList(channel);
      this.setState({
        participants: participantList,
        messages: [
          ...this.state.messages,
          { sender: "info", message: `${user.userId} has joined.` }
        ]
      });
    };
    ChannelHandler.onUserExited = (openChannel, user) => {
      const participantList = getParticipantList(channel);
      this.setState({
        participants: participantList,
        messages: [
          ...this.state.messages,
          { sender: "info", message: `${user.userId} has left.` }
        ]
      });
    };
    ChannelHandler.onMessageReceived = (channel, message) => {
      let mappedMessage = this.mapMessage(message);
      this.setState({
        messages: [...this.state.messages, mappedMessage]
      })
    };
    // Add channel event handler to the SendBird object.
    sb.addChannelHandler(channelHandlerID, ChannelHandler);
  };

  mapMessage = rawMessage => {
    const { sb } = this.props;
    let currentUser = sb.currentUser.userId;
    let sender = rawMessage._sender.userId;
    let message = rawMessage.message;
    if (sender === currentUser) {
      return { sender: "You", message: message };
    }
    // need to figure out how info messages will come in...
    // don't think I need to do this here - it's handled in the channelHandler
    else {
      return { sender: sender, message: message };
    }
  };

  async componentDidMount() {
    const { sb } = this.props;
    const channelURL = this.props.match.params.channelURL;
    const channel = await getChannel(sb, channelURL);
    this.setState({ channel: channel, channelName: channel.name });
    let rawMessages = await getMessages(channel);
    let mappedMessages = rawMessages.map(message => {
      return this.mapMessage(message);
    });
    this.setState({
      messages: mappedMessages
    });
    this.addChannelHandler(sb, channel);
    // need to addChannelHandler();
    this.setState({ loading: false });
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  render() {
    const {
      classes: {
        loadingSpinner,
        infoContainer,
        root,
        displayMessages,
        createMessage
      },
      history
    } = this.props;
    const { channelName, messages, loading } = this.state;

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
        <div className={root}>
          <div className={infoContainer}>
            <ChatHeader title={channelName} history={history}>
              <ChatMenu history={history} />
            </ChatHeader>
          </div>
          <div className={displayMessages}>
            <MessagesDisplay messages={messages} />
          </div>
          <div className={createMessage}>
            <MessageInput />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Chat);
