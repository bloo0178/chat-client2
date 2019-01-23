import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { enterChannel } from "../utils/sendbirdHelpers";

const styles = {
  root: {
    textAlign: "center"
  },
  list: {
    maxHeight: "70vh",
    overflowY: "auto"
  },
  button: {
    width: "100%",
    padding: "1rem"
  }
};

const ChannelList = props => {
  const {
    classes: { root, list, button },
    channels,
    sb
  } = props;

  const handleClick = (channelURL) => async event => {
    //const {sb} = props;
    let newChannel = await enterChannel(sb, channelURL);
    //setCurChannel(newChannel);
    props.history.push(`/chat/${channelURL}`);
  };

  return (
    <div className={root}>
      <Paper>
        <List
          className={list}
          subheader={<ListSubheader color="primary">Channels</ListSubheader>}
        >
          {channels.map((channel, index) => {
            const { name, url } = channel;
            return (
              <div key={name + index.toString()}>
                <Button
                  onClick={handleClick(url)}
                  className={button}
                >
                  {name}
                </Button>
              </div>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ChannelList);
