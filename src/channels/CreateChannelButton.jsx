import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {
  exitChannel,
  enterChannel,
  createChannel
} from "../utils/sendbirdHelpers";

class CreateChannelButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, //change to open
      channelName: ""
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange = event => {
    this.setState({
      channelName: event.target.value
    });
  };

  createChannel = async () => {
    const { channelName } = this.state;
    const { sb } = this.props;
    let enteredChannels = sb.OpenChannel.enteredChannels;
    if (!channelName) return;
    if (Object.keys(enteredChannels).length !== 0) {
      let curChannel = enteredChannels[Object.keys(enteredChannels)[0]]; // don't like this. Redo with current channel being determined in global state.
      await exitChannel(sb, curChannel);
    }
    let newChannelURL = await createChannel(sb, channelName);
    await enterChannel(sb, newChannelURL);
    this.props.history.push(`/chat/${newChannelURL}`);
  };

  render() {
    return (
      <React.Fragment>
        <Fab color="primary" onClick={this.handleClick}>
          <AddIcon />
        </Fab>
        <Dialog open={this.state.isOpen} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Channel Name"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createChannel} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default CreateChannelButton;
