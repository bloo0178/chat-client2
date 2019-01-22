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

const handleClick = (username, setSendbird, history) => async () => {
  if (!username) return;
  await connectToSendbird(username, setSendbird);
  history.push("/channels");
};

const LoginButton = props => {
  const { history, username } = props;
  return (
    <GlobalStateConsumer>
      {({ setSendbird }) => (
        <Button
          id="loginButton"
          variant="contained"
          color="primary"
          onClick={handleClick(username, setSendbird, history)}
        >
          Submit
        </Button>
      )}
    </GlobalStateConsumer>
  );
};

export default LoginButton;
