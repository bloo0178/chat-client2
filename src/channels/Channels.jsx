import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ChannelList from "./ChannelList";
import CreateChannelButton from "./CreateChannelButton";
import NavBar from "../common/NavBar";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    direction: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  channelList: {
    width: "75%",
    minWidth: 300,
    maxWidth: 600,
    padding: "3rem",
    justifyContent: "center"
  },
  createChannel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15
  }
};

class Channels extends React.Component {
  state = {
    channels: []
  };

  async componentDidMount() {
    const { sb } = this.props;
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) return console.log(error);
      this.setState({ channels: channels });
    });
  }

  render() {
    const {
      classes: { root, createChannel, channelList },
      history,
      sb
    } = this.props;
    const { channels } = this.state;
    return (
      <React.Fragment>
        <NavBar history={history} />
        <div className={root}>
          <div className={channelList}>
            <ChannelList
              history={history}
              sb={sb}
              channels={channels}
            />
          </div>
          <div className={createChannel}>
            <CreateChannelButton sb={sb} history={history} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Channels);
