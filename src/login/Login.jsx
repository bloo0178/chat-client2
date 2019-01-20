import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LoginButton from './LoginButton';

const styles = {
  loginContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

class Login extends React.Component {
  state = {
    username: ""
  };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { username } = this.state;
    if (!username) return;
    this.setState({ username: "" });
    //await login(this.state.username);
    history.push("/channels");
  };

  render() {
    const {
      classes: { loginContainer }
    } = this.props;
    return (
      <div className={loginContainer}>
        <h1>react.chat</h1>
        <TextField
          id="username"
          placeholder="Enter a username"
          margin="normal"
          label="Username"
          InputLabelProps={{ shrink: true }}
          value={this.state.username}
          onChange={this.handleChange}
        />
        <LoginButton username={this.state.username}/>
      </div>
    );
  }
}

export default withStyles(styles)(Login);