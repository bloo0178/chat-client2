import React from "react";
import Button from "@material-ui/core/Button";
import { SharedSnackbarConsumer } from "../SharedSnackbar.context";
import { GlobalStateConsumer } from "../GlobalState.context";

const handleTest = openSnackbar => value => () => {
  openSnackbar(value);
};

const handleTest2 = updateUsername => value => () => {
  updateUsername(value);
}

class Test extends React.Component {
  render() {
    return (
      <GlobalStateConsumer>
        {({ username, updateUsername }) => (
          <SharedSnackbarConsumer>
            {({ openSnackbar }) => (
              <React.Fragment>
                <Button onClick={handleTest(openSnackbar)("test completed")}>
                  {username}
                </Button>
                <Button onClick={handleTest2(updateUsername)('updated')}>{"TEST2"}</Button>
              </React.Fragment>
            )}
          </SharedSnackbarConsumer>
        )}
      </GlobalStateConsumer>
    );
  }
}

export default Test;
