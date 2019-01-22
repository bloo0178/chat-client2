import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ChannelList from "./ChannelList";
import CreateChannelButton from "./CreateChannelButton";

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

const Channels = props => {
  const {
    classes: { root, createChannel, channelList },
    history
  } = props;
  return (
    <React.Fragment>
      <div>Navbar w/ history</div>
      <div className={root}>
        <div className={channelList}>
          <ChannelList history={history} />
        </div>
        <div className={createChannel}>
          <CreateChannelButton history={history} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Channels);
