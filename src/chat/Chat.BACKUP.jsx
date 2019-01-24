import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageInput from "./MessageInput"; // MessageInput == CreateMessage
import MessagesDisplay from "./MessagesDisplay";
import { withStyles } from "@material-ui/core/styles";
import {
  getMessages,
  getChannel,
  transformMessage,
  addChannelHandler
} from "../utils/sendbirdChatHelpers";
import ChatHeader from "./ChatHeader"; // ChannelHeader == InfoBar
import ChatMenu from "./ChatMenu"; // ChannelMenu == OptionsMenu
import NavBar from "../common/NavBar";
import styles from "./styles";


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
    this.exitChannel(this.props.sb, this.state.channel); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  updateParticipants = participantsList => {
    this.setState({ participants: participantsList });
  };

  exitChannel = (curChannel) => {
    const {sb} = this.props;
    return new Promise(resolve => {
      sb.removeChannelHandler(curChannel.url); 
      curChannel.exit((response, error) => {
        if (error) console.log(error);
        resolve(() => console.log('success')); 
      });
    });
  };

  addMessage = message => {
    let newMessage = message;
    if (message._sender) {
      newMessage = transformMessage(message, this.props.sb);
    }
    this.setState({
      messages: [...this.state.messages, newMessage]
    });
  };

  async componentDidMount() {
    const { sb } = this.props;
    const channelURL = this.props.match.params.channelURL;
    const channel = await getChannel(sb, channelURL);
    this.setState({ channel: channel, channelName: channel.name });
    let rawMessages = await getMessages(channel);
    let transformedMessages = rawMessages.map(message => {
      return transformMessage(message, this.props.sb);
    });
    this.setState({
      messages: transformedMessages
    });
    addChannelHandler(
      sb,
      channel,
      this.addMessage,
      this.updateParticipants
    );
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
        chatHeader,
        chatContainer,
        messagesDisplay,
        createMessage
      },
      history, sb
    } = this.props;
    const { channelName, messages, loading, channel } = this.state;

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
              <ChatMenu history={history} sb={sb} channel={channel}/>
            </ChatHeader>
          </div>
          <div className={messagesDisplay}>
            <MessagesDisplay messages={messages} />
          </div>
          <div className={createMessage}>
            <MessageInput channel={channel} addMessage={this.addMessage} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Chat);
