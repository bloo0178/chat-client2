import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";

const ChannelList = props => {
  const {
    classes: { channelListContainer, channelButtonList, channelButton },
    channels,
    enterChannel
  } = props;

  const handleClick = channelURL => async event => {
    await enterChannel(channelURL);
    props.history.push(`/chat/${channelURL}`);
  };

  const formattedList = (
    <List
      className={channelButtonList}
      subheader={<ListSubheader color="primary">Channels</ListSubheader>}
    >
      {channels.map((channel, index) => {
        const { name, url } = channel;
        return (
          <div key={name + index.toString()}>
            <Button
              data-testid="channel-list-button"
              onClick={handleClick(url)}
              className={channelButton}
            >
              {name}
            </Button>
          </div>
        );
      })}
    </List>
  );

  return (
    <div className={channelListContainer}>
      <Paper>
        {formattedList}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ChannelList);
