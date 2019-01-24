import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MessagesDisplay from "./MessagesDisplay";
import MessageInput from "./MessageInput";

class MessagesContainer extends React.Component {
  state = {
    messages: []
  };

  async componentDidMount() {
    const { sb, channel } = this.props;
    this.setState({ channel: channel, channelName: channel.name });
    let rawMessages = await this.getMessages(channel);
    let transformedMessages = rawMessages.map(message => {
      return this.transformMessage(message, sb);
    });
    this.setState({
      messages: transformedMessages
    });
    window.addEventListener("beforeunload", this.onUnload);
  }

  getMessages = channel => {
    return new Promise(resolve => {
      let messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.limit = 30;
      messageListQuery.reverse = true;
      messageListQuery.load((messageList, error) => {
        if (error) return error;
        resolve(messageList);
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.newMessage !== prevProps.newMessage) { // will need to add timestamp, could have same messages
      this.addMessage(this.props.newMessage);
    }
  }

  transformMessage = (rawMessage, sb) => { // combine this into addMessage
    let message = rawMessage.message;
    let currentUser = sb.currentUser.userId;
    let sender = rawMessage._sender.userId;
    if (sender === currentUser) {
      //used for initial load
      return { sender: "You", message: message };
    }
    return { sender: sender, message: message };
  };

  addMessage = message => {
    let newMessage = message;
    if (message._sender) {
      newMessage = this.transformMessage(message, this.props.sb);
    }
    this.setState({
      messages: [...this.state.messages, newMessage]
    });
  };

  render() {
    const {
      classes: { messagesDisplay, createMessage },
      channel
    } = this.props;
    const { messages } = this.state;
    return (
      <React.Fragment>
        <div className={messagesDisplay}>
          <MessagesDisplay messages={messages} />
        </div>
        <div className={createMessage}>
          <MessageInput channel={channel} addMessage={this.addMessage} />
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MessagesContainer);
