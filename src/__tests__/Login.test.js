import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "../test-utils";
import Login from "../login/Login";

const setup = () => {
  const utils = render(<Login />);
  const login = utils.getByLabelText("Username");
  return { login, ...utils };
};

test("does this work?", () => {
    const {login} = setup();
    fireEvent.change(login, {target: {value: 'testing'}})
    expect(login.value).toBe('testing');
});
