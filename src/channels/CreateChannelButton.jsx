import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { GlobalStateConsumer } from "../common/GlobalState.context";
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

  createChannel = (sb, enteredChannels, clearMessages) => async () => {
    const { channelName } = this.state;
    if (!channelName) return;
    if (Object.keys(enteredChannels).length !== 0) {
      // consider moving this logic to the helper file. Allow multiple channels in the future.
      let curChannel = enteredChannels[Object.keys(enteredChannels)[0]]; // don't like this. Redo with current channel being determined in global state.
      await exitChannel(sb, curChannel, clearMessages);
    }
    let newChannelURL = await createChannel(sb, channelName);
    await enterChannel(sb, newChannelURL);
    // this.props.history.push(`/chat/${newChannelURL}`);
  };

  render() {
    return (
      <GlobalStateConsumer>
        {({ sb, enteredChannels, clearMessages }) => (
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
                <Button
                  onClick={this.createChannel(
                    sb,
                    enteredChannels,
                    clearMessages
                  )}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </GlobalStateConsumer>
    );
  }
}

export default CreateChannelButton;
