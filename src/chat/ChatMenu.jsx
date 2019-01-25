import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ParticipantsList from "./ParticipantsList";
import { withStyles } from "@material-ui/core/styles";
import { SharedSnackbarConsumer } from "../common/SharedSnackbar.context";
import {exitChannel} from '../utils/sendbirdHelpers';
import styles from './styles';

class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      toggleParticipants: false,
      disableDelete: true
    };
  }

  isOperator = () => {
    const { channel, sb } = this.props;
    return channel.isOperatorWithUserId(sb.getCurrentUserId());
  };

  componentDidMount() {
    this.setState({
      disableDelete: !this.isOperator()
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeave = () => {
    const { channel, history } = this.props;
    exitChannel(channel);
    history.push("/channels");
  };

  deleteChannel = () => {
    const { channel, sb } = this.props;
    const channelHandlerID = channel.url;
    return new Promise(resolve => {
      channel.delete((response, error) => {
        if (error) return console.log(error);
        sb.removeChannelHandler(channelHandlerID);
        resolve();
      });
    });
  };

  handleDelete = openSnackbar => async () => {
    const { channel, history } = this.props;
    await this.deleteChannel();
    history.push("/channels");
    openSnackbar(`Channel ${channel.name} deleted.`);
  };

  toggleParticipants = () => {
    this.setState({
      toggleParticipants: !this.state.toggleParticipants
    });
    this.handleClose();
  };

  render() {
    const {
      classes: { deleteButton },
      participants,
      channel
    } = this.props;
    const { anchorEl, disableDelete, toggleParticipants } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          <MenuItem onClick={this.toggleParticipants}>
            View Participants
          </MenuItem>
          <MenuItem onClick={this.handleLeave}>Leave Channel</MenuItem>
          <SharedSnackbarConsumer>
            {({ openSnackbar }) => (
              <MenuItem
                disabled={disableDelete}
                onClick={this.handleDelete(openSnackbar)}
                className={deleteButton}
              >
                Delete Channel
              </MenuItem>
            )}
          </SharedSnackbarConsumer>
        </Menu>
        <ParticipantsList
          open={toggleParticipants}
          toggle={this.toggleParticipants}
          channel={channel}
          participants={participants}
        />
      </React.Fragment>
    );
  }
}

/*
 *  Can you share context here??
 */

export default withStyles(styles)(ChatMenu);
