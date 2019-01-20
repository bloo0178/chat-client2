import React from "react";
import { GlobalStateConsumer } from "../common/GlobalState.context";
import Button from "@material-ui/core/Button";

/*import * as SendBird from "sendbird";

const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID }); // might need dotenv

export const login = username => {
  store.dispatch(setSBSess(sb));
  return new Promise(resolve => {
    sb.connect(
      username,
      (user, error) => {
        if (error) return console.log(error);
        store.dispatch(setUserID(username));
        resolve(user);
      }
    );
  });
};*/


const handleClick = username => updateUsername => updateSendbird => async () => {
  if (!username) return alert("enter a username");
  updateUsername(username);
  updateSendbird('placeholder');
  // pass in the username
  // establish sendbird connection
  // update username and sendbird object in the global state
  // redirect to /channels
};

const LoginButton = props => {
  return (
    <GlobalStateConsumer>
      {({ updateUsername, updateSendbird }) => (
        <Button
          id="loginButton"
          variant="contained"
          color="primary"
          onClick={handleClick(props.username)(updateUsername)(updateSendbird)}
        >
          Submit
        </Button>
      )}
    </GlobalStateConsumer>
  );
};

export default LoginButton;
