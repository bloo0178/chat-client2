//https://github.com/kentcdodds/react-testing-library/issues/222

import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "../test-utils";
import Login from "../login/Login";
import LoginButton from '../login/LoginButton';

import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';


/*const setup = () => {
  const utils = render(<Login />);
  const login = utils.getByLabelText("Username");
  return { login, ...utils };
};*/

afterEach(cleanup());

test("does this work?", () => {
    //const {login} = setup();
    const usernameInput = render(<Login />)
    .getByLabelText("Username");
    fireEvent.change(usernameInput, {target: {value: 'testing'}})
    expect(usernameInput.value).toBe('testing');
});

test("does the login button redirect", () => {
  global.window = { location: { pathname: null}};
  const usernameInput = render(<Login />)
    .getByLabelText("Username");
    fireEvent.change(usernameInput, {target: {value: 'testing'}})
    const loginButton = render(<Login />)
    .getByText("Submit");
    fireEvent.click(loginButton);
    //expect(loginButton).toHaveLength(1);
    expect(global.window.location.pathname).toEqual('/channels');
});

