import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import ChatHeader from "./ChatHeader";
import ChatMenu from "./ChatMenu";
import NavBar from "../common/NavBar";
import styles from "./styles";
import MessagesContainer from "./MessagesContainer";
import { addChannelHandler } from "../utils/channelHandler";
import {getChannel, exitChannel} from '../utils/sendbirdHelpers';

class Chat extends React.Component {
  state = {
    loading: true,
    channel: "",
    newMessage: "",
    channelName: "",
    participants: []
  };

  async componentDidMount() {
    const { sb } = this.props;
    const channelURL = this.props.match.params.channelURL;
    const channel = await getChannel(sb, channelURL);
    addChannelHandler(sb, channel, this.updateParticipants, this.addNewMessage);
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

  onUnload = event => {
    event.preventDefault();
    exitChannel(this.props.sb, this.state.channel); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  updateParticipants = participantsList => {
    this.setState({ participants: participantsList });
  };

  addNewMessage = newMessage => {
    this.setState({
      newMessage: newMessage
    });
  };

  render() {
    const {
      classes: { loadingSpinner, chatHeader, chatContainer },
      history,
      sb, 
      match
    } = this.props;
    const {
      channelName,
      newMessage,
      loading,
      channel,
      participants
    } = this.state;

    if (loading === true) {
      return (
        <div className={loadingSpinner}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <NavBar history={history} sb={sb} match={match}/>
        <div className={chatContainer}>
          <div className={chatHeader}>
            <ChatHeader title={channelName}>
              <ChatMenu
                history={history}
                channel={channel}
                participants={participants}
                sb={sb}
              />
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
