import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

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

const channelList = [
  { name: "channel1", url: "test1" },
  { name: "channel2", url: "test2" }
];

class ChannelList extends React.PureComponent {
  async componentDidMount() {
    /*
     *let channelList = await getChannelList();
     *this.props.dispatch(refreshChannels(channelList));
     */
  }

  handleClick = channelURL => async event => {
    /*
     *let channelList = await getChannelList();
     *this.props.dispatch(refreshChannels(channelList));
     */
  };

  render() {
    const {
      classes: { root, list, button },
      channels
    } = this.props;

    return (
      <div className={root}>
        <Paper>
          <List
            className={list}
            subheader={<ListSubheader color="primary">Channels</ListSubheader>}
          >
            {channelList.map((channel, index) => {
              const { name, url } = channel;
              return (
                <div key={name + index.toString()}>
                  <Button onClick={this.handleClick(url)} className={button}>
                    {name}
                  </Button>
                </div>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ChannelList);
