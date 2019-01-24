import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ParticipantsList from "./ParticipantsList";
/*import {
  exitChannel,
  deleteChannel,
  isOperator
} from "../../../utils/channelHelpers";*/
//import { exitChannel } from "../utils/sendbirdGeneralHelpers";
import { withStyles } from "@material-ui/core/styles";
import { SharedSnackbarConsumer } from "../common/SharedSnackbar.context";

const styles = {
    deleteButton: {
      color: "red"
    }
  };
  

class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      toggleParticipants: false,
      disableDelete: true
    };
  }

  componentDidMount() {
    this.setState({
      //disableDelete: !isOperator()
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeave = () => {
    //exitChannel(this.props.sb, this.props.channel);
    //this.props.history.push("/channels");
  };

  handleDelete = openSnackbar => async () => {
    const { channel, history } = this.props;
   // await deleteChannel();
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
      classes: { deleteButton }
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
          sb={this.props.sb}
          channel={this.props.channel}
        />
      </React.Fragment>
    );
  }
}

ChatMenu.contextType = SharedSnackbarConsumer; // what does this do???? Can you use this to avoid having the wrapper?

const mapStateToProps = state => {
  return {
    channel: state.channel.channel,
    messages: state.messages
  };
};

export default withStyles(styles)(ChatMenu);
