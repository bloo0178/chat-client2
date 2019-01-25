import React from "react";
import Button from "@material-ui/core/Button";
import * as SendBird from "sendbird";

const connectToSendbird = (username) => {
  const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });
  return new Promise(resolve => {
    sb.connect(
      username,
      (user, error) => {
        if (error) return alert(error);
        resolve(sb);
      }
    );
  });
};

const handleClick = (username, setSendbird, history) => async () => {
  if (!username) return;
  let sb = await connectToSendbird(username);
  setSendbird(sb);
  console.log(sb);
  history.push("/channels");
};

const LoginButton = props => {
  const { history, username, setSB } = props;
  return (
    <Button
      id="loginButton"
      variant="contained"
      color="primary"
      onClick={handleClick(username, setSB, history)}
    >
      Submit
    </Button>
  );
};

export default LoginButton;
