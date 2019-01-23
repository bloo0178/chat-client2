import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import { sendMessage } from "../../utils/channelHelpers";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";

const styles = {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto"
    },
    textField: {
      width: "60%"
    }
  }

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  }

  handleClick = () => {
    //sendMessage(this.state.message);
    this.setState({ message: "" });
  }

  render() {
    const {
      classes: { root, textField }
    } = this.props;
    const { message } = this.state;
    let color;

    !message ? (color = "default") : (color = "primary");

    return (
      <div className={root}>
        <TextField
          multiline
          rowsMax="4"
          value={message}
          onChange={this.handleChange}
          className={textField}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  variant="contained"
                  onClick={this.handleClick}
                  color={color}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(MessageInput);
