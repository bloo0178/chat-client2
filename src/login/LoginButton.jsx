import React from "react";
import { GlobalStateConsumer } from "../common/GlobalState.context";
import Button from "@material-ui/core/Button";
import * as SendBird from "sendbird";

const connectToSendbird = (username, setSendbird) => {
  const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });
  return new Promise(resolve => {
    sb.connect(
      username,
      (user, error) => {
        if (error) return alert(error);
        resolve(setSendbird(sb));
      }
    );
  });
};

const handleClick = (
  username,
  updateUsername,
  setSendbird,
  history
) => async () => {
  if (!username) return alert("enter a username");
  await connectToSendbird(username, setSendbird);
  updateUsername(username);
  history.push("/channels");
};

const LoginButton = props => {
  const { history, username } = props;
  return (
    <GlobalStateConsumer>
      {({ updateUsername, setSendbird }) => (
        <Button
          id="loginButton"
          variant="contained"
          color="primary"
          onClick={handleClick(username, updateUsername, setSendbird, history)}
        >
          Submit
        </Button>
      )}
    </GlobalStateConsumer>
  );
};

export default LoginButton;
